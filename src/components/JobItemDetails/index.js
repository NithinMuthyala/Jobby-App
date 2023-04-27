import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: '',
    similarJobs: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    // console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const jobsUrl = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')

    const options = {
      headers: {Authorization: `Bearer ${token}`},
      method: 'GET',
    }

    const response = await fetch(jobsUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  unsucRetryClicked = () => {
    this.getJobDetails()
  }

  renderFailure = () => (
    <div className="jd-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jd-failure-image"
      />
      <h1 className="jd-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jd-failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="js-failure-retry-btn"
        onClick={this.unsucRetryClicked}
      >
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {jobDetails, similarJobs} = this.state
    console.log(similarJobs)
    const {skills} = jobDetails
    // console.log(skills)
    const lifeAtCompany = {lifeatCompany: jobDetails.life_at_company}
    const {lifeatCompany} = lifeAtCompany

    return (
      <div className="jd-success-container">
        <div className="jd-header-container">
          <Header />
        </div>
        <div className="jd-success-card">
          <div className="logo-title-container">
            <img
              src={jobDetails.company_logo_url}
              alt="job details company logo"
              className="job details company logo"
            />
            <div className="head-raat-container">
              <h1 className="job-title">{jobDetails.title}</h1>
              <div className="rating-container">
                <BsStarFill className="star-icon" />
                <p className="company-rating">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="package-loc-container">
            <div className="location-type-container">
              <div className="loc-container">
                <MdLocationOn />
                <p className="text">{jobDetails.location}</p>
              </div>
              <div className="loc-container">
                <BsFillBriefcaseFill />
                <p className="text">{jobDetails.employment_type}</p>
              </div>
            </div>
            <p className="text">{jobDetails.package_per_annum}</p>
          </div>
          <div className="des-link-container">
            <h3 className="description-head">Description</h3>
            <div className="links-container">
              <a href={jobDetails.company_website_url} className="jd-link">
                Visit
              </a>
              <BiLinkExternal />
            </div>
          </div>
          <p className="job-description">{jobDetails.job_description}</p>
          <div>
            <h1 className="jd-skill-heading">Skills</h1>
            <ul className="jd-ul-container">
              {skills.map(eachSkill => (
                <li key={eachSkill.name} className="jd-skill-card">
                  <img
                    src={eachSkill.image_url}
                    alt={eachSkill.name}
                    className="skill-image"
                  />
                  <p className="jd-skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="jd-company-des-container">
            <div>
              <h1 className="jd-life-atc-heading">Life at Company</h1>
              <p className="jd-company-description">
                {lifeatCompany.description}
              </p>
            </div>
            <img src={lifeatCompany.image_url} alt="life at company" />
          </div>
        </div>

        <ul className="similar-ul-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          {similarJobs.map(eachSimilar => (
            <SimilarJobItem key={eachSimilar.id} eachSimilar={eachSimilar} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobCard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderJobCard()
  }
}

export default JobItemDetails
