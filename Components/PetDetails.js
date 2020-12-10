//Denne komponent er udarbejdet af Sebastian

import * as React from 'react';
import {View, Text, Platform, FlatList, StyleSheet, Button, Alert, TouchableOpacity, ActivityIndicator, Image, ScrollView} from 'react-native';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import UserItem from './Api/UserItem';
import {Title} from "react-native-paper";
import NavigationBar from 'react-native-navbar-color'

const USERS_URL = 'https://randomuser.me/api?results=1';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

export default class PetDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let headerTitle ='                            Detaljer                    ';

        return {headerTitle}
    }
    state = {
        pet: null,
        users: null,
        isLoading: false,
        error: null,
    };

    loadPet = id => {
        firebase
            .database()
            // ID fra funktionens argument sættes ind i stien vi læser fra
            .ref(`/Pets/${id}`)
            .on('value', test => {
                this.setState({ pet: test.val() });
            });
    };

    componentDidMount() {
        // Vi udlæser ID fra navgation parametre
        const id = this.props.navigation.getParam('id');
        this.loadPet(id);


        this.loadUserProfiles();
    }

    // Vi håndterer at loading er startet
    startLoading = () => this.setState({ isLoading: true });

    // Vi håndterer at loading er afslutttet
    stopLoading = () => this.setState({ isLoading: false });

    // Vi sætter en fejlbesked
    setError = message => this.setState({ error: message });

    // Vi fjerner en fejlbesked
    clearError = () => this.setState({ error: null });

    // Her loades listen af users fra den angivne URL og vi fortolker JSON data og opdaterer state
    // Samtidig håndteres fejl og indikation af at vi er ved at loade data.
    loadUserProfiles = async () => {
        try {
            this.startLoading();
            const response = await fetch(USERS_URL);
            const json = await response.json();
            console.log('json response from network', json);
            this.setState({ users: json.results });
            this.stopLoading();
            this.clearError();
        } catch (error) {
            this.stopLoading();
            this.setError(error.message);
        }
    };

    handleSelectUser = user => {
        // Vi navigerer til UserProfile skærmen og sender den modtagne user med som argument
        this.props.navigation.navigate('UserProfile', { user });
    };


    handleEdit = () => {
        // Vi navigerer videre til EditPet skærmen og sender ID med
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        navigation.navigate('EditPet', { id });
    };

    confirmDelete = () => {
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Er du sikker?', 'Vil du gerne slette dette dyr?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: this.handleDelete },
            ]);
        } else {
            // Vi spørger brugeren om han er sikker
            if(confirm('Er du sikker på du vil slette dette dyr?')){
                this.handleDelete()
            }
        }
    };

    // Vi sletter det aktuelle pet
    handleDelete = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        try {
            firebase
                .database()
                // Vi sætter pettets ID ind i stien
                .ref(`/Pets/${id}`)
                // Og fjerner data fra den sti
                .remove();
            // Og går tilbage når det er udført
            navigation.navigate('PetList')
        } catch (error) {
            Alert.alert(error.message);
        }

    };


    render() {
        const  { pet } = this.state;
        const { isLoading, users, error } = this.state;



        if(!pet) {
            return <Text>Error</Text>;
        }
        return (
            <ScrollView style={{flex: 1}}>

                {/* Her laves velkomst, titel + billede vedr. kæledyret */}
                <View style={styles.petBox}>
                    <Image
                        source={{uri: pet.image}}
                        style={{width: '100%', height: 250}}>
                    </Image>
                    <Title style={styles.titlePet}>Sig hej til {pet.title} 👋</Title>
                    <Text style={styles.textDescription}>{pet.extra}</Text>
                </View>

                {/* Her laves afsnittet om praktiske information vedr. kæledyret */}
                <View style={styles.petBox}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Type</Text>
                        <Text style={styles.value}>{pet.type}</Text>
                    </View>


                    <View style={styles.row}>
                        <Text style={styles.label}>Race</Text>
                        <Text style={styles.value}>{pet.race}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Køn</Text>
                        <Text style={styles.value}>{pet.gender}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Alder</Text>
                        <Text style={styles.value}>{pet.alder}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Pris</Text>
                        <Text style={styles.value}>{pet.price} DKK</Text>
                    </View>

                </View>

                {/* Her laves kontakt kortet / information på sælger*/}
                <View style={styles.petBoxContact}>
                    <Title style={styles.titlePet}>Kontakt information</Title>

                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardContent}>
                            <Image style={[styles.image, styles.imageContent]} source={{uri: "https://bootdey.com/img/Content/avatar/avatar6.png"}}/>
                            <Text style={styles.name}>{pet.ccName}</Text>
                        </View>
                        <View style={[styles.cardContent, styles.tagsContent]}>
                            <Text style={styles.value}>{pet.lokation} </Text>
                        </View>
                        <View style={[styles.cardContent, styles.tagsContent]}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.value}>{pet.ccEmail}</Text>
                        </View>
                        <View style={[styles.cardContent, styles.tagsContent]}>
                            <Text style={styles.label}>Telefon:</Text>
                            <Text style={styles.value}> {pet.ccPhone}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                {/* Hvis der er fejl, dvs. state.error er sat, viser vi fejlen
                {error && <Text style={styles.error}>Error: {error}</Text>}
                <Button title="Rediger" onPress={this.handleEdit} />
                <Button title="Slet" onPress={this.handleDelete} />
                */}
            </ScrollView>

        );
    }
}
//Styling af diverse
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: {
        width: 70, fontWeight: 'bold'
    },
    value: {
        flex: 1
    },
    titlePet: {
        padding:5,textAlign:'center'
    },
    textDescription: {
        fontSize: 16,
        margin: 10,
    },
    petBox:{
        padding:5,margin:5,borderColor: '#4e7845',borderBottomWidth:2
    },
    petBoxContact:{
        padding:5,margin:5
    },
    card: {
        height:null,
        paddingTop:10,
        paddingBottom:10,
        marginTop:5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        borderTopWidth:40,
        borderColor: "#4e7845",
        marginBottom:20,
    },
    cardContent:{
        flexDirection:'row',
        marginLeft:10,
    },
    imageContent:{
        marginTop:-40,
    },
    tagsContent:{
        marginTop:10,
        flexWrap:'wrap'
    },
    image:{
        width:60,
        height:60,
        borderRadius:30,
    },
    name:{
        fontSize:20,
        fontWeight: 'bold',
        marginLeft:10,
        alignSelf: 'center'
    },


});
