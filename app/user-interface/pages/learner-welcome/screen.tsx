import { Keyboard } from 'react-native'
import { LearnerWelcomePresenter, LearnerWelcomeView } from './presenter';
import layout from './layout';
import { BaseScreen } from '../base/screen';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';
import { StackActions } from '@react-navigation/native';

export class LearnerWelcomeScreen extends BaseScreen implements LearnerWelcomeView {

    private presenter = new LearnerWelcomePresenter(this)
    state = {
        name: '',
    }

    
    componentDidMount = async () => {
        this.getdata()
    }

    getdata = async () => {
        console.log("name came ==>", this.props.route.params.name)
        this.setState({ name: this.props.route.params.name })
    }

    goToNextPage() {
        this.props.navigation.dispatch(
        StackActions.replace('HomeScreen')
        )
    }

    render() {
        return layout(this)
    }
}
