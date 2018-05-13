// @flow
import React from 'react';
import ReactTable from 'react-table';
import SweetAlert from 'react-bootstrap-sweetalert';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import Tooltip from 'material-ui/Tooltip';
import Dialog from 'material-ui/Dialog';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import DialogContent from 'material-ui/Dialog/DialogContent';

import moment from 'moment';
import TagsInput from 'react-tagsinput';
import matchSorter from 'match-sorter';
// material-ui-icons
import Edit from 'material-ui-icons/Edit';
import DeleteForever from 'material-ui-icons/DeleteForever';
import Close from 'material-ui-icons/Close';

import { GridContainer, ItemGrid, IconButton } from '../../ui';
import type BlogAccountType from '../../types/blogAccount';
import { initialBlogAccount } from '../../containers/BlogList/reducer';
import FormBlogEdit from './formBlogEdit';

import Fc2 from '../../asets/img/blogs/fc2.png';
import Webnode from '../../asets/img/blogs/webnode.png';
import Livedoor from '../../asets/img/blogs/livedoor.png';
import Seesaa from '../../asets/img/blogs/seesaa.png';
import Ameba from '../../asets/img/blogs/ameba.png';
import Rakuten from '../../asets/img/blogs/rakuten.png';
import Kokolog from '../../asets/img/blogs/kokolog.png';
import Yaplog from '../../asets/img/blogs/yaplog.png';
import Jugem from '../../asets/img/blogs/jugem.png';
import Ninjya from '../../asets/img/blogs/ninja.png';
import Hatena from '../../asets/img/blogs/hatena.png';
import Webryblog from '../../asets/img/blogs/webryblog.png';
import Wpcom from '../../asets/img/blogs/wpcom.png';
import Goo from '../../asets/img/blogs/goo.png';
import DefaultWeb from '../../asets/img/blogs/defaultWeb.png';

import { LoginIcon } from '../../asets/icons';

import accountListPageStyle from '../../asets/jss/material-dashboard-pro-react/views/accountListPageStyle';
import SweetAlertTitle from '../SweetAlertTitle';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

export const getBlogProviderImage = providerName => {
  switch (providerName) {
    case 'fc2':
      return Fc2;
    case 'webnode':
      return Webnode;
    case 'livedoor':
      return Livedoor;
    case 'seesaa':
      return Seesaa;
    case 'ameba':
      return Ameba;
    case 'rakuten':
      return Rakuten;
    case 'kokolog':
      return Kokolog;
    case 'yaplog':
      return Yaplog;
    case 'jugem':
      return Jugem;
    case 'ninjya':
      return Ninjya;
    case 'hatena':
      return Hatena;
    case 'webryblog':
      return Webryblog;
    case 'wpcom':
      return Wpcom;
    case 'goo':
      return Goo;
    default:
      return DefaultWeb;
  }
};

type State = {
  data: Array<Object>,
  sweetAlert: ?Object,
  mode: string,
  targetAccount: ?BlogAccountType,
  openEditForm: boolean
};

type Props = {
  classes: Object,
  blogAccounts: Array<BlogAccountType>,
  isLoading: boolean,
  isFailure: boolean,
  errorMessage: string,
  deleteAccount: () => void,
  editAccount: () => void
};

const modalCloseButtonStyle = {
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
};

