import React from 'react';
import { firebase, db } from './Firebase';
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
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
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
    document.addEventListener('keydown', this.dismissAuthUi);
  }

  //will be fired for click and keypress events
  dismissAuthUi(event) {
    if (event.key === 'Escape' && event.type === 'keydown') {
      this.setState(() => ({ showAuthWidget: false }));
      document.removeEventListener('keydown', this.dismissAuthUi);
    } else if (
      !event.target.closest('#firebaseui_container') &&
      event.type === 'click'
    ) {
      this.setState(() => ({ showAuthWidget: false }));
      document.removeEventListener('keydown', this.dismissAuthUi);
    }
    return;
  }

  componentDidUpdate(prevProps) {
    if (this.state.uid) {
      if (
        !this.isArrayEqual(prevProps.todos.items, this.props.todos.items) ||
        !this.isArrayEqual(
          prevProps.todos.completed,
          this.props.todos.completed
        )
      ) {
        //todos have changed. update the database
        db.collection('Todos')
          .doc(this.state.uid)
          .set({ todos: this.props.todos });
      }
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(() => {
          const displayName = user.displayName || user.email;
          return { displayName, uid: user.uid };
        });
        db.collection('Todos')
          .doc(this.state.uid)
          .get()
          .then(value => {
            const todos = value.data().todos;
            const items = todos.items;
            const completed = todos.completed;
            this.props.updateTodos({ items, completed });
          });
      } else {
        this.setState(() => ({ displayName: false, uid: false }));
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.dismissAuthUi);
  }

  isArrayEqual(arr1, arr2) {
    return (
      arr1.length === arr2.length &&
      arr1.filter((el, index) => el !== arr2[index]).length === 0
    );
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
