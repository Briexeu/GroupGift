//lavet af Frederik Reippuert
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
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {AntDesign} from "@expo/vector-icons";
import AddPet from "./AddPet";
import Indstillinger from "./Indstillinger";

export default class userLoggedIn extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle ='                                          PetPal';

        return {headerTitle}
    }

    handleGoToSignUp = () => {
        //Når en komponent bliver mounted via navigation, får den en prop ved navn "navigation"
        this.props.navigation.navigate('SignUpForm');
    };

    handleGoToLogin = () => {
        //Når en komponent bliver mounted via navigation, får den en prop ved navn "navigation"
        navigation.navigate('LoginForm');
    };

    //render hvad der skal vises på startsiden når bruger åbner appen
    render(){
        //return <AppContainer1 />;

        return (
            <View style={styles.container}>
                <Text style ={styles.welcometitle}>Velkommen Bruger X</Text>
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
        margin: 10,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 40,
        marginBottom: 50,
    },

});
