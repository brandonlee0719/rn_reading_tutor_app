import { RepositoryBuilderImpl } from '../../../data/repositories/repo-builder'
import '../../../../extensions/array.extensions'
import { BasePresenter, BaseView } from '../base/presenter'
import { LessonsInteractor, LessonsInteractorOutput, LessonsInteractorFactory } from '../../../domain/interactors/lessons-interactor'

export interface ComprehensionQuestionView extends BaseView {
    
}

export class ComprehensionQuestionPresenter extends BasePresenter implements LessonsInteractorOutput {

    view: ComprehensionQuestionView
    private interactor: LessonsInteractor

    constructor(outputView: ComprehensionQuestionView) {
        super(outputView)
        this.view = outputView
        this.interactor = LessonsInteractorFactory.createInstance(this, new RepositoryBuilderImpl())
    }

    fetchNextLessons() {

    }

    fetchCompletedLessons() {
        
    }

    onSuccessFetchingCompletedLessons() {

    }

    onSuccessFetchingNextLessons() {

    }

}