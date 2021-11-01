import BaseInteractorOutput from "../../../domain/data-interfaces/base-interactor-output"

export interface BaseView {
    showErrorAlert(error: string): void
    showSuccessAlert(message: string): void
}

export class BasePresenter implements BaseInteractorOutput {
    view: BaseView

    constructor(view: BaseView) {
        this.view = view
    }

    onError(error: Error): void {
        this.view.showErrorAlert(error.message)
    }
}
