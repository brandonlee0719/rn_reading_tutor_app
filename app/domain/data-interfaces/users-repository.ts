import UserSession from "../models/user-session";

export interface UsersRepository {
    signInWithEmailAndPassword(email: string, password: string): any
    signOutFromUserSession(session: UserSession): void
    sendPasswordResetEmailTo(email: string): any
    getCurrentUserSession(): UserSession | undefined
}
