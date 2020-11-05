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
} from 'react-native';
import firebase from 'firebase'
import TouchableOpacity from "react-native-web/src/exports/TouchableOpacity";

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
    };
    handleTitleChange = text => this.setState({ title: text });

    handleTypeChange = text => this.setState({ type: text });

    handleRaceChange = text => this.setState({ race: text });

    handleAlderChange = text => this.setState({ alder: text });

    handleGenderChange = text => this.setState({ gender: text });

    handleLokationChange = text => this.setState({ lokation: text });

    handleExtraChange = text => this.setState({ extra: text });

    handleImageChange = text => this.setState({ image: text });



    handleSave = () => {
        const { title, type, race, alder, gender, lokation, extra, image } = this.state;
        try {
            const reference = firebase
                .database()
                .ref('/Pets/')
                .push({ title, type, race, alder, gender, lokation, extra, image });
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
            });
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { title, type, race, alder, gender, lokation, extra, image } = this.state;
        return (
            <SafeAreaView style={styles.container}>
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
                        <Text style={styles.labelInfo}>Ekstra information</Text>
                        <TextInput
                            value={extra}
                            onChangeText={this.handleExtraChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelInfo}>billed</Text>
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
