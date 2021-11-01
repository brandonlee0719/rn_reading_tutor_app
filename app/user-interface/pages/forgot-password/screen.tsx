import { Keyboard } from 'react-native'
import { ForgotPasswordPresenter, ForgotPasswordView } from './presenter';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';
import { StackActions } from '@react-navigation/native';

export class ForgotPasswordScreen extends BaseScreen implements ForgotPasswordView {

    private presenter = new ForgotPasswordPresenter(this)
    state = {
        email: '',
        emailTextFieldError: undefined,
        showSpinner: false,
        shakeLoginButton: false
    }

    setEmail(email: string) {
        this.setState({ email: email });
    }

    checkValidation() {
        if (this.state.email.isEmpty()) {
            this.showErrorAlert("please enter email")
        }
        else if (!this.state.email.isEmail()) {
            this.showErrorAlert("please enter valid email")
        }
        else {
            this.apiForgotPassword()
        }
    }

    async apiForgotPassword() {
        console.log("in api forgot password")
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.forgotPassword
        let params = { 'email': this.state.email }
        try {
            let response = await network.post(endPoint, params)
            console.log("forgot password response ==>", response)
            this.goToNextPage()

        } catch (error) {
            console.log("forgot password Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }


    }

    goToNextPage() {

        this.props.navigation.dispatch(StackActions.push('ResetPasswordScreen', { email: this.state.email }))

    }

    tryToSendPasswordRevoryEmail() {
        Keyboard.dismiss()
        this.setState({ showSpinner: true, emailTextFieldError: null, passwordTextFieldError: null })
        this.presenter.sendPasswordRecoveryEmailTo(this.state.email)
    }

    handleInvalidEmailWithError(error: Error): void {
        this.setState({ showSpinner: false, shakeLoginButton: true })
        setTimeout(() => {
            this.setState({ shakeLoginButton: false })
        }, 1000)
        this.setState({ emailTextFieldError: error.message })
    }

    showErrorAlert(error: string) {
        this.setState({ showSpinner: false })
        super.showErrorAlert(error)
    }

    showSuccessAlert() {
        console.log('OK, EMAIL SENT');
    }

    render() {
        return layout(this)
    }
}
