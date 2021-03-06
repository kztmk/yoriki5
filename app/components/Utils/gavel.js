// @flow
import { clipboard } from 'electron';
import React from "react";
import classNames from 'classnames';
import moment from "moment";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Popper from '@material-ui/core/Popper';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// material icons
import Gavel from '@material-ui/icons/Gavel';
import Update from '@material-ui/icons/Update';

import Button from "../../ui/CustomButtons/Button";
import { AccountIcon, PasswordIcon, AtmarkIcon, ContactMail } from "../../assets/icons";

import headerLinksStyle from "../../assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
import type MailAccountType from "../../types/mailAccount";
import type BlogAccountType from "../../types/blogAccount";

import PuppeteerEmail from "../MailAccountCreate/puppeteerEmail";


const iconStyle = {
  width: '18px',
  height: '18px'
};

type Props ={
  classes: Object,
  mode: string,
  account: | MailAccountType | BlogAccountType,
  updateMailLastLogin: ?(mailAccount: MailAccountType) => void,
  mailAccounts: ?Array<MailAccountType>
};

type State ={
  open: boolean
};

class GavelPopup extends React.Component<Props, State> {
  state = {
    open: false
  };

  handleClick = () => {
    const status = this.state.open;
    this.setState({ open: !status });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCopyAccountId = () => {
    this.setState({ open: false });
    clipboard.writeText(this.props.account.accountId);
  };

  handleCopyPassword = () => {
    this.setState({ open: false });
    clipboard.writeText(this.props.account.password);
  };

  handleCopyMailAddress = () => {
    this.setState({ open: false });
    clipboard.writeText(this.props.account.mailAddress);
  };

  handleCheckLastPostDateTime = () => {
    this.handleClose();
    // this.props.getFeed(...this.props.account);
  };

  handleWebLoginToMailAccount = () => {
    this.handleClose();
    const targetMailAccount = this.props.mailAccounts.find(m => m.mailAddress === this.props.account.mailAddress);
    if (!targetMailAccount) {
      throw new Error('対象のメールアドレスが見つかりません。')
    }
    this.props.updateMailLastLogin({ ...targetMailAccount, lastLogin: moment().valueOf() });

    const user = {};
    user.username = targetMailAccount.accountId.replace(/\+.*$/, '');
    user.password = targetMailAccount.password;
    user.email = targetMailAccount.mailAddress;
    user.provider = targetMailAccount.provider.toLowerCase();

    const puppeteerEmail = new PuppeteerEmail(user);
    puppeteerEmail.signin(user);
  };

  modeBlog = () => {
    const { classes } = this.props;

    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.primaryHover,
    );

    if (this.props.mode === 'blog') {
      return (
        <div>
        <MenuItem
          onClick = {this.handleCheckLastPostDateTime}
          className = {dropdownItem}
        >
          <ListItemIcon>
            <Update style={iconStyle}/>
          </ListItemIcon>
          最終投稿日時をチェック
        </MenuItem>
        <MenuItem
          onClick = {this.handleWebLoginToMailAccount}
          className ={dropdownItem}
          >
            <ListItemIcon>
              <ContactMail style={iconStyle} />
          </ListItemIcon>
          使用したメールアカウントへログイン
        </MenuItem>
        </div>
      );
    }
    return null;
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const managerClasses = classNames({
      [classes.managerClasses]: true
    });

    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.primaryHover,
    );

  return (
    <div className={managerClasses}>
      <Button
        color = "rose"
        size ="sm"
        justIcon
        round
        aria-owns={open ? "contextMenu-list" : null}
        aria-haspopup="true"
        onClick = {this.handleClick}
        className={classes.buttonLink}
        buttonRef = {node => {
          this.anchorEl = node;
        }}
        >
        <Gavel />
      </Button>
      <Popper
        open={open}
        anchorEl={this.anchorEl}
        transition
        disablePortal
        placement="left-start"
        className={
          classNames({
            [classes.popperClose]: !open,
            [classes.pooperNav] : true
          })
        }
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
        }}
      >
        {({ TransitionProps}) => (
            <Grow
              {...TransitionProps}
              id= "contextMenu-list"
              style={{ transformOrigin: "0 0 0"}}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleCopyAccountId}
                        className={dropdownItem}
                      >
                        <ListItemIcon>
                          <AccountIcon style={iconStyle}/>
                        </ListItemIcon>
                        アカウントIDをコピー
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCopyPassword}
                        className={dropdownItem}
                      >
                        <ListItemIcon>
                          <PasswordIcon style={iconStyle}/>
                        </ListItemIcon>
                        パスワードをコピー
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCopyMailAddress}
                        className={dropdownItem}
                      >
                        <ListItemIcon>
                          <AtmarkIcon style={iconStyle}/>
                        </ListItemIcon>
                        メールアドレスをコピー
                      </MenuItem>
                    {this.modeBlog()}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
            </Grow>
        )}
      </Popper>
    </div>
  );
                  }
}

export default withStyles(headerLinksStyle)(GavelPopup);
