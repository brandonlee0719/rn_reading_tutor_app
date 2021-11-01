import React, { useState } from 'react';
import { Button, IconNode } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import LightenDarkenColor from '../../utils/lighten-darker-color';
import { Shadow } from 'react-native-neomorph-shadows';
import lightTheme from '../styles/themes/light-theme';

interface Props {
    icon: IconNode
    backgroundColor: string
    height: number 
    onPress: () => void
    disabled?: boolean
    otherStyle : object
}

const SmallButton = (props: Props) => {
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
                shadowOffset: {width: 0, height: isPressed ? 4 : -4},
                shadowOpacity: props.disabled ? 0 : 1,
                shadowColor: LightenDarkenColor(props.backgroundColor, -70),
                shadowRadius: 3.5,
                borderRadius: props.height / 2,
                backgroundColor: props.disabled ? 'transparent' : (isPressed ? LightenDarkenColor(props.backgroundColor, -20) : props.backgroundColor),
                width: props.height,
                height: props.height,
                ...props.otherStyle
            }}
        >
            <Button 
                buttonStyle={[{borderRadius: props.height / 2}, props.disabled ? styles.buttonStyleDisabled : styles.buttonStyleEnabled]}
                onPressIn = {handlePressIn} 
                onPressOut = {handlePressOut}
                onPress = {props.onPress}
                icon={props.icon}
                activeOpacity={1}
                disabledStyle={{backgroundColor:lightTheme.disabledButtonColor}}
                disabled={props.disabled}
            />
        </Shadow>
    )
}

SmallButton.defaultProps = {
    height: 50,
    disabled: false
};

const styles = StyleSheet.create({
    buttonStyleEnabled: {
        backgroundColor: 'transparent'
    },
    buttonStyleDisabled: {
        borderWidth:0.75,
        borderColor: '#ccc'
    }
})


export default SmallButton;