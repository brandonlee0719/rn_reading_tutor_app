import React from 'react';
import { Image } from 'react-native';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import colors from '../../constants/colors';

interface Props {
    height: number
    width: number
    color: string
    otherStyle: object
    img: String
    borderRadius: number
}

const ImageSlot = (props: Props) => {
    return (
        <Neomorph
            swapShadows
            inner
            style={{
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.25,
                shadowColor: '#fff',
                shadowRadius: 3,
                borderRadius: props.borderRadius,
                backgroundColor: props.color,
                width: props.width,
                height: props.height,
                overflow: 'hidden',
                alignItems : 'center',
                ...props.otherStyle
            }}
        >
            <Image style={{
                flex: 1,
                resizeMode : 'center'
            }}
                source={props.img}
            ></Image>
        </Neomorph>
    )
}

ImageSlot.defaultProps = {
    width: 50,
    height: 50,
    color: colors.imgGrayBackGround,
    otherStyle: {},
    img: "https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png",
    borderRadius: 0
};

export default ImageSlot;