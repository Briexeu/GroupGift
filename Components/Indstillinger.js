import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView, SafeAreaView
} from 'react-native';
import firebase from 'firebase';



const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    labelTitle: { fontWeight: 'bold', width: 80 },
    label: { fontWeight: 'bold', width: 120 },
    label2: { fontWeight: '500', width : 120, paddingRight :10},
    labelInfo: { fontWeight: '500', width: 120, height: 100,},
    input: { borderWidth: 1, flex: 1 },
});



export default class Indstillinger extends React.Component {

    state={
        uid:firebase.auth().currentUser.uid,
        user:firebase.auth().currentUser,
        email:firebase.auth().currentUser.email,

        password:'',
        name:'',
        gender:'',
        age:'',
        postalCode:'',
        city:'',
        error:true
    }

    handleNameChange = name => this.setState({ name });

    handleEmailChange = email => this.setState({ email });

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

        user.updateProfile({
            displayName: name,
            email: email,
            photoURL: photoUrl
        }).then(function() {
            // Update successful.
        }).catch(function(error) {
            // An error happened.
        });


    }
    handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    render()
    {
        const {uid} = this.state

        if(!uid){
            return (
                <View style={styles.container}>
                    <AppContainer />
                </View>
            )
        } else {


            const {name, email, password, age, city, gender, postalCode, error, photoURL, uid} = this.state;

            return (
                <View style={styles.container}>
                    <ScrollView>

                        <View style={styles.row}>
                            <Text style={styles.labelTitle}>Navn: </Text>
                            <TextInput
                                value={name}
                                onChangeText={this.handleNameChange}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Email: </Text>
                            <TextInput
                                value={email}
                                onChangeText={this.handleEmailChange}
                                style={styles.input}
                            />
                        </View>


                        <View style={styles.row}>
                            <Text style={styles.labelTitle}>Password: </Text>
                            <TextInput
                                value={password}
                                onChangeText={this.handlePasswordChange}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Alder: </Text>
                            <TextInput
                                value={age}
                                onChangeText={this.handleAgeChange}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>By: </Text>
                            <TextInput
                                value={city}
                                onChangeText={this.handleCityChange}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Køn: </Text>
                            <TextInput
                                value={gender}
                                onChangeText={this.handleGenderChange}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Postnummer: </Text>
                            <TextInput
                                value={postalCode}
                                onChangeText={this.handlePostalcodeChange}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Billede: </Text>
                            <TextInput
                                value={photoURL}
                                onChangeText={this.handleImageChange}
                                style={styles.input}
                            />
                        </View>


                        <Button title="Tryk for at opdatere info" onPress={this.updateData}/>

                        <Button title="Log ud" onPress={this.handleLogOut}/>

                    </ScrollView>
                </View>
            );

        }
    }
}
