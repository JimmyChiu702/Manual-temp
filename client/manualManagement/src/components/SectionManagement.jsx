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

import './SectionManagement.css';

export default class SectionManagement extends React.Component {
    static propTypes = {
        section: PropTypes.object,
        sectionNum: PropTypes.string,
        chapterID: PropTypes.string,
        onArticleLoading: PropTypes.func,
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
        return (
            <div>
                <ListItem button onClick={this.handleCollapseToggle}  onMouseEnter={this.handleHoverOn} onMouseLeave={this.handleHoverOff}>
                    <ListItemText className='padding-left-40px' primary={`${this.props.sectionNum}、${this.props.section.sectionText}`} />
                    {this.state.hover &&
                        <ListItemSecondaryAction className='margin-right-70px'>
                            <IconButton onClick={event => {event.stopPropagation(); this.props.onRemoveToggle(this.props.section._id)}}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={event => {event.stopPropagation(); this.props.onModifyToggle(this.props.section._id)}}>
                                <ModifyIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <ArticleListManagement chapterID={this.props.chapterID}
                                       sectionID={this.props.section._id}
                                       open={this.state.open}
                                       onArticleToggle={this.props.onArticleToggle}
                                       onLoadingChange={this.props.onLoadingChange}
                                       part={this.props.part}
                />
            </div>
        );
    }

    handleCollapseToggle() {
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