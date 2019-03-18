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
import Introduction from 'components/Introduction.jsx';

import { getUserInfo } from 'api/workshop.js';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topicNum: 0,
            userInfo: null
        }


        this.content = [
            {
                title: '主題一、書面審查的目的',
                videoUrl: "/video/topic_1.mp4",
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
                        description: '以下對「書面審查評量尺規」的說明，何者"有誤？"',
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
                        description: '以下針對書面審查流程SOP中之目的與重要執行事項的說明，何者"錯誤"？',
                        options: [
                            "審查前，最重要的是建立分組共識與評分共識。",
                            "審查前會議中，學系（班）確認每一位審查委員都已瞭解尺規內涵的過程，稱為「分組共識」。",
                            "審查期間，審查委員應建立連絡熱線並進行討論。 ",
                            "審查後，若考生的評分有差異，學系（班）在審查後會議中，請委員提出評分觀點，進行充分討論後達到有共識的分數。"
                        ],
                        answer: {
                            option: 'B',
                            description: "答案(B)，審查前會議中，學系（班）確認每一位審查委員都已瞭解尺規內涵的過程，稱為「尺規校準」，是指審查委員以尺規試評、並確認尺規的評分面向與尺度。"
                        }
                    }
                ]
            },{
                title: '主題二、審查委員和審查機制',
                videoUrl: "/video/topic_2.mp4",
                questions: [
                    {
                        description: "依據國立清華大學各學系（班／組）辦理招生試務作業要點，以下對審查委員之聘任規定，何者有誤？",
                        options: [
                            "學系（班）應依教師專長與研究方向聘任委員，或經該學系（班）之招生委員同意後，聘請校外委員擔任。",
                            "審查委員以三人（或以上）為原則。",
                            "審查委員必須全程參與審查工作。",
                            "只要無二等親內之親屬報考者，便能擔任審查委員。"
                        ],
                        answer: {
                            option: 'D',
                            description: "答案(D)，無三等親內之親屬報考者，始得擔任審查委員。"
                        }
                    },{
                        description: '審查分組共識的目的，是為了達到各組考生人數與程度異質化，以確保評分的一致性。',
                        options: [
                            "正確",
                            "不正確"
                        ],
                        answer: {
                            option: 'B',
                            description: "答案(B)，審查分組共識，是為了達到各組考生的人數與程度均質化，也就是應各組的人數和組成應盡量相似。"
                        }        
                    },{
                        description: '下列哪一個選項不是確保審查分數常態化的步驟？',
                        options: [
                            "透過討論制度，解決差分問題。",
                            "以等第百分制評分，減少委員認知負荷。",
                            "確認審查委員評分的平均值一致。",
                            "清楚界定各等第人數分佈，以正取、備取、或不錄取，作為人數分佈準則。"
                        ],
                        answer: {
                            option: 'A',
                            description: "答案(A)，步驟A為解決評分差異的方式，非評分標準化步驟；BCD為確保審查分數常態化的重要步驟。"
                        }
                    }
                ]
            }
        ];

        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleNextTopicToggle = this.handleNextTopicToggle.bind(this);
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
                            <img src='/workshop/images/Logo.png' id='logoImg'/>
                        </a>
                        <div style={{flex: 'auto'}}></div>
                        <PersonIcon className='margin-right-10px'/>
                        <div className='margin-right-30px'>
                            <Typography variant='subheading' color='secondary'>{!!this.state.userInfo && `${this.state.userInfo.departmentName} - ${this.state.userInfo.userName}`}</Typography>            
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
                        <Tab label='簡介' />
                        <Tab label='審查目的' />
                        <Tab label='委員與機制' />
                        <Tab label='差分檢核' />
                        <Tab label='尺規（高中學習表現）' />
                        <Tab label='尺規（多元表現與特質）' />
                    </Tabs>
                </Paper>
                {this.state.topicNum==0 && <Introduction onNextTopicToggle={this.handleNextTopicToggle} />}
                {this.state.topicNum==1 && <Topic topicNum={0} userInfo={this.state.userInfo} content={this.content[0]} onNextTopicToggle={this.handleNextTopicToggle} />}
                {this.state.topicNum==2 && <Topic topicNum={1} userInfo={this.state.userInfo} content={this.content[1]} onNextTopicToggle={this.handleNextTopicToggle} isLastTopic/>}
            </div>
        );
    }

    getUserInfo() {
        getUserInfo().then(userInfo => {
            this.setState({userInfo: userInfo});
        }).catch(err => {
            console.error('Error getting user information', err);
        });
    }

    handleTopicChange(event, num) {
        this.setState({topicNum: num});
    }

    handleNextTopicToggle() {
        this.setState(prevState => ({topicNum: prevState.topicNum + 1}), () => {
            window.scrollTo(0, 0);
        });
    }
}