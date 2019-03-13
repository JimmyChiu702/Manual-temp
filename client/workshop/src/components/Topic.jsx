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
        content: PropTypes.object
    };

    constructor(props) {
        super(props);
        
        this.state = {
            userInfo: null,
            userAns: null,
            userOpinion: '',
            isAnsDisplayed: false,
            isAnsSubmitted: false
        }

        this.queNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        this.optNum = ['A', 'B', 'C', 'D', 'E'];

        this.handleAnsChange = this.handleAnsChange.bind(this);
        this.handleOpinionInputChange = this.handleOpinionInputChange.bind(this);
        this.handleOpinionSubmit = this.handleOpinionSubmit.bind(this);
        this.handleUserAnsSubmit = this.handleUserAnsSubmit.bind(this);
        this.handleAnsOpen = this.handleAnsOpen.bind(this);
    }

    componentDidMount() {
        let ans = [];
        for (let i=0; i<this.props.content.questions.length; i++) {
            ans.push('A');
        }
        this.setState({userAns: ans});
        this.getUserInfo();
    }

    render() {
        const content = this.props.content;
        return (
            <div className='topic-container'>
                <div className='player-container'>
                    <Player src={content.videoUrl} />
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
                            <Collapse in={this.state.isAnsDisplayed} className='answer-container'>
                                <Typography color='inherit' style={{color: this.state.userAns[i]==question.answer.option?'limeGreen':'red'}}>{question.answer.description}</Typography>
                            </Collapse>
                        </div>
                    ))}
                    <Button variant="outlined" color="primary" className='confirm-btn' size='large' onClick={this.handleUserAnsSubmit} disabled={this.state.isAnsSubmitted}>送出</Button>
                </div>
                <form className='opinion-box-container'>
                    <Typography className='secondary-title' variant='display1' color='textPrimary' gutterBottom>意見欄</Typography>
                    <TextField value={this.state.userOpinion} 
                            onChange={this.handleOpinionInputChange}
                            label='寫下您寶貴的意見'
                            margin='normal'
                            variant='outlined'
                            fullWidth />
                    <Button variant="outlined" color="primary" className='confirm-btn' size='large' onClick={this.handleOpinionSubmit}>送出</Button> 
                </form>
            </div>
        );
    }

    getUserInfo() {

    }

    handleAnsChange(ans, qNum) {
        if (!this.state.isAnsSubmitted) {
            let newAns = this.state.userAns.slice();
            newAns[qNum] = ans;
            this.setState({userAns: newAns});
        }
    }

    handleOpinionInputChange(event) {
        this.setState({userOpinion: event.target.value})
    }

    handleOpinionSubmit() {
        this.setState({userOpinion: ''});
    }

    handleUserAnsSubmit() {
        this.setState({isAnsSubmitted: true})
        this.handleAnsOpen();
    }

    handleAnsOpen() {
        this.setState({isAnsDisplayed: true});
    }
}