import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, View, ViewProps } from 'react-native';
import LightenDarkenColor from '../../utils/lighten-darker-color';
import lightTheme from '../styles/themes/light-theme';
import { Image } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AutoScrolling from 'react-native-auto-scrolling';
import { Neomorph } from 'react-native-neomorph-shadows';
import colors from '../../constants/colors';

interface Props {
    progress: number
    width: number
    height: number
    otherStyle?: object
}

const StaticProgressBar: FunctionComponent<Props> = (props: Props) => {
    return (
        <Neomorph
            inner
            swapShadows
            style={{
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowColor: '#fff',
                shadowRadius: props.height - 2,
                backgroundColor: colors.imgGrayBackGround,
                height: props.height,
                width: props.width,
                borderRadius: props.height / 2,
                overflow: 'hidden',
                ...props.otherStyle
            }}
        >
            <Neomorph

                style={{
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.25,
                    shadowColor: '#000',
                    shadowRadius: props.height - 2,
                    backgroundColor: colors.lightBlueGrey,
                    height: props.height,
                    width: (props.width * ((props.progress) / 100)),
                    borderRadius: props.height / 2,
                    overflow: 'hidden'
                }}
            ></Neomorph>

        </Neomorph>
    )
}

StaticProgressBar.defaultProps = {
    progress: 0,
    width: 0,
    height: 25
};

const styles = StyleSheet.create({
    bar: {
        maxWidth: 450,
        borderRadius: 20,
        borderWidth: 0.2,
        borderColor: '#ccc',
        overflow: 'hidden',
        alignSelf: 'center',
    },
    progress: {
        minWidth: '10%',
        margin: 3,
        overflow: 'hidden'
    }
})


export default StaticProgressBar;