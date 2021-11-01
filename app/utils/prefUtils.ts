import AsyncStorage from '@react-native-community/async-storage';
// import { API_TOKEN, USER, IS_LOGGED_IN, UNSUCCESSFUL, TRANSACTION_PIN } from './PrefKeys';

export const API_TOKEN = 'accessToken';
export const IS_LOGGED_IN = 'is_logged_in';
export const USER = 'user'; 

export const setItem = async (key, value) => {
    await AsyncStorage.setItem(key, value)
}

export const getItem = async (key) => {
    const value = await AsyncStorage.getItem(key)
    return value;
}

export const setToken = async (value) => {
    await AsyncStorage.setItem(API_TOKEN, value)
}


export const getToken = async () => {
    const token = await AsyncStorage.getItem(API_TOKEN)
    return token;
}

export const clearSession = async () => {
    await AsyncStorage.setItem(USER, '')
    await AsyncStorage.setItem(IS_LOGGED_IN, '0')
}