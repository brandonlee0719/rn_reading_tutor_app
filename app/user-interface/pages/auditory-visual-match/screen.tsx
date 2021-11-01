
import { NavigationProp } from '@react-navigation/native';
import layout from './layout';
import { AuditoryVisualMatchPresenter, AuditoryVisualMatchView } from './presenter';
import { BaseScreen } from '../base/screen';


export interface Props {
    navigation: NavigationProp<any, any>
};

export class AuditoryVisualMatchScreen extends BaseScreen implements AuditoryVisualMatchView {

    private presenter = new AuditoryVisualMatchPresenter(this)
    state = {

    }

    componentDidMount() {

    }

    showNextLessons() {
        this.props.navigation.navigate('WordBuilderScreen')
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
