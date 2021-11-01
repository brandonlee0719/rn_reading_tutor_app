import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text } from 'react-native';
import TextField from '../../components/text-field';
import WideButton from '../../components/wide-button';
import ClearButton from '../../components/clear-button';
import lightTheme from '../../styles/themes/light-theme';
import { AddLearnerScreen } from './screen';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationView from '../../components/NavigationView';

export default function (screen: AddLearnerScreen) {
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
                    <Text style={styles.welcomeText} >Add a Learner</Text>
                    <Text style={styles.normalText} >We need this basic information</Text>
                    <TextField
                        keyboardType='default'
                        autoCompleteType='off'
                        autoCapitalize='none'
                        autoCorrect={false}
                        containerStyle={styles.emailTextField}
                        title='First Name'
                        placeholder='John'
                        error={screen.state.firstNameTextFieldError}
                        onChangeText={(text) => screen.setFirstName(text)}
                    />
                    <TextField
                        keyboardType='default'
                        autoCompleteType='off'
                        autoCapitalize='none'
                        autoCorrect={false}
                        containerStyle={styles.emailTextField}
                        title='Last Name'
                        placeholder='Doe'
                        error={screen.state.lastNameTextFieldError}
                        onChangeText={(text) => screen.setLastName(text)}
                    />
                    <TextField
                        keyboardType='default'
                        autoCompleteType='off'
                        autoCapitalize='none'
                        autoCorrect={false}
                        containerStyle={styles.emailTextField}
                        title='Birthday'
                        placeholder='yyyy-dd-mm'
                        error={screen.state.countryTextFieldError}
                        onChangeText={(text) => screen.setBirthdate(text)}
                    />
                    <View style={{ marginTop: 30 }}></View>
                    <WideButton
                        title='Next'
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