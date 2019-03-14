import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField  from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

import { Player } from 'video-react';

import "../../node_modules/video-react/dist/video-react.css";
import './Topic.css';

export default class Topic extends React.Component {
    static propTypes = {
        content: PropTypes.object,
        onNextTopicToggle: PropTypes.func,
        isLastTopic: PropTypes.bool
    };

    static defaultProps = {
        isLastTopic: false,
        onNextTopicToggle: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            isHelpful: null,
            userAns: [],
            userOpinion: '',
            isSubmitted: false
        }

        this.queNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        this.optNum = ['A', 'B', 'C', 'D', 'E'];

        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleAnsChange = this.handleAnsChange.bind(this);
        this.handleOpinionInputChange = this.handleOpinionInputChange.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
    }

    render() {
        const content = this.props.content;
        return (
            <div className='topic-container'>
                <Typography className='title' variant='display1' color='textPrimary' gutterBottom>{content.title}</Typography>
                <Typography className='introduction-text'>您好，歡迎來到書面審查數位工作坊，請點選主題一影片，瞭解書面審查的目的；再用幾分鐘的時間，填寫對這部影片的簡單意見，再進行「牛刀小試」，完成後可點選「送出」確認答案。</Typography>
                <div className='player-container'>
                    <Player src={content.videoUrl} />
                </div>
                <div className='opinion-box-container'>
                    <Typography className='secondary-title' variant='display1' color='textPrimary' gutterBottom>意見欄</Typography>
                    <Typography color='textPrimary' gutterBottom>請問這部影片對您有幫助嗎?</Typography>
                    <RadioGroup value={this.state.isHelpful} onChange={this.handleRadioChange}>
                        <FormControlLabel value='Yes' control={<Radio color="primary" />} label='有' />
                        <FormControlLabel value='No' control={<Radio color="primary" />} label='沒有' />
                    </RadioGroup>
                    <TextField value={this.state.userOpinion} 
                            onChange={this.handleOpinionInputChange}
                            label='寫下您寶貴的意見'
                            margin='normal'
                            variant='outlined'
                            fullWidth />
                </div>
                <div className='question-container'>
                    <Typography className='secondary-title' variant='display1' color='textPrimary' gutterBottom>牛刀小試</Typography>
                    {!!content.questions && !!this.state.userAns && content.questions.map((question, i) => (
                        <div key={i} className='question'>
                            <Typography className='question-dicription' variant='body1'>{`${this.queNum[i]}、${question.description}`}</Typography>
                            <FormControl className='options-container'>
                                <RadioGroup value={this.state.userAns[i]} onChange={(event) => {this.handleAnsChange(event.target.value, i)}}>
                                    {question.options.map((opt, j) => (
                                        <FormControlLabel value={this.optNum[j]} control={<Radio color="primary" />} label={`(${this.optNum[j]}) ${opt}`} key={j} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <Collapse in={this.state.isSubmitted} className='answer-container'>
                                <Typography style={{color: this.state.userAns[i]==question.answer.option?'blue':'red'}}>{question.answer.description}</Typography>
                            </Collapse>
                        </div>
                    ))}
                    <Button variant="outlined" color="primary" className='btn' size='large' onClick={this.handleUserSubmit} disabled={this.state.isSubmitted}>送出</Button>
                    {!this.props.isLastTopic ? 
                        <Button variant="outlined" color="primary" className='btn' size='large' onClick={this.props.onNextTopicToggle} disabled={!this.state.isSubmitted}>下一個主題</Button>:
                        <span>{this.state.isSubmitted && <Typography variant='body1' inline>已經是最後的主題了喔 !</Typography>}</span>
                    }
                </div>
            </div>
        );
    }

    handleRadioChange(event) {
        if (!this.state.isSubmitted) {
            this.setState({isHelpful: event.target.value});
        }
    }

    handleAnsChange(ans, qNum) {
        if (!this.state.isAnsSubmitted) {
            let newAns = this.state.userAns.slice();
            newAns[qNum] = ans;
            this.setState({userAns: newAns});
        }
    }

    handleOpinionInputChange(event) {
        if (!this.state.isSubmitted) {
            this.setState({userOpinion: event.target.value})
        }
    }

    handleUserSubmit() {
        let isFinished = !!this.state.isHelpful && !!this.state.userAns.length>0;
        if (isFinished) {
            for (let i=0; i<this.state.userAns.length; i++) {
                if (!this.state.userAns[i])
                    isFinished = false;
            }
        }
        if (isFinished) {
            this.setState({isSubmitted: true})
        } else {
            alert('請完成全部的問題再送出喔!')
        }
    }
}