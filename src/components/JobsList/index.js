import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'
import Profile from '../Profile'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsList extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    employementType: [],
    salaryRange: '',
    searchText: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employementType, salaryRange, searchText} = this.state
    // console.log(employementType)
    // console.log(salaryRange)
    // console.log(searchText)

    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employementType.join()}&minimum_package=${salaryRange}&search=${searchText}`
    // console.log(jobsUrl)
    const token = Cookies.get('jwt_token')
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}

    const response = await fetch(jobsUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const {jobs} = data
      const formatedJobs = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      //   console.log(formatedJobs)
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: formatedJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailure = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
          alt="failure view"
        />
        <h1>Something Went Wrong</h1>
        <p>We cannot seem to find the page</p>
      </div>
    </div>
  )

  checkboxFiltersCard = () => (
    <div className="checkbox-main-container">
      <div className="check-box-card">
        <h1 className="employemnt-type-heading">Type of Employement</h1>
        {employmentTypesList.map(eachFilter => (
          <div
            className="check-box-container"
            key={eachFilter.employmentTypeId}
          >
            <input
              type="checkbox"
              id={eachFilter.employmentTypeId}
              value={eachFilter.employmentTypeId}
              onChange={this.checkBoxSelected}
            />
            <label className="label-text" htmlFor={eachFilter.employmentTypeId}>
              {eachFilter.label}
            </label>
          </div>
        ))}
        <hr />
      </div>
    </div>
  )

  radioSelected = event => {
    console.log(event.target.value)
    this.setState({salaryRange: event.target.value}, this.getJobsList)
  }

  checkBoxSelected = event => {
    console.log(event.target.value)
    this.setState(
      prevState => ({
        employementType: [...prevState.employementType, event.target.value],
      }),
      this.getJobsList,
    )
  }

  searchText = event => {
    this.setState({searchText: event.target.value})
  }

  radioButtonFilterCard = () => (
    <div className="radio-main-container">
      <div className="radio-card">
        <h1 className="salary-heading">Salary Range</h1>
        {salaryRangesList.map(eachRadio => (
          <div className="radio-container" key={eachRadio.salaryRangeId}>
            <input
              id={eachRadio.salaryRangeId}
              type="radio"
              name="salary"
              value={eachRadio.salaryRangeId}
              onChange={this.radioSelected}
            />
            <label className="label-radio" htmlFor={eachRadio.salaryRangeId}>
              {eachRadio.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  enterClicked = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  searchInputcard = () => (
    <div className="search-container">
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={this.searchText}
        onKeyDown={this.enterClicked}
      />
      <button type="button" className="search-btn" data-testid="searchButton">
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  renderSuccess = () => {
    const {jobsList} = this.state

    // console.log(jobsList)

    if (jobsList.length > 0) {
      return (
        <div>
          <ul className="job-card-container">
            {jobsList.map(eachJob => (
              <JobItem key={eachJob.id} eachJob={eachJob} />
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="no-job-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-image"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-description">
          we could not find any jobs try other filters
        </p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderCards = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="filters-container">
          {this.searchInputcard()}
          <Profile />
          {this.checkboxFiltersCard()}
          {this.radioButtonFilterCard()}
        </div>
        <div className="sfl-cards">{this.renderCards()}</div>
      </div>
    )
  }
}
export default JobsList
