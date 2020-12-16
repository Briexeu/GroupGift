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

    handleGoToPets = () => {
        //Når en komponent bliver mounted via navigation, får den en prop ved navn "navigation"
        this.props.navigation.navigate('PetList');
    };

    //render hvad der skal vises på startsiden når bruger åbner appen
    render(){
        return (
            <View style={styles.mainBody}>

                <Image style={styles.img} source={{uri: 'https://previews.123rf.com/images/stockgiu/stockgiu1904/stockgiu190411284/120479566-cute-funny-pets-cartoon.jpg'}}/>

                <Text style={styles.titleS}>
                    FIND DIN {"\n"} NYE BEDSTEVEN {"\n"} I DAG
                </Text>

                <TouchableOpacity style={styles.btnClick} onPress={this.handleGoToPets}>
                    <Text style={styles.textBtn}>Ja tak!</Text>
                </TouchableOpacity>

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


    mainBody: {
        marginTop: 30,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 70,
    },
    img: {
        width: 300,
        height: 290,
        marginLeft: 25,
        marginTop: 40,
    },
    titleS: {
        textAlign: 'center',
        fontSize: 32,
        lineHeight: 55,
        marginTop: 20,
        color: '#3E4993',
    },
    btnClick: {
        width: 240,
        height: 45,
        borderRadius: 200,
        backgroundColor: "green",
        marginTop: 20,
        marginLeft: 70,

    },
    textBtn: {
        color: 'white',
        fontSize: 18,
        marginTop: 7,
        fontWeight: "bold",
        textAlign: "center",
        width: 240,
    }

});
