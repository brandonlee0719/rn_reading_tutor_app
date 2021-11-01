import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import SmallButton from './small-button';
import StaticProgressBar from './static-progress-bar';
import VolumeSlot from './volume-slot';

interface Props {
    otherStyle: object,
    title?: string,
    onPress1?: () => void,
    onPress2?: () => void,
    onPress3?: () => void,
    slot1BackColor?: boolean,
    slot2BackColor?: boolean,
    slot3BackColor?: boolean,
    onPressQuestion?: () => void,
    onPressVolume1?: () => void,
    onPressVolume2?: () => void,
    onPressVolume3?: () => void,
    progress?: number,
    slot1Clicked?: boolean,
    slot2Clicked?: boolean,
    slot3Clicked?: boolean,
    isFocusedQuestion: boolean,
    isFocusedSlot1: boolean,
    isFocusedSlot2: boolean,
    isFocusedSlot3: boolean,
    isTouchDisabled: boolean
}
const screenWidth = Dimensions.get('window').width

const MatchWord = (props: Props) => {
    // console.log("in match word" , props)
    return (
        <View pointerEvents={props.isTouchDisabled ? 'none' : 'auto'} style={{ ...props.otherStyle }}>
            <VolumeSlot
                icon={
                    props.title ? undefined :
                        <Image style={{ resizeMode: 'contain', flex: 1, }} source={require('../../assets/images/VectorbigVol.png')}></Image>
                }
                otherStyle={{}}
                onPress={() => props.onPressQuestion?.()}
                title={props.title}
                height={126}
                width={200}
                backgroundColor={colors.white}
                focused={props.isFocusedQuestion}
            ></VolumeSlot>
            <View style={{ marginTop: 34 }}></View>
            {(props.progress != undefined && props.progress >= 0) && (
                <StaticProgressBar
                    height={8}
                    width={screenWidth - 32}
                    progress={props.progress}
                />
            )}
            
            <View style={{ flexDirection: 'row', marginTop: 58, alignSelf: 'stretch', justifyContent: 'space-evenly' }}>
                <View style={{ alignItems: 'center' }}>
                    <VolumeSlot
                        otherStyle={{}}
                        onPress={() => props.onPress1?.()}
                        height={70}
                        width={104}
                        backgroundColor={props.slot1Clicked ? props.slot1BackColor ? colors.lightGreen : colors.lightRed : colors.white}
                        focused={props.isFocusedSlot1}
                    ></VolumeSlot>
                    <SmallButton icon={
                        <Image style={{ marginTop: 3, resizeMode: 'contain' }} source={require('../../assets/images/Vectorwhite.png')}></Image>
                    }
                        otherStyle={{
                            height: 48,
                            width: 48,
                            marginTop: 10
                        }}
                        onPress={() => props.onPressVolume1?.()}
                        backgroundColor={colors.orange}
                    />
                </View>
                <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
                    <VolumeSlot
                        otherStyle={{}}
                        onPress={() => props.onPress2?.()}
                        height={70}
                        width={104}
                        backgroundColor={props.slot2Clicked ? props.slot2BackColor ? colors.lightGreen : colors.lightRed : colors.white}
                        focused={props.isFocusedSlot2}
                    ></VolumeSlot>
                    <SmallButton icon={
                        <Image style={{ marginTop: 3, resizeMode: 'contain' }} source={require('../../assets/images/Vectorwhite.png')}></Image>
                    }
                        otherStyle={{
                            height: 48,
                            width: 48,
                            marginTop: 10
                        }}
                        onPress={() => props.onPressVolume2?.()}
                        backgroundColor={colors.orange}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <VolumeSlot
                        otherStyle={{}}
                        onPress={() => props.onPress3?.()}
                        height={70}
                        width={104}
                        backgroundColor={props.slot3Clicked ? props.slot3BackColor ? colors.lightGreen : colors.lightRed : colors.white}
                        focused={props.isFocusedSlot3}
                    ></VolumeSlot>
                    <SmallButton icon={
                        <Image style={{ marginTop: 3, resizeMode: 'contain' }} source={require('../../assets/images/Vectorwhite.png')}></Image>
                    }
                        otherStyle={{
                            height: 48,
                            width: 48,
                            marginTop: 10
                        }}
                        onPress={() => props.onPressVolume3?.()}
                        backgroundColor={colors.orange}
                    />
                </View>
            </View>
        </View>
    )
}

MatchWord.defaultProps = {

};

export default MatchWord;