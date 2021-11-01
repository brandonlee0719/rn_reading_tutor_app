import { Keyboard } from 'react-native'
import { ResetPasswordPresenter, ResetPasswordView } from './presenter';
import { StackActions } from '@react-navigation/native'
import { Field } from '../../../utils/field-validator';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import LoadingView from '../../components/loading-view';
import { setItem, IS_LOGGED_IN, API_TOKEN, USER } from '../../../utils/prefUtils';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';

export class ResetPasswordScreen extends BaseScreen implements ResetPasswordView {

    private presenter = new ResetPasswordPresenter(this)
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        verificationCode: '',
        emailTextFieldError: undefined,
        passwordTextFieldError: undefined,
        confirmPasswordTextFieldError: undefined,
        shakeNextButton: false,
    }

    componentDidMount = async () => {
        this.getdata()
    }

    getdata = async () => {
        console.log("email fromm last screen", this.props.route.params.email)
        this.setState({ email: this.props.route.params.email })
        this.setEmail(this.props.route.params.email)
    }

    setCode(code: string) {
        this.setState({ verificationCode: code });
    }

    setEmail(email: string) {
        this.setState({ email: email });
    }

    setPassword(password: string) {
        this.setState({ password: password });
    }

    setConfirmPassword(confirmPassword: string) {
        this.setState({ confirmPassword: confirmPassword });
    }

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

    checkValidation() {
        if (this.state.email.isEmpty()) {
            this.showErrorAlert("please enter email")
        }
        else if (!this.state.email.isEmail()) {
            this.showErrorAlert("please enter valid email")
        }
        else if (this.state.verificationCode.isEmpty()) {
            this.showErrorAlert("please enter verification code")
        }
        else if (this.state.password.isEmpty()) {
            this.showErrorAlert("please enter password")
        }
        else if (this.state.confirmPassword.isEmpty()) {
            this.showErrorAlert("please enter confirm password")
        }
        else if (this.state.confirmPassword != this.state.password) {
            this.showErrorAlert("confirm password must be same as password")
        }
        else {
            this.apiResetPassword()
        }
    }
    async apiResetPassword() {
        console.log("in api ResetPassword")
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.setPassword
        // let params = { 'email': this.state.email, 'password': this.state.password }
        let params = {
            'code': this.state.verificationCode,
            'email': this.state.email,
            'newPassword': this.state.password
          }
        try {
            console.log("ResetPassword params ==>", params)
            let response = await network.post(endPoint, params)
            console.log("ResetPassword response ==>", response)
            // console.log("Signup response Token ==>", response.accessToken)
            // setItem(IS_LOGGED_IN, "1")
            // setItem(API_TOKEN, "Bearer " + response.accessToken)
            // setItem(USER, JSON.stringify(response))
            // LoadingView.close(() => {
                // console.log("Loading view closed")
                // StackActions.replace('HomeScreen')
                this.showSuccessAlert("Password reset successfully")
                this.goToNextPage()
                // this.props.navigation.dispatch(
                //     StackActions.replace('HomeScreen')
                //     // StackActions.replace('StageScreen')
                // )
            // })
            // this.goToHomeScreen()
        } catch (error) {
            console.log("ResetPassword Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }

    } 

    goToNextPage() {
        this.props.navigation.dispatch(
            StackActions.replace('SignUpScreen')
        )

    }

    showPreviousLessons() {
        this.props.navigation.goBack()
    }
    

    render() {
        return layout(this)
    }
}
