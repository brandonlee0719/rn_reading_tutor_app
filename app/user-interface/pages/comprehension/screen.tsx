
import { NavigationProp } from '@react-navigation/native';
import layout from './layout';
import { ComprehensionPresenter, ComprehensionView } from './presenter';
import { BaseScreen } from '../base/screen';


export interface Props {
    navigation: NavigationProp<any, any>
};

export class ComprehensionScreen extends BaseScreen implements ComprehensionView {

    private presenter = new ComprehensionPresenter(this)
    state = {

    }

    componentDidMount() {

    }

    showNextLessons() {
        this.props.navigation.navigate('ComprehensionQuestionScreen')
    }

    showCompletedLessons() {

    }

    render() {
        return layout(this)
    }
}
