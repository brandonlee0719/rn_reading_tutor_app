import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData, Dimensions } from 'react-native';
import lightTheme from '../../styles/themes/light-theme';
import { ComprehensionScreen } from './screen';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import DailyBadge from '../../components/daily-badge';
import ExerciseCard from '../../components/exercise-card';
import colors from '../../../constants/colors';
import ImageSlot from '../../components/image-view'
import SmallButton from '../../components/small-button';
import { Button, Icon } from 'react-native-elements';
import WideButton from '../../components/wide-button';
import ClearButton from '../../components/clear-button';
import StaticProgressBar from '../../components/static-progress-bar';
import VolumeSlot from '../../components/volume-slot';
import MatchWord from '../../components/match-word';
import TopRoundView from '../../components/topRoundView';
import { ScrollView } from 'react-native-gesture-handler';
import DisableButton from '../../components/disable-button';

const screenWidth = Dimensions.get('window').width

export default function (screen: ComprehensionScreen) {


    return (
        <View
            style={styles.container}
        >
            <SafeAreaView>
                <StatusBar barStyle='light-content' backgroundColor={lightTheme.homeHeaderTopColor} />
            </SafeAreaView>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator = {false}>
                <ImageSlot
                    height={343}
                    width={screenWidth - 32}
                    otherStyle = {{marginTop : 60}}
                ></ImageSlot>

                <Text style={styles.headerTitle}>Going to the Store</Text>
                <Text style={styles.subTitle}>Asha and Kim each earned five dollars for cutting the grass for their moms. They decided to buy treats with their money. They walked to the corner store. Asha chose an ice cream sandwich. Kim chose two chocolate bars.</Text>
              
                <WideButton
                disable
                containerStyle = {{marginTop : 30}}
                title = "disabled"
                icon={
                    <Icon
                        name='arrow-long-right'
                        type='entypo'
                        color={colors.superLightBlueGrey}
                        size={30} 
                        style={{ marginTop: 1 }}
                    />
                }
                textColor = {'red'}
                backgroundColor = {colors.grey}
                onPress = {() => {}}
                ></WideButton>
            </ScrollView>
            <Button
                containerStyle={{ marginTop: 20, height: 20, width: 50, position: 'absolute', bottom: 20, end: 20 }}
                onPress={() => screen.showNextLessons()}
            ></Button>
        </View >
    )
}