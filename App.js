import firebase from 'firebase';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import PetList from "./Components/PetList";
import AddPet from "./Components/AddPet";
import PetDetails from "./Components/PetDetails";
import { AntDesign } from '@expo/vector-icons';
import EditPet from "./Components/EditPet";
import StartScreen from "./Components/StartScreen";
import Indstillinger from "./Components/Indstillinger";
import LoginForm from "./Components/User/LoginForm";
import SignUpForm from "./Components/User/SignUpForm";




const StackNavigator = createStackNavigator(
    {
        StartScreen: {screen: StartScreen},
        PetList: { screen: PetList },
        PetDetails: { screen: PetDetails },
        EditPet:{screen: EditPet},
        Indstillinger: { screen: Indstillinger},
        LoginForm: { screen : LoginForm },
        SignUpForm: { screen : SignUpForm },
    },
    { initialRouteKey: 'EditList' }
);

const TabNavigator = createBottomTabNavigator({
    Main: {
        screen: StackNavigator,
        navigationOptions: {
            tabBarLabel: "Forside",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name="home" size={24} color={tintColor}/>
            )
        }
    },
    Add1: {
        screen: PetList,
        navigationOptions: {
            tabBarLabel: "Oversigt",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name="user" size={24} color={tintColor}/>
            )
        },
    },
    Add2: {
        screen: AddPet,
        navigationOptions: {
            tabBarLabel: "Tilføj Nyt Dyr",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name="pluscircle" size={24} color={tintColor}/>
            )
        },
    },
    Add3: {
        screen: Indstillinger,
        navigationOptions: {
            tabBarLabel: "Indstillinger",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name="setting" size={24} color={tintColor}/>
            )
        },
    },

});

const AppContainer = createAppContainer(TabNavigator);


export default class App extends React.Component {
    state = {user:null}

    UNSAFE_componentWillMount() {

        const firebaseConfig = {
            apiKey: "AIzaSyAOV24fGQrssL2omG442QyZ_1dOLL_XTCg",
            authDomain: "projectforgroupgift.firebaseapp.com",
            databaseURL: "https://projectforgroupgift.firebaseio.com",
            projectId: "projectforgroupgift",
            storageBucket: "projectforgroupgift.appspot.com",
            messagingSenderId: "962712843146",
            appId: "1:962712843146:web:434ff602e9764fa617ce73",
            measurementId: "G-77E6TP16MG"

        };

        // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
        // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user});
        });


    }
    render() {
        const {user} = this.state

        if(!user){
            return (
                <View style={styles.container}>
                    <AppContainer />
                </View>
            )
        } else {
            return (
                <AppContainer user={user}/>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start' },
    paragraph: {

    },
});
