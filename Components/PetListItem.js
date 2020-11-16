import * as React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Button,
    Image,
    AppRegistry,
    Row,
    Modal
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center',
        paddingLeft: 10,
    },
    label: { fontWeight: '500' },
    labelTitle: { fontWeight: 'bold',},
    flatListItem: {
        color: 'black',
        padding: 5,
        fontSize: 16,
    },
    flatListDyr: {
        fontWeight: 'bold',
        fontSize: 13,
        justifyContent: 'center',
        padding: 3,
    },

});

export default class PetDetails extends React.Component {

    static navigationOptions = ({ navigation}) => {
        let headerTitle = 'Main';
        return (headerTitle)
    }
    handlePress = () => {
        // Her pakker vi ting ud fra props
        const {id, onSelect} = this.props
        // Kalder den onSelect prop vi får, med det ID vi har fået som argument.
        onSelect(id)
    };
    render() {
        const { pet } = this.props;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                <View style={{
                    flex:1,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    borderRadius: 0,
                }}>

                    {/* Her deklareres at dyre billede skal vises fra vores flatListData.js */}
                    <Image
                        source={{uri: pet.image}}
                        style={{width: 100, height: 100, margin:5}}>
                    </Image>
                    <TouchableOpacity onPress={this.handlePress}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            height: 100,
                         }}>
                        {/* Her deklareres hvad der skal vises fra vores flatlist af tekst / variable fra vores flatListData.js */}
                            <Text style={styles.flatListDyr}>{pet.title}</Text>
                            <Text style={styles.flatListItem}>Race: {pet.race}</Text>
                            <Text style={styles.flatListItem}>Alder: {pet.alder}</Text>
                            <Text style={styles.flatListItem}>Pris: {pet.price} DKK                 {pet.lokation} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
