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
    exercise: {
        isCompleted: boolean,
        isNext: boolean,
        index : number,
        name : ''
    },
    isFirstTime : boolean,
    onPress: Function,
    leftImage : string
}

const ExerciseCard = (props: Props) => {

    function renderRightAccesory() {
        if (props.exercise.isNext) {
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
                    disabled={!props.exercise.isNext && !props.exercise.isCompleted}
                />
            )
        } else {
            if (!props.exercise.isCompleted) {
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
        switch (props.exercise.index % 6) {
            case 1:
                return (
                    <ImageSlot
                        height={56}
                        width={56}
                        img={Images.small_1}
                    ></ImageSlot>
                )
                break;
                case 2:
                    return (
                        <ImageSlot
                            height={56}
                            width={56}
                            img={Images.small_2}
                        ></ImageSlot>
                    )
                    break;
                    case 3:
                return (
                    <ImageSlot
                        height={56}
                        width={56}
                        img={Images.small_3}
                    ></ImageSlot>
                )
                break;
                case 4:
                return (
                    <ImageSlot
                        height={56}
                        width={56}
                        img={Images.small_4}
                    ></ImageSlot>
                )
                break;
                case 5:
                return (
                    <ImageSlot
                        height={56}
                        width={56}
                        img={Images.small_5}
                    ></ImageSlot>
                )
                break;
                case 6:
                return (
                    <ImageSlot
                        height={56}
                        width={56}
                        img={Images.small_6}
                    ></ImageSlot>
                )
                break;
            default:
                break;
        }
        // return (
        //     <ImageSlot
        //         height={56}
        //         width={56}
        //         img={require(props.leftImage)}
        //     ></ImageSlot>
        // )
        if (props.exercise.isCompleted) {
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
        if (props.exercise.isCompleted) {
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
        if (props.exercise.isNext) {
            return lightTheme.confirmationButtonColor
        } else {
            if (props.exercise.isCompleted) {
                return colors.white
            } else {
                return lightTheme.disabledButtonColor
            }
        }
    }

    function getCardStyle() {
        if (props.exercise.isNext) {
            return styles.cardHighlighted
        } else {
            return styles.cardNormal
        }
    }

    return (
        <View style={[styles.card]}>
            <ShadowFlex style={props.exercise.isNext ? styles.shadowDisabled : styles.shadowDisabled}>
                <View style={{}}>
                    {renderLeftAccesory()}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{(props.exercise.name)}</Text>
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
        shadowColor: lightTheme.exerciseCardHighlightedShadowColor,
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


export default ExerciseCard;