class BlogList extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      data: this.convertTableData(this.props.blogAccounts),
      targetAccount: initialBlogAccount,
      sweetAlert: null,
      mode: 'none',
      openEditForm: false
    };
  }

  /**
   * Props更新
   * 処理モード
   *   - delete
   *    --- success
   *            成功ダイアログ表示
   *            mailAccount更新
   *    --- fail
   *            失敗ダイアログ表示
   *
   * @param nextProps
   */
  componentWillReceiveProps = nextProps => {
    // 処理 deleteで更新されたのか？
    if (this.state.mode === 'delete') {
      if (!nextProps.isFailure) {
        // delete success
        this.setState({
          data: this.convertTableData(nextProps.blogAccounts),
          mode: 'none',
          sweetAlert: (
            <SweetAlert
              success
              style={{ display: 'block', marginTop: '-100px' }}
              title="削除完了"
              onConfirm={() => this.hideAlert()}
              onCancel={() => this.hideAlert()}
              confirmBtnCssClass={`${this.props.classes.button} ${this.props.classes.success}`}
            >
              ブログ:{this.state.targetAccount.title}を削除しました。
            </SweetAlert>
          )
        });
      } else {
        // delete fail
        this.setState({
          mode: 'none',
          sweetAlert: (
            <SweetAlert
              error
              style={{ display: 'block', marginTop: '-100px' }}
              title="削除失敗"
              onConfirm={() => this.hideAlert()}
              onCancel={() => this.hideAlert()}
              confirmBtnCssClass={`${this.props.classes.button} ${this.props.classes.success}`}
            >
              削除エラー:{nextProps.errorMessage}
            </SweetAlert>
          )
        });
      }
    } else {
      console.log('change the tabledata');
      this.setState({
        data: this.convertTableData(nextProps.blogAccounts)
      });
    }
  };

  /**
   * prospで受け取るmailAccountデータをテーブル表示用に変換
   * @param blogAccounts
   * @returns {*}
   */
  convertTableData = blogAccounts =>
    blogAccounts.map(prop => ({
      key: prop.key,
      accountId: prop.accountId,
      password: prop.password,
      provider: prop.provider,
      mailAddress: prop.mailAddress,
      title: prop.title,
      description: prop.description,
      url: prop.url,
      remark: prop.remark,
      createDate: moment(prop.createDate).format('YYYY/MM/DD HH:mm'),
      detailInfo: prop.detailInfo,
      apiId: prop.apiId,
      apiPass: prop.apiPass,
      blogId: prop.blogId,
      endPoint: prop.endPoint,
      groupTags: prop.groupTags.split(','),
      affiliateTags: prop.detailInfo,
      actions: (
        <div className="actions-right">
          <Tooltip title="ブログへログイン" placement="top-end">
            <IconButton
              onClick={() => {
                const obj = this.state.data.find(o => o.key === prop.key);
                alert(`you click:${obj.title}`);
              }}
              color="success"
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="ブログ情報を表示・編集" placement="top-end">
            <IconButton
              onClick={() => {
                const account = this.state.data.find(o => o.key === prop.key);
                if (account) {
                  const restoredTags =
                    account.groupTags.length > 0 ? account.groupTags.join(',') : '';
                  const target = {
                    ...account,
                    groupTags: restoredTags,
                    createDate: moment(account.createDate).valueOf()
                  };
                  this.showEditForm(target);
                } else {
                  alert('編集対象のブログアカウントの取得に失敗しました。');
                }
              }}
              color="warning"
              customClass="actionButton actionButtonRound"
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="ブログ情報を削除" placement="top-end">
            <IconButton
              onClick={() => {
                const account = this.state.data.find(o => o.key === prop.key);
                if (account) {
                  const target: BlogAccountType = {
                    ...account,
                    groupTags: '',
                    createDate: moment(account.createDate).valueOf()
                  };
                  this.handleDeleteBlogAccount(target);
                } else {
                  alert('削除対象のブログアカウントの取得に失敗しました。');
                }
              }}
              color="danger"
              customClass="actionButton actionButtonRound"
            >
              <DeleteForever />
            </IconButton>
          </Tooltip>
        </div>
      )
    }));

  /**
   * ブログアカウント削除ダイアログからproceed処理を選択
   * ダイアログを非表示に
   * 処理モードを deleteに
   * ブログ削除アクションをdispatch
   * @param account
   */
  proceedDelete = account => {
    this.setState({
      sweetAlert: null,
      mode: 'delete'
    });
    this.props.deleteAccount(account);
  };

  /**
   *  ブログアカウント削除ダイアログでキャンセルを選択した場合の処理
   */
  cancelDelete = () => {
    this.setState({
      sweetAlert: (
        <SweetAlert
          danger
          style={{ display: 'block', marginTop: '-100px' }}
          title="キャンセル"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={`${this.props.classes.button} ${this.props.classes.success}`}
        >
          ブログ削除をキャンセルしました。
        </SweetAlert>
      )
    });
  };

  /**
   * ダイアログを閉じる
   */
  hideAlert = () => {
    this.setState({
      sweetAlert: null
    });
  };

  /**
   * テーブル各行の削除ボタンに対応するメソッド =>
   *  --確認ダイアログ
   *  ----yes proceedDelete 削除処理
   *  ----cancel cancelDelete キャンセルダイアログ表示
   * @param account
   */
  handleDeleteBlogAccount = (account: ?BlogAccountType) => {
    this.setState({
      targetAccount: account,
      sweetAlert: (
        <SweetAlert
          warning
          style={{ display: 'block', marginTop: '-100px' }}
          title={<SweetAlertTitle row1="ブログ:" elmWord={account.title} row2="を削除しますか？" />}
          onConfirm={() => this.proceedDelete(account)}
          onCancel={() => this.cancelDelete()}
          confirmBtnCssClass={`${this.props.classes.button} ${this.props.classes.success}`}
          cancelBtnCssClass={`${this.props.classes.button} ${this.props.classes.danger}`}
          confirmBtnText="はい、削除します。"
          cancelBtnText="キャンセル"
          showCancel
        >
          削除したブログ情報は戻せません。
        </SweetAlert>
      )
    });
  };

  /**
   * 編集用フォームをモーダルで開く
   * @param account
   */
  showEditForm = account => {
    this.setState({
      targetAccount: account,
      openEditForm: true
    });
  };

  /**
   * 編集用フォームを閉じる(child:編集用フォームから呼ばれる)
   */
  handleCloseModal = () => {
    this.setState({
      openEditForm: false
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        <ItemGrid xs={12} sm={12} md={12}>
          <ReactTable
            data={this.state.data}
            resizable
            columns={[
              {
                Header: 'provider',
                accessor: 'provider',
                filterable: true,
                sortable: true,
                show: false,
                filterAll: true
              },
              {
                Header: () => <span style={{ fontSize: 12 }} />,
                accessor: 'provider',
                Cell: row => (
                  <div>
                    <img height={24} src={getBlogProviderImage(row.original.provider)} alt="" />
                  </div>
                ),
                width: 60,
                filterable: true,
                sortable: true,
                filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ['provider'] }),
                Filter: ({ filter, onChange }) => (
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: '100%', fontSize: '12px' }}
                    value={filter ? filter.value : ''}
                  >
                    <option value="">全て</option>
                    <option value="fc2">FC2</option>
                    <option value="webnode">webnode</option>
                    <option value="livedoor">Livedoor</option>
                    <option value="seesaa">SeeSaa</option>
                    <option value="ameba">アメーバ</option>
                    <option value="rakuten">楽天</option>
                    <option value="kokolog">ココログ</option>
                    <option value="yaplog">Yaplog</option>
                    <option value="jugem">Jugem</option>
                    <option value="ninjya">忍者</option>
                    <option value="hatena">はてな</option>
                    <option value="webryblog">ウェブリブログ</option>
                    <option value="wpcom">WordPress.com</option>
                    <option value="goo">gooブログ</option>
                  </select>
                ),
                filterAll: true
              },
              {
                Header: () => <span style={{ fontSize: 12 }}>タイトル</span>,
                Cell: row => (
                  <Tooltip
                    id={row.original.id}
                    title={row.original.description}
                    placement="right-start"
                    className={classes.toolTip}
                  >
                    <div>{row.original.title}</div>
                  </Tooltip>
                ),
                accessor: 'title',
                minWidth: 250,
                maxWidth: 400,
                filterable: true,
                sortable: true,
                Filter: ({ filter, onChange }) => (
                  <input
                    type="text"
                    placeholder="タイトルで絞込み"
                    value={filter ? filter.value : ''}
                    onChange={event => onChange(event.target.value)}
                  />
                ),
                filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ['title'] }),
                filterAll: true
              },
              {
                Header: () => <span style={{ fontSize: 12 }}>グループ</span>,
                accessor: 'groupTags',
                Cell: row => (
                  <TagsInput
                    value={row.original.groupTags}
                    tagProps={{ className: 'react-tagsinput-tag info' }}
                    disabled
                    inputProps={{
                      placeholder: ''
                    }}
                  />
                ),
                minWidth: 200,
                maxWidth: 400,
                filterable: true,
                sortable: true,
                Filter: ({ filter, onChange }) => (
                  <input
                    type="text"
                    placeholder="グループで絞込み"
                    value={filter ? filter.value : ''}
                    onChange={event => onChange(event.target.value)}
                    style={{ fontSize: 12 }}
                  />
                ),
                filterMethod: (filter, row) => {
                  if (row.groupTags.length > 0) {
                    let isMatch = false;
                    row.groupTags.forEach(r => {
                      if (r.indexOf(filter.value) > -1) {
                        isMatch = true;
                      }
                    });
                    return isMatch;
                  }
                }
              },
              {
                Header: '',
                accessor: 'actions',
                sortable: false,
                filterable: false
              }
            ]}
            defaultPageSize={10}
            showPaginationTop
            showPaginationBottom={false}
            className="-striped -highlight"
            previousText="< 前"
            nextText="次 >"
            loadingText="読込中..."
            noDataText="データがありません"
            pageText=""
            ofText="/"
            rowsText="行"
          />
          {this.state.sweetAlert}
          <Dialog
            classes={{
              paper: classes.modal
            }}
            maxWidth={false}
            open={this.state.openEditForm}
            transition={Transition}
            keepMounted
            onClose={() => this.handleCloseModal()}
            aria-labelledby="notice-modal-slide-title"
            aria-describedby="notice-modal-slide-description"
            disableBackdropClick
          >
            <DialogTitle
              id="notice-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <IconButton
                style={modalCloseButtonStyle}
                key="close"
                aria-label="Close"
                color="defaultNoBackground"
                onClick={() => this.handleCloseModal()}
              >
                <Close className={classes.modalClose} />
              </IconButton>
            </DialogTitle>
            <DialogContent id="notice-modal-slide-description" className={classes.modalBody}>
              <FormBlogEdit
                isLoading={this.props.isLoading}
                errorMessage={this.props.errorMessage}
                closeModal={this.handleCloseModal}
                targetAccount={this.state.targetAccount}
                updateAccount={this.props.editAccount}
              />
            </DialogContent>
          </Dialog>
        </ItemGrid>
      </GridContainer>
    );
  }
}

export default withStyles(accountListPageStyle)(BlogList);