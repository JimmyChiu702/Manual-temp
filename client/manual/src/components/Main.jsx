import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';

import Content from 'components/Content.jsx';
import Retrieval from 'components/Retrieval.jsx';
import ContentManagement from 'components/ContentManagement.jsx';
import UserManagement from 'components/UserManagement.jsx';

import { getUserInfo } from 'api/content.js';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabValue: 0,
            userInfo: null,
            loading: false
        }

        this.handleTabsChange = this.handleTabsChange.bind(this);
        this.handleLoadingChange = this.handleLoadingChange.bind(this);
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        let isAdmin = !!this.state.userInfo && this.state.userInfo.userID == 'admin';

        return (
            <div>
                <Modal
                    open={this.state.loading}
                >
                    <CircularProgress style={{margin: 'auto', outline: 'none'}} color='primary' size={100} auto/>
                </Modal>
                <AppBar position='static' color='primary'>
                    <Toolbar>
                        <img src='/manual/images/Logo.png' id='logoImg'/>
                        <Tabs value={this.state.tabValue} onChange={this.handleTabsChange} style={{flexGrow: 1}} indicatorColor='primary'>
                            <Tab label={<Typography variant='subheading' color='secondary'>競賽手冊</Typography>} />
                            {isAdmin &&  <Tab label={<Typography variant='subheading' color='secondary'>手冊內容管理</Typography>} />}
                            {isAdmin &&  <Tab label={<Typography variant='subheading' color='secondary'>使用者管理</Typography>} />}
                        </Tabs>
                        <PersonIcon />
                        <div className='margin-right-30px'>
                            <Typography variant='subheading' color='secondary'>{!!this.state.userInfo && this.state.userInfo.departmentName}</Typography>            
                        </div>
                        <Button variant='outlined' color='secondary' href='/logout'>登出</Button>
                    </Toolbar>
                </AppBar>

                <Typography variant='display3' align='center' id='headline'>
                    高中生競賽<br />語言檢定資訊查詢平台
                </Typography>
                
                {this.state.tabValue==0 && <Content onLoadingChange={this.handleLoadingChange} />}

                {(this.state.tabValue==1 && isAdmin) && <ContentManagement onLoadingChange={this.handleLoadingChange} />}
                {(this.state.tabValue==2 && isAdmin) && <UserManagement onLoadingChange={this.handleLoadingChange} />}

                <Typography id='footer' variant='body2' align='center'>Copyright &#9400; 2017 國立清華大學教務處招生策略中心。版權所有</Typography>
            </div>
        );
    }

    getUserInfo() {
        getUserInfo().then(userInfo => {
            this.setState({userInfo: userInfo});
        }).catch(err => {
            console.error('Error getting user infomation', err);
        });
    }

    handleTabsChange(event, value) {
        this.setState({tabValue: value});
    }

    handleLoadingChange(isLoading, callback=null) {
        this.setState({loading: isLoading}, () => {
            if (callback)
                callback();
        });
    }
}
