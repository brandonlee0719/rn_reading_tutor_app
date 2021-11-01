import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../../constants/colors';
import font from '../../constants/font';
import lightTheme from '../styles/themes/light-theme';
import SmallButton from './small-button';
import StaticProgressBar from './static-progress-bar';
import VolumeSlot from './volume-slot';

interface Props {
    otherStyle: object,
    title?: String,
    title1?: String,
    title2?: String,
    title3?: String,
    disabled?: boolean

}
const screenWidth = Dimensions.get('window').width

const VisualMatch = (props: Props) => {
    return (
        <View style={{ ...props.otherStyle }}>
            {
                props.disabled ?
                    <Button
                        buttonStyle={[{ height: 126, width: 200,borderRadius : 8 }, styles.buttonStyleDisabled]}

                        onPress={() => { }}
                        title={props.title}

                        titleStyle={[{ textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                        disabledTitleStyle={[{ textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                        activeOpacity={1}
                        icon = {
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
            <View style={{ marginTop: 34 }}></View>
            <StaticProgressBar
                height={8}
                width={screenWidth - 32}
                progress={40}
            ></StaticProgressBar>
            <View style={{ flexDirection: 'row', marginTop: 86, alignSelf: 'stretch', justifyContent: 'space-between', }}>
                <VolumeSlot
                    icon={
                        null
                    }
                    otherStyle={{}}
                    titleStyle={{
                        fontFamily: font.fontBold,
                        fontSize: 24,
                        color: colors.darkBlueGrey,

                    }}
                    disabledTitleStyle={{
                        fontFamily: font.fontBold,
                        fontSize: 24,
                        color: colors.superLightBlueGrey
                    }}
                    onPress={() => { }}
                    title={props.title1}
                    height={70}
                    width={104}
                    backgroundColor={colors.white}
                ></VolumeSlot>

                <VolumeSlot
                    icon={
                        null
                    }
                    otherStyle={{}}
                    titleStyle={{
                        fontFamily: font.fontBold,
                        fontSize: 24,
                        color: colors.darkBlueGrey
                    }}
                    disabledTitleStyle={{
                        fontFamily: font.fontBold,
                        fontSize: 24,
                        color: colors.superLightBlueGrey
                    }}
                    onPress={() => { }}
                    title={props.title2}
                    height={70}
                    width={104}
                    backgroundColor={colors.white}
                ></VolumeSlot>

                <VolumeSlot
                    icon={
                        null
                    }
                    otherStyle={{}}
                    onPress={() => { }}
                    titleStyle={{
                        fontFamily: font.fontBold,
                        fontSize: 24,
                        color: colors.darkBlueGrey
                    }}
                    disabledTitleStyle={{
                        fontFamily: font.fontBold,
                        fontSize: 24,
                        color: colors.superLightBlueGrey
                    }}
                    title={props.title3}
                    height={70}
                    width={104}
                    backgroundColor={colors.white}
                ></VolumeSlot>

            </View>
        </View>
    )
}

VisualMatch.defaultProps = {

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
export default VisualMatch;