import React, { PropTypes } from "react";
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import { emailSignUpFormUpdate, emailSignUp } from "../../actions/email-sign-up";
import { connect } from "react-redux";

@connect(({auth}) => ({auth}))
class EmailSignUpForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    icon: PropTypes.string,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
      submit: PropTypes.object
    })
  }

  static defaultProps = {
    inputProps: {
      email: {},
      password: {},
      submit: {}
    }
  }

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.getIn(["configure", "currentEndpointKey"]) ||
      this.props.auth.getIn(["configure", "defaultEndpointKey"])
    );
  }

  handleInput (key, val) {
    this.props.dispatch(emailSignUpFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit () {
    console.log("submitting form to endpoint", this.getEndpoint());
    let formData = this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "form"]).toJS();
    this.props.dispatch(emailSignUp(formData, this.getEndpoint()));
  }

  render () {
    let disabled = (
      this.props.auth.getIn(["user", "isSignedIn"]) ||
      this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "loading"])
    );

    return (
      <form className='redux-auth email-sign-up-form'
            style={{clear: "both", overflow: "hidden"}}
            onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text"
               label="Email"
               className="email-sign-up-email"
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "form", "email"])}
               errors={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "errors", "email"])}
               onChange={this.handleInput.bind(this, "email")}
               {...this.props.inputProps.email} />

        <Input type="password"
               label="Password"
               className="email-sign-up-password"
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "form", "password"])}
               errors={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "errors", "password"])}
               onChange={this.handleInput.bind(this, "password")}
               {...this.props.inputProps.password} />

        <Input type="password"
               label="Password Confirmation"
               className="email-sign-up-password-confirmation"
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "form", "password_confirmation"])}
               errors={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "errors", "password_confirmation"])}
               onChange={this.handleInput.bind(this, "password_confirmation")}
               {...this.props.inputProps.passwordConfirmation} />

        <ButtonLoader loading={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "loading"])}
                      type="submit"
                      className="email-sign-up-submit"
                      primary={true}
                      style={{float: "right"}}
                      icon={this.props.icon}
                      disabled={disabled}
                      onClick={this.handleSubmit.bind(this)}
                      {...this.props.inputProps.submit}>
          Sign Up
        </ButtonLoader>
      </form>
    );
  }
}

export default EmailSignUpForm;