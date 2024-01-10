import axios from 'axios'

export default class AxiosClient {
    getRequest = ({url, config, callbackSuccess, calbackError}) => {
        axios.get(url, config)
            .then(callbackSuccess)
            .catch(calbackError)
    }

    postRequest = ({url, body, config, callbackSuccess, calbackError}) => {
        axios.post(url, body, config)
            .then(callbackSuccess)
            .catch(calbackError)
    }

    putRequest = ({url, body, config, callbackSuccess, calbackError}) => {
        axios.put(url, body, config)
            .then(callbackSuccess)
            .catch(calbackError)
    }

    deleteRequest = ({url, config, callbackSuccess, calbackError}) => {
        axios.delete(url, config)
            .then(callbackSuccess)
            .catch(calbackError)
    }
}