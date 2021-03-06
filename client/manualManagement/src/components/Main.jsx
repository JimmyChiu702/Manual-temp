import React from 'react';

import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getUserInfo } from 'api/content.js';

import ContentManagement from 'components/ContentManagement.jsx';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: null,
            loadingNum: 0,
            tabValue: 0
        };

        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleLoadingChange = this.handleLoadingChange.bind(this);
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        return (
            <div>
                <Modal open={this.state.loadingNum>0}>
                    <div style={{position: 'absolute', top: '50%', left: '50%'}}>
                        <CircularProgress color='primary' size={100} auto style={{position: 'relative', top: '-50%', left: '-50%'}} />
                    </div>
                </Modal>
                <AppBar position='static' color='primary'>
                    <Toolbar>
                        <a href='/entry'>
                            <img id='logo-img' src='/manual/images/Logo.png' />
                        </a>
                        <Tabs value={this.state.tabValue} onChange={this.handleTabChange} style={{flexGrow: 1}} indicatorColor='primary'>
                            <Tab label={<Typography variant='subheading' color='secondary'>競賽手冊</Typography>} />
                            <Tab label={<Typography variant='subheading' color='secondary'>國外學制</Typography>} />
                            <Tab label={<Typography variant='subheading' color='secondary'>國外競賽</Typography>} />
                        </Tabs>
                        <PersonIcon className='margin-right-10px' />
                        <div className='margin-right-30px'>
                            <Typography variant='subheading' color='secondary'>{!!this.state.userInfo && `${this.state.userInfo.departmentName} - ${this.state.userInfo.userName}`}</Typography>
                        </div>
                        <Button variant='outlined' color='secondary' href='/logout'>登出</Button>
                    </Toolbar>
                </AppBar>
                <Typography variant='display3' align='center' id='headline'>
                    高中生競賽<br />語言檢定資訊查詢平台
                </Typography>
                {this.state.tabValue==0 && <ContentManagement part={1} onLoadingChange={this.handleLoadingChange} />}
                {this.state.tabValue==1 && <ContentManagement part={2} onLoadingChange={this.handleLoadingChange} />}
                {this.state.tabValue==2 && <ContentManagement part={3} onLoadingChange={this.handleLoadingChange} />}
            
                <Typography id='footer' variant='body2' align='center'>Copyright &#9400; 2019 國立清華大學教務處招生策略中心。版權所有</Typography>
            </div>
        )
    }

    getUserInfo() {
        this.handleLoadingChange(true, () => {
            getUserInfo().then(userInfo => {
                this.setState({userInfo: userInfo}, () => {
                    this.handleLoadingChange(false);
                });
            }).catch(err => {
                console.error('Error getting user information', err);
                this.handleLoadingChange(false);
            });
        });
    }

    handleTabChange(event, value) {
        this.setState({tabValue: value});
    }

    handleLoadingChange(isLoading, callback=null) {
        if (isLoading) {
            this.setState(prevState => ({loadingNum: prevState.loadingNum+1}), () => {
                if (callback != null) callback();
            });
        } else {
            this.setState(prevState => ({loadingNum: prevState.loadingNum-1}), () => {
                if (callback != null) callback();
            })
        }
    }
}