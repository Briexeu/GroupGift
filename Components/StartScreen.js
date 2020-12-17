//lavet af Frederik Reippuert
import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class StartScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle ='                                          PetPal';
        let tabBarVisible= false;

        return {headerTitle, tabBarVisible}
    }

    handleGoToSignUp = () => {
        //Når en komponent bliver mounted via navigation, får den en prop ved navn "navigation"
        this.props.navigation.navigate('SignUpForm');
    };

    handleGoToLogin = () => {
        //Når en komponent bliver mounted via navigation, får den en prop ved navn "navigation"
        this.props.navigation.navigate('LoginForm');
    };
    handleGoToPetList = () => {
        //Når en komponent bliver mounted via navigation, får den en prop ved navn "navigation"
        this.props.navigation.navigate('PetListTwo');
    };

    //render hvad der skal vises på startsiden når bruger åbner appen
    render(){
        return (
                <View style={styles.container}>

                    <View style={styles.box}>
                    <Text style ={styles.welcometitle}>Velkommen til PetPal</Text>
                    <View style={styles.logoContainer}>
                        <Image style ={styles.logo}
                               source={require('../assets/PetPalLogo.png')} />
                        <Text style={styles.buttontitle}>Log ind eller opret dig for at se alle vores dyr!</Text>
                    </View>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleGoToLogin}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                        <Text styles={{}}>Eller</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleGoToPetList}>
                            <Text>Find dit næste kæledyr her</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
        )
    }
}

//styling af de forskellige componenter
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4e7845',
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

    box: {
        padding:10,
        margin:10
    },

    buttontitle:{
        textAlign: 'center',
        width: 160,
        marginTop: 5,
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
        margin: 10,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 200,
        color: '#FFF',
        borderWidth: 1,
        margin: 5,
        padding: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 40,
        marginBottom: 20,
    },

});
