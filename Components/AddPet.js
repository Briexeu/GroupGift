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
    Linking,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import firebase from 'firebase'
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Image from "react-native";
import FlatList from "react-native";



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
    },
        btn:{
            margin:100
        },
        Flatlist_render:{
            width:'100%'
        },
        cameraContainer: {
            // Her pakkes fælles style ud
            ...containerStyle,
            backgroundColor: '#DDF',

        },
        cameraView: {
            marginTop: 100,
            marginLeft: 10,
            marginBottom:15,
            aspectRatio: 1.2,
            width: '100%',
            height: 270
        },
        lastPhotoContainer: {
            backgroundColor: '#DFF',
            width: '100%',
            height: 130,
            margin: 0
        },
        galleryContainer: {
            ...containerStyle,
            backgroundColor: '#FDF',
            marginBottom: 100
        },
        thumbnail: {
            width: 110,
            height: 110,
            marginLeft: 140
        },thumbnail2: {
            width: 200,
            height: 200,
            margin: 10,
        },
        FlatList_image:{
            width: 200,
            height: 200,
            margin: 5
        },
        galleryView: {
            height: 150,
            width: '100%',
            flexDirection: 'row',
        },
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
        lastPhoto:null,
        hasCameraRollPermission: null,
        galleryImages: null,
        showGallery: true

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

    cameraRef = React.createRef();

    componentDidMount() {
        this.updateCameraRollPermission();
    }

    /*Få adgang til galleri*/
    updateCameraRollPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status === 'granted' });
    };

    handleSettingLink = () =>{
        Linking.openSettings()
    }

    // Hent 3 billeder fra galleriet
    handleLoadGalleryImages = async () => {
        try {
            const result =  await MediaLibrary.getAssetsAsync({first:20});
            this.setState({ galleryImages:result.assets });
        }catch (e) {
            console.log(e)
        }
    };

    renderGalleryView() {
        // Vi ingenting så længe vi venter på input fra bruger
        const { hasCameraRollPermission, galleryImages } = this.state;
        if (hasCameraRollPermission === null) {
            return <View />;
        }
        // Vis en fejlbesked og en knap til settings hvis brugeren ikke har accepteret adgang
        if (hasCameraRollPermission === false) {
            return (
                <View>
                    <Text>No access to camera roll.</Text>
                    <Button title="Go to settings" onPress={this.handleSettingLink} />
                </View>
            );
        }
        // Her looper vi igennem den liste af billeder som er modtaget fra CameraRoll
        return (
            <View>
                <Button title="Load images" onPress={this.handleLoadGalleryImages} />
                <View style={styles.galleryView}>
                    {galleryImages && (
                        <FlatList
                            horizontal
                            styles={styles.Flatlist_render}
                            data={galleryImages}
                            // Vi sender vores item, som er den enkelte user, med som prop til UserItem
                            // Vi sender også vores event handler med som prop, så UserItem ikke skal håndtere navigation
                            // this.handleSelectUser modtager en user som argument
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item.uri}}
                                    key={item.uri}
                                    style={styles.FlatList_image}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />
                    )}
                </View>
            </View>
        );
    }
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
                    <View style={styles.galleryContainer}>{this.renderGalleryView()}</View>

            </SafeAreaView>
        );
    }
}
const containerStyle = {
    padding: 5,
    borderRadius: 1,
    margin: 4,
    borderWidth: 1,
};


