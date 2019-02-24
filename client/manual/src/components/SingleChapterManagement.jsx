import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ArticleListManagement from 'components/ArticleListManagement.jsx';
import SectionListManagement from 'components/SectionListManagement.jsx';

import './SingleChapterManagement.css';

export default class SingleChapterManagement extends React.Component {
    static propTypes = {
        chapter: PropTypes.object,
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
        }

        this.chapterNum = 
            ['壹', '貳', '參', '肆', '伍', 
            '陸', '柒', '捌', '玖', '拾', 
            '拾壹', '拾貳', '拾參', '拾肆', '拾伍', 
            '拾陸', '拾柒', '拾捌', '拾玖', '貳拾',
            '貳拾壹', '貳拾貳', '貳拾參', '貳拾肆', '貳拾伍', 
            '貳拾陸', '貳拾柒', '貳拾捌', '貳拾玖', '參拾',
            '參拾壹', '參拾貳', '參拾參', '參拾肆', '參拾伍', 
            '參拾陸', '參拾柒', '參拾捌', '參拾玖', '肆拾',
            '肆拾壹', '肆拾貳', '肆拾參', '肆拾肆', '肆拾伍', 
            '肆拾陸', '肆拾柒', '肆拾捌', '肆拾玖', '伍拾'];
    
    
        this.handleToggleCollapse = this.handleToggleCollapse.bind(this);
        this.handleHoverOn = this.handleHoverOn.bind(this);
        this.handleHoverOff = this.handleHoverOff.bind(this);
    }

    render() {
        let child = this.props.chapter.isOnlyArticle ?
                (<ArticleListManagement part={this.props.part} chapterID={this.props.chapter._id} sectionID='' open={this.state.open} onArticleToggle={this.props.onArticleToggle} onLoadingChange={this.props.onLoadingChange} />) :
                (<SectionListManagement part={this.props.part} chapterID={this.props.chapter._id} open={this.state.open} onArticleToggle={this.props.onArticleToggle} onLoadingChange={this.props.onLoadingChange} />);
        let chapterNumDisplay = (this.props.index >= 0 && this.props.index < this.chapterNum.length) ? `${this.chapterNum[this.props.index]}、` : '';
        
        return (
            <div>
                <ListItem button onClick={this.handleToggleCollapse}>
                    <ListItemText className='padding-left-20px' inset primary={`${chapterNumDisplay}${this.props.chapter.chapterText}`} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    {this.state.hover && 
                        <ListItemSecondaryAction className='rightMargin_70px'>
                            <IconButton onClick={() => {this.props.onDeleteToggle(this.props.chapter._id)}}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => {this.props.onEditToggle(this.props.chapter._id)}}>
                                <CreateIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>
                {child}
            </div>
        );
    }

    handleToggleCollapse() {
        this.setState(prevState => (
            {open: !prevState.open}
        ));
    }

    handleHoverOn() {
        this.setState({hover: true});
    }

    handleHoverOff() {
        this.setState({hover: false});
    }
}