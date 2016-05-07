import React from "react";
import { PageHeader } from "react-bootstrap";
import { connect } from "react-redux";
import Header from '../components/Header';

class LandingPage extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <PageHeader>hello landing page.</PageHeader>
      </div>
    );
  }
}

export default connect(({routes}) => ({routes}))(LandingPage);
