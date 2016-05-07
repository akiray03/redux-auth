import React, { PropTypes } from "react";
import { Grid, Navbar, NavItem, Nav, NavBrand } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import {AppBar, Styles} from 'material-ui';
import MyRawTheme from '../../material_ui_raw_theme_file';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

if (!global.__SERVER__ && !global.__TEST__) {
  require("../../styles/main.scss");
}

class Container extends React.Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: Styles.ThemeManager.getMuiTheme(MyRawTheme)};
  }

  static propTypes = {
    children: PropTypes.node
  };

  handleReload(o) {
    window.location.reload();
  }

  handleHelp(o) {
    console.log("handle Help");
  }

  handleSignOut(o) {
    console.log("handle Sign Out");
  }

  render () {
    return (
      <div className="wrapper">
        <header className="header">
          <AppBar title="Levii Account Center"
                  iconElementRight={
                          <IconMenu
                            iconButtonElement={
                              <IconButton><MoreVertIcon /></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                          >
                        <MenuItem primaryText="Refresh" onClick={this.handleReload.bind(this)} />
                        <MenuItem primaryText="Help" onClick={this.handleHelp.bind(this)} />
                        <MenuItem primaryText="Sign out" onClick={this.handleSignOut.bind(this)} />
                      </IconMenu>
                    }
          />
        </header>

        <Grid className="content">
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default Container;
