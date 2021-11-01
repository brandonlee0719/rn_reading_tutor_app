
import { NavigationProp } from '@react-navigation/native';
import layout from './layout';
import { StagePresenter, StageView } from './presenter';
import { BaseScreen } from '../base/screen';
import { getItem, API_TOKEN } from '../../../utils/prefUtils';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';



export interface Props {
    navigation: NavigationProp<any, any>
};

export class StageScreen extends BaseScreen implements StageView {

    private presenter = new StagePresenter(this)
    state = {
        learnerId: '',
        stageId: '',
        stageName: '',
        lessons: [],
        fishCount:0
    }
    // componentWillMount = async () => {
    //     this.getdata()
    // }

    componentDidMount = async () => {
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            this.getdata()
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
        this.setState({ stageId: this.props.route.params.stage })
        console.log("found stage in state", this.state.stageId)

        this.apiGetStage()
    }

    async apiGetStage() {
        console.log("in api get stage data")
        const token = await getItem(API_TOKEN)
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.getLearner + "/" + this.state.learnerId + apiConstants.getStage + this.state.stageId
        console.log("stage url", endPoint)
        let params = {}
        try {
            let response = await network.get(endPoint, params, token)
            console.log("stage response ==>", response)
            var arrStages = response.lessons
            var totalFish = 0
            response.lessons.map((stageData) => {
                totalFish += stageData.fishes
            });
            this.setState({ fishCount: totalFish });
            this.setState({ lessons: arrStages });
            this.setState({ stageName: response.name })

        } catch (error) {
            console.log("stage Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }
    }

    showStage(item) {
        this.props.navigation.navigate('InstructionsScreen',{learner : this.state.learnerId , lesson : item.id})
    }
    
    showPreviousLessons() {
        this.props.navigation.goBack()
    }

    render() {
        return layout(this)
    }
}
