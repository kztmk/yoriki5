// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import { withStyles, List, ListItem, ListItemIcon, Tooltip } from 'material-ui';
import VerticalNavStyle from '../../variables/styles/verticalNavi';
import LogoutButton from '../../containers/Logout';

const VerticalNav = ({ ...props }) => {
  // verifies if routeName is the one active
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1;
  }
  const { classes, color, logo, image, logoText, routes } = props;
  const links = (
    <List>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        const listItemClasses = cx({
          [' ' + classes[color]]: activeRoute(prop.path)
        });
        const whiteFontClasses = cx({
          [' ' + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <NavLink to={prop.path} className={classes.item} activeClassName="active" key={key}>
            <ListItem button className={classes.itemLink + listItemClasses}>
              <Tooltip
                className={classes.toolTip}
                id={prop.id}
                title={prop.navName}
                placement="bottom"
              >
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