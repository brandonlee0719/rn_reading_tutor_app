import { RepositoryBuilderImpl } from '../../../data/repositories/repo-builder'
import '../../../../extensions/array.extensions'
import { BasePresenter, BaseView } from '../base/presenter'
import { LessonsInteractor, LessonsInteractorOutput, LessonsInteractorFactory } from '../../../domain/interactors/lessons-interactor'

export interface AuditoryVisualMatchView extends BaseView {
    
}

export class AuditoryVisualMatchPresenter extends BasePresenter implements LessonsInteractorOutput {

    view: AuditoryVisualMatchView
    private interactor: LessonsInteractor

    constructor(outputView: AuditoryVisualMatchView) {
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