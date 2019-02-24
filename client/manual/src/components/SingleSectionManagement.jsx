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

import './SingleSectionManagement.css';

export default class SingleSectionManagement extends React.Component {
    static propTypes = {
        section: PropTypes.object,
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

        this.sectionNum = 
            ['一', '二', '三', '四', '五', 
             '六', '七', '八', '九', '十', 
             '十一', '十二', '十三', '十四', '十五', 
             '十六', '十七', '十八', '十九', '二十',
             '二十一', '二十二', '二十三', '二十四', '二十五', 
             '二十六', '二十七', '二十八', '二十九', '三十',
             '三十一', '三十二', '三十三', '三十四', '三十五', 
             '三十六', '三十七', '三十八', '三十九', '四十',
             '四十一', '四十二', '四十三', '四十四', '四十五', 
             '四十六', '四十七', '四十八', '四十九', '五十',];

        this.handleToggleCollapse = this.handleToggleCollapse.bind(this);
        this.handleHoverOn = this.handleHoverOn.bind(this);
        this.handleHoverOff = this.handleHoverOff.bind(this);
    }

    render() {
        let sectionNumDisplay = (this.props.index >= 0 && this.props.index <this.sectionNum.length) ? `${this.sectionNum[this.props.index]}、` : ''; 

        return (
            <div>
                <ListItem button onClick={this.handleToggleCollapse}>
                    <ListItemText className='padding-left-40px' primary={`${sectionNumDisplay}${this.props.section.sectionText}`} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    {this.state.hover && 
                        <ListItemSecondaryAction className='rightMargin_70px'>
                            <IconButton onClick={() => {this.props.onDeleteToggle(this.props.section._id);}}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => {this.props.onEditToggle(this.props.section._id)}}>
                                <CreateIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>
                <ArticleListManagement chapterID={this.props.chapterID} sectionID={this.props.section._id} open={this.state.open} onArticleToggle={this.props.onArticleToggle} onLoadingChange={this.props.onLoadingChange} />
            </div>
        );
    }

    handleToggleCollapse() {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    handleHoverOn() {
        this.setState({hover: true});
    }

    handleHoverOff() {
        this.setState({hover: false});
    }
}