import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text } from 'react-native';
import TextField from '../../components/text-field';
import WideButton from '../../components/wide-button';
import ClearButton from '../../components/clear-button';
import lightTheme from '../../styles/themes/light-theme';
import { SignInScreen } from './screen';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationViewWithTitle from '../../components/NavigationViewWithTitle';
import NavigationView from '../../components/NavigationView';

export default function (screen: SignInScreen) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle='dark-content' backgroundColor={lightTheme.screenBackgroundColor} />
            {/* <NavigationView
                otherStyle={{ flexDirection: 'row', paddingTop: 16, alignItems: 'center' }}
                title = ""
                onPress={() => screen.showPreviousLessons()}
            ></NavigationView> */}
            <NavigationViewWithTitle
                otherStyle={{ flexDirection: 'row', padding: 16, alignItems: 'center',  }}
                onPress={() => screen.showPreviousLessons()}>

            </NavigationViewWithTitle>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                extraScrollHeight={100}
                keyboardOpeningTime={10}
                style={styles.scrollView}
            >
                <View style={styles.contentView}>
                    <Image
                        style={styles.image}
                        source={require('../../../assets/images/img-welcome.png')}
                    />
                    <Text style={styles.welcomeText} >Welcome Back!</Text>
                    <TextField
                        keyboardType='email-address'
                        autoCompleteType='email'
                        autoCapitalize='none'
                        autoCorrect={false}
                        containerStyle={styles.emailTextField}
                        title='Email / Username'
                        placeholder='Example: user@example.com'
                        error={screen.state.emailTextFieldError}
                        onChangeText={(text) => screen.setEmail(text)}
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
                    <WideButton
                        title='Login'
                        backgroundColor={lightTheme.confirmationButtonColor}
                        textColor={lightTheme.confirmationButtonTextColor}
                        shake={screen.state.shakeLoginButton}
                        onPress={() => screen.tryToSignIn()}
                    />
                    <ClearButton
                        title={'I forgot my password'}
                        containerStyle={styles.forgotPasswordButton}
                        onPress={() => screen.goToForgotPassworScreen()}
                    />

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}