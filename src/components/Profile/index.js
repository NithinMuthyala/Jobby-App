import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {apiStatus: apiStatusConstants.initial, profileData: ''}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {headers: {Authorization: `Bearer ${token}`}, method: 'GET'}

    const response = await fetch(profileUrl, options)
    const data = await response.json()
    // console.log(data)

    if (response.ok === true) {
      //   const profileDetails = {profie: data.profile_details}
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileData: data.profile_details,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {profileData} = this.state
    console.log(profileData.name)
    return (
      <div className="profile-bg-container">
        <div className="profile-text-card">
          <img src={profileData.profile_image_url} alt="profile" />
          <h1 className="profile-heading">{profileData.name}</h1>
          <p className="profile-bio">{profileData.short_bio}</p>
        </div>
      </div>
    )
  }

  retryBtnClicked = () => {
    this.getProfile()
  }

  renderFailure = () => (
    <div className="retry-btn-container">
      <button
        type="button"
        className="retry-btn"
        onClick={this.retryBtnClicked}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccess()
      default:
        return null
    }
  }
}

export default Profile
