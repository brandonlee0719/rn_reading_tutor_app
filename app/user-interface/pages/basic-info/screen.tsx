import { Keyboard } from 'react-native'
import { BasicInfoPresenter, BasicInfoView } from './presenter';
import { StackActions } from '@react-navigation/native'
import { Field } from '../../../utils/field-validator';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import LoadingView from '../../components/loading-view';

export class BasicInfoScreen extends BaseScreen implements BasicInfoView {

    private presenter = new BasicInfoPresenter(this)
    state = {
        fname: '',
        lname: '',
        phonenumber: '',
        country: '',
        firstNameTextFieldError: undefined,
        lastNameTextFieldError: undefined,
        phoneTextFieldError: undefined,
        countryTextFieldError: undefined,
        shakeNextButton: false
    }

    setFirstName(fName: string) {
        this.setState({ fname: fName });
    }

    setLastName(lName: string) {
        this.setState({ lname: lName });
    }

    setPhone(phone: string) {
        this.setState({ phonenumber: phone });
    }

    setCountry(country: string) {
        this.setState({ country: country });
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



    goToNextPage() {
        if (this.state.fname.isEmpty()) {
            this.showErrorAlert("please enter firstname")
        }
        else if (this.state.lname.isEmpty()) {
            this.showErrorAlert("please enter lastname")
        }
        else if (this.state.phonenumber.isEmpty()) {
            this.showErrorAlert("please enter phonenumber")
        }
        else if (this.state.country.isEmpty()) {
            this.showErrorAlert("please enter country")
        }
        else {
            this.props.navigation.dispatch(StackActions.push('AccountDetailsScreen',{fname : this.state.fname , lname : this.state.lname , phonenumber : this.state.phonenumber , country : this.state.country}))
        }
    }

    showPreviousLessons() {
        this.props.navigation.goBack()
    }
    

    render() {
        return layout(this)
    }
}
