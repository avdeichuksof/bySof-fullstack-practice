import AxiosClient from './axiosClient'

const baseURL = process.env.REACT_APP_BASE_URL

export default class UserService {
    constructor() {
        this.client = new AxiosClient()
    }

    userRegister = ({newUser, callbackSuccess, callbackError}) => {
        const reqInfo = {url: `${baseURL}/auth/register`, newUser, callbackSuccess, callbackError}
        this.client.postRequest(reqInfo)
    }

    userLogin = ({user, callbackSuccess, callbackError}) => {
        const reqInfo = {url: `${baseURL}/auth/login`, user, callbackSuccess, callbackError}
        this.client.postRequest(reqInfo)
    }

}