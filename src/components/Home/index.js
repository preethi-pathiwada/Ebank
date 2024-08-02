import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-bg">
      <div className="nav-container">
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            className="logo"
            alt="website logo"
          />
        </Link>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="container">
        <h1 className="home-heading">Your flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="card-image"
        />
      </div>
    </div>
  )
}

export default Home
