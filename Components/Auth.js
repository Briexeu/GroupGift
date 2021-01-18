import firebase from 'firebase';
import * as React from 'react';

export default class Auth extends React.Component {

    loadUser = async () =>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
            } else {
                // No user is signed in.
            }
        });

    }
    render() {

        const user=firebase.auth().currentUser;

        if(!user) {
            return(

                this.props.navigation.navigate('Login')
            )
        } else {
            return(

                this.props.navigation.navigate('MainMenu')
            )
        }
    }
}
