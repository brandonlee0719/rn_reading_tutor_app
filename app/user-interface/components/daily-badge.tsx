import React, { useState } from 'react';
import { Button, IconNode } from 'react-native-elements';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Slot from './slot';
import lightTheme from '../styles/themes/light-theme';
import Device from 'react-native-device-detection';
import SmallButton from './small-button';
import { Icon } from 'react-native-elements';
import colors from '../../constants/colors';

interface Props {
    exercise: {
        day: string
        completed: number, 
        isToday: boolean
    }
    containerStyle?: StyleProp<ViewStyle>
    onPress?: () => void
}

const DailyBadge = (props: Props) => {

    function renderSlotOrStreak() {
        if ((props.exercise.completed != 2)) {
            return (
                <SmallButton
                 icon={
                    <Icon
                        name='star'
                        type='material'
                        color={props.exercise.isToday ? colors.orange : props.exercise.completed == 1 ? lightTheme.streakButtonIconCompleted : lightTheme.streakButtonIconToday}
                        size={20}
                    />
                } 
                    onPress={() => props.onPress?.()}
                    backgroundColor={props.exercise.completed ? lightTheme.streakButtonCompleted : lightTheme.streakButtonToday}
                    height={35}
                />
            )
        } else {
            return (
                <Slot color={lightTheme.streakSlotColor} height={35}/>
            )
        }

    }

    function renderCompleteBadgeIfNeeded() {
        if (props.exercise.completed) {
            return (
                <View style={styles.badge}>
                    <Icon
                        name='done'
                        type='material'
                        color={lightTheme.streakCompletedCheck}
                        size={11}
                        style={{marginTop: 4}}
                    />
                </View>
            )
        }
    }

    return (
        <View style={[props.containerStyle, styles.container]}>
            <View>
                {renderSlotOrStreak()}
                {/* {renderCompleteBadgeIfNeeded()} */}
            </View>
            <Text style={props.exercise.isToday ? styles.dayHighlighted : styles.dayNormal}>{props.exercise.day}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        marginVertical: 10,
        alignItems: 'center'
    },
    dayNormal: {
        fontFamily: Device.isIos ? 'Cadman' : 'Cadman-Regular',
        fontSize: 15,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -0.2, height: 0.2},
        textShadowRadius: 1,
        marginTop: 3
    },
    dayHighlighted: {
        fontFamily: 'Cadman-Bold',
        fontSize: 15,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -0.2, height: 0.2},
        textShadowRadius: 1,
        marginTop: 3
    },
    badge: {
        height: 17, 
        aspectRatio: 1, 
        backgroundColor: 'white', 
        position: 'absolute', 
        borderRadius: 13, 
        top: -5, 
        right: -5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,  
    }
})


export default DailyBadge;