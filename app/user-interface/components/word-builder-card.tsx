import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text,Animated, SectionList, SectionListData, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../../constants/colors';
import font from '../../constants/font';
import lightTheme from '../styles/themes/light-theme';
import SmallButton from './small-button';
import SquareSlot from './square-slot';
import StaticProgressBar from './static-progress-bar';
import VolumeSlot from './volume-slot';

interface Props {
    otherStyle: object,
    title?: String,

    disabled?: boolean

}
const screenWidth = Dimensions.get('window').width

const WordBuilderCard = (props: Props) => {

 
    return (
        <View style={{ ...props.otherStyle }}>

            {
                props.disabled ?
                    <Button
                        buttonStyle={[{ height: 126, width: 200, borderRadius: 8 }, styles.buttonStyleDisabled]}

                        onPress={() => { }}
                        title={props.title}

                        titleStyle={[{ textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                        disabledTitleStyle={[{ textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                        activeOpacity={1}
                        icon={
                            props.title ? <></> :
                                <Image style={{ resizeMode: 'contain', flex: 1, tintColor: props.disabled ? colors.superLightBlueGrey : colors.orange }} source={require('../../assets/images/VectorbigVol.png')}></Image>
                        }
                        disabledStyle={{ backgroundColor: lightTheme.disabledButtonColor }}
                        disabled={props.disabled}
                    />
                    :
                    <VolumeSlot
                        icon={
                            props.title ? null :
                                <Image style={{ resizeMode: 'contain', flex: 1, tintColor: props.disabled ? colors.superLightBlueGrey : colors.orange }} source={require('../../assets/images/VectorbigVol.png')}></Image>
                        }
                        otherStyle={{}}
                        
                        disabled={props.disabled}
                        onPress={() => { }}
                        title={props.title}
                        height={126}
                        width={200}
                        backgroundColor={colors.white}
                    ></VolumeSlot>
            }
            <View style={{ flexDirection: 'row', marginVertical: 24, alignSelf: 'stretch', justifyContent: 'space-between', }}>

                <SquareSlot></SquareSlot>
                <SquareSlot></SquareSlot>
                <SquareSlot></SquareSlot>
            </View>
            <StaticProgressBar
                height={8}
                width={screenWidth - 32}
                progress={40}
            ></StaticProgressBar>
            <View style={{ flexDirection: 'row', marginTop: 40, alignSelf: 'stretch', justifyContent: 'space-between', }}>
                <VolumeSlot
                    icon={
                        <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: props.disabled ? colors.superLightBlueGrey : colors.orange }} source={require('../../assets/images/VectorbigVol.png')}></Image>
                    }
                    otherStyle={{}}
                    onPress={() => { }}

                    height={70}
                    width={104}
                    backgroundColor={colors.white}
                ></VolumeSlot>

                <VolumeSlot
                    icon={
                        <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: props.disabled ? colors.superLightBlueGrey : colors.orange }} source={require('../../assets/images/VectorbigVol.png')}></Image>
                    }
                    otherStyle={{}}
                    onPress={() => { }}
                    height={70}
                    width={104}
                    backgroundColor={colors.white}
                ></VolumeSlot>

                <VolumeSlot
                    icon={
                        <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: props.disabled ? colors.superLightBlueGrey : colors.orange }} source={require('../../assets/images/VectorbigVol.png')}></Image>
                    }
                    otherStyle={{}}
                    onPress={() => { }}
                    height={70}
                    width={104}
                    backgroundColor={colors.white}
                ></VolumeSlot>

            </View>
            <View style={{ flexDirection: 'row', marginTop: 18, alignSelf: 'stretch', justifyContent: 'space-evenly', }}>
                <View style={{ width: (104 / 2) - 16 }}></View>
                <VolumeSlot
                    icon={
                        <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: props.disabled ? colors.superLightBlueGrey : colors.orange }} source={require('../../assets/images/VectorbigVol.png')}></Image>
                    }
                    otherStyle={{}}
                    onPress={() => { }}
                    height={70}
                    width={104}
                    backgroundColor={colors.white}
                ></VolumeSlot>

                <VolumeSlot
                    icon={
                        <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: props.disabled ? colors.superLightBlueGrey : colors.orange }} source={require('../../assets/images/VectorbigVol.png')}></Image>
                    }
                    otherStyle={{}}
                    onPress={() => { }}
                    height={70}
                    width={104}
                    backgroundColor={colors.white}
                ></VolumeSlot>
                <View style={{ width: (104 / 2) - 16 }}></View>


            </View>
        </View>
    )
}

WordBuilderCard.defaultProps = {

};
const styles = StyleSheet.create({
    buttonStyleEnabled: {
        backgroundColor: 'transparent'
    },
    buttonStyleDisabled: {
        borderWidth: 0.75,
        borderColor: '#ccc'
    }
})
export default WordBuilderCard;