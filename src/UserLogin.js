import React from 'react';
import { firebase } from './Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAuthWidget: false,
      displayName: false,
      uid: false
    };

    this.uiConfig = this.uiConfig.bind(this);
    this.showAuthUi = this.showAuthUi.bind(this);
    this.dismissAuthUi = this.dismissAuthUi.bind(this);
  }

  uiConfig() {
    const that = this;
    return {
      callbacks: {
        signInSuccessWithAuthResult() {
          that.setState(() => ({ showAuthWidget: false }));
        }
      },
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID, pending...
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ]
    };
  }

  showAuthUi() {
    if (this.state.displayName) {
      //user already logged in
      //TODO: prompt for log out
      return;
    }
    this.setState(() => ({ showAuthWidget: true }));
  }

  //will be fired for click and keypress events
  dismissAuthUi(event) {
    if (event.key === 'Escape')
      this.setState(() => ({ showAuthWidget: false }));

    if (!event.target.closest('#firebaseui_container'))
      this.setState(() => ({ showAuthWidget: false }));
  }

  componentDidMount() {
    document.addEventListener('keydown', this.dismissAuthUi);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(() => {
          const displayName = user.displayName || user.email;
          return { displayName, uid: user.uid };
        });
      } else {
        this.setState(() => ({ displayName: false, uid: false }));
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.dismissAuthUi);
  }
  render() {
    return (
      <div>
        <button onClick={this.showAuthUi}>
          {this.state.displayName || 'Log In'}
        </button>
        {this.state.showAuthWidget && (
          <div
            tabIndex="1"
            onKeyPress={this.dismissAuthUi}
            onClick={this.dismissAuthUi}
            className="firebaseui-holder"
          >
            <StyledFirebaseAuth
              uiConfig={this.uiConfig()}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default UserLogin;
