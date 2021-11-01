import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text } from 'react-native';
import TextField from '../../components/text-field';
import WideButton from '../../components/wide-button';
import ClearButton from '../../components/clear-button';
import lightTheme from '../../styles/themes/light-theme';
import { SignUpScreen } from './screen';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function (screen: SignUpScreen) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle='dark-content' backgroundColor={lightTheme.screenBackgroundColor} />
            <View style={styles.contentView}>
                {/* <View style={{ marginTop: 100 }}></View> */}
                <View style={styles.centeredContent}>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/images/img-ort-logo.png')}
                    />
                </View>

                <View style={styles.centeredButton}>
                    <WideButton
                        title='Sign Up'
                        backgroundColor={lightTheme.confirmationButtonColor}
                        textColor={lightTheme.confirmationButtonTextColor}
                        shake={screen.state.shakeLoginButton}
                        onPress={() => screen.goToSignUp()}
                    />
                    <View style={{
                        flexDirection : "row",
                        marginTop: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 0,
                        // backgroundColor: lightTheme.descriptionTextDisabledColor
                    }}>
                        <View style={{ borderColor: lightTheme.clearButtonTextColor, borderWidth: 0.5, width: 80 }}></View>
                        <Text style={styles.welcomeText}>or</Text>
                        <View style={{ borderColor: lightTheme.clearButtonTextColor, borderWidth: 0.5, width: 80}}></View>
                    </View>
                    <WideButton
                        title='Login'
                        backgroundColor={lightTheme.neutralButtonColor}
                        textColor={lightTheme.neutralButtonTextColor}
                        shake={screen.state.shakeLoginButton}
                        onPress={() => screen.goToLogin()}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}