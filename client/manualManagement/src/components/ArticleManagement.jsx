import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Delete';
import ModifyIcon from '@material-ui/icons/Create';

import './ArticleManagement.css';

export default class ArticleManagement extends React.Component {
    static propTypes = {
        article: PropTypes.object,
        articleNum: PropTypes.string,
        onArticleToggle: PropTypes.func,
        onModifyToggle: PropTypes.func,
        onRemoveToggle: PropTypes.func,
        onLoadingChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            hover: false
        };

        this.handleHoverOn = this.handleHoverOn.bind(this);
        this.handleHoverOff = this.handleHoverOff.bind(this);
    }

    render() {
        return (
            <ListItem className='list-item'
                      button 
                      onClick={() => {this.props.onArticleToggle(this.props.article.filename, this.props.article.level)}}
                      onMouseEnter={this.handleHoverOn} 
                      onMouseLeave={this.handleHoverOff}
            >
                <ListItemText className='padding-left-60px' primary={`(${this.props.articleNum})、${this.props.article.articleText}`} secondary={this.props.article.filename} />
                {this.state.hover &&
                    <ListItemSecondaryAction className='margin-right-70px'>
                        <IconButton onClick={event => {event.stopPropagation(); this.props.onRemoveToggle(this.props.article._id)}}>
                            <RemoveIcon />
                        </IconButton>
                        <IconButton onClick={event => {event.stopPropagation(); this.props.onModifyToggle(this.props.article._id, this.props.article.articleText)}}>
                            <ModifyIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                }
            </ListItem>
        );
    }

    handleHoverOn() {
        this.setState({hover: true});
    }

    handleHoverOff(event) {
        if (event.target.className.includes('list-item'))
            this.setState({hover: false});
    }
}