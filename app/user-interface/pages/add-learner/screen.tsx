import { Keyboard } from 'react-native'
import { AddLearnerPresenter, AddLearnerView } from './presenter';
import { StackActions } from '@react-navigation/native'
import { Field } from '../../../utils/field-validator';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import LoadingView from '../../components/loading-view';

export class AddLearnerScreen extends BaseScreen implements AddLearnerView {

    private presenter = new AddLearnerPresenter(this)
    state = {
        fname: '',
        lname: '',
        birthday: '',
        age: '',
        firstNameTextFieldError: undefined,
        lastNameTextFieldError: undefined,
        countryTextFieldError: undefined,
        shakeNextButton: false
    }

    setFirstName(fName: string) {
        this.setState({ fname: fName });
    }

    setLastName(lName: string) {
        this.setState({ lname: lName });
    }

    setBirthdate(date: string) {
        this.setState({ birthday: date });
        this.setState({ age: date });
    }

    checkValidation() {
        if (this.state.fname.isEmpty()) {
            this.showErrorAlert("please enter first name")
        }
        else if (this.state.lname.isEmpty()) {
            this.showErrorAlert("please enter last name")
        }
        else if (this.state.birthday.isEmpty()) {
            this.showErrorAlert("please enter birthdate")
        }
        else {
            this.goToNextPage()
        }
    }
    goToNextPage() {
        this.props.navigation.dispatch(
            StackActions.push('LearnerDetailsScreen',{fname : this.state.fname , lname : this.state.lname , birthday : this.state.birthday , age : this.state.age})
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
