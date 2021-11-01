
import UserSession from '../models/user-session';
import { UsersRepository } from '../data-interfaces/users-repository';
import { RepositoryBuilder } from '../data-interfaces/builder';
import BaseInteractorOutput from '../data-interfaces/base-interactor-output';

export interface UsersInteractorOutput extends BaseInteractorOutput {
    onFirstTimeSignInWithUserSession?(userSession: UserSession): void
    onSuccessSignInWithUserSession?(userSession: UserSession): void
    onFailedSignInWithError?(error: Error): void
    onSuccessPasswordReset?(): void
    onFailedPasswordResetWithError?(error: Error): void
}

export interface UsersInteractor {
    signInWithEmailAndPassword(email: string, password: string): void
    signOutFromUserSession(userSession: UserSession): void
    sendPasswordResetTo(email: string): void
    currentUserSession(): UserSession | undefined
}

export class UsersInteractorFactory {
    static createInstance(output: UsersInteractorOutput, repoBuilder: RepositoryBuilder): UsersInteractor {
        return new UsersInteractorImpl(output, repoBuilder)
    }
}

class UsersInteractorImpl implements UsersInteractor {
    private output: UsersInteractorOutput
    private repository: UsersRepository

    constructor(output: UsersInteractorOutput, repoBuilder: RepositoryBuilder) {
        this.output = output
        this.repository = repoBuilder.createUsersRepository()
    }

    signInWithEmailAndPassword(email: string, password: string) {
        let self = this;
        this.repository.signInWithEmailAndPassword(email, password)
            .then((userSession: UserSession) => {
                self.output.onSuccessSignInWithUserSession?.(userSession)                
            })
            .catch((error: any) => {
                self.output.onFailedSignInWithError?.(error)
            });               
    }

    signOutFromUserSession(userSession: UserSession) {
        this.repository.signOutFromUserSession(userSession)
    }

    sendPasswordResetTo(email: string) {
        let self = this;

        /*
        this.repository.signInWithEmailAndPassword(email, password)
            .then((userSession: UserSession) => {
                self.output.onSuccessSignInWithUserSession?.(userSession)                
            })
            .catch((error: any) => {
                self.output.onFailedSignInWithError?.(error)
            });  */
    }

    currentUserSession(): UserSession | undefined {
        return this.repository.getCurrentUserSession()
    }
}
