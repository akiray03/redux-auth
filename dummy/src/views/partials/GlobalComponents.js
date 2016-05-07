import React from "react";
import RequestTestSuccessModal from "./RequestTestSuccessModal";
import RequestTestErrorModal from "./RequestTestErrorModal";
import * as MUITheme from "../../components/auth/index";
import { connect } from "react-redux";

class GlobalComponents extends React.Component {
  render () {
    let Theme = MUITheme;

    return (
      <div>
        <Theme.AuthGlobals />
        <RequestTestSuccessModal />
        <RequestTestErrorModal />
      </div>
    );
  }
}

export default connect(({demoUi}) => {
  return ({
    theme: demoUi.get("theme"),
  })
})(GlobalComponents);
