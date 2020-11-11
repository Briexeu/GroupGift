import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import firebase from 'firebase'


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
    informationText: {
        fontSize: 18,
        marginLeft: 5,
        marginTop: 5,
    },
    inputLarge: {
        flex: 1,
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        placeholderTextColor: 'gray',
    },
    inputSmall: {
        flex: 1,
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        placeholderTextColor: 'gray',
    }

});

export default class AddPet extends React.Component {
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
    handleTitleChange = text => this.setState({ title: text });

    handleTypeChange = text => this.setState({ type: text });

    handleRaceChange = text => this.setState({ race: text });

    handleAlderChange = text => this.setState({ alder: text });

    handleGenderChange = text => this.setState({ gender: text });

    handleLokationChange = text => this.setState({ lokation: text });

    handleExtraChange = text => this.setState({ extra: text });

    handleImageChange = text => this.setState({ image: text });

    handlePriceChange = text => this.setState({ price: text });

    /*handleChoosePhoto = () => {
        ImagePicker.launchImageLibrary(options, response => {
            consolge.log("response", response);
        })
    }

     */

    handleSave = () => {
        const { title, type, race, alder, gender, lokation, extra, image, price } = this.state;
        try {
            const reference = firebase
                .database()
                .ref('/Pets/')
                .push({ title, type, race, alder, gender, lokation, extra, image, price });
            Alert.alert(`Saved`);
            this.setState({
                title:'',
                type:'',
                race: '',
                alder: '',
                gender: '',
                lokation: '',
                extra: '',
                image: '',
                price: '',
            });
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { title, type, race, alder, gender, lokation, extra, image, price,} = this.state;

        return (
            <SafeAreaView style={styles.container}>

                <View style={{marginTop: 15}}>
                    <Text style={styles.informationText}>
                        Du er godt på vej til at finde et nyt hjem til dit kældedyr. Vi anbefaler at du udfylder så beskrivende som muligt, da dette forøger dine chancer
                        for at finde et nyt hjem til dit kæledyr.
                    </Text>

                </View>
                <ScrollView style={{marginTop: 20}}>
                    <View style={styles.row}>
                        <Text style={styles.labelInfo}>Navn</Text>
                        <TextInput
                            value={title}
                            onChangeText={this.handleTitleChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelInfo}>Beskrivelse</Text>
                        <TextInput
                            value={extra}
                            onChangeText={this.handleExtraChange}
                            style={styles.input}
                        />

                    </View>

                    <View style={styles.row}>
                        <Text style={styles.labelInfo}>Kategori</Text>
                        <TextInput
                            value={type}
                            onChangeText={this.handleTypeChange}
                            style={styles.input}
                            placeholder='Fx Hund, Kat..'
                            placeholderTextColor='grey'
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.labelInfo}>Race</Text>
                        <TextInput
                            value={race}
                            onChangeText={this.handleRaceChange}
                            style={styles.input}
                       />
                    </View>
                                        <View style={styles.row}>
                        <Text style={styles.labelInfo}>Alder</Text>
                        <TextInput
                            value={alder}
                            onChangeText={this.handleAlderChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelInfo}>Køn</Text>
                        <TextInput
                            value={gender}
                            onChangeText={this.handleGenderChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelInfo}>Lokation</Text>
                        <TextInput
                            value={lokation}
                            onChangeText={this.handleLokationChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelInfo}>Pris</Text>
                        <TextInput
                            value={price}
                            onChangeText={this.handlePriceChange}
                            style={styles.input}
                            placeholder='DKK'
                            placeholderTextColor='grey'
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelInfo}>Billede</Text>
                        <TextInput
                            value={image}
                            onChangeText={this.handleImageChange}
                            style={styles.input}
                        />
                    </View>
                    <Button title="Tilføj Dyr" onPress={this.handleSave} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}
