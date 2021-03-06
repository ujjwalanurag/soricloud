import React, { Component } from "react";

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.loginInput,
      password: "",
      username: "",
      passwordErrors: [],
      usernameErrors: [],
      form: false
    };

    this.passRef = React.createRef();
    this.setUsernameRef = element => {
      this.usernameRef = element;
    };
    this.focusUsername = () => {
      if (this.usernameRef) this.usernameRef.focus();
    };

    this.update = this.update.bind(this);
    this.handleInitialSubmit = this.handleInitialSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.renderPasswordErrors = this.renderPasswordErrors.bind(this);
    this.renderUsernameErrors = this.renderUsernameErrors.bind(this);
  }

  componentDidMount() {
    this.passRef.current.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.form) {
      this.focusUsername();
    }
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleInitialSubmit(e) {
    e.preventDefault();
    if (this.state.password.length === 0) {
      this.setState({ passwordErrors: ["Enter a password."] });
    } else if (this.state.password.length < 6) {
      this.setState({ passwordErrors: ["Use at least 6 characters."] });
    } else {
      this.setState({ passwordErrors: [], form: true });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username.length === 0) {
      this.setState({
        usernameErrors: ["Enter your display name."]
      });
    }
    this.props.signup(this.state).then(this.props.closeModal);
  }

  switchModal() {
    this.props.closeModal();
    this.props.openModal("loginInput");
  }

  renderPasswordErrors() {
    return (
      <ul>
        {this.state.passwordErrors.map((err, i) => (
          <li id="errors" key={`error-${i}`}>
            {err}
          </li>
        ))}
      </ul>
    );
  }

  renderUsernameErrors() {
    return (
      <ul>
        {this.state.usernameErrors.map((err, i) => (
          <li id="errors" key={`error-${i}`}>
            {err}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    if (this.state.form) {
      return (
        <div className="login-info-form-container">
          <form onSubmit={this.handleSubmit} className="login-form-box">
            <div className="login-info-form">
              <h1 className="create-account-modal">
                Tell us a bit about yourself
              </h1>
              <h3 className="choose-password">
                Choose your display name <span className="red-splat">*</span>
              </h3>
              <input
                ref={this.setUsernameRef}
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                className="login-info-input loginInput"
              />
              {this.renderUsernameErrors()}
              <p className="fine-print">
                Your display name can be anything you like. Your name or artist
                name are good choices.
              </p>
              <input
                id="login-form-continue"
                className="splash-button signup"
                type="submit"
                value="Get started"
              />
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className="login-info-form-container">
        <div className="login-form-box">
          <form className="login-info-form">
            <h1 className="create-account-modal">
              Create your SoriCloud account
            </h1>
            <button
              form=""
              className="login-info-input modal-item loginInput"
              onClick={this.switchModal}
            >
              &#9668; {this.state.email}
            </button>
            <h3 className="choose-password">
              Choose a password <span className="red-splat">*</span>
            </h3>
            <input
              ref={this.passRef}
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              className="login-info-input"
            />
            {this.renderPasswordErrors()}
            <p className="fine-print">
              By signing up I accept the{" "}
              <span className="privacy-policy">Terms of Use</span>. I have read
              and understood the{" "}
              <span className="privacy-policy">Privacy Policy</span> and{" "}
              <span className="privacy-policy">Cookies Policy</span>.
            </p>
            <input
              id="login-form-continue"
              className="splash-button modal-item"
              type="submit"
              value="Accept & Continue"
              onSubmit={this.handleInitialSubmit}
              onClick={this.handleInitialSubmit}
            />
            <div className="sign-in-question">
              <h3>Are you trying to sign in?</h3>
              <p>
                The email address that you entered was not found. Double-check
                your email address.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
