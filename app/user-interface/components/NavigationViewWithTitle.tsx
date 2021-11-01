import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData, Dimensions, TouchableOpacity } from 'react-native';
import { Slider } from 'react-native-elements';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import { color } from 'react-native-reanimated';
import colors from '../../constants/colors';
import font from '../../constants/font';
import ClearButton from './clear-button';
import ImageSlot from './image-view';
import SmallButton from './small-button';
import StaticProgressBar from './static-progress-bar';
import VolumeSlot from './volume-slot';

interface Props {
    otherStyle: object,
    onPress: () => void
    onRightButtonPress: () => void
    title: string
    rightButtonTitle: string
}
const screenWidth = Dimensions.get('window').width

const NavigationViewWithTitle = (props: Props) => {
    return (
        <View style={[{ ...props.otherStyle }, { alignSelf: 'stretch' }]}>
            <TouchableOpacity onPress={props.onPress} hitSlop={{ top: 8, bottom: 8, right: 8, left: 8 }}>
                <Image style={{ tintColor: colors.orange }} source={require('../../assets/images/Arrowback.png')}></Image>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <Text style={{
                fontFamily: font.fontBold, fontSize: 20, color: colors.navigationtitle, textAlign: 'center',
                position: 'absolute',
                left : 50,
                right : 50,
                ...props.otherStyle


            }}>{props.title}</Text>

            <ClearButton
                onPress={props.onRightButtonPress}
                title={props.rightButtonTitle}
                containerStyle={{}}
                textColor={colors.orange}
            ></ClearButton>
        </View>
    )
}

NavigationViewWithTitle.defaultProps = {

};

export default NavigationViewWithTitle;