import React, {useState, useEffect} from "react"

const Home = () => {

    const [data, setData] = useState('')

    useEffect( () => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetch('/')
            const result = await res.json()
            setData(result.message)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }


    return <div>
        <h1>Home</h1>
        <p>{data}</p>
    </div>
}

export default Home