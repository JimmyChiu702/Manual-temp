import React from 'react';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

import axios from 'axios';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    
        this.baseUrl = 'http://localhost:80/login';
    }

    render() {
        return (
            <div>
                <Paper id='container'>
                    <Typography variant='headline'>登入</Typography>
                    <form action='/login' method='POST'>
                        <FormControl className='formControl' fullWidth margin='normal'>
                            <InputLabel>帳號</InputLabel>
                            <Input name='username'/>
                        </FormControl>
                        <FormControl className='formControl' fullWidth margin='normal'>
                            <InputLabel>密碼</InputLabel>
                            <Input name='password' type='password'/>
                        </FormControl>
                        <div id='btnContainer'>
                            <Button id='confirmBtn' variant='contained' type='submit'>送出</Button>
                        </div>
                    </form>
                    
                    <Grid container alignContent='space-around' id='errorMessage'>
                        <Grid item xs={2}>
                            <div id='errorIconContainer'>
                                <ErrorIcon color='error' style={{ 'fontSize': '30px' }} />
                            </div>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant='body2' color='error'>
                                本案參與教育部招生專業化發展試辦計畫，為本中心成果報告之一，請勿轉傳及外流內容。
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Typography id='footer' variant='body2' align='center'>Copyright &#9400; 2017 國立清華大學教務處招生策略中心。版權所有</Typography>
            </div>
        );
    }

    handleSubmit() {
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        axios.post(this.baseUrl, data);
    }

    handleInputChange(event, prop) {
        this.setState({[prop]: event.target.value});
    }
}