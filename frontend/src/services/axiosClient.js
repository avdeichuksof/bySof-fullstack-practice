import axios from 'axios'

export default class AxiosClient {
    getRequest = ({url, config, callbackSuccess, callbackError}) => {
        return axios.get(url, config)
            .then(callbackSuccess)
            .catch(callbackError)
    }

    postRequest = ({url, body, config, callbackSuccess, callbackError}) => {
        return axios.post(url, body, config)
            .then(callbackSuccess)
            .catch(callbackError)
    }

    putRequest = ({url, body, config, callbackSuccess, callbackError}) => {
        return axios.put(url, body, config)
            .then(callbackSuccess)
            .catch(callbackError)
    }

    deleteRequest = ({url, config, callbackSuccess, callbackError}) => {
        return axios.delete(url, config)
            .then(callbackSuccess)
            .catch(callbackError)
    }
}