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

export default class StartScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle ='Forside';

        return {headerTitle}
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
                    <Text style ={styles.welcometitle}>Velkommen til PetPal</Text>
                    <View style={styles.logoContainer}>
                        <Image style ={styles.logo}
                        source={{uri:'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAwlb3A.img?h=582&w=1119&m=6&q=60&u=t&o=f&l=f'}} />
                        <Text style={styles.buttontitle}>Her kan du logge ind eller oprette dig</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleGoToSignUp}>
                            <Text>Opret bruger</Text>
                        </TouchableOpacity>

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
