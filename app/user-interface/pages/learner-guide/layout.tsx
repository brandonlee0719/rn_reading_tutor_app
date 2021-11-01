import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text } from 'react-native';
import TextField from '../../components/text-field';
import WideButton from '../../components/wide-button';
import ClearButton from '../../components/clear-button';
import lightTheme from '../../styles/themes/light-theme';
import { LearnerGuideScreen } from './screen';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationView from '../../components/NavigationView';

export default function (screen: LearnerGuideScreen) {
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
                    <Text style={styles.welcomeText} >Welcome,</Text>
                    <View style={styles.textContentView}>
                        <Text style={styles.normalText} >To get started, lets add your learner</Text>
                    </View>
                    {/* <View style={styles.textContentView}>
                        <Text style={styles.normalText} >2. </Text>
                        <Text style={styles.normalText} >xyz</Text>
                    </View>
                    <View style={styles.textContentView}>
                        <Text style={styles.normalText} >3. </Text>
                        <Text style={styles.normalText} >Please include the full name of your name (used for registration) in the payment detail.</Text>
                    </View>
                    <View style={styles.textContentView}>
                        <Text style={styles.normalText} >4. </Text>
                        <Text style={styles.normalText} >You will receive an email when your payment has been confirmed and you are able to add the details of your learner.</Text>
                    </View> */}

                    <View style={{ marginTop: 30 }}></View>
                    <WideButton
                        title='Add a new learner +'
                        backgroundColor={lightTheme.confirmationButtonColor}
                        textColor={lightTheme.confirmationButtonTextColor}
                        shake={screen.state.shakeNextButton}
                        onPress={() => screen.goToNextPage()}
                    />
                    {/* <ClearButton
                        title={'Contact Us'}
                        containerStyle={styles.forgotPasswordButton}
                        onPress={() => screen.goToNextPage()}
                    /> */}
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}