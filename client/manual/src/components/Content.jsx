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
    }

    componentDidMount() {
        this.getLikeArticles();
    }

    render() {
        const refDiscr = this.getRefDiscr(this.state.articleLevel);
        const refColor = this.getRefColor(this.state.articleLevel);
        return (
            <Paper id='contentContainer'>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.handleModalClose}
                >
                    <Paper id='articleContentDisplay'>
                        {this.state.articleLevel != '' && 
                            <Grid id='ref-container' container>
                                <Grid xs={2} item>
                                    <Typography style={{marginTop: '0.5rem'}}>
                                        <font>參考度</font>
                                        <font style={{fontSize: '2.5rem', color: refColor}}>{' '}{this.state.articleLevel}</font>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={{fontSize: '0.8rem'}}>
                                        {refDiscr[0]}<br/>{refDiscr[1]}
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                        <div id='mask' onContextMenu={event => event.preventDefault()} onClick={() => document.getElementById('pdf').focus()}></div>
                        <iframe id='pdf' src={this.state.articleUrl} style={{width: "100%", height: "80vh"}} />
                        <Typography align='center'>請使用 "上"、"下"、"Page UP"、"Page Down" 來移動文件</Typography>
                    </Paper>
                </Modal>

                <Tabs fullWidth={true} value={this.state.tabValue} onChange={this.handleTabsChange} indicatorColor='primary'>
                    <Tab icon={<ListIcon />} />
                    <Tab icon={<FavoriteIcon />} />
                    <Tab icon={<SearchIcon />} />
                </Tabs>

                {this.state.tabValue==0 && <ChapterList part={this.props.part} onArticleToggle={this.handleArticleToggle} likeArticles={this.state.likeArticles} onLikeIconToggle={this.handleLikeIconToggle} />}
                {this.state.tabValue==1 && <LikeList part={this.props.part} onArticleToggle={this.handleArticleToggle} likeArticles={this.state.likeArticles} onLikeIconToggle={this.handleLikeIconToggle} />}
                {this.state.tabValue==2 && <SearchList part={this.props.part} onArticleToggle={this.handleArticleToggle} likeArticles={this.state.likeArticles} onLikeIconToggle={this.handleLikeIconToggle} />}
            </Paper>
        );
    }

    getLikeArticles() {
        getLikeArticles(this.props.part).then(likeArticles => {
            this.setState({likeArticles: likeArticles});
        }).catch(err => {
            console.error('Error getting like articles', err);
        });
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
        this.setState({isModalOpen: true, articleUrl: url, articleLevel: level})
    }

    handleLikeIconToggle(articleID, isToLike) {
        this.props.onLoadingChange(true, () => {
            likeArticle(articleID, isToLike, this.props.part).then(likeArticles => {
                this.setState({likeArticles: likeArticles}, () => {
                    this.props.onLoadingChange(false);
                });
            }).catch(err => {
                this.props.onLoadingChange(false, () => {
                    alert('過程發生錯誤');
                });
                console.error('Error liking an article', err);
            })
        })
    }

    getRefDiscr(ref) {
        switch (ref) {
            case 'A':
                return ['官方：　「教育部國民及學前教育署 103 學年度資優鑑定」有採認其部分獎項之競賽，或競賽具有高聲望，且進入決賽門檻極高者。', '非官方：「教育部國民及學前教育署 103 學年度資優鑑定」有採認其部分獎項之競賽，或競賽具有高聲望，決賽門檻高且參賽人數眾多者。'];
            case 'B':
                return ['官方：　有兩個階段以上競賽或審查；進入決賽者，獲獎率低於 50%者。', '非官方：競賽具有一定程度聲望，參賽人數多。'];
            case 'C':
                return ['官方：　參賽門檻低、獲獎率達 50%以上者。', '非官方：參賽門檻低，為單次競賽或測驗者，且非選拔國際賽選手。'];
            default:
                return ['', ''];
        }
    }

    getRefColor(ref) {
        switch (ref) {
            case 'A':
                return 'rgb(255, 0, 214)';
            case 'B':
                return 'rgb(101, 174, 242)';
            case 'C':
                return 'rgb(108, 242, 105)';
            default:
                return 'gray';
        }
    }
}