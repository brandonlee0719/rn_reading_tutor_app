import { Keyboard } from 'react-native'
import { LearnerGuidePresenter, LearnerGuideView } from './presenter';
import { StackActions } from '@react-navigation/native'
import { Field } from '../../../utils/field-validator';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import LoadingView from '../../components/loading-view';

export class LearnerGuideScreen extends BaseScreen implements LearnerGuideView {

    private presenter = new LearnerGuidePresenter(this)
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        emailTextFieldError: undefined,
        passwordTextFieldError: undefined,
        confirmPasswordTextFieldError: undefined,
        shakeNextButton: false
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

   

    goToNextPage() {
        this.props.navigation.dispatch(
            StackActions.push('AddLearnerScreen')
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
