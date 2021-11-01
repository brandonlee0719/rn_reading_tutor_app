import { RepositoryBuilderImpl } from '../../../data/repositories/repo-builder'
import { UsersInteractor, UsersInteractorOutput, UsersInteractorFactory } from '../../../domain/interactors/users-interactor'
import UserSession from '../../../domain/models/user-session'
import { Field, FieldValidator } from '../../../utils/field-validator'
import '../../../../extensions/array.extensions'
import { BasePresenter, BaseView } from '../base/presenter'

export interface MyLearnersView extends BaseView {
    goToHomeScreen(): void;
    goToWelcomeScreen?(): void;
    handleInvalidFields(invalidFields: Array<{field: Field, error: Error}>): void
}

export class MyLearnersPresenter extends BasePresenter implements UsersInteractorOutput {

    view: MyLearnersView
    private interactor: UsersInteractor

    constructor(outputView: MyLearnersView) {
        super(outputView)
        this.view = outputView
        this.interactor = UsersInteractorFactory.createInstance(this, new RepositoryBuilderImpl())
    }

    // signInWithEmailAndPassword(email: string, password: string) {
    //     let invalidFields: Array<{field: Field, error: Error}> = []
    //     let emailValidation = FieldValidator.validateEmail(email)
    //     if (emailValidation.error) {
    //         invalidFields.push({field: emailValidation.field, error: emailValidation.error})
    //     }
    //     let passwordValidation = FieldValidator.validatePassword(password)
    //     if (passwordValidation.error) {
    //         invalidFields.push({field: passwordValidation.field, error: passwordValidation.error})
    //     }
    //     if (!invalidFields.isEmpty()) {
    //         return this.view.handleInvalidFields(invalidFields)
    //     }

    //     this.interactor.signInWithEmailAndPassword(email, password)        
    // }

    // onSuccessSignInWithUserSession(userSession: UserSession) {
    //     this.view.goToHomeScreen()
    // }

    // onFirstTimeSignInWithUserSession(userSession: UserSession) {
    //     this.view.goToWelcomeScreen?.()
    // }

    // onFailedSignInWithError(error: Error) {
    //     setTimeout(() => {
    //         this.view.showErrorAlert(error.message)
    //     }, 1000)
    // }

}