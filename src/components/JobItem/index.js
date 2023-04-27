import {Link} from 'react-router-dom'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {eachJob} = props

  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob

  return (
    <li className="list-item-job">
      <Link className="nav-link-job" to={`/jobs/${id}`}>
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="head-raat-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <BsStarFill className="star-icon" />
              <p className="company-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-loc-container">
          <div className="location-type-container">
            <div className="loc-container">
              <MdLocationOn />
              <p className="text">{location}</p>
            </div>
            <div className="loc-container">
              <BsFillBriefcaseFill />
              <p className="text">{employmentType}</p>
            </div>
          </div>
          <p className="text">{packagePerAnnum}</p>
        </div>
        <h3 className="description-head">Description</h3>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
