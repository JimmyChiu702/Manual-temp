import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import './SingleArticleManagement.css';

export default class SingleArticleManagement extends React.Component {
    static propTypes = {
        article: PropTypes.object,
        index: PropTypes.number,
        onDeleteToggle: PropTypes.func,
        onEditToggle: PropTypes.func,
        onArticleToggle: PropTypes.func
    };
    
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            hover: true
        };

        this.articleNum = 
            ['一', '二', '三', '四', '五', 
             '六', '七', '八', '九', '十', 
             '十一', '十二', '十三', '十四', '十五', 
             '十六', '十七', '十八', '十九', '二十',
             '二十一', '二十二', '二十三', '二十四', '二十五', 
             '二十六', '二十七', '二十八', '二十九', '三十', 
             '三十一', '三十二', '三十三', '三十四', '三十五', 
             '三十六', '三十七', '三十八', '三十九', '四十', 
             '四十一', '四十二', '四十三', '四十四', '四十五', 
             '四十六', '四十七', '四十八', '四十九', '五十', 
             '五十一', '五十二', '五十三', '五十四', '五十五', 
             '五十六', '五十七', '五十八', '五十九', '六十', 
             '六十一', '六十二', '六十三', '六十四', '六十五', 
             '六十六', '六十七', '六十八', '六十九', '七十', 
             '七十一', '七十二', '七十三', '七十四', '七十五', 
             '七十六', '七十七', '七十八', '七十九', '八十', 
             '八十一', '八十二', '八十三', '八十四', '八十五', 
             '八十六', '八十七', '八十八', '八十九', '九十', 
             '九十一', '九十二', '九十三', '九十四', '九十五', 
             '九十六', '九十七', '九十八', '九十九', '一百'];
        
        this.handleHoverOn = this.handleHoverOn.bind(this);
        this.handleHoverOff = this.handleHoverOff.bind(this);
    }

    render() {
        let articleNumDisplay = (this.props.index >=0 && this.props.index < this.articleNum.length) ? `(${this.articleNum[this.props.index]})、` : '';

        return (
            <ListItem button onClick={() => {this.props.onArticleToggle(this.props.article.filename);}}>
                <ListItemText className='padding-left-60px' primary={`${articleNumDisplay}${this.props.article.articleText}`} secondary={this.props.article.filename}/>
                {this.state.hover && 
                    <ListItemSecondaryAction className='rightMargin_70px'>
                        <IconButton onClick={() => {this.props.onDeleteToggle(this.props.article._id)}}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => {this.props.onEditToggle(this.props.article._id)}}>
                            <CreateIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                }    
            </ListItem>
        );
    }

    handleHoverOn() {
        this.setState({hover: true});
    }

    handleHoverOff() {
        this.setState({hover: false});
    }
}