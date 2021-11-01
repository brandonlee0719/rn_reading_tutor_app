import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData, Dimensions } from 'react-native';
import lightTheme from '../../styles/themes/light-theme';
import { HomeScreen } from './screen';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DailyBadge from '../../components/daily-badge';
import ExerciseCard from '../../components/exercise-card';
import LargeCard from '../../components/large-card';
import ImageSlot from '../../components/image-view';
import Images from '../../../constants/Images';

const screenWidth = Dimensions.get('window').width

export default function (screen: HomeScreen) {

    function renderCollectionItem(item: { day: string, completed: boolean, isToday: boolean }) {
        return (
            <DailyBadge
                exercise={item}
                containerStyle={{ width: (screenWidth - styles.headerContainer.marginHorizontal * 2) / screen.state.days.length }}
            />
        )
    }

    function renderSectionHeader(section: SectionListData<{
        isCompleted: boolean,
        isNext: boolean
    }>) {
        return (
            <Text style={styles.primarySectionHeader}>
                {section.title}
            </Text>
        )
    }

    return (
        <LinearGradient
            colors={[lightTheme.homeHeaderTopColor, lightTheme.homeHeaderBottomColor]}
            style={styles.container}
        >
            <SafeAreaView>
                <StatusBar barStyle='light-content' backgroundColor={lightTheme.homeHeaderTopColor} />
            </SafeAreaView>

            <View style={styles.headerContainer}>
                <View style={styles.summaryContainer}>
                    {/* <ImageSlot
                            borderRadius={20}
                            height = {40}
                            width = {40}
                        ></ImageSlot> */}
                    <Image
                        style={styles.image}
                        source={Images.glasses_false_tie_false}
                    />
                    <View style={[styles.summaryContainer, { marginStart: 12 }]}>
                        {
                            screen.state.isFirstTime ?
                                <Text style={{
                                    fontFamily: 'Cadman-Bold',
                                    fontSize: 20,
                                    color: 'white',
                                    marginEnd: 10
                                }}>Welcome, Lets start learning!</Text>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.avatarText}>You have a</Text>
                                    <Text style={styles.avatarNumberText}> {screen.state.streak} </Text>
                                    <Text style={styles.avatarText}>day streak!</Text>
                                </View>
                        }
                    </View>
                    <TouchableOpacity style={{ marginStart : 30}} onPress={screen.logout}>
                        <Image  source={require('../../../assets/images/logout.png')}></Image>
                    </TouchableOpacity>
                </View>
                {
                    !screen.state.isFirstTime &&

                    <View style={styles.dailyBadgetsContainer}>
                        <FlatList
                            horizontal={true}
                            data={screen.state.days}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                renderCollectionItem(item)
                            )}
                            style={{ height: 100 }}
                            scrollEnabled={false}
                        />
                    </View>
                }
                <ScrollView style={{ marginHorizontal: -20 }} showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 10 }}>
                        <LargeCard
                            otherStyle={{ alignSelf: 'center', marginHorizontal: 20 }}
                            isFirstTime={screen.state.isFirstTime}
                            onPress={() => screen.showCompletedLessons(screen.state.nextLessonObj)}
                            title={screen.state.currentTitle}
                            sub_title={screen.state.currentDesc}
                            count={screen.state.fishCount}
                        ></LargeCard>

                        <View style={styles.lessonsContainer}>
                            <SectionList
                                sections={[{ title: 'Stages', data: screen.state.nextLessons, index: 0 }]}
                                renderSectionHeader={({ section }) => (
                                    renderSectionHeader(section)
                                )}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <ExerciseCard
                                        exercise={item}
                                        leftImage={Images.big_1}
                                        onPress={() => screen.showNextLessons(item)} />
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    )
}