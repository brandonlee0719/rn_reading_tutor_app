import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData, Dimensions, TouchableOpacity, LayoutChangeEvent, Animated, PanResponder, Platform } from 'react-native';
import lightTheme from '../../styles/themes/light-theme';
import { WordBuilderScreen } from './screen';
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
import NavigationView from '../../components/NavigationView';
import VisualMatch from '../../components/visual-word';
import WordBuilderCard from '../../components/word-builder-card';
import { ScrollView } from 'react-native-gesture-handler';
import SquareSlot from '../../components/square-slot';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
const screenWidth = Dimensions.get('window').width

export default function (screen: WordBuilderScreen) {

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
            {/* <View style={styles.subcontainer}>
                <Text style={styles.titleText}>Drag & Release this box!</Text>
                <Animated.View
                    style={{
                        transform: [{ translateX: screen.pan.x }, { translateY: screen.pan.y }]
                    }}
                    {...screen.panResponder.panHandlers}
                >
                    <View style={styles.box} />
                </Animated.View>
            </View> */}

            <TopRoundView
                otherStyle={{
                    marginTop: 24,
                    height: 64,
                    width: 64,
                    borderRadius: 32,

                }}
                isVolume={false}
            ></TopRoundView>

            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <Animated.ScrollView
    bounces={false}
                ref={(c) => { screen.scroll = c }}
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={true}
                // snapToInterval={CARD_WIDTH}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: screen.animation, }, }, },], { useNativeDriver: true })}
                style={styles.scrollView}
                contentContainerStyle={styles.endPadding} >
            <View>
                <View style={{ alignItems: 'center', marginTop: 40 }} >

                    {
                        screen.disabled ?
                            <Button
                                buttonStyle={[{ height: 126, width: 200, borderRadius: 8 }, styles.buttonStyleDisabled]}

                                onPress={() => { }}
                                title={screen.title}

                                titleStyle={[{ textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                                disabledTitleStyle={[{ textAlign: 'center', textAlignVertical: 'center', marginTop: -4 }]}
                                activeOpacity={1}
                                icon={
                                    screen.title ? <></> :
                                        <Image style={{ resizeMode: 'contain', flex: 1, tintColor: colors.orange }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                disabledStyle={{ backgroundColor: lightTheme.disabledButtonColor }}
                                disabled={screen.state.disabled}
                            />
                            :
                            <VolumeSlot
                                icon={
                                    screen.title ? null :
                                        <Image style={{ resizeMode: 'contain', flex: 1, tintColor:  colors.orange }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{}}
                                disabled={screen.state.disabled}
                                onPress={() => { }}
                                title={screen.title}
                                height={126}
                                width={200}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                    }
                    <View style={{ flexDirection: 'row', marginVertical: 24, alignSelf: 'stretch', justifyContent: 'space-between', }}>

                        <SquareSlot></SquareSlot>
                        <SquareSlot></SquareSlot>
                        <SquareSlot></SquareSlot>
                    </View>
                    <StaticProgressBar
                        height={8}
                        width={screenWidth - 32}
                        progress={40}
                    ></StaticProgressBar>

                    <View style={{ flexDirection: 'row', marginTop: 40, alignSelf: 'stretch', justifyContent: 'space-between', }}>


                        <Animated.View style={{
                            transform: [{ translateX: screen.pan.x }, { translateY: screen.pan.y }]
                        }}
                            {...screen.panResponder.panHandlers}>
                            <VolumeSlot
                                icon={
                                    <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: colors.orange }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{}}
                                onPress={() => {

                                    if (screen.state.dropZoneValues.length > 3) {
                                        console.log("hiii")
                                    } else {
                                        screen.state.disabledvolumshot1 ? screen.setState({ disabledvolumshot1: false }) : screen.setState({ disabledvolumshot1: true })
                                        let index = screen.state.dropZoneValues.includes(1)
                                        if (index) {
                                            screen.state.dropZoneValues.pop(1)
                                        } else {
                                            screen.state.dropZoneValues.push(1)
                                        }
                                        console.log(screen.state.dropZoneValues)
                                    }
                                }}


                                height={70}
                                width={104}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                        </Animated.View>
                        {/* :
                            <VolumeSlot
                                icon={
                                    <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: screen.state.disabledvolumshot1 ? colors.superLightBlueGrey : colors.orange }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{}}
                                onPress={() => {
                                    if (screen.state.dropZoneValues.length >= 3) {
                                        console.log("hiii")
                                    } else {
                                        screen.state.disabledvolumshot1 ? screen.setState({ disabledvolumshot1: false }) : screen.setState({ disabledvolumshot1: true })
                                        let index = screen.state.dropZoneValues.includes(1)
                                        if (index) {
                                            screen.state.dropZoneValues.pop(1)
                                        } else {
                                            screen.state.dropZoneValues.push(1)
                                        }
                                        console.log(screen.state.dropZoneValues)
                                    }

                                }}


                                height={70}
                                width={104}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                        } */}
                        {/* {screen.state.dropZoneValues.length === 3 && !screen.state.disabledvolumshot2 ? */}
                        <Animated.View style={{
                            transform: [{ translateX: screen.Secondpan.x }, { translateY: screen.Secondpan.y }]
                        }}
                            {...screen.SecondpanResponder.panHandlers}>
                            <VolumeSlot
                                icon={
                                    <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: screen.state.disabledvolumshot2 ? colors.orange : colors.white }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{ backgroundColor: !screen.state.disabledvolumshot2 ? "#fa795c" : colors.white }}
                                onPress={() => {
                                    if (screen.state.dropZoneValues.length >= 3) {
                                        console.log("hiii")
                                    } else {
                                        screen.state.disabledvolumshot2 ? screen.setState({ disabledvolumshot2: false }) : screen.setState({ disabledvolumshot2: true })
                                        let index = screen.state.dropZoneValues.includes(2)
                                        if (index) {
                                            screen.state.dropZoneValues.pop(2)
                                        } else {
                                            screen.state.dropZoneValues.push(2)
                                        }
                                    }
                                    console.log(screen.state.dropZoneValues)
                                }}
                                height={70}
                                width={104}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                        </Animated.View>
                        {/* :
                            <VolumeSlot
                                icon={
                                    <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: screen.state.disabledvolumshot2 ? colors.superLightBlueGrey : colors.orange }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{}}
                                onPress={() => {
                                    if (screen.state.dropZoneValues.length >= 3) {
                                        console.log("hiii")
                                    } else {
                                        screen.state.disabledvolumshot2 ? screen.setState({ disabledvolumshot2: false }) : screen.setState({ disabledvolumshot2: true })
                                        let index = screen.state.dropZoneValues.includes(2)
                                        if (index) {
                                            screen.state.dropZoneValues.pop(2)
                                        } else {
                                            screen.state.dropZoneValues.push(2)
                                        }
                                    }
                                    console.log(screen.state.dropZoneValues)
                                }}
                                height={70}
                                width={104}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                        } */}
                        {/* {screen.state.dropZoneValues.length === 3 && !screen.state.disabledvolumshot3 ? */}
                        <Animated.View
                            style={{
                                transform: [{ translateX: screen.thirdpan.x }, { translateY: screen.thirdpan.y }]
                            }}
                            {...screen.thirdpanResponder.panHandlers}>
                            <VolumeSlot
                                icon={
                                    <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: screen.state.disabledvolumshot3 ? colors.orange : colors.white }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{ backgroundColor: !screen.state.disabledvolumshot3 ? "#9fde49" : "white" }}
                                onPress={() => {
                                    if (screen.state.dropZoneValues.length >= 3) {
                                        console.log("hiii")
                                    } else {
                                        screen.state.disabledvolumshot3 ? screen.setState({ disabledvolumshot3: false }) : screen.setState({ disabledvolumshot3: true })
                                        let index = screen.state.dropZoneValues.includes(3)
                                        if (index) {
                                            screen.state.dropZoneValues.pop(3)
                                        } else {
                                            screen.state.dropZoneValues.push(3)
                                        }
                                        console.log(screen.state.dropZoneValues)
                                    }
                                }}
                                height={70}
                                width={104}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                        </Animated.View>
                        {/* :
                            <VolumeSlot
                                icon={
                                    <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: screen.state.disabledvolumshot3 ? colors.superLightBlueGrey : colors.orange }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{}}
                                onPress={() => {
                                    if (screen.state.dropZoneValues.length >= 3) {
                                        console.log("hiii")
                                    } else {
                                        screen.state.disabledvolumshot3 ? screen.setState({ disabledvolumshot3: false }) : screen.setState({ disabledvolumshot3: true })
                                        let index = screen.state.dropZoneValues.includes(3)
                                        if (index) {
                                            screen.state.dropZoneValues.pop(3)
                                        } else {
                                            screen.state.dropZoneValues.push(3)
                                        }
                                        console.log(screen.state.dropZoneValues)
                                    }
                                }}
                                height={70}
                                width={104}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                        } */}
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 18, alignSelf: 'stretch', justifyContent: 'space-evenly', }}>
                        <View style={{ width: (104 / 2) - 16 }}></View>
                        {/* {screen.state.dropZoneValues.length === 3 && !screen.state.disabledvolumshot4 ? */}
                        <Animated.View style={{
                            transform: [{ translateX: screen.fourthpan.x }, { translateY: screen.fourthpan.y }]
                            // Platform.OS = "ios" ?   [{ translateX: screen.state.disabled ? !screen.state.dropZoneValues.includes(1) ? RFValue(-55, Dimensions.get("window").height) : !screen.state.dropZoneValues.includes(2) ? RFValue(55, Dimensions.get("window").height): RFValue(171, Dimensions.get("window").height) : screen.pan.x }, { translateY: screen.state.disabled ? RFValue(236, Dimensions.get("window").height) : screen.pan.y }] :   [{ translateX: screen.state.disabled ? !screen.state.dropZoneValues.includes(1) ? RFValue(-55, Dimensions.get("window").height) : !screen.state.dropZoneValues.includes(2) ? RFValue(55, Dimensions.get("window").height): RFValue(171, Dimensions.get("window").height) : screen.pan.x }, { translateY: screen.state.disabled ? RFValue(236, Dimensions.get("window").height) : screen.pan.y }]
                        }}
s
                            {...screen.fourthpanResponder.panHandlers}

                        >
                            <VolumeSlot
                                icon={
                                    <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: colors.orange }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{}}
                                onPress={() => {
                                    if (screen.state.dropZoneValues.length >= 3) {
                                        console.log("hiii")
                                    } else {
                                        screen.state.disabledvolumshot4 ? screen.setState({ disabledvolumshot4: false }) : screen.setState({ disabledvolumshot4: true })
                                        let index = screen.state.dropZoneValues.includes(4)
                                        if (index) {
                                            screen.state.dropZoneValues.pop(4)
                                        } else {
                                            screen.state.dropZoneValues.push(4)
                                        }
                                        console.log(screen.state.dropZoneValues)
                                    }
                                }}
                                height={70}
                                width={104}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                        </Animated.View>
                        {/* :
                            <VolumeSlot
                                icon={
                                    <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: screen.state.disabledvolumshot4 ? colors.superLightBlueGrey : colors.orange }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{}}
                                onPress={() => {
                                    if (screen.state.dropZoneValues.length >= 3) {
                                        console.log("hiii")
                                    } else {
                                        screen.state.disabledvolumshot4 ? screen.setState({ disabledvolumshot4: false }) : screen.setState({ disabledvolumshot4: true })
                                        let index = screen.state.dropZoneValues.includes(4)
                                        if (index) {
                                            screen.state.dropZoneValues.pop(4)
                                        } else {
                                            screen.state.dropZoneValues.push(4)
                                        }
                                        console.log(screen.state.dropZoneValues)
                                    }
                                }}
                                height={70}
                                width={104}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                        } */}
                        {/* {screen.state.dropZoneValues.length === 3 && !screen.state.disabledvolumshot5 ? */}
                        <Animated.View style={{
                            transform: [{ translateX: screen.fifthpan.x }, { translateY: screen.fifthpan.y }]
                            // transform: [{ translateX: screen.state.disabled ? !screen.state.dropZoneValues.includes(3) ? 55 : !screen.state.dropZoneValues.includes(2) ? -55 : -168 : screen.pan.x }, { translateY: screen.state.disabled ? -233 : screen.pan.y }]
                        }}
                            {...screen.fifthpanResponder.panHandlers}>
                            <VolumeSlot
                                icon={
                                    <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: screen.state.disabledvolumshot5 ? colors.orange : colors.white }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{ backgroundColor: !screen.state.disabledvolumshot5 ? "#fcdc58" : "white" }}
                                onPress={() => {
                                    if (screen.state.dropZoneValues.length >= 3) {
                                        console.log("hiii")
                                    } else {
                                        screen.state.disabledvolumshot5 ? screen.setState({ disabledvolumshot5: false }) : screen.setState({ disabledvolumshot5: true })
                                        let index = screen.state.dropZoneValues.includes(5)
                                        if (index) {
                                            screen.state.dropZoneValues.pop(5)
                                        } else {
                                            screen.state.dropZoneValues.push(5)
                                        }
                                        console.log(screen.state.dropZoneValues)
                                    }
                                }}
                                height={70}
                                width={104}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                        </Animated.View>
                        {/* :
                            <VolumeSlot
                                icon={
                                    <Image style={{ resizeMode: 'contain', height: 18, width: 18, tintColor: screen.state.disabledvolumshot5 ? colors.superLightBlueGrey : colors.orange }} source={require('../../../assets/images/VectorbigVol.png')}></Image>
                                }
                                otherStyle={{}}
                                onPress={() => {
                                    if (screen.state.dropZoneValues.length >= 3) {
                                        console.log("hiii")
                                    } else {
                                        screen.state.disabledvolumshot5 ? screen.setState({ disabledvolumshot5: false }) : screen.setState({ disabledvolumshot5: true })
                                        let index = screen.state.dropZoneValues.includes(5)
                                        if (index) {
                                            screen.state.dropZoneValues.pop(5)
                                        } else {
                                            screen.state.dropZoneValues.push(5)
                                        }
                                        console.log(screen.state.dropZoneValues)
                                    }
                                }}
                                height={70}
                                width={104}
                                backgroundColor={colors.white}
                            ></VolumeSlot>
                        } */}
                        <View style={{ width: (104 / 2) - 16 }}></View>


                    </View>
                </View>
                <WideButton
                    title='Try'
                    backgroundColor={lightTheme.confirmationButtonColor}
                    textColor={lightTheme.confirmationButtonTextColor}
                    onPress={() => screen.showNextLessons()}
                    containerStyle = {{marginTop : 42}}
                    icon={
                        <Icon
                            name='arrow-long-right'
                            type='entypo'
                            color={colors.white}
                            size={30} 
                            style={{ marginTop: 1,marginLeft : 8 }}
                        />
                    }
                />
</View>
</Animated.ScrollView>
            {/* </ScrollView> */}

        </View >
    )
}
