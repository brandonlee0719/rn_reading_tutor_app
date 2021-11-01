
import { NavigationProp } from '@react-navigation/native';
import layout from './layout';
import { ExamplePresenter, ExampleView } from './presenter';
import { BaseScreen } from '../base/screen';
import { getItem, API_TOKEN } from '../../../utils/prefUtils';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';


export interface Props {
    navigation: NavigationProp<any, any>
};

export class ExampleScreen extends BaseScreen implements ExampleView {

    videoBuffer = (isBuffer) => {
        console.log("in buffer section ")
        console.log(isBuffer)
        //here you could set the isBuffer value to the state and then do something with it
        //such as show a loading icon
    }
    private presenter = new ExamplePresenter(this)
    state = {
        learnerId: '',
        lessonId: '',
        tutorialLink: '',
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
        this.setState({ exerciseList: this.props.route.params.exercise })
        console.log("found exercise in sound match", this.state.exerciseList[0])

        this.setState({ exerciseTime: this.props.route.params.duration })
        console.log("found duration in sound match", this.state.exerciseTime)

        this.setState({ learnerId: this.props.route.params.learner })
        console.log("found learner in sound match", this.state.learnerId)

        this.setState({ lessonId: this.props.route.params.lesson })
        console.log("found lesson in sound match", this.state.lessonId)
    }

    showNextLessons() {
        this.setState({ isPaused: true })
        console.log("passing exercise : ", this.state.exerciseList)
        this.props.navigation.navigate('SoundMatchScreen', { exercise: this.state.exerciseList, duration: this.state.exerciseTime, learner: this.state.learnerId, lesson: this.state.lessonId })
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
