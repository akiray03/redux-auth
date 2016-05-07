import React from "react";
import { PageHeader } from "react-bootstrap";
import { connect } from "react-redux";

class LandingPage extends React.Component {
  render () {
    return (
      <div>
        <PageHeader>hello landing page.</PageHeader>
      </div>
    );
  }
}

export default connect(({routes}) => ({routes}))(LandingPage);
