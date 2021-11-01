import User from './user'

export default class UserSession {
    user: User
    token: string
    isCurrent: boolean

    constructor(user: User, token: string, isCurrent: boolean) {
        this.user = user
        this.token = token
        this.isCurrent = isCurrent
    }
}