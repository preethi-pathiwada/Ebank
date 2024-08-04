import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: '', showSubmitError: false}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    const {history} = this.props
    this.setState({showSubmitError: true, errorMsg})

  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    console.log(userId, pin)
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => this.setState({userId: event.target.value})

  onChangePin = event => this.setState({pin: event.target.value})

  render() {
    const {userId, pin, errorMsg, showSubmitError} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <div className="login-card">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
              alt="website login"
              className="image"
            />
          </div>
          <form className="form-container" onSubmit={this.submitForm}>
            <h1 className="heading">Welcome Back!</h1>
            <div className="input-container">
              <label className="label" htmlFor="userId">
                User Id
              </label>
              <input
                type="text"
                className="input"
                id="userId"
                value={userId}
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="pin">
                PIN
              </label>
              <input
                type="password"
                className="input"
                id="pin"
                value={pin}
                onChange={this.onChangePin}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
