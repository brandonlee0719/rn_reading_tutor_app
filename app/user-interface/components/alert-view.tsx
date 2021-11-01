import React, {Component} from 'react';
import { Text, View } from 'react-native-animatable';
import { Dimensions, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Device from 'react-native-device-detection';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable'
import lightTheme from '../styles/themes/light-theme';
import WideButton from './wide-button';

export default class AlertView extends Component {

    static instance: AlertView

    static initialState = {
        visible: false,
        title: '',
        description: '',
        confirmButtonTitle: 'OK',
        cancelButtonAvailable: false,
        cancelButtonTitle: 'Cancel',
        automaticDismiss: true
    };

    state = AlertView.initialState
    confirmationButtonAction?: () => void
    cancelButtonAction?: () => void

    constructor(props: any) {
        super(props)
        AlertView.instance = this
    }
  
    static show(title: string, description: string, confirmButtonTitle: string = 'OK',
                confirmationButtonAction?: () => void, cancelButtonAction?: () => void,
                cancelButtonAvailable: boolean = false, cancelButtonTitle: string = 'Cancel', automaticDismiss: boolean = true) {
        AlertView.instance.makeVisible(title, description, confirmButtonTitle, 
                                        cancelButtonAvailable, cancelButtonTitle, automaticDismiss,
                                        confirmationButtonAction, cancelButtonAction)
    }

    static showBasic(title: string, description: string, confirmButtonTitle: string = 'OK',
                confirmationButtonAction?: () => void, automaticDismiss: boolean = true) {
        AlertView.instance.makeVisible(title, description, confirmButtonTitle, 
                                        false, '', automaticDismiss,
                                        confirmationButtonAction, undefined)
    }

    static close() {
        AlertView.instance.hide()
    }
  
    private makeVisible(title: string, description: string, confirmButtonTitle: string,
                cancelButtonAvailable: boolean, cancelButtonTitle: string, automaticDismiss: boolean,
                confirmationButtonAction?: () => void, cancelButtonAction?: () => void) {
        this.confirmationButtonAction = confirmationButtonAction
        this.cancelButtonAction = cancelButtonAction
        this.setState({ visible: true, title, description, confirmButtonTitle, cancelButtonAvailable, cancelButtonTitle, automaticDismiss })
    }

    private hide() {
        this.confirmationButtonAction = undefined
        this.cancelButtonAction = undefined
        this.setState(AlertView.initialState)
    }

    
    private handleConfirmationButtonAction() {
        this.confirmationButtonAction?.()
        if (this.state.automaticDismiss) {
            this.hide()
        }
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
                <View style={{flex: 1, marginRight: 8}}>
                    <WideButton 
                        title={this.state.cancelButtonTitle} 
                        onPress={() => this.handleCancelButtonAction()} 
                        backgroundColor={lightTheme.cancelButtonColor}
                        textColor={'white'}
                        containerStyle={{alignSelf: 'stretch'}}
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
                    <Text style={styles.description}>{this.state.description}</Text>
                        <View style={styles.buttonContainer}>
                            {this.renderCancelButtonIfNeeded()}
                            <View style={{flex: 1}}>
                                <WideButton 
                                    title={this.state.confirmButtonTitle} 
                                    onPress={() => this.handleConfirmationButtonAction()} 
                                    backgroundColor={lightTheme.confirmationButtonColor}
                                    textColor={lightTheme.confirmationButtonTextColor}
                                    containerStyle={{alignSelf: 'stretch'}}
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
        color: lightTheme.titleTextColor
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
    }
})