import React from 'react';
import { Dimensions, Image, StyleProp, ViewStyle, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';
import colors from '../../constants/colors';
import font from '../../constants/font';
import lightTheme from '../styles/themes/light-theme';
import ImageSlot from './image-view';
import SmallButton from './small-button';
import WideButton from './wide-button';
import Images from '../../constants/Images';

const screenWidth = Dimensions.get('window').width

interface Props {
    otherStyle?: StyleProp<ViewStyle>
    isFirstTime: boolean
    onPress: () => void
    title?: String
    sub_title?: String
    count?: Number
}

const LargeCard = (props: Props) => {
    return (
        <Neomorph
            swapShadows
            inner
            style={{
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.25,
                shadowColor: '#fff',
                shadowRadius: 3,
                borderRadius: 8,
                backgroundColor: colors.white,
                width: screenWidth - 40,
                height: 400,
                overflow: 'hidden',
                alignItems: 'center',
                ...props.otherStyle
            }}
        >
            <View style={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16 }}>

                <View style={{
                    flex: 1
                }}>
                    <Text style={styles.levelFont}>{props.title}</Text>
                    <Text style={styles.letterSoundFont}>{props.sub_title}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 4, }}>
                    {/* <ImageSlot
                        height={40}
                        width={40}
                        otherStyle={{backgroundColor: colors.white, color: colors.white,}}
                        img= {Images.fish_grey}
                    ></ImageSlot> */}

                    {/* <ImageSlot
                        height={40}
                        width={40}
                        otherStyle={{ marginHorizontal: 8, }}
                        img= {Images.fish_grey}
                    ></ImageSlot>
                    <ImageSlot
                        height={40}
                        width={40}
                        otherStyle={{}}
                        img= {Images.fish_grey}
                    ></ImageSlot> */}
                    <Text style={styles.primaryNumber}>{props.count} </Text>
                    <Image
                        style={styles.image}
                        source={Images.fish_orange}
                    />
                    {/* <View style={{ marginLeft: 5 }}></View>
                    <Image
                        style={styles.image}
                        source={Images.fish_grey}
                    />
                    <View style={{ marginLeft: 5 }}></View>
                    <Image
                        style={styles.image}
                        source={Images.fish_grey}
                    /> */}
                </View>

            </View>
            <ImageSlot
                height={253}
                width={253}
                otherStyle={{ alignSelf: 'center', marginTop: 8 }}
                img={Images.big_1}
            ></ImageSlot>

            <WideButton
                backgroundColor={colors.orange}
                title={props.isFirstTime ? "Let’s Start" : "Continue"}
                containerStyle={{ marginTop: 8, alignSelf: 'stretch', width: screenWidth - 40 - 32 }}
                textColor={colors.white}
                onPress={props.onPress}
                icon={
                    <Icon
                        name='arrow-long-right'
                        type='entypo'
                        color={colors.white}
                        size={30}
                        style={{ marginTop: 1, marginLeft: 10 }}
                    />
                }
            ></WideButton>
        </Neomorph>
    )
}

LargeCard.defaultProps = {

};

const styles = StyleSheet.create({

    levelFont: {
        fontFamily: font.fontRegular,
        fontSize: 14,
        color: colors.superLightBlueGrey
    },
    letterSoundFont: {
        fontFamily: font.fontBold,
        fontSize: 24,
        color: colors.navigationtitle
    },
    image: {
        height: 40,
        width: 40
    },
    primaryNumber : {
        fontFamily: font.fontBold,
        fontSize: 24,
        textAlign: 'right',
        color: colors.orange,
        marginEnd: 8
    },
})

export default LargeCard;