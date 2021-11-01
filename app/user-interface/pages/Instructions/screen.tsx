
import { NavigationProp } from '@react-navigation/native';
import layout from './layout';
import { InstructionsPresenter, InstructionsView } from './presenter';
import { BaseScreen } from '../base/screen';
import { getItem, API_TOKEN } from '../../../utils/prefUtils';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';


export interface Props {
    navigation: NavigationProp<any, any>
};

export class InstructionsScreen extends BaseScreen implements InstructionsView {

    videoBuffer = (isBuffer) => {
        console.log("in buffer section ")
        console.log(isBuffer)
        //here you could set the isBuffer value to the state and then do something with it
        //such as show a loading icon
    }
    
    private presenter = new InstructionsPresenter(this)
    state = {
        learnerId: '',
        lessonId: '',
        tutorialLink: [],
        exerciseList: [],
        exerciseTime: '',
        isPaused:false,
    }

    componentDidMount = async () => {
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            // this.getdata()
            this.setState({ isPaused: false })
          });
        this.getdata()
    }

    getdata = async () => {
        // console.log("found learner", this.props.route.params.learner) 
        // let data = await this.props.navigation.getParam("learner")
        // console.log("found learner", data)
        this.setState({ learnerId: this.props.route.params.learner })
        console.log("found learner in state", this.state.learnerId)

        // let data1 = await this.props.navigation.getParam("learner")
        // console.log("found stage", data1)
        this.setState({ lessonId: this.props.route.params.lesson })
        console.log("found stage in state", this.state.lessonId)

        this.apiGetLesson()
    }

    async apiGetLesson() {
        console.log("in api get stage data")
        const token = await getItem(API_TOKEN)
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.getLesson + "/" + this.state.lessonId + apiConstants.getLessonLearnerId + this.state.learnerId
        console.log("stage url", endPoint)
        let params = {}
        try {
            let response = await network.get(endPoint, params, token)
            console.log("stage response ==>", response)
            // var arrStages = response.lessons
            // response.lessons.map((stageData) => {
            //     console.log(stageData.title);
            //     arrStages.push({ isNext: true, isCompleted: stageData.completed, index: stageData.stageId, name: stageData.title })
            // });
            // this.setState({ lessons: arrStages });
            console.log("tutorial url : ", response.toturialLink)
            this.setState({
                tutorialLink: response.toturialLink,
                exerciseList: response.exercise,
                exerciseTime: response.exerciseTimeoutMSec
            })

        } catch (error) {
            console.log("stage Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }
    }

    showNextLessons() {
        this.setState({ isPaused: true })
        console.log("passing exercise : ", this.state.exerciseList)
        this.props.navigation.navigate('ExampleScreen', { exercise: this.state.exerciseList, duration: this.state.exerciseTime, learner: this.state.learnerId, lesson: this.state.lessonId })
    }
    showPreviousLessons() {
        this.props.navigation.goBack()
    }

    showCompletedLessons() {

    }

    render() {
        return layout(this)
    }
}
