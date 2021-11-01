import React from 'react';
import { ScrollView, SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData, Dimensions, FlatList } from 'react-native';
import lightTheme from '../../styles/themes/light-theme';
import { StageScreen } from './screen';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import DailyBadge from '../../components/daily-badge';
import ExerciseCard from '../../components/exercise-card';
import font from '../../../constants/font';
import colors from '../../../constants/colors';
import { color } from 'react-native-reanimated';
import SmallButton from '../../components/small-button';
import { Icon } from 'react-native-elements';
import Slot from '../../components/slot';
import ImageSlot from '../../components/image-view';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import Images from '../../../constants/Images';
import NavigationView from '../../components/NavigationView';
import NavigationViewWithTitle from '../../components/NavigationViewWithTitle'
import { NavigationEvents } from 'react-navigation';

const screenWidth = Dimensions.get('window').width

export default function (screen: StageScreen) {

    function renderCurrentStage(item) {
        return (

            <View style={{ flexDirection: 'row', paddingVertical: 16, }}>

                {/* <ImageSlot
                    height={56}
                    width={56}
                    otherStyle={{ marginLeft: 16, }}
                ></ImageSlot> */}
                <View style={{
                    marginHorizontal: 16,
                    flex: 1
                }}>
                    <Text style={styles.levelFont}>{item.title}</Text>
                    <Text style={styles.letterSoundFont}>{item.type}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 4, }}>
                        {/* <ImageSlot
                            height={40}
                            width={40}
                            otherStyle={{}}
                        ></ImageSlot>
                        <ImageSlot
                            height={40}
                            width={40}
                            otherStyle={{ marginHorizontal: 8, }}
                        ></ImageSlot>
                        <ImageSlot
                            height={40}
                            width={40}
                            otherStyle={{}}
                        ></ImageSlot> */}
                        <Image
                            style={styles.image}
                            source={Images.fish_orange}
                        />
                        <Text style={styles.primaryNumber}>{" " + item.fishes}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', marginEnd: 16 }}>
                    <SmallButton icon={
                        <Icon
                            name='arrow-long-right'
                            type='entypo'
                            color={lightTheme.confirmationButtonIconColor}
                            size={30}
                            style={{ marginTop: 1 }}
                        />
                    }

                        onPress={() => screen.showStage(item)}
                        backgroundColor={colors.orange}
                        disabled={false}
                    />
                </View>
            </View>
        )
    }

    function renderDisableStage(item) {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 16, backgroundColor: colors.lightGrey, borderWidth: 1, borderColor: colors.imgGrayBackGround }}>
                {/* <ImageSlot
                    height={56}
                    width={56}
                    otherStyle={{ marginLeft: 16, }}
                ></ImageSlot> */}

                <View style={{
                    marginHorizontal: 16,
                    flex: 1
                }}>
                    <Text style={styles.levelFontBlur}>{item.title}</Text>
                    <Text style={styles.letterSoundFont}>{item.type}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center' }}>
                        {/* <Text style={styles.lblUnlock}>Unlock at</Text> */}
                        <Text style={styles.lblUnlock}>Completed</Text>
                        {/* <Text style={{
                            fontFamily: font.fontRegular,
                            fontSize: 16,
                            color: colors.orange,
                            marginEnd: 4
                        }}>1</Text> */}
                        {/* <ImageSlot
                            height={40}
                            width={40}
                            img={Images.fish_orange}
                        ></ImageSlot> */}
                        <Image
                            style={styles.image}
                            source={Images.fish_orange}
                        />
                        <Text style={styles.primaryNumber}>{" " + item.fishes}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', marginEnd: 16 }}>
                    {/* <SmallButton icon={
                        <Icon
                            name='lock'
                            type='material'
                            color={lightTheme.disabledButtonIconColor}
                            size={30}
                            style={{ marginTop: 1 }}
                        />
                    }

                        onPress={() => console.log()}
                        backgroundColor={lightTheme.disabledButtonColor}
                        disabled={true}
                    /> */}
                    <SmallButton icon={
                        <Icon
                            name='check'
                            type='antdesign'
                            color={colors.green}
                            size={33}
                        />
                    }
                        onPress={() => console.log()}
                        backgroundColor={colors.white}
                        disabled={true}
                    />
                </View>
            </View>
        )
    }

    return (
        <LinearGradient
            colors={[lightTheme.homeHeaderTopColor, lightTheme.homeHeaderBottomColor]}
            style={styles.container}
        >

            <SafeAreaView>
                <StatusBar barStyle='light-content' backgroundColor={lightTheme.homeHeaderTopColor}>
                    {/* <NavigationEvents
                        onWillFocus={payload => {
                            console.log("get focus")
                            screen.apiGetStage()
                        }
                        }
                    /> */}
                </StatusBar>
                <NavigationViewWithTitle
                    otherStyle={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}
                    title=""
                    onPress={() => screen.showPreviousLessons()}
                ></NavigationViewWithTitle>

            </SafeAreaView>

            <View style={styles.viewContainer}>
                <ScrollView style={{ flex: 1, }}
                    showsVerticalScrollIndicator={false}
                    bounces={false}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                        <Text style={styles.primarySectionHeader}>{screen.state.stageName}</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={styles.primaryNumber}>{screen.state.fishCount} </Text>
                            {/* <ImageSlot
                                height={40}
                                width={40}
                            ></ImageSlot> */}
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={Images.fish_orange}
                            />
                        </View>
                    </View>

                    {/* <ImageSlot
                        height={343}
                        otherStyle={{ marginTop: 16 , shadowColor: colors.white, shadowRadius:0}}
                        width={screenWidth - 32}
                        img={Images.big_1}
                        color={colors.white}
                    ></ImageSlot> */}
                    <Image
                        style={styles.imageBig}
                        source={Images.big_1}
                    />
                    <SectionList
                        sections={[{ title: '', data: screen.state.lessons, index: 0 }]}

                        renderSectionHeader={({ section }) => (
                            <View style={{ marginVertical: 8 }}></View>
                        )}
                        style={{ paddingBottom: 50, }}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (

                            <View style={{ borderRadius: 8, backgroundColor: colors.white, alignItems: 'center', overflow: 'hidden' }}>
                                {
                                    item.completed ?
                                        <Neomorph
                                            inner
                                            swapShadows
                                            style={{
                                                shadowOffset: { width: 0, height: -2 },
                                                shadowOpacity: item.completed ? 0.35 : 0,
                                                shadowColor: '#000',
                                                shadowRadius: item.completed ? 3 : 0,
                                                backgroundColor: colors.white,
                                                // marginTop :16,
                                                borderRadius: item.completed ? 8 : 0,
                                                height: 120,
                                                width: screenWidth - 32,

                                            }}
                                        >
                                            {renderDisableStage(item)}
                                        </Neomorph>
                                        : renderCurrentStage(item)

                                }
                            </View>
                        )}

                        showsVerticalScrollIndicator={false}

                    ></SectionList>
                </ScrollView>
            </View>
        </LinearGradient>
    )

}