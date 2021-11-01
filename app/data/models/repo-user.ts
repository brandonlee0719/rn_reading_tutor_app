import User from "../../domain/models/user"

export default class RepoUser implements Realm.ObjectClass { 

    public static schema: Realm.ObjectSchema = {
        name: RepoUser.name,
        primaryKey: 'id',
        properties: {
            id:         'string?',
            email:      'string?',
            firstName:  'string?',
            lastName:   'string?',
        }
    }
    schema = RepoUser.schema

    public id?:          string
    public email?:       string
    public firstName?:   string
    public lastName?:    string
    
    constructor(payload?: Partial<RepoUser>) {
        this.id = payload?.id
        this.email = payload?.email
        this.firstName = payload?.firstName
        this.lastName = payload?.lastName
    }

    static fromJson(json: any): RepoUser | undefined {   
        if (json) {
            let repoUser = new RepoUser()
            repoUser.id = json.userId as string
            repoUser.email = json.email as string
            repoUser.firstName = json.firstName as string
            repoUser.lastName = json.lastName as string        
            return repoUser
        }   
        return undefined
    }
    
    toJson(): object {
        var json = {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
        }
        return json
    }

    static fromUser(user: User): RepoUser {
        let repoUser = new RepoUser()
        repoUser.id = user.id
        repoUser.email = user.email
        repoUser.firstName = user.firstName
        repoUser.lastName = user.lastName
        return repoUser
    }

    toUser(): User | undefined {
        if (!this.id || !this.email) {
            return undefined
        }
        let user = new User(this.id, this.email)
        user.firstName = this.firstName
        user.lastName = this.lastName
        return user
    }

    validPrimaryKey(): boolean {
        return this.id != undefined && this.id != null
    }
}