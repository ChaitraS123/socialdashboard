import React, { useState, useEffect } from 'react'
import validator from 'validator';
import axios from 'axios'
const Login1 = (props) => {
    const { toggle, datauser } = props
    const [email, setEmail] = useState('')
    const [user, setUser] = useState({})
    const [formError, setFormError] = useState({})
    const errors = {}
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const runValidation = () => {
        if (email.length === 0) {
            errors.email = "email cannot be blank"
        }
        else if (!validator.isEmail(email)) {
            errors.email = "invalid email"
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        runValidation();

        if (Object.keys(errors).length === 0) {
            setFormError({})
            axios.get('https://jsonplaceholder.typicode.com/users')
                .then((response) => {
                    const result = response.data.find((el) => {
                        return el.email === email
                    })
                    if (result) {
                        setUser(result)
                        datauser(result)
                    }
                    else if (result === undefined) {
                        errors.email = "email does not exist";
                        setFormError(errors)

                    }
                })
        }

        else {
            setFormError(errors)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="card" style={{ width: "35%", left: "25%" }} >
                    <div className="card-body">
                        <input type="text" className="form-control" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                        {formError.email && <p>{formError.email}</p>}
                        <input type="submit" className="btn btn-success" value="login" />
                    </div>
                </div>
            </form>


        </div>
    )
}
export default Login1