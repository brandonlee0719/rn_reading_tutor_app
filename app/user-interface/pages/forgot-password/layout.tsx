
import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text } from 'react-native';
import TextField from '../../components/text-field';
import WideButton from '../../components/wide-button';
import lightTheme from '../../styles/themes/light-theme';
import {ForgotPasswordScreen} from './screen';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function (screen: ForgotPasswordScreen) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle='dark-content' backgroundColor={lightTheme.screenBackgroundColor}/>
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
                    <Text style={styles.forgotPasswordText} >Forgot Password?</Text>
                    <Text style={styles.descriptionText} >Don't worry. We will send you an email with a link to reset your password.</Text>
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
                    <WideButton 
                        title='Send Email' 
                        backgroundColor={lightTheme.confirmationButtonColor}
                        textColor={lightTheme.confirmationButtonTextColor}
                        loading={screen.state.showSpinner}
                        shake={screen.state.shakeLoginButton}
                        onPress={() => screen.checkValidation()}
                    />                
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}