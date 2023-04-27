import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {eachSimilar} = props
  console.log(eachSimilar)

  return (
    <li className="similar-job-list-item">
      <div className="logo-title-container">
        <img
          src={eachSimilar.company_logo_url}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="head-raat-container">
          <h1 className="job-title">{eachSimilar.title}</h1>
          <div className="rating-container">
            <BsStarFill className="star-icon" />
            <p className="company-rating">{eachSimilar.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-heading">Description</h1>
      <p className="similar-description">{eachSimilar.job_description}</p>

      <div className="location-type-container">
        <div className="loc-container">
          <MdLocationOn />
          <p className="text">{eachSimilar.location}</p>
        </div>
        <div className="loc-container">
          <BsFillBriefcaseFill />
          <p className="text">{eachSimilar.employment_type}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
