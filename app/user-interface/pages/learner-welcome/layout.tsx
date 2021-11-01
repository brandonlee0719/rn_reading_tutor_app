
import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text } from 'react-native';
import TextField from '../../components/text-field';
import WideButton from '../../components/wide-button';
import lightTheme from '../../styles/themes/light-theme';
import { LearnerWelcomeScreen } from './screen';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function (screen: LearnerWelcomeScreen) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle='dark-content' backgroundColor={lightTheme.screenBackgroundColor} />
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                extraScrollHeight={100}
                keyboardOpeningTime={10}
                style={styles.scrollView}
            >
                <View style={styles.contentView}>
                    <Text style={styles.welcomeText} > Hi {screen.state.name}  ,</Text>
                    <Text style={styles.normalText} >Are you ready to learn?</Text>
                    <View style={{ marginTop: 30 }}></View>
                    <Image
                        style={styles.image}
                        source={require('../../../assets/images/img-welcome.png')}
                    />
                    <View style={{ marginTop: 30 }}></View>
                    <WideButton
                        title='Start'
                        backgroundColor={lightTheme.confirmationButtonColor}
                        textColor={lightTheme.confirmationButtonTextColor}
                        onPress={() => screen.goToNextPage()}
                    />
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}