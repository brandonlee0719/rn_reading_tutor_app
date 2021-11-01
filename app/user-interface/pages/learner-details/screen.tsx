import { Keyboard } from 'react-native'
import { LearnerDetailsPresenter, LearnerDetailsView } from './presenter';
import { StackActions } from '@react-navigation/native'
import { Field } from '../../../utils/field-validator';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import LoadingView from '../../components/loading-view';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';
import { getItem, API_TOKEN } from '../../../utils/prefUtils';

export class LearnerDetailsScreen extends BaseScreen implements LearnerDetailsView {

    private presenter = new LearnerDetailsPresenter(this)
    state = {
        score: '',
        phonenumber: '',
        emailTextFieldError: undefined,
        passwordTextFieldError: undefined,
        confirmPasswordTextFieldError: undefined,
        shakeNextButton: false,
        fname: '',
        lname: '',
        birthday: '',
        age: '',
    }

    componentDidMount = async () => {
        this.getdata()
    }

    getdata = async () => {
        this.setState({ fname: this.props.route.params.fname })
        this.setState({ lname: this.props.route.params.lname })
        this.setState({ birthday: this.props.route.params.birthday })
        this.setState({ age: this.props.route.params.age })
    }

    setScore(score: string) {
        this.setState({ score : score });
    }

    setPhone(phone: string) {
        this.setState({ phonenumber : phone });
    }
  
    checkValidation() {
        if (this.state.score.isEmpty()) {
            this.showErrorAlert("please enter email")
        }
        else if (this.state.phonenumber.isEmpty()) {
            this.showErrorAlert("please enter password")
        }
        else {
            this.apiAddLearner()
        }
    }
    async apiAddLearner() {
        console.log("in api AddLearner")
        const token = await getItem(API_TOKEN)
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.addLearner
        // let params = { 'email': this.state.email, 'password': this.state.password }
        let params = {
            'firstName': this.state.fname,
            'lastName': this.state.lname,
            'phoneNumber': this.state.phonenumber,
            'whatsApp': true,
            'birthDate': this.state.birthday,
            'initialScore': this.state.score,
          }
        try 
        {
            console.log("API Token ==>", token)
            console.log("AddLearner params ==>", params)
            let response = await network.post(endPoint, params, token)
            console.log("AddLearner response ==>", response)
            
                this.goToNextPage()
               
        } catch (error) {
            console.log("AddLearner Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }

    } 

   

    goToNextPage() {
        this.props.navigation.dispatch(
            StackActions.push('MyLearnersScreen')
        )

    }

    showPreviousLessons() {
        this.props.navigation.goBack()
    }
    

    render() {
        return layout(this)
    }
}
