//lavet af Frederik Reippuert
import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator, TouchableOpacity} from "react-native";
import {StatusBar} from "expo-status-bar";
import * as firebase from "firebase";
import * as React from "react";
import PetList from "../PetList";



export default class LoginForm extends React.Component{
    static navigationOptions = ({ navigation }) => {
        let headerTitle ='Login';
        return {headerTitle}
    }
    //opretter states og sætter en default værdi
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
        user: null,
    };
    //funktioner der sætter states til en default value
    startLoading = () => this.setState({ isLoading: true });
    endLoading = () => this.setState({ isLoading: false });
    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });

    //funktion der gør at man kan sætte email og password
    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => this.setState({ password });


//funktion der laver asykront kald til db og submitter
    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({ isCompleted: true, user: true})
            this.props.navigation.navigate('MainMenu')

        } catch (error) {
            this.setError(error.message);
            this.endLoading();
        }
    };

    GoToForgotPassword = async () => {
        this.props.navigation.navigate('PasswordReset')

    };

    //funktion der laver asykront kald til db og submitter
    handleCreateUser = async () => {
        this.props.navigation.navigate('SignUpForm')
    };
    //render der bestemmer hvad der skal vises når brugeren kommer ind på siden.
    render(){
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            this.props.navigation.navigate('UserLoggedIn')
        }
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Text style ={styles.welcometitle}>Login </Text>

                <TextInput placeholder ="Email"
                           value={email}
                           onChangeText={this.handleChangeEmail}
                           placeholderTextColor ="#ecf0f1"
                           returnKeyType= "next"
                           onSubmitEditing={()=> this.passwordInput.focus()}
                           keyboardType="email-address"
                           style={styles.input}/>
                <TextInput placeholder ="Password"
                           value={password}
                           secureTextEntry
                           onChangeText={this.handleChangePassword}
                           placeholderTextColor ="#ecf0f1"
                           returnKeyType= "go"
                           ref={(input)=> this.passwordInput = input}
                           style={styles.input}/>
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage}</Text>
                )}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleSubmit}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleCreateUser}>
                        <Text>Opret dig som sælger</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.GoToForgotPassword}>
                        <Text>Glemt password?</Text>
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
        width: 250,
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
        padding: 10,
        margin: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        color: '#FFF',
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 40,
        marginBottom: 20,
        textAlign: 'center',
    },




})
