//Lavet af Magnus Espensen

import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView, SafeAreaView
} from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    labelTitle: { fontWeight: 'bold', width: 80 },
    label: { fontWeight: 'bold', width: 120 },
    label2: { fontWeight: '500', width : 120, paddingRight :10},
    labelInfo: { fontWeight: '500', width: 120, height: 100,},
    input: { borderWidth: 1, flex: 1 },
});



export default class EditPet extends React.Component {
    state = {
        title: '',
        type: '',
        race: '',
        alder: '',
        gender: '',
        lokation: '',
        extra: '',
        image: '',
        price: '',
    };

    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        this.loadPet(id);
    }

    // Her loader vi Petets data ud fra det ID vi får med fra navigationen
    loadPet = id => {
        firebase
            .database()
            .ref(`/Pets/${id}`)
            .once('value', dataObject => {
                const pet = dataObject.val();
                const { title, type, race, alder, gender, lokation, extra, image, price } = pet;
                this.setState({ title, type, race, alder, gender, lokation, extra, image, price  });
            });
    };

    handleTitleChange = text => this.setState({ title: text });

    handleTypeChange = text => this.setState({ type: text });

    handleRaceChange = text => this.setState({ race: text });

    handleAlderChange = text => this.setState({ alder: text });

    handleGenderChange = text => this.setState({ gender: text });

    handleLokationChange = text => this.setState({ lokation: text });

    handleExtraChange = text => this.setState({ extra: text });

    handleImageChange = text => this.setState({ image: text });

    handlePriceChange = text => this.setState({ price: text });



    updateData = () => {
        // Vi bruger this.props.navigation flere steder så vi pakker den ud én gang for alle
        const { navigation } = this.props;
        const { title, type, race, alder, gender, lokation, extra, image, price } = this.state;
        const id = navigation.getParam('id');
        try {
            firebase
                .database()
                .ref(`/Pets/${id}`)
                // Vi bruger update, så kun de felter vi angiver, bliver ændret
                .update({ title, type, race, alder, gender, lokation, extra, image, price  });
            // Når pettet er ændret, går vi tilbage.
            Alert.alert("Din info er nu opdateret");
            navigation.goBack();
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { title, type, race, alder, gender, lokation, extra, image, price } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={styles.labelTitle}>Titel*</Text>
                        <TextInput
                            value={title}
                            onChangeText={this.handleTitleChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Type af dyr*</Text>
                        <TextInput
                            value={type}
                            onChangeText={this.handleTypeChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Race*</Text>
                        <TextInput
                            value={race}
                            onChangeText={this.handleRaceChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Alder*</Text>
                        <TextInput
                            value={alder}
                            onChangeText={this.handleAlderChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Køn*</Text>
                        <TextInput
                            value={gender}
                            onChangeText={this.handleGenderChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Lokation*</Text>
                        <TextInput
                            value={lokation}
                            onChangeText={this.handleLokationChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Pris*</Text>
                        <TextInput
                            value={price}
                            onChangeText={this.handlePriceChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelInfo}>Ekstra information</Text>
                        <TextInput
                            value={extra}
                            onChangeText={this.handleExtraChange}
                            style={styles.input}
                        />
                    </View>
                    <Button title="Tryk for at opdatere info" onPress={this.updateData} />
                </ScrollView>
            </View>
        );
    }
}
