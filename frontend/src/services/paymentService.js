import AxiosClient from './axiosClient'

/* const baseURL = process.env.REACT_APP_BASE_URL
const paymentEndpoint = process.env.REACT_APP_PAYMENT_ENDPOINT */

const baseURL = 'http://localhost:8080'
const paymentEndpoint = '/api/payments'

const config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    withCredentials: true
}

class PaymentService {
    constructor() {
        this.client = new AxiosClient()
    }

    createPaymentIntent = ({ prodId, callbackSuccess, callbackError }) => {
        const requestInfo = {
            url: `${baseURL}${paymentEndpoint}/payment-intents?id=${prodId}`,
            body,
            config: config,
            callbackSuccess, 
            callbackError
        }
        this.client.postRequest(requestInfo)
    }

    generatePayment = ({ body, callbackSuccess, callbackError }) => {
        const requestInfo = {
            url: `${baseURL}${paymentEndpoint}/checkout`,
            body,
            config: config,
            callbackSuccess,
            callbackError
        }
        this.client.postRequest(requestInfo)
    }
}

export default PaymentService