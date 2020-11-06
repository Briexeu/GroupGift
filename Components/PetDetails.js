import * as React from 'react';
import {View, Text, Platform, FlatList, StyleSheet, Button, Alert, ActivityIndicator, Image} from 'react-native';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import Constants from 'expo-constants';
import UserItem from './Api/UserItem';
import {Title} from "react-native-paper";

const USERS_URL = 'https://randomuser.me/api?results=1';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

//styling
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
    titlePet: {
        alignContent: 'center',
        marginLeft: 150,
        marginBottom: 20,

    },
    textDescription: {
        fontSize: 14,

    }
});

export default class CarDetails extends React.Component {
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
            <View style={styles.container}>
                <View style={styles.titlePet}>
                    <Title style={styles.value}>{pet.title}</Title>
                </View>

                {/* billede ind her */}

                <View style={styles.titlePet}>
                    <Image
                        source={{uri: pet.image}}
                        style={{width: 100, height: 100, margin:5}}>
                    </Image>
                </View>
                <View style={styles.textDescription}>
                    <Text style={styles.value}>{pet.extra}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Type</Text>
                    <Text style={styles.value}>{pet.type}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Race</Text>
                    <Text style={styles.value}>{pet.race}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Alder</Text>
                    <Text style={styles.value}>{pet.alder}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Køn</Text>
                    <Text style={styles.value}>{pet.gender}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Lokation</Text>
                    <Text style={styles.value}>{pet.lokation}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Pris</Text>
                    <Text style={styles.value}>{pet.price} DKK</Text>
                </View>
                {/* Hvis state.isLoading er true, viser vi en spinner */}
                {isLoading && <ActivityIndicator />}
                {/* Hvis state.users er sat, viser vi listen af users */}
                {users && (
                    <FlatList
                        data={users}
                        // Vi sender vores item, som er den enkelte user, med som prop til UserItem
                        // Vi sender også vores event handler med som prop, så UserItem ikke skal håndtere navigation
                        // this.handleSelectUser modtager en user som argument
                        renderItem={({ item }) => (
                            <UserItem user={item} onSelect={this.handleSelectUser} />
                        )}
                        keyExtractor={item => item.login.uuid}
                    />
                )}
                {/* Hvis der er fejl, dvs. state.error er sat, viser vi fejlen */}
                {error && <Text style={styles.error}>Error: {error}</Text>}
                <Button title="Rediger" onPress={this.handleEdit} />
                <Button title="Slet" onPress={this.handleDelete} />
            </View>

        );



    }
}
