
import { NavigationProp } from '@react-navigation/native';
import layout from './layout';
import { ComprehensionQuestionPresenter, ComprehensionQuestionView } from './presenter';
import { BaseScreen } from '../base/screen';


export interface Props {
    navigation: NavigationProp<any,any>
};

export class ComprehensionQuestionScreen extends BaseScreen implements ComprehensionQuestionView{

    private presenter = new ComprehensionQuestionPresenter(this)
    state = {
        
    }

    componentDidMount() {
        
    }

    showNextLessons() {

    }
    showPreviousLessons() {
        this.props.navigation.goBack()
    }

    showCompletedLessons () {

    }

    render() {
        return layout(this)
    }
}
