import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

import SectionList from 'components/SectionList.jsx';
import ArticleList from 'components/ArticleList.jsx';

import { getChapters } from 'api/content.js';

import './ChapterList.css';

export default class ChapterList extends React.Component {
    static propTypes = {
        onArticleToggle: PropTypes.func,
        likeArticles: PropTypes.array,
        onLikeIconToggle: PropTypes.func
    };
    
    constructor(props) {
        super(props);

        this.state = {
            open: [],
            chapters: [],
            head: null,
            tail: null
        };

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
    }

    componentDidMount() {
        this.getChapters();
    }

    render() {
        return (
            <List subheader={<ListSubheader component='div'>目錄</ListSubheader>}>
                {!!this.state.head && 
                    <div key='head'>
                        <ListItem button onClick={() => {this.handleToggleCollapse(0);}}>
                            <ListItemText className='padding-left-20px' inset primary={`${this.state.head.chapterText}`} />
                            {this.state.open[0] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        {this.state.head.isOnlyArticle ? 
                            (<ArticleList chapterText={this.state.head.chapterText} sectionText='' parentID={this.state.head._id} open={this.state.open[0]} onArticleToggle={this.props.onArticleToggle} likeArticles={this.props.likeArticles} onLikeIconToggle={this.props.onLikeIconToggle}/>) :
                            (<SectionList chapterText={this.state.head.chapterText} chapterID={this.state.head._id} open={this.state.open[0]} onArticleToggle={this.props.onArticleToggle} likeArticles={this.props.likeArticles} onLikeIconToggle={this.props.onLikeIconToggle} />)
                        }
                    </div>
                }

                {this.state.chapters.map((obj, i) => {
                    let child = obj.isOnlyArticle ?
                        (<ArticleList chapterText={obj.chapterText} sectiontext='' parentID={obj._id} open={this.state.open[i+2]} onArticleToggle={this.props.onArticleToggle} likeArticles={this.props.likeArticles} onLikeIconToggle={this.props.onLikeIconToggle}/>) :
                        (<SectionList chapterText={obj.chapterText} chapterID={obj._id} open={this.state.open[i+2]} onArticleToggle={this.props.onArticleToggle} likeArticles={this.props.likeArticles} onLikeIconToggle={this.props.onLikeIconToggle} />);
                    return (
                        <div key={i}>
                            <ListItem button onClick={() => {this.handleToggleCollapse(i+2);}}>
                                <ListItemText className='padding-left-20px' inset primary={`${i<this.chapterNum.length && this.chapterNum[i]}、${obj.chapterText}`} />
                                {this.state.open[i+2] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            {child}
                        </div>
                    )
                })}

                {!!this.state.tail && 
                    <div key='head'>
                        <ListItem button onClick={() => {this.handleToggleCollapse(1);}}>
                            <ListItemText className='padding-left-20px' inset primary={`${this.state.tail.chapterText}`} />
                            {this.state.open[1] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        {this.state.head.isOnlyArticle ? 
                            (<ArticleList chapterText={this.state.tail.chapterText} sectionText='' parentID={this.state.tail._id} open={this.state.open[1]} onArticleToggle={this.props.onArticleToggle} likeArticles={this.props.likeArticles} onLikeIconToggle={this.props.onLikeIconToggle}/>) :
                            (<SectionList chapterText={this.state.tail.chapterText} chapterID={this.state.tail._id} open={this.state.open[1]} onArticleToggle={this.props.onArticleToggle} likeArticles={this.props.likeArticles} onLikeIconToggle={this.props.onLikeIconToggle} />)
                        }
                    </div>
                }
            </List>
        );
    }

    getChapters() {
        getChapters().then(chapters => {
            let head = chapters.splice(chapters.findIndex(ch => ch.kind === 0), 1)[0];
            let tail = chapters.splice(chapters.findIndex(ch => ch.kind === 2), 1)[0];
            this.setState({head: head, tail: tail, chapters: chapters});
        }).catch(err => {
            console.error('Error getting chapters', err);
        }) 
    }

    handleToggleCollapse(i) {
        let temp = this.state.open;
        temp[i] = !temp[i];
        this.setState({
            open: temp
        });
    }
}