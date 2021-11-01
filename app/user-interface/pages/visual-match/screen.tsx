
import { NavigationProp } from '@react-navigation/native';
import layout from './layout';
import { VisualMatchPresenter, VisualMatchView } from './presenter';
import { BaseScreen } from '../base/screen';


export interface Props {
    navigation: NavigationProp<any, any>
};

export class VisualMatchScreen extends BaseScreen implements VisualMatchView {

    private presenter = new VisualMatchPresenter(this)
    state = {

    }

    componentDidMount() {

    }

    showNextLessons() {
        this.props.navigation.navigate('AuditoryVisualMatchScreen')
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
