import { Keyboard, Alert } from 'react-native'
import { SignInPresenter, SignInView } from './presenter';
import { StackActions } from '@react-navigation/native'
import { Field } from '../../../utils/field-validator';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import LoadingView from '../../components/loading-view';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';
import { setItem, IS_LOGGED_IN, USER, API_TOKEN, getItem } from '../../../utils/prefUtils';

export class SignInScreen extends BaseScreen implements SignInView {

    private presenter = new SignInPresenter(this)
    state = {
        email: '',
        password: '',
        emailTextFieldError: undefined,
        passwordTextFieldError: undefined,
        shakeLoginButton: false
    }

    setEmail(email: string) {
        this.setState({ email: email });
    }

    setPassword(password: string) {
        this.setState({ password: password });
    }

    tryToSignIn() {
        Keyboard.dismiss()
        this.setState({ emailTextFieldError: null, passwordTextFieldError: null })
        console.log("email =>", this.state.email)
        this.presenter.signInWithEmailAndPassword(this.state.email, this.state.password)
        // LoadingView.show()

        // this.props.navigation.dispatch(
        //     StackActions.replace('HomeScreen')
        //     // StackActions.replace('StageScreen')
        // )
    }

    handleInvalidFields(invalidFields: { field: Field, error: Error }[]): void {
        // LoadingView.close()
        this.setState({ shakeLoginButton: true })
        setTimeout(() => {
            this.setState({ shakeLoginButton: false })
        }, 1000)
        invalidFields.forEach(invalidField => {
            if (invalidField.field == Field.Email) {
                this.setState({ emailTextFieldError: invalidField.error.message })
            }
            if (invalidField.field == Field.Password) {
                this.setState({ passwordTextFieldError: invalidField.error.message })
            }
        })
    }

    showErrorAlert(error: string) {
        // LoadingView.close(() => {
            super.showErrorAlert(error)
        // })
    }

    async apiLogin() {
        console.log("in apilogin")
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.signIn
        let params = { 'email': this.state.email, 'password': this.state.password }
        try {
            let response = await network.post(endPoint, params)
            console.log("Login response ==>", response)
            console.log("Login response Token ==>", response.accessToken)
            setItem(IS_LOGGED_IN, "1")
            setItem(API_TOKEN, "Bearer " + response.accessToken)
            setItem(USER, JSON.stringify(response))
            // LoadingView.close(() => {
                console.log("Loading view closed")
                // StackActions.replace('HomeScreen')
                // this.props.navigation.dispatch(
                //     StackActions.replace('HomeScreen')
                //     // StackActions.replace('StageScreen')
                // )
                this.apiGetLearner()
            // })
            // this.goToHomeScreen()
        } catch (error) {
            // LoadingView.close()
            console.log("Login Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
            // this.goToNextPage()
            this.showErrorAlert(error)
        }
    }
    async apiGetLearner() {
        console.log("in api get learner")
        const token = await getItem(API_TOKEN)
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.getLearner
        let params = {}
        try {
            let response = await network.get(endPoint, params, token)
            console.log("learner response ==>", response)
            if (response.length > 0) {
                this.goToHomeScreen()
            } else {
                this.goToNextPage()
            }

        } catch (error) {
            console.log("learner Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }

    }
    goToNextPage() {
        console.log("going to add learner ==>")
        this.props.navigation.dispatch(
            StackActions.replace('LearnerGuideScreen')

        )

    }
    goToHomeScreen() {
        console.log("going to learner list ==>")
        // LoadingView.close(() => {
        //     StackActions.replace('MyLearnersScreen')
        // })
        this.props.navigation.dispatch(
            StackActions.replace('MyLearnersScreen')

        )
    }

    goToForgotPassworScreen() {
        this.props.navigation.dispatch(
            StackActions.push('ForgotPasswordScreen')
        )
    }
    showPreviousLessons() {
        this.props.navigation.goBack()
    }
    render() {
        return layout(this)
    }
}
