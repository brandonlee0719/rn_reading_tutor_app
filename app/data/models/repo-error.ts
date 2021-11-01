
export default class RepoError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, RepoError.prototype)
    }

    static fromJson(json: any): RepoError | undefined {                
        if (json.message || json.msg) {
            return new RepoError(json.message ?? json.msg)
        } else {
            return RepoError.unknown()
        }
    }

    static unknown(): RepoError {
        return new RepoError('Something went wrong but it was not possible to know the cause.')
    }
}