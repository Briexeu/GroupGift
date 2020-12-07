//Lavet af Magnus Espensen
import * as React from 'react';
import {View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';




const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Næste</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Færdig</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("LoginForm")}
            onDone={() => navigation.replace("LoginForm")}

            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../assets/PetPalLogo.png')} />,
                    title: 'Velkommen til PetPal',
                    subtitle: 'Den sikreste måde at få et nyt kæledyr',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../assets/sadDog.png')} />,
                    title: 'Ingen forsømte kæledyr',
                    subtitle: 'Vi vil bekæmpe trenden med at kæledyr bliver forsømt',
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source={require('../assets/verifieduser.png')} />,
                    title: 'Bliv en verificeret bruger',
                    subtitle: "Vi har en verifications process så alle er godkendte til at handle hos os!",
                },
            ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
