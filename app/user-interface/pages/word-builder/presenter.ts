import { RepositoryBuilderImpl } from '../../../data/repositories/repo-builder'
import '../../../../extensions/array.extensions'
import { BasePresenter, BaseView } from '../base/presenter'
import { LessonsInteractor, LessonsInteractorOutput, LessonsInteractorFactory } from '../../../domain/interactors/lessons-interactor'

export interface WordBuilderView extends BaseView {
    
}

export class WordBuilderPresenter extends BasePresenter implements LessonsInteractorOutput {

    view: WordBuilderView
    private interactor: LessonsInteractor

    constructor(outputView: WordBuilderView) {
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