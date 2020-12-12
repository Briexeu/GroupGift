//lavet af Frederik Reippuert
import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator, TouchableOpacity} from "react-native";
import {StatusBar} from "expo-status-bar";
import * as firebase from "firebase";
import * as React from "react";



export default class LoginForm extends React.Component{
    static navigationOptions = ({ navigation }) => {
        let headerTitle ='Login';
        return {headerTitle}
    }
    //opretter states og sætter en default værdi
    state = {
        email: '',
        errorMessage: null,
    };


    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });

    //funktion der gør at man kan sætte email og password
    handleChangeEmail = email => this.setState({ email });

    handlePasswordReset2 =  (email) => {
        firebase.auth().sendPasswordResetEmail(email);

    };
    handleGoBack = async () => {
        this.props.navigation.popToTop();
    }


//funktion der laver asykront kald til db og submitter
    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({ isCompleted: true, user: true});
            this.props.navigation.navigate('UserLoggedIn')

        } catch (error) {
            this.setError(error.message);
            this.endLoading();
        }
    };

    //funktion der laver asykront kald til db og submitter
    handleCreateUser = async () => {
        this.props.navigation.navigate('SignUpForm')
    };
    //render der bestemmer hvad der skal vises når brugeren kommer ind på siden.
    render(){
        const { errorMessage, email } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Text style ={styles.welcometitle}>Har du glemt din kode? Reset her</Text>

                <TextInput placeholder ="Email"
                           value={email}
                           onChangeText={this.handleChangeEmail}
                           placeholderTextColor ="#ecf0f1"
                           returnKeyType= "next"
                           onSubmitEditing={()=> this.passwordInput.focus()}
                           keyboardType="email-address"
                           style={styles.input}/>
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage}</Text>
                )}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handlePasswordReset2(email)}>
                        <Text>Reset kode!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleGoBack}>
                        <Text>Gå Tilbage</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

//styling af koomponenterne på siden
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#4e7845',

    },
    input: {
        height: 40,
        width: 200,
        backgroundColor: '#16a085',
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    welcometitle:{
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF',
    },
    buttonContainer:{
        alignContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 100,
        color: '#FFF',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 40,
        marginBottom: 20,
        textAlign: 'center',
    },




})
