import { Cloud, UsersCloudStorage } from '../cloud/cloud-storage'
import { LocalStorage, RealmAdapter } from '../local/local-storage'
import RepoError from '../models/repo-error'
import RepoUser from '../models/repo-user'
import RepoUserSession from '../models/repo-user-session'
import { LessonsRepository } from '../../domain/data-interfaces/lessons-repository'

export class LessonsRepositoryImpl implements LessonsRepository {

    cloud: UsersCloudStorage = new Cloud()
    local: LocalStorage<Realm.ObjectClass> = new RealmAdapter([RepoUserSession.schema, RepoUser.schema])

    async fetchNextLessons() {

    }

    getPersistedNextLessons() {

    }
    
    async fetchCompletedLessons() {

    }

    getPersistedCompletedLessons() {

    }
}
