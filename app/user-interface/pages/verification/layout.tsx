import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text } from 'react-native';
import TextField from '../../components/text-field';
import WideButton from '../../components/wide-button';
import ClearButton from '../../components/clear-button';
import lightTheme from '../../styles/themes/light-theme';
import { VerificationScreen } from './screen';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationView from '../../components/NavigationView';

export default function (screen: VerificationScreen) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle='dark-content' backgroundColor={lightTheme.screenBackgroundColor} />
            <NavigationView
                otherStyle={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}
                title=""
                onPress={() => screen.showPreviousLessons()}
                progress={0.67}
            ></NavigationView>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                extraScrollHeight={100}
                keyboardOpeningTime={10}
                style={styles.scrollView}
            >
                <View style={styles.contentView}>
                    <Text style={styles.welcomeText} >Verification</Text>
                    <Text style={styles.normalText} >We have sent you a 4-digit code to the email address you provided.</Text>
                    <View style={{ marginTop: 20 }}></View>
                    <Text style={styles.normalText} >Please enter the code in the box below</Text>
                    <TextField
                        keyboardType='default'
                        autoCompleteType='off'
                        autoCapitalize='none'
                        autoCorrect={false}
                        containerStyle={styles.emailTextField}
                        title='Verification Code'
                        placeholder=''
                        error={screen.state.emailTextFieldError}
                        onChangeText={(text) => screen.setCode(text)}
                    />

                    <View style={{ marginTop: 30 }}></View>
                    <WideButton
                        title='Done'
                        backgroundColor={lightTheme.confirmationButtonColor}
                        textColor={lightTheme.confirmationButtonTextColor}
                        shake={screen.state.shakeNextButton}
                        onPress={() => screen.checkValidation()}
                    />
                    <ClearButton
                        title={'Resend my code'}
                        containerStyle={styles.forgotPasswordButton}
                        // onPress={() => screen.goToNextPage()}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}