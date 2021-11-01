import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import lightTheme from '../styles/themes/light-theme';
import Modal from 'react-native-modal';
import { Image } from 'react-native-animatable';
import ProgressBar from './progress-bar';

export default class LoadingView extends Component {

    static instance?: LoadingView

    static initialState = {
        visible: false,
        progress: undefined,
    };

    state = LoadingView.initialState
    dismissCallback?: () => void

    constructor(props: any) {
        super(props)
        LoadingView.instance = this
    }

    static show(progress?: number) {
        LoadingView.instance?.makeVisible(progress)
    }

    static close(dismissCallback?: () => void) {
        LoadingView.instance?.hide(dismissCallback)
    }
  
    private makeVisible(progress?: number) {
        this.setState({visible: true, progress: progress})
    }

    private hide(dismissCallback: (() => void) | undefined) {
        this.dismissCallback = dismissCallback
        this.setState(LoadingView.initialState)
    }

    private handleDismiss() {
        this.dismissCallback?.()
    }
  
    render() {
        return (
            <Modal 
                isVisible={this.state.visible} 
                backdropOpacity={1} 
                backdropColor={lightTheme.screenBackgroundColor} 
                style={styles.container} 
                onModalHide={() => this.handleDismiss()}
            >
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/img-ort-logo.png')}
                />
                <ProgressBar progress={this.state.progress}></ProgressBar>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentView: {
        margin: 30
    },
    logo: {
        width: 300,
        height: 80,
        margin: 20
    }
})