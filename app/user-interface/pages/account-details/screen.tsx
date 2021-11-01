import { Keyboard } from 'react-native'
import { AccountDetailsPresenter, AccountDetailsView } from './presenter';
import { StackActions } from '@react-navigation/native'
import { Field } from '../../../utils/field-validator';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import LoadingView from '../../components/loading-view';
import { setItem, IS_LOGGED_IN, API_TOKEN, USER } from '../../../utils/prefUtils';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';

export class AccountDetailsScreen extends BaseScreen implements AccountDetailsView {

    private presenter = new AccountDetailsPresenter(this)
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        emailTextFieldError: undefined,
        passwordTextFieldError: undefined,
        confirmPasswordTextFieldError: undefined,
        shakeNextButton: false,
        fname: '',
        lname: '',
        phonenumber: '',
        country: '',
    }
    componentDidMount = async () => {
        this.getdata()
    }

    getdata = async () => {
        this.setState({ fname: this.props.route.params.fname })
        this.setState({ lname: this.props.route.params.lname })
        this.setState({ phonenumber: this.props.route.params.phonenumber })
        this.setState({ country: this.props.route.params.country })
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
            this.apiSignUp()
        }
    }
    async apiSignUp() {
        console.log("in apisign up")
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.signUp
        // let params = { 'email': this.state.email, 'password': this.state.password }
        let params = {
            'firstName': this.state.fname,
            'lastName': this.state.lname,
            'phoneNumber': this.state.phonenumber,
            'whatsApp': true,
            'countryOfResidence': this.state.country,
            'email': this.state.email,
            'password': this.state.password
          }
        try {
            console.log("Signup params ==>", params)
            let response = await network.post(endPoint, params)
            console.log("Signup response ==>", response)
            // console.log("Signup response Token ==>", response.accessToken)
            // setItem(IS_LOGGED_IN, "1")
            // setItem(API_TOKEN, "Bearer " + response.accessToken)
            // setItem(USER, JSON.stringify(response))
            // LoadingView.close(() => {
                // console.log("Loading view closed")
                // StackActions.replace('HomeScreen')
                this.showSuccessAlert("Parent Account created successfully")
                this.goToNextPage()
                // this.props.navigation.dispatch(
                //     StackActions.replace('HomeScreen')
                //     // StackActions.replace('StageScreen')
                // )
            // })
            // this.goToHomeScreen()
        } catch (error) {
            console.log("sign up Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }

    } 

    goToNextPage() {
        this.props.navigation.dispatch(
            StackActions.push('VerificationScreen',{email : this.state.email})
            // StackActions.replace('StageScreen')
        )

    }

    showPreviousLessons() {
        this.props.navigation.goBack()
    }
   

    render() {
        return layout(this)
    }
}
