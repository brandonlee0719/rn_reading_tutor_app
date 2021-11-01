import React, { Component } from 'react';
import { Text, View } from 'react-native-animatable';
import { Dimensions, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-elements';
import Device from 'react-native-device-detection';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable'
import lightTheme from '../styles/themes/light-theme';
import WideButton from './wide-button';
import ProgressBar from './progress-bar';
import Images from '../../constants/Images';
import colors from '../../constants/colors';

export default class AlertViewResult extends Component {

    static instance: AlertViewResult

    static initialState = {
        visible: false,
        title: '',
        progress: 0,
        fishCount: 0,
        confirmButtonTitle: 'Go',
        cancelButtonAvailable: false,
        cancelButtonTitle: 'Cancel',
        automaticDismiss: true
    };

    state = AlertViewResult.initialState
    confirmationButtonAction?: () => void
    cancelButtonAction?: () => void

    constructor(props: any) {
        super(props)
        AlertViewResult.instance = this
    }

    static show(title: string, progress: number, fishCount: number, confirmButtonTitle: string = 'Go',
        confirmationButtonAction?: () => void, ) {
        console.log("result alert show")
        AlertViewResult.instance.makeVisible(title, progress, fishCount, confirmButtonTitle,
            confirmationButtonAction)
    }

    // static showBasic(title: string, description: string, confirmButtonTitle: string = 'OK',
    //             confirmationButtonAction?: () => void, automaticDismiss: boolean = true) {
    //     AlertViewResult.instance.makeVisible(title, description, confirmButtonTitle, 
    //                                     false, '', automaticDismiss,
    //                                     confirmationButtonAction, undefined)
    // }

    static close() {
        AlertViewResult.instance.hide()
    }

    private makeVisible(title: string, progress: number, fishCount: number, confirmButtonTitle: string,
        confirmationButtonAction?: () => void) {
        this.confirmationButtonAction = confirmationButtonAction
        this.setState({ visible: true, title, progress, fishCount, confirmButtonTitle })
    }

    private hide() {
        this.confirmationButtonAction = undefined
        this.cancelButtonAction = undefined
        this.setState(AlertViewResult.initialState)
    }

    private handleConfirmationButtonAction() {
        this.confirmationButtonAction?.()
        if (this.state.automaticDismiss) {
            this.hide()
        }
        // this.hide()
    }

    private handleCancelButtonAction() {
        this.cancelButtonAction?.()
        if (this.state.automaticDismiss) {
            this.hide()
        }
    }

    private renderCancelButtonIfNeeded = () => {
        if (this.state.cancelButtonAvailable) {
            return (
                <View style={{ flex: 1, marginRight: 8 }}>
                    <WideButton
                        title={this.state.cancelButtonTitle}
                        onPress={() => this.handleCancelButtonAction()}
                        backgroundColor={lightTheme.cancelButtonColor}
                        textColor={'white'}
                        containerStyle={{ alignSelf: 'stretch' }}
                    />
                </View>
            )
        }
        return null
    }

    render() {
        return (
            <Modal isVisible={this.state.visible} backdropOpacity={0.35}>
                <Animatable.View animation={'bounceInDown'} delay={100} iterationCount={1}>
                    <Card containerStyle={styles.card}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <View style={{ marginTop: 20 }}></View>
                        {this.state.fishCount == 0 ?
                            <View style={{ flexDirection: 'row', marginTop: 2, justifyContent: 'center', marginBottom : 5 }}>
                                <Text style={styles.failedCross}>X</Text>
                            </View>
                            :
                            <View style={{ flexDirection: 'row', marginTop: 4, justifyContent: 'space-between' }}>
                                <View style={styles.image13}>
                                    <Image
                                        style={{ height: 20, width: 30, }}
                                        source={Images.fish_orange}
                                    />
                                </View>
                                <View style={styles.image16}>
                                    <Image
                                        style={{ height: 20, width: 30, }}
                                        source={Images.fish_orange}
                                    />

                                    <Image
                                        style={{ height: 20, width: 30 }}
                                        source={Images.fish_orange}
                                    />
                                </View>
                            </View>
                        }
                        <ProgressBar
                            progress={this.state.progress}
                        ></ProgressBar>
                        <View style={{ marginTop: 20 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {this.state.fishCount == 0 ? <Image
                                style={{ height: 20, width: 30, margin: 10 }}
                                source={Images.fish_grey}
                            /> : null}

                            {this.state.fishCount > 0 ? <Image
                                style={{ height: 20, width: 30, margin: 10 }}
                                source={Images.fish_orange}
                            /> : null}

                            {this.state.fishCount > 1 ? <Image
                                style={{ height: 20, width: 30, margin: 10 }}
                                source={Images.fish_orange}
                            /> : null}
                            {this.state.fishCount > 2 ? <Image
                                style={{ height: 20, width: 30, margin: 10 }}
                                source={Images.fish_orange}
                            /> : null}
                        </View>
                        <View style={{ marginTop: 20 }}></View>
                        <View style={styles.buttonContainer}>
                            {this.renderCancelButtonIfNeeded()}
                            <View style={{ flex: 1 }}>
                                <WideButton
                                    title={this.state.confirmButtonTitle}
                                    onPress={() => this.handleConfirmationButtonAction()}
                                    backgroundColor={lightTheme.confirmationButtonColor}
                                    textColor={lightTheme.confirmationButtonTextColor}
                                    containerStyle={{ alignSelf: 'stretch' }}
                                />
                            </View>
                        </View>
                    </Card>
                </Animatable.View>
            </Modal>
        )
    }
}


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        width: screenWidth * 0.85,
        maxWidth: 350,
        minWidth: 280,
        maxHeight: screenHeight * 0.85,
        minHeight: 180,
        borderRadius: 16,
        paddingVertical: 25,
        paddingHorizontal: 20
    },
    title: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Cadman-Bold',
        fontSize: 20,
        color: lightTheme.titleTextColor,
    },
    failedCross: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Cadman-Bold',
        fontSize: 30,
        color: lightTheme.textFieldErrorColor,
    },
    description: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: Device.isIos ? 'Cadman' : 'Cadman-Regular',
        fontSize: 16,
        color: lightTheme.descriptionTextColor,
        marginTop: 10,
        marginBottom: 40
    },
    buttonContainer: {
        flexDirection: 'row',
        height: 50,
    },
    image13: {
        marginLeft: (300 * 0.80) - 30,
        justifyContent: 'center',
        height: 50,
        width: 40,
    },
    image16: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 0,
        height: 50,
        width: 40,
    }
})