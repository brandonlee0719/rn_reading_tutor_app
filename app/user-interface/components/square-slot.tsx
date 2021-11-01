import React from 'react';
import { Shadow } from 'react-native-neomorph-shadows';
import colors from '../../constants/colors';
import lightTheme from '../styles/themes/light-theme';

interface Props {
    height?: number
    width?: number
    color?: string 
    borderRadius? : number
    onLayout? : Function
}

const SquareSlot = (props: Props) => {
    return (
        <Shadow
            inner
            useArt
            onLayout = {props.onLayout}
            style={{
                shadowOffset: {width: 1, height: 4},
                shadowOpacity: 0.35,
                shadowColor: '#000',
                shadowRadius: 3,
                borderRadius: 8,
                backgroundColor: props.color,
                width: props.width,
                height: props.height
            }}
        >
        </Shadow>
    )
}

SquareSlot.defaultProps = {
    width: 104,
    height: 72,
    color : colors.imgGrayBackGround,
    borderRadius : 8
};

export default SquareSlot;