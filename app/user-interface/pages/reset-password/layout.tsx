import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text } from 'react-native';
import TextField from '../../components/text-field';
import WideButton from '../../components/wide-button';
import ClearButton from '../../components/clear-button';
import lightTheme from '../../styles/themes/light-theme';
import { ResetPasswordScreen } from './screen';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationView from '../../components/NavigationView';

export default function (screen: ResetPasswordScreen) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle='dark-content' backgroundColor={lightTheme.screenBackgroundColor} />
            <NavigationView
                otherStyle={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}
                title=""
                onPress={() => screen.showPreviousLessons()}
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
                    <Text style={styles.welcomeText} >Reset Password</Text>
                    <Text style={styles.normalText} >Create your new password</Text>
                    <TextField
                        keyboardType='email-address'
                        autoCompleteType='email'
                        autoCapitalize='none'
                        autoCorrect={false}
                        containerStyle={styles.emailTextField}
                        title='Email'
                        placeholder='Example: user@example.com'
                        error={screen.state.emailTextFieldError}
                        onChangeText={(text) => screen.setEmail(text)}
                        value={screen.state.email}
                    />
                    <TextField
                        keyboardType='default'
                        autoCompleteType='off'
                        autoCapitalize='none'
                        autoCorrect={false}
                        containerStyle={styles.emailTextField}
                        title='Verification Code'
                        placeholder='Verification Code'
                        error={screen.state.emailTextFieldError}
                        onChangeText={(text) => screen.setCode(text)}
                    />
                    <TextField
                        keyboardType='default'
                        autoCompleteType='off'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        autoCorrect={false}
                        containerStyle={styles.passwordTextField}
                        title='Password'
                        placeholder='Example: abcd1234'
                        error={screen.state.passwordTextFieldError}
                        onChangeText={(text) => screen.setPassword(text)}
                    />
                    <TextField
                        keyboardType='default'
                        autoCompleteType='off'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        autoCorrect={false}
                        containerStyle={styles.passwordTextField}
                        title='Confirm Password'
                        placeholder='Example: abcd1234'
                        error={screen.state.confirmPasswordTextFieldError}
                        onChangeText={(text) => screen.setConfirmPassword(text)}
                    />
                    <View style={{ marginTop: 30 }}></View>
                    <WideButton
                        title='Verify Email'
                        backgroundColor={lightTheme.confirmationButtonColor}
                        textColor={lightTheme.confirmationButtonTextColor}
                        shake={screen.state.shakeNextButton}
                        onPress={() => screen.checkValidation()}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}