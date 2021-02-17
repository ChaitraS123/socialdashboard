import axios from 'axios'
import React, { useState, useEffect } from 'react'


const Dashboard = (props) => {
    const { userdata, toggle } = props
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userdata.id}`)
            .then((response) => {
                console.log(response.data)
                setPosts(response.data)
            })
    }, [])
    const handleLogout = () => {
        toggle()

    }
    return (
        <div>
            <button onClick={handleLogout}>logout</button>
            <h2>Name:{userdata.name}</h2>
            <p>Email:{userdata.email}</p>
            <p>Phone:{userdata.phone}</p>
            <p>Company:{userdata.company.name}</p>
            <p>CatchPhrase:{userdata.company.catchPhrase}</p>
            <h3>Posts</h3>
            {posts.map((el) => {
                return <li key={el.id}>{el.title}</li>
            })}
        </div>
    )
}
export default Dashboard