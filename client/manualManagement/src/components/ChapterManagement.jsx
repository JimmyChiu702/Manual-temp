import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Delete';
import ModifyIcon from '@material-ui/icons/Create';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ArticleListManagement from 'components/ArticleListManagement.jsx';
import SectionListManagement from 'components/SectionListManagement.jsx';

import './ChapterManagement.css';
 
export default class ChapterManagement extends React.Component {
    static propTypes = {
        chapter: PropTypes.object,
        chapterNum: PropTypes.string,
        onArticleToggle: PropTypes.func,
        onModifyToggle: PropTypes.func,
        onRemoveToggle: PropTypes.func,
        onLoadingChange: PropTypes.func,
        part: PropTypes.number
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            hover: false
        };

        this.handleCollapseToggle = this.handleCollapseToggle.bind(this);
        this.handleHoverOn = this.handleHoverOn.bind(this);
        this.handleHoverOff = this.handleHoverOff.bind(this);
    }

    render() {
        let child = this.props.chapter.isOnlyArticle ?
                    (<ArticleListManagement part={this.props.part} 
                                            chapterID={this.props.chapter._id} 
                                            sectionID='' 
                                            open={this.state.open} 
                                            onArticleToggle={this.props.onArticleToggle} 
                                            onLoadingChange={this.props.onLoadingChange} 
                    />) :
                    (<SectionListManagement part={this.props.part}
                                            chapterID={this.props.chapter._id}
                                            open={this.state.open}
                                            onArticleToggle={this.props.onArticleToggle}
                                            onLoadingChange={this.props.onLoadingChange} 
                    />);
        return (
            <div>
                <ListItem button onClick={this.handleCollapseToggle} onMouseEnter={this.handleHoverOn} onMouseLeave={this.handleHoverOff}>
                    <ListItemText className='padding-left-20px' inset primary={`${this.props.chapterNum}、${this.props.chapter.chapterText}`} />
                    {this.state.hover && 
                        <ListItemSecondaryAction className='margin-right-70px'>
                            <IconButton onClick={event => {event.stopPropagation(); this.props.onRemoveToggle(this.props.chapter._id);}}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={event => {event.stopPropagation(); this.props.onModifyToggle(this.props.chapter._id, this.props.chapter.chapterText)}}>
                                <ModifyIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {child}
            </div>
        );
    };

    handleCollapseToggle() {
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