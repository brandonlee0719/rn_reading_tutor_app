import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData, Dimensions, FlatList } from 'react-native';
import lightTheme from '../../styles/themes/light-theme';
import { ComprehensionQuestionScreen } from './screen';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import DailyBadge from '../../components/daily-badge';
import ExerciseCard from '../../components/exercise-card';
import colors from '../../../constants/colors';
import ImageSlot from '../../components/image-view'
import SmallButton from '../../components/small-button';
import { Icon } from 'react-native-elements';
import WideButton from '../../components/wide-button';
import ClearButton from '../../components/clear-button';
import StaticProgressBar from '../../components/static-progress-bar';
import VolumeSlot from '../../components/volume-slot';
import MatchWord from '../../components/match-word';
import TopRoundView from '../../components/topRoundView';
import { ScrollView } from 'react-native-gesture-handler';
import DisableButton from '../../components/disable-button';
import NavigationView from '../../components/NavigationView';
import AlertView from '../../components/alert-view';
import TextField from '../../components/text-field';
import { Neomorph } from 'react-native-neomorph-shadows';
import MultipleChoice from '../../components/multiple-choice';

const screenWidth = Dimensions.get('window').width

export default function (screen: ComprehensionQuestionScreen) {


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
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, marginHorizontal: 16 }} showsVerticalScrollIndicator={false}>

                    <View style={{ flexDirection: 'row', flex: 1, marginTop: 36, marginHorizontal: 20 }}>
                        <Text style={styles.headerTitle}>Question Line 1 {'\n'}Question Line 2 if need</Text>
                        <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: colors.orange, alignSelf: 'flex-end', marginBottom: 8, marginLeft: 16 }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                    </View>
                    <StaticProgressBar
                        height={8}
                        width={screenWidth - 66}
                        progress={40}
                        otherStyle={{ marginVertical: 24 }}
                    ></StaticProgressBar>
                    <FlatList
                        data={[{ a: "" }, { a: "" }, { a: "" }, { a: "" }]}
                        renderItem={({ item, index }) =>
                            <MultipleChoice
                            width = {screenWidth - 66}
                            height = {64}
                            onPress = {() => {}}
                            otherStyle = {{marginTop : 10}}
                            ></MultipleChoice>
                        }
                    ></FlatList>
                    <WideButton
                        disable
                        containerStyle={{ marginTop: 30 }}
                        title="Try"
                        icon={
                            <Icon
                                name='arrow-long-right'
                                type='entypo'
                                color={colors.superLightBlueGrey}
                                size={30}
                                style={{ marginTop: 1 }}
                            />
                        }
                        textColor={'red'}
                        backgroundColor={colors.grey}
                        onPress={() => { }}
                    ></WideButton>
                </ScrollView>
            </View>
        </View >
    )
}

