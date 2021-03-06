// @flow
import React from 'react';
import Loadable from 'react-loading-overlay';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';

import Close from '@material-ui/icons/Close';

import { MailSeenIcon, MailUnseenIcon, CloseIcon, TrashIcon } from '../../assets/icons';

import Button from '../../ui/CustomButtons/Button';
import MailBox from './mailbox';
import MessageViewer from './messageViewer';
import type MailAccountType from '../../types/mailAccount';
import type {
  MailRowMessageType,
  MailBoxesType,
  ImapFlagsArgsType
} from '../../types/mailMessageType';

/**
 * TODO:
 * 1. 完了-when open mailbox success, update last login date
 * 2. 完了-small list fond and narrow
 * 3. delete mails button
 * 4. ゴミ箱へ移動した場合、selectMailboxを呼び出してもexistが更新されない
 * @type {number}
 */
const drawerWidth = 240;

const toolBarStyles = {
  minHeight: '48px',
  display: 'flex',
  justifyContent: 'space-between'
};
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '95vh',
    zIndex: 1,
    overflow: 'auto',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: '0 24px 24px',
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  cardContentRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  buttonGroup: {
    position: 'relative',
    margin: '10px 1px',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  firstButton: {
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
    margin: '0',
    position: 'relative',
    float: 'left',
    '&:hover': {
      zIndex: '2'
    }
  },
  middleButton: {
    borderRadius: '0',
    margin: '0',
    position: 'relative',
    float: 'left',
    '&:hover': {
      zIndex: '2'
    }
  },
  lastButton: {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    margin: '0',
    '&:hover': {
      zIndex: '2'
    }
  },
  icons: {
    width: '17px',
    height: '17px',
    marginRight: '4px'
  },
  modal: {
    borderRadius: '6px'
  },
  modalHeader: {
    borderBottom: 'none',
    paddingTop: '24px',
    paddingRight: '24px',
    paddingBottom: '0',
    paddingLeft: '24px',
    minHeight: '16.43px'
  },
  modalTitle: {
    margin: '0',
    lineHeight: '1.42857143'
  },
  modalCloseButton: {
    color: '#999999',
    marginTop: '-12px',
    WebkitAppearance: 'none',
    padding: '0',
    cursor: 'pointer',
    background: '0 0',
    border: '0',
    fontSize: 'inherit',
    opacity: '.9',
    textShadow: 'none',
    fontWeight: '700',
    lineHeight: '1',
    float: 'right'
  },
  modalClose: {
    width: '16px',
    height: '16px'
  },
  modalBody: {
    paddingTop: '24px',
    paddingRight: '24px',
    paddingBottom: '16px',
    paddingLeft: '24px',
    position: 'relative'
  },
  modalFooter: {
    padding: '15px',
    textAlign: 'right',
    paddingTop: '0',
    margin: '0'
  },
  modalFooterCenter: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  instructionNoticeModal: {
    marginBottom: '25px'
  },
  imageNoticeModal: {
    maxWidth: '150px'
  },
  modalSmall: {
    width: '300px'
  },
  modalSmallBody: {
    paddingTop: '0'
  },
  modalSmallFooterFirstButton: {
    margin: '0',
    paddingLeft: '16px',
    paddingRight: '16px',
    width: 'auto'
  },
  modalSmallFooterSecondButton: {
    marginBottom: '0',
    marginLeft: '5px'
  }
});

type Props = {
  classes: Object,
  targetAccount: ?MailAccountType,
  startOpenConnection: MailAccountType => void,
  startSelectImapMailBox: string => void,
  startDeleteImapMessage: ImapFlagsArgsType => void,
  startUpdateFlags: ImapFlagsArgsType => void,
  startMoveMessages: ImapFlagsArgsType => void,
  closeMailAccount: () => void,
  imapMessageLoading: boolean,
  imapIsError: boolean,
  imapErrorMessage: string,
  imapMailBoxes: Array<MailBoxesType>,
  imapMessages: Array<MailRowMessageType>,
  imapSelectMailBoxPath: string,
  imapMailCount: number,
  imapMailUnseenCount: number,
  imapSeqFrom: number,
  formStatus: boolean
};

