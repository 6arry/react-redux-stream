import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '498653786667-vvum1pvrsjoqo5s8v2dmn9gbv5tbi8o6.apps.googleusercontent.com',
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    // this listens for change of a users signIn/signOut
    onAuthChange = (isSignedIn) => {
        if (isSignedIn){
            this.props.signIn()
        } else {
            this.props.signOut()
        }
    }

    // Helper method signs in a user with Google
    onSignInClick = () => {
        this.auth.signIn()
    }

    // Helper method signs out a user with Google
    onSignOutClick = () => {
        this.auth.signOut()
    }

    // this method renders the status of a users signIn/signOut
    renderAuthButton(){
        if (this.props.isSignedIn === null){
            return null
        } else if (this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
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

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
