//Lavet af Magnus Espensen
import firebase from 'firebase';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator} from "react-navigation";
import PetList from "./Components/PetList";
import AddPet from "./Components/AddPet";
import PetDetails from "./Components/PetDetails";
import { AntDesign } from '@expo/vector-icons';
import EditPet from "./Components/EditPet";
import Indstillinger from "./Components/Indstillinger";
import LoginForm from "./Components/User/LoginForm";
import SignUpForm from "./Components/User/SignUpForm";
import PasswordReset from "./Components/User/PasswordReset";
import StartScreen from "./Components/StartScreen";
import UserLoggedIn from "./Components/UserLoggedIn";
import userLoggedIn from "./Components/UserLoggedIn";


const LoginNavigator = createStackNavigator(
    {
        UserLoggedIn: { screen: userLoggedIn},
        StartScreen: { screen: StartScreen},
        LoginForm: { screen : LoginForm },
        SignUpForm: { screen : SignUpForm },
        PasswordReset: { screen: PasswordReset},
    },
    {
        initialRouteName: 'StartScreen', headerMode: 'none'
    }
)

const StackNavigator = createStackNavigator(
    {
        PetList: { screen: PetList },
        PetDetails: { screen: PetDetails },
        EditPet:{screen: EditPet},
        AddPet:{screen: AddPet},


    },
    { initialRouteKey: 'EditList' }
);

const TabNavigator = createBottomTabNavigator({
    Main: {
        screen: UserLoggedIn,
        navigationOptions: {
            tabBarLabel: "Forside",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name="home" size={24} color={tintColor}/>
            )
        }
    },
    Add1: {
        screen: StackNavigator,
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

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        MainMenu: TabNavigator,
        Login: LoginNavigator,

    },
    {
        initialRouteName:'Login'
    }
));

export default class App extends React.Component {
    state = {user:null}

    UNSAFE_componentWillMount() {

        const firebaseConfig = {
            apiKey: "AIzaSyA5B-q7rhRl6W7ncIItMofJ5sNVrhOm-7g",
            authDomain: "groupgift-v2.firebaseapp.com",
            databaseURL: "https://groupgift-v2.firebaseio.com",
            projectId: "groupgift-v2",
            storageBucket: "groupgift-v2.appspot.com",
            messagingSenderId: "630041584773",
            appId: "1:630041584773:web:6e3b193f06e0feb2b075ec",
            measurementId: "G-5X5CXH2QFZ"

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
        return (
            <AppContainer />
            )
        }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start' },
    paragraph: {

    },
});
