//lavet af Frederik Reippuert
import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator} from "react-native";
import {StatusBar} from "expo-status-bar";
import * as firebase from "firebase";
import * as React from "react";



export default class LoginForm extends React.Component{
    //opretter states og sætter en default værdi
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
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
            this.setState({ isCompleted: true });
            this.props.navigation.navigate('PetList')
        } catch (error) {
            this.setError(error.message);
            this.endLoading();
        }
    };
    //render der bestemmer hvad der skal vises når brugeren kommer ind på siden.
    render(){
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text>Du er nu logget ind</Text>
        }
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Text>Login - Klar til at kigge på nogen søde kæledyr?</Text>
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
                {this.renderButton()}
                {this.renderButton2()}
                {this.renderButton3()}
            </View>
        )
    }
    //knap der bestemmer hvad der skal ske når der trykkes Login.
    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.handleSubmit} title="Login" />;
    };
    renderButton2 = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.handleSubmit} title="Opret Bruger!" />;
    };
    renderButton3 = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.handleSubmit} title="Glemt Password?" />;
    };
}

//styling af koomponenterne på siden
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    input: {
        height: 40,
        width: 200,
        backgroundColor: '#16a085',
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
})
