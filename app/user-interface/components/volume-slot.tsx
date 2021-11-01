import React, { useState } from 'react';
import { Button, IconNode } from 'react-native-elements';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import LightenDarkenColor from '../../utils/lighten-darker-color';
import { Shadow } from 'react-native-neomorph-shadows';
import lightTheme from '../styles/themes/light-theme';
import colors from '../../constants/colors';
import font from '../../constants/font';

interface Props {
    icon?: IconNode
    backgroundColor: string
    height: number
    width: number
    onPress: () => void
    disabled?: boolean
    focused?: boolean
    otherStyle?: object
    title?: string
    disabledTitleStyle?: object
    titleStyle?: object
    onLayout?: (event: LayoutChangeEvent) => void;
}

const VolumeSlot = (props: Props) => {
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
                shadowOpacity: props.focused ? 1 : 0,
                shadowColor: props.focused ? colors.orange : "#000" ,
                shadowRadius: 5,
                
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
                onLayout = {props.onLayout}
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

VolumeSlot.defaultProps = {
    height: 50,
    disabled: false,
    backgroundColor: colors.white,
    focused: false,
    title: "",
    titleStyle: {
        fontFamily: font.fontBold,
        fontSize: 40,
        color: colors.darkBlueGrey,

    },
    disabledTitleStyle: {
        fontFamily: font.fontBold,
        fontSize: 40,
        color: colors.superLightBlueGrey
    }
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


export default VolumeSlot;