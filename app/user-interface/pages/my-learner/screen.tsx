import { Keyboard } from 'react-native'
import { MyLearnersPresenter, MyLearnersView } from './presenter';
import { StackActions } from '@react-navigation/native'
import { Field } from '../../../utils/field-validator';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import LoadingView from '../../components/loading-view';
import { getItem, API_TOKEN, setItem, IS_LOGGED_IN } from '../../../utils/prefUtils';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';

export class MyLearnersScreen extends BaseScreen implements MyLearnersView {

    private presenter = new MyLearnersPresenter(this)
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        emailTextFieldError: undefined,
        passwordTextFieldError: undefined,
        confirmPasswordTextFieldError: undefined,
        shakeNextButton: false,
        // nextLessons: [{ isNext: true, isCompleted: false ,index : 0 ,name : 'Learner'}],
        nextLessons: [],
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

    componentDidMount() {
        this.apiGetLearner()
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
            var arrStages = []
            response.map((stageData) => {
                console.log(stageData.title);
                let name = stageData.firstName + " " + stageData.lastName
                arrStages.push({ isNext: true, isCompleted: stageData.completed, index: stageData.id, name: name })
            });
            this.setState({ nextLessons: arrStages });

        } catch (error) {
            console.log("learner Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
            console.log("learner Error response data ==>", error.response.status)
            if (error.response.status == "401") {
                await setItem(IS_LOGGED_IN, "0")
                this.props.navigation.dispatch(
                    StackActions.replace('SignUpScreen')
                )
            }

        }

    }


    goToNextPage(selected: number) {
        let obj = this.state.nextLessons[selected]
        this.props.navigation.dispatch(
            StackActions.push('LearnerWelcomeScreen', { name: obj.name })

        )
    }

    showPreviousLessons = async () => {
        let is_login = await getItem(IS_LOGGED_IN)
        if (is_login === "0") {
            this.props.navigation.goBack()
        }
        else {
            await setItem(IS_LOGGED_IN, "0")
            this.props.navigation.dispatch(
                StackActions.replace('SignUpScreen')
            )
        }
    }


    render() {
        return layout(this)
    }
}
