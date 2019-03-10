import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';

import Topic from 'components/Topic.jsx';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topicNum: 0,
            userInfo: {
                departmentName: "TEST"
            }
        }

        this.handleTopicChange = this.handleTopicChange.bind(this);
    }

    render() {
        return (
            <div>
                <AppBar position='static' color='primary'>
                    <Toolbar>
                        <img src='/manual/images/Logo.png' id='logoImg'/>
                        <div style={{flex: 'auto'}}></div>
                        <PersonIcon className='margin-right-10px'/>
                        <div className='margin-right-30px'>
                            <Typography variant='subheading' color='secondary'>{!!this.state.userInfo && this.state.userInfo.departmentName}</Typography>            
                        </div>
                        <Button className='margin-right-30px' variant='outlined' color='secondary' href='/logout'>登出</Button>
                    </Toolbar>
                </AppBar>
                <Paper>
                    <Tabs value={this.state.topicNum}
                          onChange={this.handleTopicChange}
                          indicatorColor="primary"
                          centered
                    >
                        <Tab label='主題一' />
                        <Tab label='主題二' />
                        <Tab label='主題三' />
                        <Tab label='主題四' />
                    </Tabs>
                </Paper>
                {this.state.topicNum==0 && <Topic topicNum={0} />}
                {this.state.topicNum==1 && <Topic topicNum={1} />}
                {this.state.topicNum==2 && <Topic topicNum={2} />}
                {this.state.topicNum==3 && <Topic topicNum={3} />}
            </div>
        );
    }

    handleTopicChange(event, num) {
        this.setState({topicNum: num}, ()=>{console.log(num)})
    }
}