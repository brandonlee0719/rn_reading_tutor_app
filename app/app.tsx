
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LaunchScreen } from './user-interface/pages/splash/launch-screen'
import { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types'
import { SignInScreen } from './user-interface/pages/sign-in/screen'
import { SignUpScreen } from './user-interface/pages/sign-up/screen'
import { BasicInfoScreen } from './user-interface/pages/basic-info/screen'
import { AccountDetailsScreen } from './user-interface/pages/account-details/screen'
import { ResetPasswordScreen } from './user-interface/pages/reset-password/screen'
import { VerificationScreen } from './user-interface/pages/verification/screen'
import { LearnerGuideScreen } from './user-interface/pages/learner-guide/screen'
import { AddLearnerScreen } from './user-interface/pages/add-learner/screen'
import { LearnerDetailsScreen } from './user-interface/pages/learner-details/screen'
import { MyLearnersScreen } from './user-interface/pages/my-learner/screen'
import { ForgotPasswordScreen } from './user-interface/pages/forgot-password/screen'
import { LearnerWelcomeScreen } from './user-interface/pages/learner-welcome/screen'
import lightTheme from './user-interface/styles/themes/light-theme'
import Device from 'react-native-device-detection'
import AlertView from './user-interface/components/alert-view'
import AlertResult from './user-interface/components/alert-result'
import LoadingView from './user-interface/components/loading-view'
import { HomeScreen } from './user-interface/pages/home/screen'
import { StageScreen } from './user-interface/pages/stage/screen'
import { InstructionsScreen } from './user-interface/pages/Instructions/screen'
import { ExampleScreen } from './user-interface/pages/example/screen'
import font from './constants/font'
import colors from './constants/colors'
import ClearButton from './user-interface/components/clear-button'
import { SoundMatchScreen } from './user-interface/pages/sound-match/screen'
import { ComprehensionScreen } from './user-interface/pages/comprehension/screen'
import { SoundMatchTextScreen } from './user-interface/pages/sound-match-text/screen'
import { VisualMatchScreen } from './user-interface/pages/visual-match/screen'
import { AuditoryVisualMatchScreen } from './user-interface/pages/auditory-visual-match/screen'
import { WordBuilderScreen } from './user-interface/pages/word-builder/screen'
import { WordBuilderLetterScreen } from './user-interface/pages/word-builder-letter/screen'
import { ComprehensionQuestionScreen } from './user-interface/pages/comprehension-question/screen'
import { DragView } from './user-interface/pages/DragView'

const Stack = createStackNavigator()
const navigationAppearance: StackNavigationOptions = {
  headerTransparent: true,
  headerBackTitle: ' ',
  headerTintColor: lightTheme.navigationTintColor,
  headerTitleAlign: 'center',
  headerTitleStyle: { fontFamily: font.fontBold, fontSize: 20, color: colors.navigationtitle }
}

function RootStackNavigator() {
  return (
    <Stack.Navigator screenOptions={navigationAppearance}>

      <Stack.Screen name="LaunchScreen" component={LaunchScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="BasicInfoScreen" component={BasicInfoScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="LearnerGuideScreen" component={LearnerGuideScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="AddLearnerScreen" component={AddLearnerScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="LearnerDetailsScreen" component={LearnerDetailsScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="MyLearnersScreen" component={MyLearnersScreen} options={{
        headerShown: false,
      }} />

      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{
        headerShown: true,
        title: ''
      }} />

      <Stack.Screen name="LearnerWelcomeScreen" component={LearnerWelcomeScreen} options={{
        headerShown: true,
        title: ''
      }} />


      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="StageScreen" component={StageScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="InstructionsScreen" component={InstructionsScreen} options={{
        headerShown: false,
        // title: "Instructions",
      }} />
      <Stack.Screen name="ExampleScreen" component={ExampleScreen} options={{
        headerShown: false,
        // title: "Example",
      }} />
      
      <Stack.Screen name="SoundMatchScreen" component={SoundMatchScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="SoundMatchTextScreen" component={SoundMatchTextScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="VisualMatchScreen" component={VisualMatchScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="AuditoryVisualMatchScreen" component={AuditoryVisualMatchScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="WordBuilderScreen" component={WordBuilderScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="WordBuilderLetterScreen" component={WordBuilderLetterScreen} options={{
        headerShown: false
      }} />

      <Stack.Screen name="ComprehensionScreen" component={ComprehensionScreen} options={{
        headerShown: true,
        title: "",
      }} />

      <Stack.Screen name="DragView" component={DragView} options={{
        headerShown: false
      }} />
      <Stack.Screen name="ComprehensionQuestionScreen" component={ComprehensionQuestionScreen} options={{
        headerShown: false,
      }} />


    </Stack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
      <AlertView />
      <AlertResult/>
      <LoadingView />
    </NavigationContainer>
  )
}

export default App;
