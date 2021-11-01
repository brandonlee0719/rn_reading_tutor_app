import { Component } from "react"
import { BaseView } from "./presenter"
import { NavigationProp } from '@react-navigation/native';
import AlertView from "../../components/alert-view";

interface Props {
    navigation: NavigationProp<any,any>
}

export class BaseScreen extends Component<Props> implements BaseView {
    showErrorAlert(error: string): void {        
        AlertView.showBasic('Error', `${error}`)
    }

    showSuccessAlert(message: string): void {
        AlertView.showBasic('Success', `${message}`)
    }
}

