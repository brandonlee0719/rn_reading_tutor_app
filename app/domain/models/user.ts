
export default class User {

    id: string
    email: string
    firstName?: string
    lastName?: string

    constructor(id: string, email: string) {
        this.id = id
        this.email = email
    }

    displayName(): string {
        let fname = this.firstName?.split(" ")[0] ?? ""
        let lname = this.lastName?.split(" ")[0] ?? ""
        let result = (fname + " " + lname)
        return result
    }

    fullName(): string {
        let fname = this.firstName ?? ""
        let lname = this.lastName ?? ""
        let result = (fname + " " + lname)
        return result
    }

    isEqualTo(user: User): boolean {
        if (this.id != user.id) return false
        if (this.email != user.email) return false
        if (this.firstName != user.firstName) return false
        if (this.lastName != user.lastName) return false
        return true
    }
}