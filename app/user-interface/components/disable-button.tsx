import React, { useState } from 'react';
import { Button, IconNode } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import LightenDarkenColor from '../../utils/lighten-darker-color';
import * as Animatable from 'react-native-animatable'
import colors from '../../constants/colors';

interface Props {
    title: string
    backgroundColor: string
    textColor: string
    loading?: boolean
    shake?: boolean
    icon?: IconNode
    containerStyle?: StyleProp<ViewStyle>
    onPress: () => void
}

const DisableButton = (props: Props) => {
    const [isPressed, setPressed] = useState(false);

    const handlePressIn = () => {
        setPressed(true);
    }

    const handlePressOut = () => {
        setPressed(false);
    }

    return (
        // <Animatable.View animation={props.shake ?'shake' : ''} iterationCount={1}>
            <Button 
                title={props.title}
                titleStyle = {[styles.buttonText, {color: props.textColor}]}
                buttonStyle = {[{backgroundColor : props.backgroundColor}]}
                containerStyle = {[props.containerStyle, styles.buttonDimmensions]}
                // style = {styles.buttonDimmensions}
                onPressIn = {handlePressIn} 
                onPressOut = {handlePressOut}
                onPress = {props.onPress}
               
                loading={props.loading ?? false}
                icon={props.icon}
                iconRight
                activeOpacity={1}
            />
        // </Animatable.View>
    )
}

const styles = StyleSheet.create({
    buttonDimmensions: {
        height: 50,
        borderRadius: 25,
        borderColor : colors.grey,
        borderWidth : 1,
        overflow: 'hidden',
    },
    buttonText: {
        fontFamily:'Cadman-Bold',
        fontSize: 20,
        alignSelf: 'center',
    }
})


export default DisableButton;