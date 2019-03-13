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

        this.content = [
            {
                videoUrl: "https://www.youtube.com/watch?v=qy5ldGXjHOg",
                questions: [
                    {
                        description: "書面審查的目的，是為了比較和排序考生。",
                        options: [
                            "正確",
                            "不正確"
                        ],
                        answer: {
                            option: 'B',
                            description: "答案(B)，書面審查的目的，不是為了比較和排序考生，而是以學系（班）的審查共識，鑑別出最適合學系（班）招生特色與需求的考生。"
                        }
                    },{
                        description: "以下對「書面審查評量尺規」的說明，何者有誤？",
                        options: [
                            "是審查委員依據學系（班）的招生需求而共同制定。",
                            "是學系（班）的審查評分共識。",
                            "僅作為學系（班）審查使用，無須對外公告。",
                            "藉由審查評量尺規，審查委員能準確且公平地鑑別考生。"
                        ],
                        answer: {
                            option: 'C',
                            description: "答案(C)，審查評量尺規的部分內容，將於109學年度對外公告，以協助考生瞭解學系（班）的審查標準和準備方向。"
                        }        
                    },{
                        description: "以下針對書面審查流程SOP中之目的與重要執行事項的說明，何者正確？",
                        options: [
                            "審查前，最重要的是建立分組共識與評分共識。",
                            "審查前會議中，學系（班）確認每一位審查委員都已瞭解尺規內涵的過程，稱為「分組共識」。",
                            "審查期間，審查委員應獨立審查，避免有任何的意見交流，以免影響評分結果。",
                            "審查後，若考生的成績有差異，學系（班）應尊重個別審查委員的評分，無須討論或調整分數。"
                        ],
                        answer: {
                            option: 'C',
                            description: "答案(C)，審查前會議中，學系（班）確認每一位審查委員都已瞭解尺規內涵的過程，稱為「尺規校準」，是指審查委員以尺規試評、並確認尺規的評分面向與尺度。"
                        }
                    }
                ]
            }
        ];

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
                {this.state.topicNum==0 && <Topic content={this.content[0]} />}
            </div>
        );
    }

    handleTopicChange(event, num) {
        this.setState({topicNum: num});
    }
}