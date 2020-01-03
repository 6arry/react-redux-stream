import React, { Component } from 'react';

class GoogleAuth extends Component {
    state = { isSignedIn: null }

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '498653786667-vvum1pvrsjoqo5s8v2dmn9gbv5tbi8o6.apps.googleusercontent.com',
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    // this listens for change of a users signIn/signOut
    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
    }

    // Helper method signs in a user with Google
    onSignIn = () => {
        this.auth.signIn()
    }

    // Helper method signs out a user with Google
    onSignOut = () => {
        this.auth.signOut()
    }

    // this method renders the status of a users signIn/signOut
    renderAuthButton(){
        if (this.state.isSignedIn === null){
            return null
        } else if (this.state.isSignedIn){
            return (
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

export default GoogleAuth;
