import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'

class App extends Component {
  state = {
    userPasswordsList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isPasswordMasked: true,
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
    console.log(event.target.value)
  }

  onUserNameChange = event => {
    this.setState({username: event.target.value})
    console.log(event.target.value)
  }

  onWebsiteChange = event => {
    this.setState({website: event.target.value})
    console.log(event.target.value)
  }

  onSubmitData = event => {
    event.preventDefault()
    this.addUserPasswords()
  }

  onDelete = id => {
    const {userPasswordsList} = this.state
    const filteredResult = userPasswordsList.filter(each => each.id !== id)
    this.setState({userPasswordsList: filteredResult})
  }

  addUserPasswords = () => {
    const {website, username, password} = this.state
    const newItem = {
      id: v4(),
      website,
      username,
      password,
    }
    this.setState(prevState => {
      const {userPasswordsList} = prevState
      return {userPasswordsList: [...userPasswordsList, newItem]}
    })
  }

  getPasswordDetailsBox = () => {
    const {userPasswordsList, searchInput, isPasswordMasked} = this.state
    const searchResult = userPasswordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (searchResult.length === 0) {
      return this.getEmptyDataAssets()
    }

    const onDelete = id => {
      this.onDelete(id)
    }

    const passwordBoxes = (
      <ul className="box-list-container">
        {searchResult.map(eachItem => (
          <li className="password-box" key={eachItem.id} id={eachItem.id}>
            <span className="username-first-letter">
              {eachItem.username[0]}
            </span>
            <div className="details-box">
              <p className="box-detail-paragraph">{eachItem.website}</p>
              <p className="box-detail-paragraph">{eachItem.username}</p>
              <p className="box-detail-paragraph">
                {isPasswordMasked && (
                  <img
                    className="masked-image"
                    alt="stars"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                  />
                )}
                {!isPasswordMasked && eachItem.password}
              </p>
            </div>
            <button
              type="button"
              className="delete-btn"
              onClick={() => {
                onDelete(eachItem.id)
              }}
              data-testid="delete"
            >
              <img
                className="delete-icon-image"
                alt="delete"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              />
            </button>
          </li>
        ))}
      </ul>
    )

    return passwordBoxes
  }

  getEmptyDataAssets = () => {
    const assets = (
      <>
        <img
          className="password-empty-image1"
          alt="no passwords"
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        />
        <p className="no-password-paragraph">No Passwords</p>
      </>
    )
    return assets
  }

  onChangeCheckBoxState = event => {
    this.setState(prevState => ({
      isPasswordMasked: !prevState.isPasswordMasked,
    }))
  }

  render() {
    const {userPasswordsList, website, username, password} = this.state
    console.log(website, username, password)
    return (
      <div className="bg-container">
        <img
          className="app-logo"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="add-password-section">
          <img
            className="password-manager-image1"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          />
          <form className="password-form" onSubmit={this.onSubmitData}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <img
                className="input-icon"
                alt="website"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                onChange={this.onWebsiteChange}
              />
            </div>
            <div className="input-container">
              <img
                className="input-icon"
                alt="username"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.onUserNameChange}
              />
            </div>
            <div className="input-container">
              <img
                className="input-icon"
                alt="password"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.onPasswordChange}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            className="password-manager-image2"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
        </div>

        <div className="password-details-section">
          <div className="search-and-password-no-container">
            <h1 className="search-heading">Your Passwords</h1>
            <p className="list-count">{userPasswordsList.length}</p>
            <div className="search-input-container">
              <img
                className="search-input-icon"
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <div className="check-box-container">
            <input
              type="checkbox"
              id="check"
              onClick={this.onChangeCheckBoxState}
            />
            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>
          {userPasswordsList.length === 0 && this.getEmptyDataAssets()}
          {userPasswordsList.length !== 0 && this.getPasswordDetailsBox()}
        </div>
      </div>
    )
  }
}

export default App
