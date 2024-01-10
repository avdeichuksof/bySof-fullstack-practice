import React, {useState, useEffect} from "react"

const Products = () => {

    const [data, setData] = useState('')

    useEffect( () => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetch('/api/products')
            const result = await res.json()
            setData(result.message)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }


    return <div>
        <h1>Products</h1>
        <p>{data}</p>
    </div>
}

export default Products