import { Cloud, UsersCloudStorage } from '../cloud/cloud-storage'
import { LocalStorage, RealmAdapter } from '../local/local-storage'
import RepoError from '../models/repo-error'
import RepoUser from '../models/repo-user'
import RepoUserSession from '../models/repo-user-session'
import { UsersRepository } from '../../domain/data-interfaces/users-repository'
import UserSession from '../../domain/models/user-session'

export class UsersRepositoryImpl implements UsersRepository {

    cloud: UsersCloudStorage = new Cloud()
    local: LocalStorage<Realm.ObjectClass> = new RealmAdapter([RepoUserSession.schema, RepoUser.schema])

    async signInWithEmailAndPassword(email: string, password: string) {
        let response = await this.cloud.signInWithEmailAndPassword(email, password)
        let repoUserSession = RepoUserSession.fromJson(response.user)
        if (repoUserSession) {
            repoUserSession.isCurrent = true
            this.local.saveOrUpdateObject(repoUserSession)
            return repoUserSession.toUserSession()
        } else {
            throw RepoError.unknown
        }
    }

    signOutFromUserSession(session: UserSession): void {
        let repoUser = RepoUser.fromUser(session.user)
        let repoUserSession = RepoUserSession.fromUserSession(session)
        this.local.deleteObject(repoUserSession)
        this.local.deleteObject(repoUser)
    }

    async sendPasswordResetEmailTo(email: string) {
        /*
        let response = await this.cloud.signInWithEmailAndPassword(email, password)
        let repoUserSession = RepoUserSession.fromJson(response.user)
        if (repoUserSession) {
            repoUserSession.isCurrent = true
            this.local.saveOrUpdateObject(repoUserSession)
            return repoUserSession.toUserSession()
        } else {
            throw RepoError.unknown
        }*/
    }

    getCurrentUserSession(): UserSession | undefined {
        return this.local.getFilteredObjectsOfType(RepoUserSession, ['isCurrent == true'])
                            .find(element => element.token)?.toUserSession()
    }
}

