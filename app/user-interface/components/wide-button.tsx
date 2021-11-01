import React, { useState } from 'react';
import { Button, IconNode } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import LightenDarkenColor from '../../utils/lighten-darker-color';
import * as Animatable from 'react-native-animatable'
import VolumeSlot from './volume-slot';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import colors from '../../constants/colors';
import font from '../../constants/font';
import lightTheme from '../styles/themes/light-theme';

interface Props {
    title: string
    backgroundColor: string
    textColor: string
    loading?: boolean
    shake?: boolean
    height: number
    width: number
    icon?: IconNode
    disable?: boolean
    containerStyle?: StyleProp<ViewStyle>
    titleStyle?: StyleProp<ViewStyle>
    disabledTitleStyle?: StyleProp<ViewStyle>
    onPress: () => void
}

const WideButton = (props: Props) => {
    const [isPressed, setPressed] = useState(false);

    const handlePressIn = () => {
        setPressed(true);
    }

    const handlePressOut = () => {
        setPressed(false);
    }

    return (

        <Animatable.View animation={props.shake ? 'shake' : ''} iterationCount={1}>
            {
                props.disable ?
                    <Button
                        buttonStyle={[{ height: props.height, width: props.width },  styles.buttonStyleDisabled ]}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={props.onPress}
                        title={props.title}
                        iconRight
                        containerStyle={[{
                            borderRadius: props.height / 2, borderWidth:  1,
                            borderColor: colors.grey,backgroundColor : colors.lightGrey,
                            ...props.containerStyle
                        }]}
                        titleStyle={[props.disable ? props.disabledTitleStyle : props.titleStyle, { textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                        disabledTitleStyle={[props.disabledTitleStyle, { textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                        icon={props.icon}
                        activeOpacity={1}
                        disabledStyle={{ backgroundColor: lightTheme.disabledButtonColor }}
                        disabled={props.disabled}
                    />
                    :
                    <Button
                        raised
                        title={props.title}
                        titleStyle={[styles.buttonText, { color: props.textColor }]}
                        buttonStyle={styles.buttonDimmensions}
                        containerStyle={[props.containerStyle, styles.buttonDimmensions]}
                        style={styles.buttonDimmensions}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={props.onPress}
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: isPressed ? [LightenDarkenColor(props.backgroundColor, -50), LightenDarkenColor(props.backgroundColor, -20)] : [props.backgroundColor, LightenDarkenColor(props.backgroundColor, -50)],
                            start: isPressed ? { x: 0, y: 0 } : { x: 0, y: 0.85 },
                            end: isPressed ? { x: 0, y: 0.2 } : { x: 0, y: 1 }
                        }}
                        loading={props.loading ?? false}
                        icon={props.icon}
                        iconRight
                        activeOpacity={1}
                    />
            }
        </Animatable.View>
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

                borderRadius: props.height / 2,
                backgroundColor: props.disabled ? 'white' : (isPressed ? LightenDarkenColor(props.backgroundColor, -20) : props.backgroundColor),
                width: props.width,
                height: props.height,
                borderWidth: props.disabled ? 1 : 0,
                borderColor: props.disabled ? colors.lightGrey : colors.transparent,
                overflow: 'hidden',
                ...props.containerStyle
            }}
        >
            <Button
                buttonStyle={[{ height: props.height, width: props.width }, props.disabled ? styles.buttonStyleDisabled : styles.buttonStyleEnabled]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={props.onPress}
                title={props.title}
                iconRight
                containerStyle={{
                    borderRadius: props.height / 2, borderWidth: props.disabled ? 1 : 0,
                    borderColor: props.disabled ? colors.lightGrey : colors.transparent,
                }}
                titleStyle={[props.disable ? props.disabledTitleStyle : props.titleStyle, { textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                disabledTitleStyle={[props.disabledTitleStyle, { textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                icon={props.icon}
                activeOpacity={1}
                disabledStyle={{ backgroundColor: lightTheme.disabledButtonColor }}
                disabled={props.disabled}
            />
        </Shadow>
    )

}

WideButton.defaultProps = {
    height: 50,
    disabled: false,
    backgroundColor: colors.white,
    focused: false,
    title: "",
    titleStyle: {
        fontFamily: font.fontBold,
        fontSize: 20,
        color: colors.darkBlueGrey,

    },
    disabledTitleStyle: {
        fontFamily: font.fontBold,
        fontSize: 20,
        color: colors.superLightBlueGrey
    }
};


const styles = StyleSheet.create({
    buttonDimmensions: {
        height: 50,
        borderRadius: 25,
        overflow: 'hidden'
    },
    buttonText: {
        fontFamily: font.fontBold,
        fontSize: 20,
        alignSelf: 'center',
    },
    buttonStyleEnabled: {
        backgroundColor: 'transparent'
    },
    buttonStyleDisabled: {
        backgroundColor : colors.lightGrey,
        borderColor : colors.grey
    }
})


export default WideButton;