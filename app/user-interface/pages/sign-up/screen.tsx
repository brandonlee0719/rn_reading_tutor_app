import { Keyboard } from 'react-native'
import { SignUpPresenter, SignUpView } from './presenter';
import { StackActions } from '@react-navigation/native'
import { Field } from '../../../utils/field-validator';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import LoadingView from '../../components/loading-view';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';
import { setItem, IS_LOGGED_IN, API_TOKEN, USER } from '../../../utils/prefUtils';

export class SignUpScreen extends BaseScreen implements SignUpView {

    private presenter = new SignUpPresenter(this)
    state = {
        email: '',
        password: '',
        emailTextFieldError: undefined,
        passwordTextFieldError: undefined,
        shakeLoginButton: false
    }

    // setEmail(email: string) {
    //     this.setState({ email: email });
    // }

    // setPassword(password: string) {
    //     this.setState({ password: password });
    // }

    // tryToSignIn() {
    //     //Keyboard.dismiss()
    //     //this.setState({emailTextFieldError: null, passwordTextFieldError: null})      
    //     //this.presenter.signInWithEmailAndPassword(this.state.email, this.state.password)  
    //     //LoadingView.show()      

    //     this.props.navigation.dispatch(
    //         StackActions.replace('HomeScreen')
    //         // StackActions.replace('StageScreen')
    //     )
    // }

    

    goToSignUp() {
        this.props.navigation.dispatch(
            StackActions.push('BasicInfoScreen')
        )
    }

    goToLogin() {
        this.props.navigation.dispatch(
            StackActions.push('SignInScreen')
        )
    }

    

    render() {
        return layout(this)
    }
}
