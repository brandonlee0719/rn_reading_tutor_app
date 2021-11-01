import React from 'react';
import { Shadow } from 'react-native-neomorph-shadows';

interface Props {
    height: number
    width: number
    color: string 
}

const Slot = (props: Props) => {
    return (
        <Shadow
            inner
            useArt
            style={{
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.3,
                shadowColor: '#000',
                shadowRadius: 3,
                borderRadius: props.height / 2,
                backgroundColor: props.color,
                width: props.height,
                height: props.height
            }}
        >
        </Shadow>
    )
}

Slot.defaultProps = {
    width: 50,
    height: 50
};

export default Slot;