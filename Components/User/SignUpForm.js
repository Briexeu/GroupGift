//lavet af Frederik Reippuert
import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Alert, TouchableOpacity} from "react-native";
import * as React from "react";
import * as firebase from "firebase";



export default class SignUpForm extends React.Component{
    static navigationOptions = ({ navigation }) => {
        let headerTitle ='Opret Ny Bruger!';

        return {headerTitle}
    }
    //opretter states og sætter en default værdi
    state = {
        email: '',
        password: '123456',
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
        const {email, password} = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({ isCompleted: true });
            Alert.alert('Du har nu oprettet dig som bruger')
            this.props.navigation.navigate('LoginForm')
        } catch (error) {
            // Vi sender `message` feltet fra den error der modtages, videre.
            this.setError(error.message);
            this.endLoading();
        }
    };
    //render der bestemmer hvad der skal vises når brugeren kommer ind på siden.
    render = () => {
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text>You are now signed up</Text>;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.welcometitle}>Opret dig som bruger for at bruge PetPal!</Text>
                <TextInput
                    placeholder ="Email"
                    value={email}
                    onChangeText={this.handleChangeEmail}
                    placeholderTextColor = "#ecf0f1"
                    returnKeyType= "next"
                    onSubmitEditing={()=> this.passwordInput.focus()}
                    keyboardType="email-address"
                    style={styles.input}
                />
                {/* <TextInput
                    placeholder ="Password"
                    value={password}
                    onChangeText={this.handleChangePassword}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor ="#ecf0f1"
                    ref={(input)=> this.passwordInput = input}
                    returnKeyType= "go"
                />*/}
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage}</Text>
                )}
                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleSubmit}>
                        <Text>Opret</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    };
    //knap der bestemmer hvad der skal ske når der trykkes Sign up.
    signUpButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator/>;
        }
        return <Button onPress={this.handleSubmit} title="Sign up"/>;
    };
}


//styling af de forskellige komponenter
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#4e7845',

    },


    error: {
        color: 'red',
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
        flexDirection: "row",
        marginBottom: 20,
    },

});
