/* eslint-disable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/anchor-has-content,react/no-unused-state,no-lonely-if */
/* eslint-disable no-return-assign */
// @flow
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

// core components
import Button from '../../ui/CustomButtons/Button';
import Table from '../../ui/Table/Table';
import wizardStyle from '../../assets/jss/material-dashboard-pro-react/components/wizardStyle';
import PuppeteerBlog from './puppeteerBlog';
import type MailAccountType from "../../types/mailAccount";

const convertProviderToStep = provider => {
  let nextStep = 0;
  switch (provider) {
    case 'fc2':
      nextStep = 2;
      break;
    case 'webnode':
      nextStep = 3;
      break;
    case 'livedoor':
      nextStep = 4;
      break;
    case 'seesaa':
      nextStep = 5;
      break;
    case 'ameba':
      nextStep = 6;
      break;
    case 'rakuten':
      nextStep = 7;
      break;
    case 'kokolog':
      nextStep = 8;
      break;
    case 'yaplog':
      nextStep = 9;
      break;
    case 'ninjya':
      nextStep = 10;
      break;
    case 'hatena':
      nextStep = 11;
      break;
    case 'webryblog':
      nextStep = 12;
      break;
    case 'wpcom':
      nextStep = 13;
      break;
    case 'goo':
      nextStep = 14;
      break;
    default:
  }
  return nextStep;
}


const errorStyles = {
  fontWeight: 'bold',
  color: '#f00'
};

type StepsType = {
  stepName: string,
  stepComponent: React.Node,
  stepId: string
};

type Props = {
  classes: Object,
  mailAccount: MailAccountType,
  steps: Array<StepsType>,
  color: 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose',
  title: string,
  // subtitle?: string,
  cancelButtonClasses?: string,
  cancelButtonText: string,
  cancelButtonClick: () => void,
  previousButtonClasses?: string,
  previousButtonText: string,
  nextButtonClasses?: string,
  nextButtonText: string,
  finishButtonClasses?: string,
  finishButtonText: string,
  finishButtonClick: () => void,
  validate: boolean
};

type State = {
  currentStep: number,
  color: 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose',
  nextButton: boolean,
  previousButton: boolean,
  finishButton: boolean,
  width: string,
  movingTabStyle: Object,
  accountInfo: Object,
  sweetAlert: Object,
  mailAccount: MailAccountType,
  isFirstBlog: boolean
};

// TODO: livedoor blog 2つめは強制的にサブドメイン使用をONーメールアドレスでLivedoorをチェック

