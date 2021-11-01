
import { RepositoryBuilder } from '../data-interfaces/builder';
import BaseInteractorOutput from '../data-interfaces/base-interactor-output';
import { LessonsRepository } from '../data-interfaces/lessons-repository';

export interface LessonsInteractorOutput extends BaseInteractorOutput {
    onSuccessFetchingNextLessons?(): void
    onSuccessFetchingCompletedLessons?(): void
}

export interface LessonsInteractor {
    fetchNextLessons(): void
    persistedNextLessons(): void
    fetchCompletetedLessons(): void
    persistedCompletedLessons(): void
}

export class LessonsInteractorFactory {
    static createInstance(output: LessonsInteractorOutput, repoBuilder: RepositoryBuilder): LessonsInteractor {
        return new LessonsInteractorImpl(output, repoBuilder)
    }
}

class LessonsInteractorImpl implements LessonsInteractor {
    private output: LessonsInteractorOutput
    private repository: LessonsRepository

    constructor(output: LessonsInteractorOutput, repoBuilder: RepositoryBuilder) {
        this.output = output
        this.repository = repoBuilder.createLessonsRepository()
    }

    fetchNextLessons() {

    }
    
    persistedNextLessons() {

    }

    fetchCompletetedLessons() {

    }

    persistedCompletedLessons() {

    }
    
}
