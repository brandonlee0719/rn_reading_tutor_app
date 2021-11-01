import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import LightenDarkenColor from '../../utils/lighten-darker-color';
import lightTheme from '../styles/themes/light-theme';
import { Image } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AutoScrolling from 'react-native-auto-scrolling';

interface Props {
    progress?: number
    width?: number
    height?: number
}

const ProgressBar: FunctionComponent<Props> = (props: Props) => {
    return (
        <LinearGradient
            colors={[LightenDarkenColor(lightTheme.progressBarBaseColor, -40), lightTheme.progressBarBaseColor]}
            start={{ x: 0, y: 0.15 }}
            end={{ x: 0, y: 1.1 }}
            style={[styles.bar, { width: props.width, height: props.height, borderRadius: props.height }]}
        >
            <AutoScrolling
                style={[styles.progress, { borderRadius: props.height, width: (props.width! * ((props.progress ?? 0) / 100)) - 6 }]}
                endPaddingWidth={0}
                duration={3000}>
                <View style={{ height: props.height, width: props.width }} >
                    <Image
                        style={{ height: props.height, width: props.progress == 0 ? 0 : props.width }}
                        source={require('../../assets/images/img-progress-bar.png')}
                    />
                </View>
            </AutoScrolling>

        </LinearGradient>
    )
}

ProgressBar.defaultProps = {
    progress: 0,
    width: 300,
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


export default ProgressBar;