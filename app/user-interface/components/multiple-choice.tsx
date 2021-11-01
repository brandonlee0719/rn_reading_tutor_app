
import React, { useState } from 'react';
import { Button, IconNode } from 'react-native-elements';
import { Dimensions, StyleSheet, View,TouchableOpacity } from 'react-native';
import LightenDarkenColor from '../../utils/lighten-darker-color';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import lightTheme from '../styles/themes/light-theme';
import colors from '../../constants/colors';
import font from '../../constants/font';
import { Image, Text } from 'react-native-animatable';

const screenWidth = Dimensions.get('window').width


interface Props {
    height: number
    width: number
    onPress: () => void
    disabled?: boolean
    focused?: boolean
    otherStyle?: object
    title?: String
    disabledTitleStyle?: object
    titleStyle?: object
}

const MultipleChoice = (props: Props) => {
    const [isPressed, setPressed] = useState(false);

    const handlePressIn = () => {

        setPressed(true);
    }

    const handlePressOut = () => {
        setPressed(false);
    }
    return (
        <Shadow
            inner
            useArt
            style={{
                shadowOffset: { width: 0, height: isPressed ? 4 : -4 },
                shadowOpacity: props.disabled ? 0 : 0.35,
                shadowColor: "#000",
                shadowRadius: 3.5,
                borderRadius: props.height / 2,
                backgroundColor: props.disabled ? 'transparent' : (isPressed ? LightenDarkenColor(props.backgroundColor, -20) : props.backgroundColor),
                width: props.width,
                height: props.height,

                overflow: 'hidden',
                alignItems: 'center',
                marginTop: 10,
                ... props.otherStyle
            }}
        >
            <TouchableOpacity
            
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={props.onPress}
                style={{ flex: 1, flexDirection: 'row', alignContent: "center" }} 
                activeOpacity={1}
                >

                <Text style={styles.subTitle}>Line one of multiple choice{"\n"}Line two if needed</Text>
                <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: colors.orange, alignSelf: 'center', marginEnd: 20 }} source={require('../../assets/images/VectorbigVol.png')}></Image>
            </TouchableOpacity>
        </Shadow>
    )

    return (
        <Shadow
            inner
            useArt
            style={{
                shadowOffset: { width: 0, height: isPressed ? 4 : -4 },
                shadowOpacity: props.disabled ? 0 : 0.35,
                shadowColor: "#000",
                shadowRadius: 3.5,

                borderRadius: props.disabled ? 16 : 8,
                backgroundColor: props.disabled ? 'transparent' : (isPressed ? LightenDarkenColor(props.backgroundColor, -20) : props.backgroundColor),
                width: props.width,
                height: props.height,
                // borderWidth: props.disabled ? 1 : 0,
                // borderColor: props.disabled ? colors.lightGrey : colors.transparent,
                overflow: 'hidden',
                ...props.otherStyle
            }}
        >
            <Button
                buttonStyle={[{ height: props.height, width: props.width }, props.disabled ? styles.buttonStyleDisabled : styles.buttonStyleEnabled]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={props.onPress}
                title={props.title}

                titleStyle={[props.titleStyle, { textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                disabledTitleStyle={[props.disabledTitleStyle, { textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                icon={props.icon}
                activeOpacity={1}
                disabledStyle={{ backgroundColor: lightTheme.disabledButtonColor }}
                disabled={props.disabled}
            />
        </Shadow>
    )
}

MultipleChoice.defaultProps = {
    height: 50,
    disabled: false,
    backgroundColor : colors.white,
    focused: false,
    title: "",
    titleStyle: {
        fontFamily: font.fontRegular,
        flex: 1,
        color: colors.navigationtitle,
        marginTop: 13,
        textAlign: 'center'
    },
    disabledTitleStyle: {
        fontFamily: font.fontRegular,
        flex: 1,
        color: colors.superLightBlueGrey,
        marginTop: 13,
        textAlign: 'center'
    }
};

const styles = StyleSheet.create({
    buttonStyleEnabled: {
        backgroundColor: 'transparent'
    },
    buttonStyleDisabled: {
        borderWidth: 0.75,
        borderColor: '#ccc'
    },
    headerTitle: {
        fontFamily: font.fontBold,
        fontSize: 22,
        // flex : 1,
        // backgroundColor : 'red',
        color: colors.darkBlueGrey,

        textAlign: 'center'
    },
    subTitle: {
        fontFamily: font.fontRegular,
        flex: 1,
        color: colors.navigationtitle,
        marginTop: 13,
        textAlign: 'center'
    }
})


export default MultipleChoice;