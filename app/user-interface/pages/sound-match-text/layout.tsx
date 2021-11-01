import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData, Dimensions, TouchableOpacity } from 'react-native';
import lightTheme from '../../styles/themes/light-theme';
import { SoundMatchTextScreen } from './screen';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import DailyBadge from '../../components/daily-badge';
import ExerciseCard from '../../components/exercise-card';
import colors from '../../../constants/colors';
import ImageSlot from '../../components/image-view'
import SmallButton from '../../components/small-button';
import { Button, Icon, Slider } from 'react-native-elements';
import WideButton from '../../components/wide-button';
import ClearButton from '../../components/clear-button';
import StaticProgressBar from '../../components/static-progress-bar';
import VolumeSlot from '../../components/volume-slot';
import { Neomorph } from 'react-native-neomorph-shadows';
import TopRoundView from '../../components/topRoundView';
import MatchWord from '../../components/match-word';
import NavigationView from '../../components/NavigationView';

const screenWidth = Dimensions.get('window').width

export default function (screen: SoundMatchTextScreen) {


    return (
        <View
            style={styles.container}
        >
            <SafeAreaView>
                <StatusBar barStyle='light-content' backgroundColor={lightTheme.homeHeaderTopColor} />
            </SafeAreaView>

            <NavigationView
                otherStyle={{ flexDirection: 'row', paddingTop: 16, alignItems: 'center' }}
                onPress={() => screen.showPreviousLessons()}
            ></NavigationView>
            <TopRoundView
                otherStyle={{
                    marginTop: 24,
                    height: 64,
                    width: 64,
                    borderRadius: 32,

                }}
                isVolume={false}
            ></TopRoundView>
            <MatchWord
                title='default'
                otherStyle={{ alignItems: 'center', marginTop: 64 }}
                onPress1={() => screen.setIndex(1)}
                onPress2={() => screen.setIndex(2)}
                onPress3={() => screen.setIndex(3)}
                slot1BackColor={screen.state.selectedIndex.find(data => data == 1)}
                slot2BackColor={screen.state.selectedIndex.find(data => data == 2)}
                slot3BackColor={screen.state.selectedIndex.find(data => data == 3)}
            ></MatchWord>

            <Button
                containerStyle={{ marginTop: 20, height: 20, width: 50, position: 'absolute', bottom: 20, end: 20 }}
                onPress={() => screen.showNextLessons()}
            ></Button>
        </View >
    )
}