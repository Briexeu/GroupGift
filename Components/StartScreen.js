import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    ActivityIndicator,
    FlatList,
    ScrollView,
    Button,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import Onboarding from "react-native-onboarding-swiper";


export default class StartScreen extends React.Component {

    static navigationOptions = {
        title: 'StartPage'
    }

    handleGoToSignUp = () => {
        //Når en komponent bliver mounted via navigation, får den en prop ved navn "navigation"
        this.props.navigation.navigate('SignUpForm');
    };

    handleGoToLogin = () => {
        //Når en komponent bliver mounted via navigation, får den en prop ved navn "navigation"
        this.props.navigation.navigate('LoginForm');
    };

    //render hvad der skal vises på startsiden når bruger åbner appen
    render(){
        return (
                <View style={styles.container}>
                    <Text style ={styles.welcometitle}>Welcome to PETPAL</Text>
                    <View style={styles.logoContainer}>

                        <Text style={styles.buttontitle}>Here you can sign up or login</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleGoToSignUp}>
                            <Text>Go to Sign up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleGoToLogin}>
                            <Text>Go to Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}

//styling af de forskellige componenter
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    },

    welcometitle:{
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 35,
        color: '#FFF',
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',

    },
    logo: {
        width: 300,
        height: 300,
        opacity: 0.9,

    },

    buttontitle:{
        textAlign: 'center',
        width: 160,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF',
    },

    buttonContainer:{
        alignContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 20,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 200,
        color: '#FFF',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },

});
