// @flow
import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';

import VerticalNavStyle from '../../assets/jss/material-dashboard-pro-react/components/verticalNavi';
import LogoutButton from '../../containers/Logout';

/* eslint-disable react/require-default-props */
type Props = {
  classes: Object,
  color?:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'rose'
    | 'purple',
  logo?: string,
  routes: Object,
  location: Object
};

const toolTips = {
  toolTip: {
    whiteSpace: 'nowrap'
  }
};

const VerticalNav = (props: Props) => {
  // verifies if routeName is the one active
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1;
  }
  const { classes, color, logo, routes } = props;
  const links = (
    <List>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        const listItemClasses = cx({
          // eslint-disable-next-line prefer-template
          [' ' + classes[color]]: activeRoute(prop.path)
        });
        const whiteFontClasses = cx({
          // eslint-disable-next-line prefer-template
          [' ' + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          // eslint-disable-next-line react/no-array-index-key
          <NavLink
            to={prop.path}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <Tooltip id={prop.id} title={prop.navName} placement="bottom">
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  <prop.icon />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  const brand = (
    <div className={classes.logo}>
      <a href="v5support.yoriki.cloud" target="_blank">
        <div className={classes.logoImage}>
          <img src={logo} alt="寄騎v5サポート" className={classes.img} />
        </div>
      </a>
    </div>
  );

  return (
    <div className={classes.verticalNavi}>
      {brand}
      {links}
      <LogoutButton />
    </div>
  );
};

export default withStyles(VerticalNavStyle)(VerticalNav);
