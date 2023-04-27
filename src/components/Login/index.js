import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorStatus: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSucces = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({errorStatus: true, errorMsg})
  }

  getLoginStatus = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const details = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSucces(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, errorStatus} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="form-container" onSubmit={this.getLoginStatus}>
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>
          <div className="input-tag-container">
            <label className="label-login" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text "
              id="username"
              placeholder="Username"
              className="input"
              onChange={this.onChangeUserName}
              value={username}
            />
          </div>
          <div className="input-tag-container">
            <label className="label-login" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {errorStatus && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
