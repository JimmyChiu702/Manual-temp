import React from 'react';
import PropTypes from 'prop-types';

import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

import ArticleList from 'components/ArticleList.jsx';

import { getSections } from 'api/content.js';

import './SectionList.css';

export default class SectionList extends React.Component {
    static propTypes = {
        chapterID: PropTypes.string,
        open: PropTypes.bool,
        onArticleToggle: PropTypes.func,
        likeArticles: PropTypes.array,
        chapterText: PropTypes.string,
        onLoadingChange: PropTypes.func
    };
    
    constructor(props) {
        super(props);

        this.state = {
            open: [],
            sections: []
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
    }

    componentDidMount() {
        this.getSections();
    }

    render() {
        return (
            <Collapse in={this.props.open} timeout='auto'>
                <List>
                    {this.state.sections.map((obj, i) => (
                        <div key={i}>
                            <ListItem button onClick={() => {this.handleCollapseToggle(i);}}>
                                <ListItemText className='padding-left-40px' primary={`${i<this.sectionNum.length && this.sectionNum[i]}、${obj.sectionText}`} />
                                {this.state.open[i] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <ArticleList parentID={obj._id} 
                                         open={this.state.open[i]} 
                                         onArticleToggle={this.props.onArticleToggle} 
                                         likeArticles={this.props.likeArticles} 
                                         onLikeIconToggle={this.props.onLikeIconToggle}
                                         chapterText={this.props.chapterText} 
                                         sectionText={obj.sectionText}
                                         onLoadingChange={this.props.onLoadingChange} />
                        </div>
                    ))}
                </List>
            </Collapse>
        );
    }

    getSections() {
        this.props.onLoadingChange(true, () => {
            getSections(this.props.chapterID).then(sections => {
                this.setState({sections: sections}, () => {
                    this.props.onLoadingChange(false);
                });
            }).catch(err => {
                console.error('Error getting sections', err);
                this.props.onLoadingChange(false);
            });
        })
    }

    handleCollapseToggle(i) {
        let temp = this.state.open;
        temp[i] = !temp[i];
        this.setState({
            open: temp
        });
    }
}