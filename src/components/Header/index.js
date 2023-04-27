import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const logoutClicked = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const renderSmallDevices = () => (
    <div className="header-bg-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="icons-container">
        <li>
          <Link to="/">
            <AiFillHome className="icons" />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <BsFillBriefcaseFill className="icons" />
          </Link>
        </li>
        <li>
          <button
            className="logout-icon-btn"
            type="button"
            onClick={logoutClicked}
          >
            <FiLogOut className="icons" />
          </button>
        </li>
      </ul>
    </div>
  )

  const renderlargeDevices = () => (
    <div className="header-bg-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>

      <ul className="ul-container">
        <li>
          <Link to="/" className="header-link-text">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="header-link-text">
            Jobs
          </Link>
        </li>
      </ul>

      <button type="button" className="logout-btn" onClick={logoutClicked}>
        Logout
      </button>
    </div>
  )

  return (
    <>
      <div className="large-devices">{renderlargeDevices()}</div>
      <div className="small-devices">{renderSmallDevices()}</div>
    </>
  )
}

export default withRouter(Header)
