import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import firebase from 'firebase';




export default class Indstillinger extends React.Component {

    state={
        user: firebase.auth().currentUser,
        uid:firebase.auth().currentUser.uid,
        email:firebase.auth().currentUser.email,
        password: '',
        name:'',
    }


    handleEmailChange = email => this.setState({ email });

    handlePasswordChange = password => this.setState( {password});

    loadUser = async () =>{
        firebase.auth().onAuthStateChanged(user =>{
            //const uid = firebase.auth().currentUser.getIdToken()
            if (user) {

                // User is signed in.
            } else {
                console.log('Bruger ikke logget ind')
                this.props.navigation.navigate('LoginForm')// No user is signed in.
            }
        });

    }

    componentDidMount() {

        this.loadUser()

    }

    updateData = async () => {
        var user = firebase.auth().currentUser;
        const {name, email, photoUrl} = this.state

        let newPass=this.state.password;

        user.updatePassword(newPass).then(() => {
        console.log("Password updated");
        }, (error) => {
            // gg error
        });

        user.updateProfile({
            displayName: name,
            email: email,
            photoURL: photoUrl,
        }).then(function() {
            console.log("Update successful");
            this.setState({
                password: '',
                email: '',
            });

        }).catch(function(error) {
            // An error happened.
        });

    }
    handleLogOut = async () => {
        await firebase.auth().signOut().then(() => console.log('User signed out!'));
        this.props.navigation.navigate('LoginForm');
    };

    render(){

        const {uid} = this.state
        const user = this.state

            if (!user) {
                return (
                    this.props.navigation.navigate('LoginForm')
                )
            } else {


                const {email, password,} = this.state;

                return (
                    <ScrollView>
                    <View style={styles.tekstBox}>

                        <Text style={styles.textA}>Her kan du opdatere dine login oplysninger {"\n"}</Text>



                        {/* Email */}
                        <Text>Email:</Text>
                        <TextInput
                            style={styles.input2}
                            value={email}
                            onChangeText={this.handleEmailChange}
                        />

                        {/* Password */}
                        <Text>Password:</Text>
                        <TextInput
                            style={styles.input2}
                            value={password}
                            onChangeText={this.handlePasswordChange}
                        />

                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={this.updateData}>
                                <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}> Opdatér info </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={this.handleLogOut}>
                                <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}> Log ud </Text>
                            </TouchableOpacity>



                    </View>
                    </ScrollView>
                );

            }
    }
}

const styles = StyleSheet.create({
    container: { flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    input2: {
        margin: 15,
        height: 50,
        borderColor: '#9197a1',
        borderWidth: 1,
        marginLeft: 0
    },
    submitBtn: {
        backgroundColor: '#4e7845',
        padding: 10,
        margin: 15,
        height: 45,
    },
    tekstBox: {
        padding: 5,
        margin: 5,
        borderColor: '#4e7845',
        borderBottomWidth: 2

    },
    textA: {
        fontSize: 18,
        marginBottom: -5,
    }

});
