import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onFormSubmit = e => {
    e.preventDefault()

    console.log(formData)
  }

  const handleFieldChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Sign Into Your Account
      </p>
      <form className="form" onSubmit={e => onFormSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => handleFieldChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => handleFieldChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      <p className="my-1">
        Don't have an account ?
        <Link to="/register"> Sign Up</Link>
      </p>
    </Fragment>
  )
}

export default Login
