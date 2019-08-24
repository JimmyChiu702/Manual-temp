import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';

import { getUserInfo } from 'api/user.js';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: null
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        return (
            <div>
                <AppBar position='static' color='primary'>
                    <Toolbar>
                        <a href='/entry'>
                            <img src='/entry/images/Logo.png' id='logoImg'/>
                        </a>
                        <div style={{flex: 'auto'}}></div>
                        <PersonIcon className='margin-right-10px'/>
                        <div className='margin-right-30px'>
                            <Typography variant='subheading' color='secondary'>{!!this.state.userInfo && `${this.state.userInfo.departmentName} - ${this.state.userInfo.userName}`}</Typography>            
                        </div>
                        <Button className='margin-right-30px' variant='outlined' color='secondary' href='/logout'>登出</Button>
                    </Toolbar>
                </AppBar>
                <div className='btn-container'>
                    <Button className='btn' variant='outlined' color='primary' fullWidth size='large' href='/workshop'>書面審查數位工作坊</Button>
                    <Button className='btn' variant='outlined' color='primary' fullWidth size='large' href='/manual'>高中生競賽<br />語言檢定資訊查詢</Button>
                    <Button className='btn' variant='outlined' color='primary' fullWidth size='large' href='/userManagement'>使用者管理</Button>
                    <Button className='btn' variant='outlined' color='primary' fullWidth size='large' disabled>校務數據分析結果</Button>
                </div>
            </div>
        );
    }

    getUserInfo() {
        getUserInfo().then(userInfo => {
            console.log(userInfo)
            this.setState({userInfo: userInfo});
        }).catch(err => {
            console.error('Error getting user information', err);
        });
    }
}