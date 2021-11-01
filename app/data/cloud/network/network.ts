
const Axios = require('axios')
const Fs = require('react-native-fs') 
const Path = require('path') 
import { AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource } from 'axios'
import { Platform } from 'react-native'
import { Buffer } from 'buffer'
import '../../../../extensions/string.extensions'

type ProgressCallback = (progress?: number) => void
type Files = [{uri: string, type: string, name: string}]

export class NetworkError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, NetworkError.prototype)
    }
}

export interface NetworkInterface {
    get(url: string, parameters?: object, authHeader?: string): any
    post(url: string, parameters?: object, authHeader?: string): any
    put(url: string, parameters?: object, authHeader?: string): any
    upload(multipart: [{name: string, data: object | Files}], url: string, authHeader?: string, progress?: ProgressCallback): any
    download(url: string, authHeader?: string, progress?: ProgressCallback): any
    cancelRequest(url: string): void
    cancelAllRequests(): void
}

export class AxiosAdapter implements NetworkInterface {

    tasks: [url: string, source: CancelTokenSource][] = []

    async get(url: string, parameters?: object, authHeader?: string) {
        const CancelToken = Axios.CancelToken;
        const source = CancelToken.source();
        const config: AxiosRequestConfig = {
            method: 'get',
            url: url,
            headers: authHeader ? {'Authorization': authHeader} : undefined,
            params: parameters,
            responseType: 'json',
            cancelToken: source.token
        }
        this.tasks.push([url, source])
        let response = await Axios(config)
        return response.data
    }

    async post(url: string, parameters?: object, authHeader?: string) {
        const CancelToken = Axios.CancelToken;
        const source = CancelToken.source();
        const config: AxiosRequestConfig = {
            method: 'post',
            url: url,
            headers: authHeader ? {'Authorization': authHeader} : undefined,
            data: parameters,
            responseType: 'json',
            cancelToken: source.token
        }
        console.log("In post api method ==>", config)
        this.tasks.push([url, source])
        let response = await Axios(config)
        console.log("In post api Response ==>", response.data)
        return response.data
    }

    async put(url: string, parameters?: object, authHeader?: string) {
        const CancelToken = Axios.CancelToken;
        const source = CancelToken.source();
        const config: AxiosRequestConfig = {
            method: 'put',
            url: url,
            headers: authHeader ? {'Authorization': authHeader} : undefined,
            data: parameters,
            responseType: 'json',
            cancelToken: source.token
        }
        this.tasks.push([url, source])
        let response = await Axios(config)
        return response.data
    }

    async upload(multipart: [{name: string, data: object | Files}], url: string, authHeader?: string, progress?: ProgressCallback) {
        const formData = new FormData();
        for (let part of multipart) {
            if (Array.isArray(part.data)) {
                part.data.forEach(file => {
                    formData.append(part.name, {
                        ...file,
                        uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
                        name: file.name,
                        type: file.type
                      });
                })
            } else {
                formData.append(part.name, part.data)
            }
        }

        const CancelToken = Axios.CancelToken;
        const source = CancelToken.source();
        const config: AxiosRequestConfig = {
            method: 'post',
            url: url,
            headers: authHeader ? {'Authorization': authHeader, 'Content-Type': 'multipart/form-data'} : {'Content-Type': 'multipart/form-data'},
            data: formData,
            responseType: 'json',
            cancelToken: source.token,
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                if (progress) {
                    progress(percentCompleted)
                }
            }
        }
        let response = await Axios(config)
        return response.data
    }
    
    async download(url: string, authHeader?: string, progress?: ProgressCallback) {
        const CancelToken = Axios.CancelToken;
        const source = CancelToken.source();
        const config: AxiosRequestConfig = {
            method: 'get',
            url: url,
            headers: authHeader ? {'Authorization': authHeader} : undefined,
            responseType: 'arraybuffer',
            cancelToken: source.token,
            onDownloadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                if (progress) {
                    progress(percentCompleted)
                }
            }
        }
        

        this.tasks.push([url, source])
        let response = await Axios(config)
        const fileBase64 = Buffer.from(response.data, 'binary').toString('base64')
        const destinationPath = Path.resolve(Fs.CachesDirectoryPath, url.replaceAll('/',''))
        try {
            Fs.writeFile(destinationPath, fileBase64, 'base64')
            return destinationPath
        } catch (error) {
            throw error
        }
    }

    cancelRequest(url: string): void {
        let filteredTaks = this.tasks.filter(task => task[0] == url)
        filteredTaks.forEach(task => {
            let source = task[1]
            source.cancel()
        })
    }

    cancelAllRequests(): void {
        this.tasks.forEach(task => {
            let source = task[1]
            source.cancel()
        })
    }
    
}