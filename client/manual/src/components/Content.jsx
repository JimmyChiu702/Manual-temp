import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListIcon from '@material-ui/icons/list';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/favorite';
import SearchIcon from '@material-ui/icons/search';
import Grid from '@material-ui/core/Grid';

import ChapterList from 'components/ChapterList.jsx';
import LikeList from 'components/LikeList.jsx';
import SearchList from 'components/SearchList.jsx';
import DocumentDisplay from 'components/DocumentDisplay.jsx';

import { getLikeArticles, likeArticle } from 'api/content.js';

import './Content.css';

export default class Content extends React.Component {
    static propTypes = {
        onLoadingChange: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            inputText: null,
            isModalOpen: false,
            articleUrl: null,
            tabValue: 0,
            likeArticles: [],
            articleLevel: null
        }

        this.handleTabsChange = this.handleTabsChange.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleArticleToggle = this.handleArticleToggle.bind(this);
        this.handleLikeIconToggle = this.handleLikeIconToggle.bind(this);

        this.isWheelEvent = false;
    }

    componentDidMount() {
        this.getLikeArticles();
    }

    render() {
        return (
            <Paper id='contentContainer'>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.handleModalClose}
                >
                    <DocumentDisplay url={this.state.articleUrl} level={this.state.articleLevel} />
                </Modal>

                <Tabs fullWidth={true} value={this.state.tabValue} onChange={this.handleTabsChange} indicatorColor='primary'>
                    <Tab icon={<ListIcon />} />
                    <Tab icon={<FavoriteIcon />} />
                    <Tab icon={<SearchIcon />} />
                </Tabs>

                {this.state.tabValue==0 && <ChapterList part={this.props.part} onArticleToggle={this.handleArticleToggle} likeArticles={this.state.likeArticles} onLikeIconToggle={this.handleLikeIconToggle} onLoadingChange={this.props.onLoadingChange} />}
                {this.state.tabValue==1 && <LikeList part={this.props.part} onArticleToggle={this.handleArticleToggle} likeArticles={this.state.likeArticles} onLikeIconToggle={this.handleLikeIconToggle} onLoadingChange={this.props.onLoadingChange} />}
                {this.state.tabValue==2 && <SearchList part={this.props.part} onArticleToggle={this.handleArticleToggle} likeArticles={this.state.likeArticles} onLikeIconToggle={this.handleLikeIconToggle} onLoadingChange={this.props.onLoadingChange} />}
            </Paper>
        );
    }

    getLikeArticles() {
        this.props.onLoadingChange(true, () => {
            getLikeArticles(this.props.part).then(likeArticles => {
                this.setState({likeArticles: likeArticles}, () => {
                    this.props.onLoadingChange(false);
                });
            }).catch(err => {
                console.error('Error getting like articles', err);
                this.props.handleLoadingChange(false);
            });
        })
    }

    handleTabsChange(event, value) {
        this.setState({tabValue: value});
    }

    handleModalClose() {
        this.setState({isModalOpen: false});
    }

    handleArticleToggle(filename, level=null, articleInfo=null) {
        var url;
        if (articleInfo)
            url = `/document/${filename}?chapterText=${articleInfo.chapterText}&sectionText=${articleInfo.sectionText}&articleText=${articleInfo.articleText}#toolbar=0`;
        else 
            url = `/document/${filename}#toolbar=0`;
        this.isWheelEvent = false;
        this.setState({isModalOpen: true, articleUrl: url, articleLevel: level})
    }

    handleLikeIconToggle(articleID, isToLike) {
        this.props.onLoadingChange(true, () => {
            likeArticle(articleID, isToLike, this.props.part).then(likeArticles => {
                this.setState({likeArticles: likeArticles}, () => {
                    this.props.onLoadingChange(false);
                });
            }).catch(err => {
                this.props.onLoadingChange(false);
                alert('過程發生錯誤');
                console.error('Error liking an article', err);
            })
        })
    }
}