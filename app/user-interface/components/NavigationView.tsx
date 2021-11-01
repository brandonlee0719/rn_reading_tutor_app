import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData, Dimensions, TouchableOpacity } from 'react-native';
import { Slider } from 'react-native-elements';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import colors from '../../constants/colors';
import ImageSlot from './image-view';
import SmallButton from './small-button';
import StaticProgressBar from './static-progress-bar';
import VolumeSlot from './volume-slot';

interface Props {
    otherStyle: object,
    onPress: Function,
    progress?:Number,
}
const screenWidth = Dimensions.get('window').width

const NavigationView = (props: Props) => {
    return (
        <View style={{ ...props.otherStyle }}>
            <TouchableOpacity onPress={props.onPress} hitSlop={{ top: 8, bottom: 8, right: 8, left: 8 }}>
                <Image source={require('../../assets/images/Arrowback.png')}></Image>
            </TouchableOpacity>

            <Slider
                style={{ height: 2, flex: 1, marginHorizontal: 16 }}
                minimumValue={0}
                trackStyle={{
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowOpacity: 1,
                    // shadowColor: '#000',
                    // shadowRadius: 1,
                    height: 2,
                }}

                thumbStyle={{ height: 8, width: 8, backgroundColor: colors.lightBlueGrey }}
                maximumValue={1}
                value={props.progress}
                minimumTrackTintColor={colors.darkBlueGrey}
                maximumTrackTintColor={colors.lightBlueGrey}
            />

        </View>
    )
}

NavigationView.defaultProps = {

};

export default NavigationView;