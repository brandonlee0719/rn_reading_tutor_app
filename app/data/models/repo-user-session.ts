import UserSession from '../../domain/models/user-session'
import RepoUser from './repo-user'

export default class RepoUserSession implements Realm.ObjectClass {

    public static schema: Realm.ObjectSchema = {
        name: RepoUserSession.name,
        primaryKey: 'token',
        properties: {
            user:  `${RepoUser.name}?`,
            token: 'string?',
            isCurrent: 'bool?'
        }   
    }
    schema = RepoUserSession.schema

    public token?:     string
    public user?:      RepoUser
    public isCurrent?: boolean

    constructor(payload?: Partial<RepoUserSession>) {
        this.user = new RepoUser(payload?.user)
        this.token = payload?.token
        this.isCurrent = payload?.isCurrent
    }

    static fromJson(json: any): RepoUserSession| undefined {
        if (json) {
            let repoUserSession = new RepoUserSession()
            repoUserSession.token = json.token as string
            repoUserSession.user = RepoUser.fromJson(json)
            repoUserSession.isCurrent = json.isCurrent as boolean
            return repoUserSession
        }
        return undefined
    }

    toJson(): object {
        var json = {
            token: this.token,
            user: this.user?.toJson(),
        }
        return json
    }

    static fromUserSession(userSession: UserSession): RepoUserSession {
        let repoUserSession = new RepoUserSession()
        repoUserSession.token = userSession.token
        repoUserSession.user = userSession.user ? RepoUser.fromUser(userSession.user) : undefined
        return repoUserSession
    }

    toUserSession(): UserSession | undefined {
        let user = this.user?.toUser()
        if (!user || !this.token || !this.isCurrent) {
            return undefined
        }
        return new UserSession(user, this.token, this.isCurrent)
    }

    validPrimaryKey(): boolean {
        return this.token != undefined && this.token != null
    }

}