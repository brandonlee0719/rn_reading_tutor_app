import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import LightenDarkenColor from '../../utils/lighten-darker-color';
import Device from 'react-native-device-detection';
import lightTheme from '../styles/themes/light-theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
    title: string
    textColor?: string
    loading?: boolean
    containerStyle?: StyleProp<ViewStyle>
    onPress: () => void
}

const ClearButton = (props: Props) => {
    const [isPressed, setPressed] = useState(false);

    const handlePressIn = () => {
        setPressed(true);
    }

    const handlePressOut = () => {
        setPressed(false);
    }

    return (
        <Button 
            title={props.title}  
            TouchableComponent={TouchableWithoutFeedback}
            type='clear'
            containerStyle={props.containerStyle}
            titleStyle={[styles.buttonText, 
                        isPressed ? {color: LightenDarkenColor(props.textColor ?? styles.buttonText.color, 80)} : 
                                    {color:props.textColor ?? styles.buttonText.color}]}
            loading={props.loading ?? false}
            onPressIn = {handlePressIn} 
            onPressOut = {handlePressOut}
            onPress={props.onPress}>
        </Button>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: Device.isIos ? 'Cadman' : 'Cadman-Regular',
        fontSize: 16,
        alignSelf: 'center',
        color: lightTheme.clearButtonTextColor
    }
})


export default ClearButton;