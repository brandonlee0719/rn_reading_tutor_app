
import { NavigationProp } from '@react-navigation/native';
import layout from './layout';
import { SoundMatchTextPresenter, SoundMatchTextView } from './presenter';
import { BaseScreen } from '../base/screen';


export interface Props {
    navigation: NavigationProp<any, any>
};

export class SoundMatchTextScreen extends BaseScreen implements SoundMatchTextView {

    private presenter = new SoundMatchTextPresenter(this)
    state = {
        selectedIndex: []
    }

    componentDidMount() {

    }
    showPreviousLessons() {
        this.props.navigation.goBack()
    }
    showNextLessons() {
        this.props.navigation.navigate('VisualMatchScreen')
    }

    showCompletedLessons() {

    }
    setIndex(index: number) {
        if (this.state.selectedIndex[this.state.selectedIndex.length - 1] == 2) {
            return
        }

        this.setState({
            selectedIndex: this.state.selectedIndex.concat(index)
        })
    }

    render() {
        return layout(this)
    }
}