class BlogWizard extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      // color: this.props.color,
      cancelButton: true,
      nextButton: this.props.steps.length > 1,
      previousButton: false,
      finishButton: this.props.steps.length === 1,
      width: '33%',
      movingTabStyle: {
        transition: 'transform 0s'
      },
      accountInfo: {},
      sweetAlert: '',
      mailAccount: {},
      isFirstBlog: true
    };
  }

  componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener('resize', this.updateWidth.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth.bind(this), true);
  }

  updateWidth() {
    this.refreshAnimation(this.state.currentStep);
  }

  navigationStepChange(key) {
    let step = 0;
    if (this.props.steps) {
      if (key === -2) {
        step = 2;
        if (this.state.accountInfo.provider && this.state.accountInfo.provider.length > 0) {
          const { provider } = this.state.accountInfo;
          const nextStep = convertProviderToStep(provider);
          this.setState({
            currentStep: nextStep,
            cancelButton: false,
            nextButton: false,
            previousButton: true,
            finishButton: true
          });
        } else {
          step = 0;
          this.setState({
            currentStep: 0,
            color: this.props.color,
            cancelButton: true,
            nextButton: true,
            previousButton: false,
            finishButton: false,
            movingTabStyle: {
              transition: "transform 0s"
            },
            accountInfo: {},
            allStates: {}
          })
        }
      } else {
        if (key > -1 && key < 2) {
          step = key;
          this.setState({
            currentStep: key,
            cancelButton: key === 0,
            nextButton: true,
            previousButton: key > 0,
            finishButton: false
          });
        }
      }
      this.refreshAnimation(step);
    }
  }

  /**
   *  click cancel or finish button
   */
  cancelButtonClick = () => {
    // 全てのフォームのstateを初期化
    // 本体
    this.setState({
      currentStep: 0,
      cancelButton: true,
      nextButton: this.props.steps.length > 1,
      previousButton: false,
      finishButton: this.props.steps.length === 1,
      accountInfo: {},
      sweetAlert: '',
      isFirstBlog: true
    });
    // steps0-13
    this[this.props.steps[0].stepId].initState();
    this[this.props.steps[1].stepId].initState();
    this[this.props.steps[2].stepId].initState();
    this[this.props.steps[3].stepId].initState();
    this[this.props.steps[4].stepId].initState();
    this[this.props.steps[5].stepId].initState();
    this[this.props.steps[6].stepId].initState();
    this[this.props.steps[7].stepId].initState();
    this[this.props.steps[8].stepId].initState();
    this[this.props.steps[9].stepId].initState();
    this[this.props.steps[10].stepId].initState();
    this[this.props.steps[11].stepId].initState();
    this[this.props.steps[12].stepId].initState();
    this[this.props.steps[13].stepId].initState();
    this[this.props.steps[14].stepId].initState();
    // tab move to init location
    this.refreshAnimation(0);
    this.props.cancelButtonClick();
  };

  /**
   * Next button click
   */
  nextButtonClick = () => {
    let key = 0;
    let isValidate = false;

    switch(this.state.currentStep) {
      case 0:
        if (this[this.props.steps[0].stepId].isValidated()) {
          isValidate = true;
          // next to step1
          key = 1;
          const mailTestState = this[this.props.steps[0].stepId].sendState();
          console.log('wizard------')
          console.log(mailTestState.creatableBlogs);
          this[this.props.steps[1].stepId].setCreatableBlogs(mailTestState.creatableBlogs);

          this.setState({
            currentStep: key,
            cancelButton: false,
            nextButton: true,
            previousButton: true,
            finishButton: false,
            mailAccount: mailTestState.mailAccount
          });
        }
        break;
      case 1:
        if (this[this.props.steps[1].stepId].isValidated()) {
          isValidate = true;
          // next to selected provider
          key = 2;
          const selectedProvider = this[this.props.steps[1].stepId].getProvider();
          const nextStep = convertProviderToStep(selectedProvider);
          const steps00State = this[this.props.steps[1].stepId].sendState();
          this[this.props.steps[nextStep].stepId].setFirstBlog(steps00State.isFirstBlog);
          this.setState({
            cancelButton: false,
            currentStep: nextStep,
            nextButton: false,
            previousButton: true,
            finishButton: true,
            accountInfo: {
              provider: steps00State.provider,
              mailAddress: steps00State.mailAddress,
              accountId: steps00State.accountId,
              password: steps00State.password,
              lastName: steps00State.lastName,
              lastNameKana: steps00State.lastNameKana,
              firstName: steps00State.firstName,
              firstNameKana: steps00State.firstNameKana,
              gender: steps00State.gender,
              birthDate: steps00State.birthDate,
              postalCode: steps00State.postalCode,
              prefecture: steps00State.prefecture,
              mailAccount: steps00State.mailAccount
            },
            isFirstBlog: steps00State.isFirstBlog
          });
        }
        break;
        default:
    }

    if (isValidate) {
      this.refreshAnimation(key);
    }
  }

  /**
   *  previous button click on step2
   */
  previousButtonClick = () => {
    let key=0;
    if (this.state.currentStep === 1) {
      this.setState({
        currentStep: 0,
        cancelButton: true,
        nextButton: true,
        previousButton: false,
        finishButton: false
      });
    } else {
      key = 1;
      this.setState({
        currentStep: key,
        cancelButton: false,
        nextButton: true,
        previousButton: true,
        finishButton: false
      });
    }
    this.refreshAnimation(key);
  };

  /**
   * finish button click
   */
  finishButtonClick = () => {
    if (
      this.props.validate &&
      ((this[this.props.steps[this.state.currentStep].stepId].isValidated !== undefined &&
        this[this.props.steps[this.state.currentStep].stepId].isValidated()) ||
        this[this.props.steps[this.state.currentStep].stepId].isValidated === undefined) &&
      this.props.finishButtonClick !== undefined
    ) {
      const additionalInfo = this[this.props.steps[this.state.currentStep].stepId].sendState();
      // ブログアカウント作成に必要な情報(driverへ)
      const blogInfo = {};

      // 共通のデータ
      blogInfo.isFirstBlog = this.state.isFirstBlog;
      blogInfo.accountId = this.state.accountInfo.accountId;
      blogInfo.password = this.state.accountInfo.password;
      blogInfo.mailAddress = this.state.accountInfo.mailAddress;
      blogInfo.provider = this.state.accountInfo.provider;
      blogInfo.title = additionalInfo.title;
      blogInfo.description = additionalInfo.description;
      blogInfo.birthDate = this.state.accountInfo.birthDate;
      blogInfo.postalCode = this.state.accountInfo.postalCode;
      blogInfo.prefecture = this.state.accountInfo.prefecture;
      blogInfo.remark = additionalInfo.remark;
      blogInfo.groupTags = additionalInfo.tags;
      blogInfo.mailAccount = this.state.mailAccount;
      blogInfo.detailInfo = {};
      blogInfo.firstName = this.state.accountInfo.firstName;
      blogInfo.lastName = this.state.accountInfo.lastName;
      blogInfo.firstNameKana = this.state.accountInfo.firstNameKana;
      blogInfo.lastNameKana = this.state.accountInfo.lastNameKana;

      // 追加情報から最上位情報に保存したものを重複回避のため削除
      delete additionalInfo.title;
      delete additionalInfo.description;
      delete additionalInfo.remark;
      delete additionalInfo.tags;

      // db保存用とブログアカウント作成用に追加情報を分ける
      const dbFields = [];
      const userFields = [];

      console.log('------additionalInfo');
      for (const key in additionalInfo) {
        if (key.indexOf('Value') === -1) {
          dbFields.push(additionalInfo[key]);
        } else {
          userFields[key] = additionalInfo[key];
        }
      }
      // 確認ダイアログ用の情報
      const dialogInfo = [];
      dbFields.forEach(row => {
        dialogInfo.push(row);
      });
      dialogInfo.unshift(`メールアドレス:${this.state.accountInfo.mailAddress}`);
      dialogInfo.unshift(
        `アカウントID:${this.state.accountInfo.accountId}, パスワード:${
          this.state.accountInfo.password
        }`
      );

      // db保存用情報に個人情報を追加
      dbFields.unshift(`都道府県:${this.state.accountInfo.prefecture}`);
      dbFields.unshift(`郵便番号:${this.state.accountInfo.postalCode}`);
      dbFields.unshift(`生年月日:${this.state.accountInfo.birthDate}`);
      if (this.state.accountInfo.gender === 0) {
        dbFields.unshift(`性別:男`);
      } else {
        dbFields.unshift(`性別:女`);
      }
      dbFields.unshift(
        `しめい(ふりがな):${this.state.accountInfo.lastNameKana} ${
          this.state.accountInfo.firstNameKana
        }`
      );
      dbFields.unshift(
        `氏名(漢字):${this.state.accountInfo.lastName} ${this.state.accountInfo.firstName}`
      );
      console.log('start dialog');
      this.showFinishDialog(blogInfo, dbFields, userFields, dialogInfo);
    }
  };

  showFinishDialog = (blogInfo, dbFields, userFields, dialogInfo) => {
    console.log('show dialog');
    this.setState({
      sweetAlert: (
        <SweetAlert
          style={{ display: 'block', marginTop: '-280px', width: '620px' }}
          title="ブログ作成開始"
          onConfirm={() => this.createBlogAccount(blogInfo, dbFields, userFields)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={`${this.props.classes.button} ${this.props.classes.btnSuccess}`}
          cancelBtnCssClass={`${this.props.classes.button} ${this.props.classes.btnDanger}`}
          confirmBtnText="作成"
          cancelBtnText="キャンセル"
          showCancel
        >
          <p>以下の情報でブログの作成を開始します。 </p>
          {this.getDialogMessage(dialogInfo)}
          <p>
            ブログ一覧への登録を最初に行います。
            <br />
            途中で
            <span style={errorStyles}>エラー</span>
            が発生した場合には、
            <br />
            ・可能な場合は、失敗時点から手動で継続
            <br />
            ・ブラウザを閉じて、ブログ一覧から削除
            <br />
            で、対処してください。
          </p>
        </SweetAlert>
      )
    });
  };

  getDialogMessage = info => {
    const rows = [];

    info.forEach(row => {
      const tableRow = [];
      tableRow.push(row);
      rows.push(tableRow);
    });
    console.log(rows);
    return <Table tableData={rows} />;
  };

  hideAlert = () => {
    this.setState({ sweetAlert: '' });
    this.cancelButtonClick();
  };

  refreshAnimation = index => {
    // eslint-disable-next-line react/no-string-refs
    const total = 3;
    let liWidth = 100 / total;
    const totalSteps = 3;
    let moveDistance = this.refs.wizard.children[0].offsetWidth / totalSteps;
    let indexTemp = index;
    let verticalLevel = 0;

    const mobileDevice = window.innerWidth < 600 && total > 3;

    if (mobileDevice) {
      moveDistance = this.refs.wizard.children[0].offsetWidth / 2;
      indexTemp = index % 2;
      liWidth = 50;
    }
    this.setState({ width: `${liWidth}%` });

    const stepWidth = moveDistance;
    moveDistance *= indexTemp;

    const current = index + 1;

    if (current === 1 || (mobileDevice === true && index % 2 === 0)) {
      moveDistance -= 8;
    } else if (
      current === totalSteps ||
      (mobileDevice === true && index % 2 === 1)
    ) {
      moveDistance += 8;
    }

    if (mobileDevice) {
      verticalLevel = parseInt(index / 2, 10);
      verticalLevel *= 38;
    }
    const movingTabStyle = {
      width: stepWidth,
      transform:
        `translate3d(${moveDistance}px, ${verticalLevel}px, 0)`,
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
    };
    this.setState({ movingTabStyle });
  };

  writeTabs = () => {
    const { classes } = this.props;
    console.log(`currentStep:${this.state.currentStep}`)
    if (this.state.currentStep > 1) {
      return (
        <li className={classes.steps} key={this.state.currentStep} style={{ width: '33%' }}>
          <a className={classes.stepsAnchor} onClick={() => this.previousButtonClick()}>
            {this.props.steps[this.state.currentStep].stepName}
          </a>
        </li>
      );
    }
    return (
      <li className={classes.steps} key={-1} style={{ width: '33%' }}>
        <a
          className={classes.stepsAnchor}
          onClick={() => this.navigationStepChange(-2)}
          role="button"
          tabIndex="0"
          onKeyPress={() => this.navigationStepChange(-2)}
        >
          ブログ追加情報
        </a>
      </li>
    )
  };

  createBlogAccount = (blogInfo, dbFields, userFields) => {
    // save to database
    let url = 'https://';
    switch (blogInfo.provider) {
      case 'fc2':
        url += `${blogInfo.accountId}.blog.fc2.com/`;
        break;
      case 'webnode':
        if (blogInfo.isFirstBlog) {
          url += `${blogInfo.accountId}.webnode.jp`
        } else {
          url += `${userFields.subdomain}.webnode.jp`;
        }
        break;
      case 'livedoor':
        if ((userFields.useDomainValue) && (userFields.domainValue.length > 0)) {
          url = `http://${blogInfo.accountId}.${userFields.domainValue}`;
        } else {
          url =  `http://${blogInfo.accountId}.livedoor.blog/`
        }
        break;
      case 'seesaa':
        url = `http://${blogInfo.accountId}.seesaa.net`;
        break;
      case 'ameba':
        url = `http://ameblo.jp/${blogInfo.accountId}/`;
        break;
      case 'rakuten':
        url += `plaza.rakuten.co.jp/${blogInfo.accountId}/`;
        break;
      case 'kokolog':
        url = `http://${blogInfo.accountId}.cocolog-nifty.com/`;
        break;
      case 'yaplog':
        url += `yaplog.jp/${blogInfo.accountId}`;
        break;
      case 'ninjya':
        url = `http://${blogInfo.accountId}.${userFields.domainValue}`;
        break;
      case 'hatena':
        url = `http://${blogInfo.accountId}.${userFields.domainValue}`;
        break;
      case 'webryblog':
        url = `http://${blogInfo.accountId}.at.webry.info/`;
        break;
      case 'wpcom':
        url += `${blogInfo.accountId}.wordpress.com`;
        break;
      case 'goo':
        url += `blog.goo.ne.jp/${blogInfo.accountId}`;
        break;
      default:
    }

    const newAccount = {
      key: '',
      accountId: blogInfo.accountId,
      password: blogInfo.password,
      mailAddress: blogInfo.mailAddress,
      provider: blogInfo.provider,
      title: blogInfo.title,
      description: blogInfo.description,
      url,
      remark: blogInfo.remark,
      createDate: moment().valueOf(),
      apiId: '',
      apiPass: '',
      blogId: '',
      endPoint: '',
      groupTags: blogInfo.groupTags,
      affiliateTags: '',
      detailInfo: dbFields
    };

    this.props.finishButtonClick(newAccount);
    const blogAdditionalInfo = { ...userFields };
    const createBlogInfo = { ...blogInfo, detailInfo: blogAdditionalInfo };
    this.hideAlert();

    const puppeteerBlog = new PuppeteerBlog(createBlogInfo);
    puppeteerBlog.signup(createBlogInfo);
  };

  render() {
    const { classes, title, color, steps } = this.props;
    return (
      // eslint-disable-next-line react/no-string-refs
      <div className={classes.wizardContainer} ref="wizard">
        <Card className={classes.card}>
          <div className={classes.wizardHeader}>
            <h3 className={classes.title}>{title}</h3>
          </div>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map((prop, key) => {
                if(key < 2)
                  return (
                    <li
                      className={classes.steps}
                      key={key}
                      style={{ width: this.state.width }}
                    >
                      <a
                        className={classes.stepsAnchor}
                        onClick={() => this.navigationStepChange(key)}
                      >
                        {prop.stepName}
                      </a>
                    </li>
                  );
              })}
              {this.writeTabs()}
            </ul>
            <div
              className={`${classes.movingTab} ${classes[color]}`}
              style={this.state.movingTabStyle}
            >
              {steps[this.state.currentStep].stepName}
            </div>
          </div>
          <div className={classes.content}>
            {steps.map((prop, key) => {
              const stepContentClasses = cx({
                [classes.stepContentActive]: this.state.currentStep === key,
                [classes.stepContent]: this.state.currentStep !== key
              });
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className={stepContentClasses} key={key}>
                  {/* <prop.stepComponent innerRef={prop.stepId}/> */}
                  <prop.stepComponent innerRef={node => (this[prop.stepId] = node)} />
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            <div className={classes.left}>
              {this.state.previousButton ? (
                <Button
                  className={this.props.previousButtonClasses}
                  onClick={() => this.previousButtonClick()}
                >
                  {this.props.previousButtonText}
                </Button>
              ) : null}
              {this.state.cancelButton ? (
                <Button
                  className={this.props.cancelButtonClasses}
                  onClick={() => this.cancelButtonClick()}
                >
                  {this.props.cancelButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.right}>
              {this.state.nextButton ? (
                <Button
                  color="rose"
                  className={this.props.nextButtonClasses}
                  onClick={() => this.nextButtonClick()}
                >
                  {this.props.nextButtonText}
                </Button>
              ) : null}
              {this.state.finishButton ? (
                <Button
                  color="rose"
                  className={this.props.finishButtonClasses}
                  onClick={() => this.finishButtonClick()}
                >
                  {this.props.finishButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.clearfix} />
          </div>
        </Card>
        {this.state.sweetAlert}
      </div>
    );
  }
}

BlogWizard.defaultProps = {
  mailAccount: {},
  steps: [],
  color: 'primary',
  title: '',
  subtitle: '',
  cancelButtonClasses: '',
  cancelButtonText: '',
  cancelButtonClick: '',
  previousButtonClasses: '',
  previousButtonText: '',
  nextButtonClasses: '',
  nextButtonText: '',
  finishButtonClasses: '',
  finishButtonText: '',
  finishButtonClick: '',
  validate: true
};

export default withStyles(wizardStyle)(BlogWizard);
