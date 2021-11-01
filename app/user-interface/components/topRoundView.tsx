import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData, Dimensions } from 'react-native';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import colors from '../../constants/colors';
import ImageSlot from './image-view';
import SmallButton from './small-button';
import StaticProgressBar from './static-progress-bar';
import VolumeSlot from './volume-slot';

interface Props {
    otherStyle: object,
    isVolume : boolean,
  
}
const screenWidth = Dimensions.get('window').width

const TopRoundView = (props: Props) => {
    return (
        <View style={{...props.otherStyle}}>
            <ImageSlot
                height={64}
                width={64}
                borderRadius={32}
                color={colors.superLightBlueGrey}
            ></ImageSlot>
            <SmallButton icon={
                <Image style={{ resizeMode: 'center' }} source={props.isVolume ? require('../../assets/images/VectorinsVol.png') : require('../../assets/images/_que.png')}></Image>
            }
                otherStyle={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    height: 32,
                    width: 32
                }}

                onPress={() => { }}
                backgroundColor={colors.lightBlueGrey}
                disabled={false}
            />

        </View>
    )
}

TopRoundView.defaultProps = {

};

export default TopRoundView;