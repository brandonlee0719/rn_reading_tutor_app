import { RepositoryBuilderImpl } from '../../../data/repositories/repo-builder'
import '../../../../extensions/array.extensions'
import { BasePresenter, BaseView } from '../base/presenter'
import { LessonsInteractor, LessonsInteractorOutput, LessonsInteractorFactory } from '../../../domain/interactors/lessons-interactor'

export interface SoundMatchTextView extends BaseView {
    
}

export class SoundMatchTextPresenter extends BasePresenter implements LessonsInteractorOutput {

    view: SoundMatchTextView
    private interactor: LessonsInteractor

    constructor(outputView: SoundMatchTextView) {
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