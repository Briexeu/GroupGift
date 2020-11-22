//Denne komponent er udarbejdet af Sebastian

import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';
import firebase from 'firebase';

import PetListItem from './PetListItem';

export default class PetList extends React.Component {
    state = {
        pets: {},
    };
    static navigationOptions = ({ navigation }) => {
        let headerTitle ='                                           Feed                    ';

        return {headerTitle}
    }
    componentDidMount() {
        firebase
            .database()
            .ref('/Pets')
            .on('value', snapshot => {
                this.setState({ pets: snapshot.val() });
            });
    }

    handleSelectPet = id => {
        this.props.navigation.navigate('PetDetails', { id });

    };
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 10,
                    width: "100%",
                    backgroundColor: "#e5e5e5",
                }}
            />
        );
    };

    render() {
        const { pets } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!pets) {
            return null;
        }
        // Flatlist forventer et array. Derfor tager vi alle values fra vores pets objekt, og bruger som array til listen
        const petArray = Object.values(pets);
        // Vi skal også bruge alle IDer, så vi tager alle keys også.
        const petKeys = Object.keys(pets);
        return (
            <View>
                <FlatList
                    style={{borderTopWidth: 0, borderBottomWidth: 0}}
                    data={petArray}
                    ItemSeparatorComponent ={this.renderSeparator}
                    // Vi bruger petKeys til at finde ID på den aktuelle pet og returnerer dette som key, og giver det med som ID til PetListItem
                    keyExtractor={(item, index) => petKeys[index]}
                    renderItem={({ item, index }) => (
                        <PetListItem
                            pet={item}
                            id={petKeys[index]}
                            onSelect={this.handleSelectPet}
                        />
                    )}
                />
            </View>
        );
    }
}
