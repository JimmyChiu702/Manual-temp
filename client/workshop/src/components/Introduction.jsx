import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Player } from 'video-react';

import "../../node_modules/video-react/dist/video-react.css";
import './Introduction.css';

export default class Introduction extends React.Component {
    static propTypes = {
        onNextTopicToggle: PropTypes.func
    };
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='intro-container'>
                <Typography className='title' variant='display1' color='textPrimary' gutterBottom>簡介</Typography>
                <div className='player-container'>
                    <Player src='/intro.mp4' />
                </div>
                <Button variant="outlined" color="primary" className='intro-btn' size='large' onClick={this.props.onNextTopicToggle}>下一個主題</Button>                
            </div>
        );
    }
}