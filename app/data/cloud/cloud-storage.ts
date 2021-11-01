import RepoError from '../models/repo-error'
import {NetworkInterface, AxiosAdapter} from './network/network'

export interface UsersCloudStorage {
    signInWithEmailAndPassword(email: string, password: string): any
    sendPasswordResetEmailTo(email: string): any
}

export class Cloud implements UsersCloudStorage {

    private static API_URL = 'http://ec2-3-133-58-33.us-east-2.compute.amazonaws.com/api'
    protected network: NetworkInterface = new AxiosAdapter()

    async signInWithEmailAndPassword(email: string, password: string) {
        let endPoint = `${Cloud.API_URL}/Auth/sign-in`
        let params = {'email': email, 'password': password}
        try {
            return await this.network.post(endPoint, params)
        } catch (error) {
            throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }
    }

    async sendPasswordResetEmailTo(email: string) {
        let endPoint = `${Cloud.API_URL}/Auth/recover-password`
        let params = {'email': email}
        try {
            return await this.network.post(endPoint, params)
        } catch (error) {
            throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }
    }
}
