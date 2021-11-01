import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import Device from 'react-native-device-detection';
import { Icon } from 'react-native-elements';
import lightTheme from '../styles/themes/light-theme';
import SmallButton from './small-button';
import { ShadowFlex } from 'react-native-neomorph-shadows'
import ImageSlot from './image-view';
import colors from '../../constants/colors';
import Images from '../../constants/Images';

interface Props {
    Learner: {
        isCompleted: boolean,
        isNext: boolean,
        index: number,
        name: ''
    },
    isFirstTime: boolean,
    onPress: Function
}

const LearnerCard = (props: Props) => {

    function renderRightAccesory() {
        if (props.Learner.isNext) {
            return (
                <SmallButton icon={
                    <Icon
                        name='arrow-long-right'
                        type='entypo'
                        color={lightTheme.confirmationButtonIconColor}
                        size={30}
                        style={{ marginTop: 1 }}
                    />
                }
                    onPress={props.onPress}
                    backgroundColor={getButtonColor()}
                    disabled={!props.Learner.isNext && !props.Learner.isCompleted}
                />
            )
        } else {
            if (!props.Learner.isCompleted) {
                return (
                    <SmallButton icon={
                        <Icon
                            name='lock'
                            type='material'
                            color={lightTheme.disabledButtonIconColor}
                            size={33}
                        />
                    }
                        onPress={() => console.log()}
                        backgroundColor={getButtonColor()}
                        disabled={!props.exercise.isNext && !props.exercise.isCompleted}
                    />
                )
            } else {
                return (
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
                )
            }

            return null
        }
    }

    function renderLeftAccesory() {
        return (
            // <ImageSlot
            //     height={56}
            //     width={56}
            //     borderRadius={28}

            // ></ImageSlot>
            <Image
                style={styles.image}
                source={Images.glasses_false_tie_false}
            />
        )
        if (props.Learner.isCompleted) {
            return (
                <ImageSlot
                    height={48}
                    width={48}
                ></ImageSlot>
            )
        } else {
            return (
                <Image
                    style={styles.image}
                    source={require('../../assets/images/img-lesson-placeholder.png')}
                />
            )
        }
    }

    function renderDescriptionPart() {
        if (props.Learner.isCompleted) {
            return (
                <View style={styles.facesContainer}>
                    <View style={styles.faceCountContainer}>
                        <Icon
                            name='mood'
                            type='material'
                            color={lightTheme.exerciseCardMoodFaceIconColor}
                            size={17}
                        />
                        <Text style={styles.countText}>11</Text>
                    </View>
                    <View style={styles.faceCountContainer}>
                        <Icon
                            name='sentiment-satisfied-alt'
                            type='material'
                            color={lightTheme.exerciseCardSatisfiedFaceIconColor}
                            size={17}
                        />
                        <Text style={styles.countText}>3</Text>
                    </View>
                    <View style={styles.faceCountContainer}>
                        <Icon
                            name='sentiment-satisfied'
                            type='material'
                            color={lightTheme.exerciseCardNotVerySatisfiedFaceIconColor}
                            size={17}
                        />
                        <Text style={styles.countText}>2</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <Text style={styles.description}>Pick the same sounds</Text>
            )
        }
    }

    function getButtonColor() {
        if (props.Learner.isNext) {
            return lightTheme.confirmationButtonColor
        } else {
            if (props.Learner.isCompleted) {
                return colors.white
            } else {
                return lightTheme.disabledButtonColor
            }
        }
    }

    function getCardStyle() {
        if (props.Learner.isNext) {
            return styles.cardHighlighted
        } else {
            return styles.cardNormal
        }
    }

    return (
        <View style={[styles.card]}>
            <ShadowFlex style={props.Learner.isNext ? styles.shadowEnabled : styles.shadowDisabled}>
                <View style={{}}>
                    {renderLeftAccesory()}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{(props.Learner.name)}</Text>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    {renderRightAccesory()}
                </View>
            </ShadowFlex>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        minHeight: 60,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 15,
        marginTop: 4,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: '#ccc'
    },
    shadowEnabled: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowColor: lightTheme.textFieldTitleColor,
        shadowRadius: 5,
        borderRadius: 8,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 12
    },
    shadowDisabled: {
        flexDirection: 'row',
        padding: 12
    },
    image: {
        height: 65,
        width: 65
    },
    textContainer: {
        flex: 3,
        marginHorizontal: 12,
        alignSelf: 'center'
    },
    title: {
        fontFamily: 'Cadman-Bold',
        fontSize: 16,
        color: lightTheme.titleTextColor
    },
    description: {
        fontFamily: Device.isIos ? 'Cadman' : 'Cadman-Regular',
        fontSize: 14,
        color: lightTheme.descriptionTextColor,
    },
    facesContainer: {
        flexDirection: 'row',
        marginTop: 6,
    },
    faceCountContainer: {
        flexDirection: 'row',
        marginRight: 16
    },
    countText: {
        fontFamily: 'Quicksand',
        fontSize: 14,
        color: lightTheme.descriptionTextColor,
        marginLeft: 4
    }
})


export default LearnerCard;