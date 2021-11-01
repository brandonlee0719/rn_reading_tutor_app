
import { NavigationProp, StackActions } from '@react-navigation/native';
import layout from './layout';
import { HomePresenter, HomeView } from './presenter';
import { BaseScreen } from '../base/screen';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';
import { getItem, API_TOKEN, setItem, IS_LOGGED_IN } from '../../../utils/prefUtils';


export interface Props {
    navigation: NavigationProp<any, any>
};

export class HomeScreen extends BaseScreen implements HomeView {

    private presenter = new HomePresenter(this)
    state = {
        // days: [{ day: 'Tue', completed: 1, isToday: false },
        // { day: 'Wed', completed: 1, isToday: false },
        // { day: 'Thu', completed: 0, isToday: false },
        // { day: 'Fri', completed: 1, isToday: false },
        // { day: 'Sat', completed: 1, isToday: false },
        // { day: 'Sun', completed: 0, isToday: true },
        // { day: 'Mon', completed: 2, isToday: false }],
        // nextLessons: [{ isNext: false, isCompleted: true ,index : 0 ,name : 'Stage'},
        // { isNext: true, isCompleted: false ,index : 1 ,name : 'Stage'},
        // { isNext: false, isCompleted: false ,index : 2 ,name : 'Stage' },
        // { isNext: false, isCompleted: false,index : 3 ,name : 'Stage' },
        // { isNext: false, isCompleted: false ,index : 4 ,name : 'Stage' }],
        completedLessons: [{ isNext: false, isCompleted: true },
        { isNext: false, isCompleted: true },
        { isNext: false, isCompleted: true }],

        isFirstTime: false,
        days: [],
        nextLessons: [],
        learnerId: '',
        streak: 0,
        currentTitle: '',
        currentDesc: '',
        fishCount: 3,
        nextLessonObj: {}
    }

    componentDidMount() {
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            this.apiGetLearner()
          });
       
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
            console.log("learner response ==>", response[0])
            this.setState({ learnerId: response[0].id });
            this.apiGetProgress(response[0].id)

        } catch (error) {
            console.log("learner Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }
    }

    async apiGetProgress(learnerId) {
        console.log("in api get learner progress")
        const token = await getItem(API_TOKEN)
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.getLearner + "/" + learnerId + apiConstants.getProgress
        console.log("progress url", endPoint)
        let params = {}
        try {
            let response = await network.get(endPoint, params, token)
            console.log("learner response ==>", response)
            var arrDay = []
            var cnt = 0
            response.dailyLogin.map((dayData) => {
                console.log(dayData.date);
                if (dayData.isActive) {
                    cnt += 1
                }
                arrDay.push({ day: dayData.day.substring(0, 3), completed: dayData.isActive, isToday: false })
            });
            this.setState({ days: arrDay });
            this.setState({ streak: cnt });

            var arrStages = []
            response.progress.map((stageData) => {
                console.log(stageData.title);
                arrStages.push({ isNext: stageData.stageId == 1 ? true : false, isCompleted: stageData.completed, index: stageData.stageId, name: stageData.title })
            });

            // let arrtemp = response.progress.filter((item) => {
            //     console.log(item.completed);
            //     return item.completed == false
            // })


            console.log("completed data =>", response.progress[0])
            this.setState({ nextLessonObj: response.progress[0] })
            this.setState({ nextLessons: arrStages })
            console.log("first object title : ", response.progress[0].title);
            this.setState({ currentTitle: response.progress[0].title })
            this.setState({ fishCount: response.progress[0].fishes ?? 3 })
            

        } catch (error) {
            console.log("learner Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }

    }
    showNextLessons(item) {
        console.log("item came : ", item)
        this.props.navigation.navigate("StageScreen", { learner: this.state.learnerId, stage: item.index })
    }

    showCompletedLessons(item) {
        console.log("item came : ", item)
        this.props.navigation.navigate("StageScreen", { learner: this.state.learnerId, stage: item.stageId })
    }

    logout = async () => {
        console.log("logout")
        await setItem(IS_LOGGED_IN, "0")
        this.props.navigation.dispatch(
            StackActions.replace('SignUpScreen')
        )
    }
    render() {
        return layout(this)
    }
}
