

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
import firebase from 'firebase'
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Image from "react-native";
import FlatList from "react-native";
import {Title} from "react-native-paper";

export default class AddPet extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle ='                            Detaljer                    ';

        return {headerTitle}
    }
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
        ccName: '',
        ccEmail: '',
        ccPhone: '',


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

    handleccNameChange = text => this.setState({ ccName: text });

    handleccPhoneChange = text => this.setState({ ccPhone: text });

    handleccEmailChange = text => this.setState({ ccEmail: text });

    handleSave = () => {
        const { title, type, race, alder, gender, lokation, extra, image, price, ccEmail, ccName, ccPhone } = this.state;
        try {
            const reference = firebase
                .database()
                .ref('/Pets/')
                .push({ title, type, race, alder, gender, lokation, extra, image, price, ccName, ccPhone, ccEmail });
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
                ccName: '',
                ccEmail: '',
                ccPhone: '',

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
        const { title, type, race, alder, gender, lokation, extra, image, price, ccPhone, ccName, ccEmail} = this.state;

        return (



                <ScrollView style={{marginTop: 20}}>

                    <View style={styles.tekstBox}>
                    <Text style={styles.textA}>Udfyld venligst nedenstående felter for at tilføje dit kæledyr på markedspladsen. {"\n"}</Text>

                    {/* Navn */}
                    <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = " Navn"
                        placeholderTextColor = "#4e7845"
                        autoCapitalize = "sentences"
                        style={styles.input2}
                        value={title}
                        onChangeText={this.handleTitleChange}
                    />

                    <Text style={styles.textA}>Beskrivelse</Text>

                        {/* Beskrivelse */}
                        <TextInput
                            underlineColorAndroid = "transparent"
                            placeholder = " Fortæl os om dit kæledyr"
                            placeholderTextColor = "#4e7845"
                            autoCapitalize = "sentences"
                            style={styles.input2}
                            value={extra}
                            onChangeText={this.handleExtraChange}
                        />

                        {/* Kategori */}
                        <TextInput
                            underlineColorAndroid = "transparent"
                            placeholder = " Kategori fx. Hunt, Kat, Mus.."
                            placeholderTextColor = "#4e7845"
                            autoCapitalize = "sentences"
                            style={styles.input2}
                            value={type}
                            onChangeText={this.handleTypeChange}
                        />

                        {/* Race */}
                        <TextInput
                            underlineColorAndroid = "transparent"
                            placeholder = " Race fx. Labrador, Norsk Skovkat.."
                            placeholderTextColor = "#4e7845"
                            autoCapitalize = "sentences"
                            style={styles.input2}
                            value={race}
                            onChangeText={this.handleRaceChange}
                        />

                        {/* Race */}
                        <TextInput
                            underlineColorAndroid = "transparent"
                            placeholder = " Hvor gammel er dit kæledyr?"
                            placeholderTextColor = "#4e7845"
                            autoCapitalize = "sentences"
                            style={styles.input2}
                            value={alder}
                            onChangeText={this.handleAlderChange}
                        />

                        {/* Køn */}
                        <TextInput
                            underlineColorAndroid = "transparent"
                            placeholder = " Køn"
                            placeholderTextColor = "#4e7845"
                            autoCapitalize = "sentences"
                            style={styles.input2}
                            value={gender}
                            onChangeText={this.handleGenderChange}
                        />

                        {/* Køn */}
                        <TextInput
                            underlineColorAndroid = "transparent"
                            placeholder = " Pris DKK"
                            placeholderTextColor = "#4e7845"
                            autoCapitalize = "sentences"
                            style={styles.input2}
                            value={price}
                            onChangeText={this.handlePriceChange}
                        />

                        {/* Billede */}
                        <TextInput
                            label = "dude"
                            underlineColorAndroid = "transparent"
                            placeholder = " Billede (URL)"
                            placeholderTextColor = "#4e7845"
                            autoCapitalize = "sentences"
                            style={styles.input2}
                            value={image}
                            onChangeText={this.handleImageChange}
                        />



                </View>


                    <View style={styles.tekstBox}>
                    <Title style={{textAlign:'center'}}>Dine kontakt oplysninger</Title>

                    {/* Navn kontaktperson */}
                    <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = " Navn"
                        placeholderTextColor = "#4e7845"
                        autoCapitalize = "sentences"
                        style={styles.input2}
                        value={ccName}
                        onChangeText={this.handleccNameChange}
                    />

                    {/* Email kontaktperson */}
                    <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = " Email"
                        placeholderTextColor = "#4e7845"
                        autoCapitalize = "sentences"
                        style={styles.input2}
                        value={ccEmail}
                        onChangeText={this.handleccEmailChange}
                    />

                    {/* Tlf kontaktperson */}
                    <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = " Telefonnummer"
                        placeholderTextColor = "#4e7845"
                        autoCapitalize = "sentences"
                        style={styles.input2}
                        value={ccPhone}
                        onChangeText={this.handleccPhoneChange}
                    />

                    {/* Lokation */}
                    <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = " Lokation fx Frederiksberg, Køge.."
                        placeholderTextColor = "#4e7845"
                        autoCapitalize = "sentences"
                        style={styles.input2}
                        value={lokation}
                        onChangeText={this.handleLokationChange}
                    />

                    {/* Knappen der tilføjer dyret med de respektive felter */}

                    <TouchableOpacity
                        style = {styles.submitBtn}
                        onPress={this.handleSave}>
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 18 }}> Tilføj dyr </Text>
                    </TouchableOpacity>
                    </View>

                </ScrollView>

        );
    }
}
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
    },
    submitBtn: {
        backgroundColor: '#4e7845',
        padding: 10,
        margin: 15,
        height: 45,
    },
    inputSmall: {
        flex: 1,
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,

    },
    input2: {
        margin: 15,
        height: 50,
        borderColor: '#9197a1',
        borderWidth: 1,
        marginLeft: 0
    },
    btn:{
        margin:100
    },
    Flatlist_render:{
        width:'100%'
    },
    cameraView: {
        marginTop: 100,
        marginLeft: 10,
        marginBottom:15,
        aspectRatio: 1.2,
        width: '100%',
        height: 270
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
    tekstBox:{
        padding:5,margin:5,borderColor: '#4e7845',borderBottomWidth:2
    },
    textA: {
        fontSize: 18,
        marginBottom: -5,
    }
});