type State = {
  isLoading: boolean,
  selectMailBoxPath: string,
  targetAccount: MailAccountType,
  openLoading: boolean,
  updateFlags: string,
  moveToBoxPath: string,
  openDialog: boolean
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class MailAccount extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: this.props.errorMessage,
      mailBoxes: this.props.mailBoxes,
      selectMailBox: this.props.selectMailBox,
      openLoading: false,
      updateFlags: '',
      moveToBoxPath: '',
      openDialog: false
    };
  }

  componentWillReceiveProps = nextProps => {
    // loading start/stop in case of error show errorMessage
    if (!this.state.openLoading && nextProps.imapMessageLoading) {
      this.setState({ openLoading: true });
    }

    if (this.state.openLoading && !nextProps.imapMessageLoading) {
      this.setState({ openLoading: false });
    }

    console.log(`mailAccount-isLoading:${nextProps.imapMessageLoading}`);
    // 新たなmailAddressが指定され、モードが無指定の場合、openConnection
    console.log(`this.form.status:${this.props.formStatus}`);
    if (
      this.props.targetAccount.mailAddress !== nextProps.targetAccount.mailAddress &&
      nextProps.formStatus
    ) {
      // targetAccountのmailAddressが更新され、且つ、長さがある場合
      if (nextProps.targetAccount.mailAddress.length > 0) {
        console.log('call imap connection ...');
        console.log(`targetAccout:${this.props.targetAccount.provider}`);
        this.props.startOpenConnection(nextProps.targetAccount);
      }
    }

    // update flgs
    if (
      nextProps.imapMessageLoading &&
      (this.state.updateFlags === 'toSeen' || this.state.updateFlags === 'toUnseen')
    ) {
      this.setState({ updateFlags: '' });
    }
  };

  /**
   * Flag --\\seen の追加・削除を指示
   * updateFlagsへ変更対象のメールuid配列が返り、flag更新を行う
   *
   *
   * @param flags
   */
  handleUpdateFlags = flags => {
    this.setState({
      updateFlags: flags
    });
  };

  /**
   * move mails to another mailbox
   *
   *
   * @param boxPath
   */
  handleMoveTo = boxPath => {
    this.setState({
      moveToBoxPath: boxPath
    });
  };

  handleCloseDialog = () => {
    this.setState({ updateFlags: '', moveToBoxPath: '', openDialog: false });
  };

  handleCloseThis = () => {
    this.setState({
      updateFlags: '',
      moveToBoxPath: ''
    });
    this.props.closeMailAccount();
  };

  /**
   * Flag更新
   * @param updateUids
   */
  updateFlags = updateUids => {
    if (updateUids.length === 0) {
      // update対象が選択されていないので、ダイアログを表示
      this.setState({ updateFlags: '', openDialog: true });
    } else {
      let flag = null;
      if (this.state.updateFlags === 'toSeen') {
        flag = { add: ['\\Seen'] };
      }
      if (this.state.updateFlags === 'toUnseen') {
        flag = { remove: ['\\Seen'] };
      }
      this.setState({ updateFlags: '' });
      console.log('to change flag:');
      console.log(flag);
      this.props.startUpdateFlags({
        path: this.props.imapSelectMailBoxPath,
        sequences: updateUids,
        seqFrom: this.props.imapSeqFrom,
        flagUpdateObject: flag,
        moveDestination: ''
      });
    }
  };

  moveMails = moveUids => {
    if (moveUids.length === 0) {
      this.setState({ moveToBoxPath: '', openDialog: true });
    } else {
      let destination = this.state.moveToBoxPath;
      console.log(`moveTo:${destination}`);
      this.setState({ moveToBoxPath: '' });
      if (destination === 'trash' || destination.toLowerCase() === 'deleted') {
        destination = this.getExactPath('trash');
        console.log(`movePath:${destination}`);
      }
      if (destination !== null) {
        this.props.startMoveMessages({
          path: this.props.imapSelectMailBoxPath,
          sequences: moveUids,
          seqFrom: this.props.imapSeqFrom,
          flagUpdateObject: {},
          moveDestination: destination
        });
      }
    }
  };

  getExactPath = path => {
    let moveTo = path;
    let box;
    if (this.props.targetAccount.provider === 'Outlook') {
      if (path.toLowerCase() === 'trash') {
        moveTo = 'deleted';
      }

      box = this.props.imapMailBoxes.find(m => {
        if (m.path.toLowerCase() === moveTo.toLowerCase()) {
          return m;
        }
      });
    }

    if (this.props.targetAccount.provider === 'Gmail') {
      if (path.toLowerCase() === 'trash') {
        box = this.props.imapMailBoxes.find(m => {
          if (m.name === 'ゴミ箱' || m.specialUse.toLowerCase() === '\\trash') {
            return m;
          }
        });
      }
    }

    if (box !== null && box !== undefined) {
      return box.path;
    }
    return null;
  };

  render() {
    const { classes } = this.props;
    return (
      <Loadable active={this.state.openLoading} spinner text="メール取得中・・・・">
        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar style={toolBarStyles}>
              <Typography variant="title" color="inherit" noWrap>
                メールアドレス: {this.props.targetAccount.mailAddress}
              </Typography>
              <div className={classes.cardContentRight}>
                <div className={classes.buttonGroup}>
                  <Button
                    color="primarySub"
                    className={classes.firstButton}
                    onClick={() => this.handleUpdateFlags('toSeen')}
                    size="sm"
                  >
                    <MailSeenIcon className={classes.icons} />
                    既読に
                  </Button>
                  <Button
                    color="primarySub"
                    className={classes.middleButton}
                    onClick={() => this.handleUpdateFlags('toUnseen')}
                    size="sm"
                  >
                    <MailUnseenIcon className={classes.icons} /> 未読に
                  </Button>
                  <Button
                    color="primarySub"
                    className={classes.middleButton}
                    onClick={() => this.handleMoveTo('trash')}
                    size="sm"
                  >
                    <TrashIcon className={classes.icons} />
                    ゴミ箱
                  </Button>
                  <Button
                    color="primarySub"
                    className={classes.lastButton}
                    onClick={() => this.handleCloseThis()}
                    size="sm"
                  >
                    <CloseIcon className={classes.icons} />
                    閉じる
                  </Button>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <List>
              <MailBox
                imapMessageLoading={this.props.imapMessageLoading}
                imapIsError={this.props.imapIsError}
                imapErrorMessage={this.props.imapErrorMessage}
                targetAccount={this.props.targetAccount}
                imapMailBoxes={this.props.imapMailBoxes}
                imapMessages={this.props.imapMessages}
                imapSelectMailBoxPath={this.props.imapSelectMailBoxPath}
                imapMailCount={this.props.imapMailCount}
                imapMailUnseenCount={this.props.imapMailUnseenCount}
                imapSeqFrom={this.props.imapSeqFrom}
                selectImapMailBox={this.props.startSelectImapMailBox}
              />
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <MessageViewer
              imapMessages={this.props.imapMessages}
              imapSelectMailBoxPath={this.props.imapSelectMailBoxPath}
              imapSeqFrom={this.props.imapSeqFrom}
              imapMailCount={this.props.imapMailCount}
              selectImapMailBoxPage={this.props.startSelectImapMailBox}
              deleteImapMessage={this.props.startDeleteImapMessage}
              updateFlags={this.props.startUpdateFlags}
              startUpdateFlags={this.state.updateFlags}
              startMoveMails={this.state.moveToBoxPath}
              handleUpdateFlags={this.updateFlags}
              handleMoveTo={this.moveMails}
            />
          </main>
        </div>
        <Dialog
          classes={{
            root: classes.center,
            paper: `${classes.modal} ${classes.modalSmall}`
          }}
          open={this.state.openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleCloseDialog()}
          aria-labelledby="small-modal-slide-title"
          aria-describedby="small-modal-slide-description"
        >
          <DialogTitle
            id="small-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.handleCloseDialog()}
            >
              <Close className={classes.modalClose} />
            </IconButton>
          </DialogTitle>
          <DialogContent
            id="small-modal-slide-description"
            className={`${classes.modalBody} ${classes.modalSmallBody}`}
          >
            <h5>変更・削除対象のメールが選択されていません。</h5>
          </DialogContent>
          <DialogActions className={`${classes.modalFooter} ${classes.modalFooterCenter}`}>
            <Button
              onClick={() => this.handleCloseDialog()}
              color="warning"
              className={`${classes.modalSmallFooterFirstButton} ${
                classes.modalSmallFooterSecondButton
              }`}
            >
              はい
            </Button>
          </DialogActions>
        </Dialog>
      </Loadable>
    );
  }
}

export default withStyles(styles)(MailAccount);
