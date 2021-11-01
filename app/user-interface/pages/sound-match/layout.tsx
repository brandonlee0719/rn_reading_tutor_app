import React from 'react';
import { SafeAreaView, StatusBar, View, Dimensions, ActivityIndicator } from 'react-native';
import lightTheme from '../../styles/themes/light-theme';
import { SoundMatchScreen } from './screen';
import styles from './styles';
import colors from '../../../constants/colors';
import MatchWord from '../../components/match-word';
import NavigationView from '../../components/NavigationView';



const screenWidth = Dimensions.get('window').width

export default function (screen: SoundMatchScreen) {


    return (
        <View
            style={styles.container}
            pointerEvents={screen.state.loaderVisible == true ? 'none' : 'auto'}
        >
            <SafeAreaView>
                <StatusBar barStyle='dark-content' backgroundColor={lightTheme.homeHeaderTopColor} />
            </SafeAreaView>

            <NavigationView
                otherStyle={{ flexDirection: 'row', paddingTop: 16, alignItems: 'center' }}
                onPress={() => screen.showPreviousLessons()}
                progress={screen.state.currentIndex / screen.state.exerciseList.length}
            ></NavigationView>
            {/* <TopRoundView
                otherStyle={{
                    marginTop: 24,
                    height: 64,
                    width: 64,
                    borderRadius: 32,
                }}
                isVolume={false}
            ></TopRoundView> */}

            <MatchWord
                otherStyle={{ alignItems: 'center', marginTop: 64 }}
                onPress1={() => screen.setIndex(0)}
                onPress2={() => screen.setIndex(1)}
                onPress3={() => screen.setIndex(2)}
                slot1BackColor={screen.state.selectedIndex[0]}
                slot2BackColor={screen.state.selectedIndex[1]}
                slot3BackColor={screen.state.selectedIndex[2]}
                onPressQuestion={() => screen.playQuestion()}
                onPressVolume1={() => screen.playAnswer(0)}
                onPressVolume2={() => screen.playAnswer(1)}
                onPressVolume3={() => screen.playAnswer(2)}
                progress={screen.state.currentProgress}
                slot1Clicked={screen.state.clickedIndex[0]}
                slot2Clicked={screen.state.clickedIndex[1]}
                slot3Clicked={screen.state.clickedIndex[2]}
                isFocusedQuestion={screen.state.playingQuestion}
                isFocusedSlot1={screen.state.playingAnswer1}
                isFocusedSlot2={screen.state.playingAnswer2}
                isFocusedSlot3={screen.state.playingAnswer3}
                isTouchDisabled={screen.state.isAutomaticPlaying || screen.state.loaderVisible}
            />

            {/* <Button
                containerStyle={{ marginTop: 20, height: 20, width: 50, position: 'absolute', bottom: 20, end: 20 }}
                onPress={() => screen.openResult()}
            ></Button> */}

                <ActivityIndicator
                    animating={screen.state.loaderVisible}
                    hidesWhenStopped={true}
                    size={'large'}
                    color={colors.orange}
                    style={{marginTop: 30}}
                />
        </View >
    )
}