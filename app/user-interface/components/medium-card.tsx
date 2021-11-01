import React from 'react';
import { Image, StyleSheet, View, FlatList, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import colors from '../../constants/colors';
import font from '../../constants/font';
import lightTheme from '../styles/themes/light-theme';
import ImageSlot from './image-view';
import SmallButton from './small-button';
import WideButton from './wide-button';

interface Props {
    height: number
    width: number
    backgroundColor: string
    otherStyle: object
    borderRadius: number
    data: [{
        isCompleted: boolean,
        isCurrent: boolean,
    }]
}

const MediumCard = (props: Props) => {

    function renderRightAccesory(data: {
        isCompleted: boolean,
        isCurrent: boolean,
    }) {
        if (data.isCurrent) {
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
                    height={48}

                    backgroundColor={getButtonColor(data)}
                />
            )
        } else {
            if (!data.isCompleted && !data.isCurrent) {
                return (
                    <Image source={require('../../assets/images/Vectorlock.png')}></Image>
                )
            } else {
                return (
                    <Button
                        icon={
                            <Icon
                                name='star'
                                type='antdesign'
                                color={colors.white}
                                size={16}


                            />

                        }
                        style={{ backgroundColor: colors.orange }}
                        buttonStyle={{ backgroundColor: colors.orange }}
                        containerStyle={{ height: 32, width: 32, borderRadius: 16, }}
                    >
                    </Button>
                )
            }

            return null
        }
    }

    function getButtonColor(data: {
        isCompleted: boolean,
        isCurrent: boolean,
    }) {
        if (data.isCompleted) {
            return colors.orange
        } else {
            if (data.isCurrent) {
                return colors.orange
            } else {
                return lightTheme.disabledButtonColor
            }
        }
    }

    return (
        <Neomorph
            swapShadows
            inner
            style={{
                shadowOffset: { width: 1, height: -3 },
                shadowOpacity: 0.3,
                shadowColor: '#fff',
                shadowRadius: 3,
                borderRadius: props.borderRadius,
                backgroundColor: props.backgroundColor,
                width: props.width,
                height: props.height,
                overflow: 'hidden',
                alignItems: 'center',
                ...props.otherStyle
            }}
        >
            <View style={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16, marginTop: 8 }}>
                <ImageSlot
                    height={50}
                    width={50}
                ></ImageSlot>
                <View style={{
                    flex: 1,
                    marginStart: 20
                }}>
                    <Text style={styles.levelFont}>Level 1 - a</Text>
                    <Text style={styles.letterSoundFont}>Letter Sound Match</Text>
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <ImageSlot
                            height={36}
                            width={36}
                            otherStyle={{}}
                        ></ImageSlot>
                        <ImageSlot
                            height={36}
                            width={36}
                            otherStyle={{ marginHorizontal: 8, }}
                        ></ImageSlot>
                        <ImageSlot
                            height={36}
                            width={36}
                            otherStyle={{}}
                        ></ImageSlot>
                    </View>
                    <FlatList
                        style={{ marginTop: 0 }}
                        scrollEnabled={false}
                        data={props.data}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center', height: 48 }}>
                                <Text style={styles.lblStep}>Step 1</Text>
                                <View style = {{ alignItems : 'center',width : 58}}>
                                    {renderRightAccesory(item)}
                                </View>
                            </View>
                        )}
                    ></FlatList>
                </View>


            </View>



        </Neomorph>
    )
}

MediumCard.defaultProps = {
    width: 343,
    height: 300,
    backgroundColor: colors.white,
    otherStyle: {},
    borderRadius: 8,
    data: [
        {
            isCurrent: false,
            isCompleted: true
        },
        {
            isCurrent: true,
            isCompleted: true
        },
        {
            isCurrent: false,
            isCompleted: false
        }
    ]
};
const styles = StyleSheet.create({

    levelFont: {
        fontFamily: font.fontBold,
        fontSize: 16,
        color: colors.superLightBlueGrey
    },
    letterSoundFont: {
        fontFamily: font.fontRegular,
        fontSize: 14,
        color: colors.blueGrey
    },
    lblStep: {
        fontFamily: font.fontRegular,
        fontSize: 16,
        flex: 1,
        color: colors.blueGrey
    }

})


export default MediumCard;