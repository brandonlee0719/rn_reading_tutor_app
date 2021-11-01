import { Keyboard } from 'react-native'
import { VerificationPresenter, VerificationView } from './presenter';
import { StackActions } from '@react-navigation/native'
import { Field } from '../../../utils/field-validator';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import LoadingView from '../../components/loading-view';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';

export class VerificationScreen extends BaseScreen implements VerificationView {

    private presenter = new VerificationPresenter(this)
    state = {
        email: '',
        verificationCode: '',
        emailTextFieldError: undefined,
        passwordTextFieldError: undefined,
        confirmPasswordTextFieldError: undefined,
        shakeNextButton: false
    }
    componentDidMount = async () => {
        this.getdata()
    }

    getdata = async () => {
        this.setState({ email: this.props.route.params.email })
    }
    setCode(code: string) {
        this.setState({ verificationCode: code });
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
        if (this.state.verificationCode.isEmpty()) {
            this.showErrorAlert("please enter verification code")
        }
        else {
            this.apiVerification()
        }
    }
    async apiVerification() {
        console.log("in api Verification")
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.verification
        // let params = { 'email': this.state.email, 'password': this.state.password }
        let params = {
            'email': this.state.email,
            'code': this.state.verificationCode
          }
        try {
            console.log("Verification params ==>", params)
            let response = await network.post(endPoint, params)
            console.log("Verification response ==>", response)
            
                this.goToNextPage()
        } catch (error) {
            console.log("Verification Error ==>", error)
            this.goToNextPage()
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }

    } 

    goToNextPage() {
        this.props.navigation.dispatch(
            // StackActions.push('LearnerGuideScreen')
            StackActions.replace('SignUpScreen')
        )

    }

    showPreviousLessons() {
        this.props.navigation.goBack()
    }
    // handleInvalidFields(invalidFields: { field: Field, error: Error }[]): void {
    //     LoadingView.close()
    //     this.setState({ shakeLoginButton: true })
    //     setTimeout(() => {
    //         this.setState({ shakeLoginButton: false })
    //     }, 1000)
    //     invalidFields.forEach(invalidField => {
    //         if (invalidField.field == Field.Email) {
    //             this.setState({ emailTextFieldError: invalidField.error.message })
    //         }
    //         if (invalidField.field == Field.Password) {
    //             this.setState({ passwordTextFieldError: invalidField.error.message })
    //         }
    //     })
    // }

    // showErrorAlert(error: string) {
    //     LoadingView.close(() => {
    //         super.showErrorAlert(error)
    //     })
    // }

    // goToHomeScreen() {
    //     LoadingView.close(() => {

    //     })
    // }

    // goToForgotPassworScreen() {
    //     this.props.navigation.dispatch(
    //         StackActions.push('ForgotPasswordScreen')
    //     )
    // }

    render() {
        return layout(this)
    }
}
