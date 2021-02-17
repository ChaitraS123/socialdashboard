import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login1 from './Login1'
import DashBoard from './DashBoard1'


const App = (props) => {
    const [loginstatus, setLoginStatus] = useState(false)
    const [userdata, setuserdata] = useState({})
    const togglelogin = () => {
        setLoginStatus(!loginstatus)
    }
    const datauser = (data) => {
        setuserdata(data)
        if (data) {
            setLoginStatus(true)
        }
        else {
            setLoginStatus(false)
        }
    }

    return (
        <div>
            {loginstatus ?
                <div>
                    <Redirect to="/dashboard" />
                    <Route path="/dashboard" render={(props) => {
                        return <DashBoard {...props} toggle={togglelogin} userdata={userdata} />
                    }} />
                </div> :
                <div>
                    <Redirect to="/" />
                    <Route path="/" render={(props) => {
                        return <Login1 {...props} toggle={togglelogin} datauser={datauser} />
                    }} />
                </div>}


        </div>
    )
}
export default App