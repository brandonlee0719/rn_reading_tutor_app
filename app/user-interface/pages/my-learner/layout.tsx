import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, SectionList, SectionListData } from 'react-native';
import TextField from '../../components/text-field';
import WideButton from '../../components/wide-button';
import ClearButton from '../../components/clear-button';
import lightTheme from '../../styles/themes/light-theme';
import { MyLearnersScreen } from './screen';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationView from '../../components/NavigationView';
import ExerciseCard from '../../components/exercise-card';
import LearnerCard from '../../components/learner-card';
import NavigationViewWithTitle from '../../components/NavigationViewWithTitle';

export default function (screen: MyLearnersScreen) {


    function renderSectionHeader(section: SectionListData<{
        isCompleted: boolean,
        isNext: boolean
    }>) {
        return (
            <Text style={styles.primarySectionHeader}>
                {section.title}
            </Text>
        )
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle='dark-content' backgroundColor={lightTheme.screenBackgroundColor} />
            {/* <NavigationView
                otherStyle={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}
                title=""
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
                    {/* <Text style={styles.welcomeText} >My Learners</Text> */}
                    <View style={styles.lessonsContainer}>
                        <SectionList
                            sections={[{ title: 'My Learners', data: screen.state.nextLessons, index: 0 }]}
                            renderSectionHeader={({ section }) => (
                                renderSectionHeader(section)
                            )}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <LearnerCard Learner={item} onPress={() => screen.goToNextPage(index)} />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    {/* <View style={{ marginTop: 30 }}></View>
                    <Text style={styles.subText} >How to add a new learner</Text>
                    <Text style={styles.normalText} >{'Each learner\n  CAD $89 per/month'}</Text>
                    <Text style={styles.normalText} >{'\ngeneral payment instruction'}</Text> */}
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}