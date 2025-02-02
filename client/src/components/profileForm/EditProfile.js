import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
  useEffect(() => {
    getCurrentProfile()

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
      facebook: loading || !profile.social ? '' : profile.social.facebook
    })
  }, [loading, getCurrentProfile])

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    facebook: ''
  })

  const [displaySocial, toggleSocial] = useState(false)

  const { company, website, location, status, skills, githubusername, bio, twitter, linkedin, youtube, instagram, facebook } = formData

  const handleFieldChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onFormSubmit = e => {
    e.preventDefault()

    createProfile(formData, history, true)
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user" />{' '}
        Let's get some information to make your profile stand out
      </p>
      <small>
        * = required field
      </small>
      <form className="form" onSubmit={e => onFormSubmit(e)}>
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={e => handleFieldChange(e)}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student of Learning">Student of Learning</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => handleFieldChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => handleFieldChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => handleFieldChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg, Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={e => handleFieldChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML, CSS, JavaScript, Python)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={e => handleFieldChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your username
          </small>
        </div>
        <div className="form-group">
          <textarea
            type="text"
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => handleFieldChange(e)}
          />
          <small className="form-text">
            Tell us a little about yourself
          </small>
        </div>
        <div className="my-2">
          <button
            onClick={() => toggleSocial(!displaySocial)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <small>Optional</small>
        </div>
        {displaySocial && <Fragment>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x" />
            <input
              type="text"
              placeholder="Twitter URL"
              name="twitter"
              value={twitter}
              onChange={e => handleFieldChange(e)}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x" />
            <input
              type="text"
              placeholder="Facebook URL"
              name="facebook"
              value={facebook}
              onChange={e => handleFieldChange(e)}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x" />
            <input
              type="text"
              placeholder="Youtube URL"
              name="youtube"
              value={youtube}
              onChange={e => handleFieldChange(e)}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x" />
            <input
              type="text"
              placeholder="LinkedIn URL"
              name="linkedin"
              value={linkedin}
              onChange={e => handleFieldChange(e)}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x" />
            <input
              type="text"
              placeholder="Instagram URL"
              name="instagram"
              value={instagram}
              onChange={e => handleFieldChange(e)}
            />
          </div>
        </Fragment>}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))
