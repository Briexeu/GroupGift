import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView, SafeAreaView, TouchableOpacity, Image
} from 'react-native';
import firebase from 'firebase';
import {Title} from "react-native-paper";



export default class Indstillinger extends React.Component {
    state={
        uid:firebase.auth().currentUser.uid,
        user:firebase.auth().currentUser,
        email:firebase.auth().currentUser.email,

        password: '',
        name:'',
        gender:'',
        age:'',
        postalCode:'',
        city:'',
        error:true
    }


    handleNameChange = name => this.setState({ name });

    handleEmailChange = email => this.setState({ email });

    handlePasswordChange = password => this.setState( {password});

    handleImageChange = image => this.setState({ image });




    loadUser = async () =>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
            } else {
                // No user is signed in.
            }
        });

    }

    /*For ikke at logge ud efter email update køres denne funktion*/
    reauthenticate = (currentPassword) => {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(credential);
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
        await firebase.auth().signOut();
        this.navigator='LoginForm';
    };

    render(){
        const user=firebase.auth().currentUser;
        const {uid} = this.state


            if (!uid) {
                return (
                    <View style={styles.container}>
                        <AppContainer/>
                    </View>
                )
            } else {


                const {name, email, password, age, city, gender, postalCode, error, photoURL, uid} = this.state;

                return (



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
