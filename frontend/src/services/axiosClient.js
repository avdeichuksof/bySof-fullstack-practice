import axios from 'axios'

export default class AxiosClient {
    getRequest = ({url, config, callbackSuccess, callbackError}) => {
        axios.get(url, config)
            .then(callbackSuccess)
            .catch(callbackError)
    }

    postRequest = ({url, body, config, callbackSuccess, callbackError}) => {
        axios.post(url, body, config)
            .then(callbackSuccess)
            .catch(callbackError)
    }

    putRequest = ({url, body, config, callbackSuccess, callbackError}) => {
        axios.put(url, body, config)
            .then(callbackSuccess)
            .catch(callbackError)
    }

    deleteRequest = ({url, config, callbackSuccess, callbackError}) => {
        axios.delete(url, config)
            .then(callbackSuccess)
            .catch(callbackError)
    }
}