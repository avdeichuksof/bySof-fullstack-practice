/* import React, {useState, useEffect} from "react"
import AxiosClient from "../services/axiosClient"
const axiosClient = new AxiosClient() */

const Home = () => {

    /* ESTO SE PUEDE USAR PARA MOSTRAR ALGUNOS PRODUCTOS CON LIMIT Y PAGINATE */
/* 
    const [data, setData] = useState('')

    const fetchData = async () => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const baseURL = process.env.REACT_APP_BASE_URL
        try {
            axiosClient.getRequest({
                url: `${baseURL}`,
                config: config,
                callbackSuccess: (res) => {
                    console.log('Successfull request ', res)
                },
                calbackError: (error) => {
                    console.error('Error: ', error)
                }
            })
            setData(result.message)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
 */

    return <div>
        <h1>Home</h1>
    </div>
}

export default Home