import React from 'react';
import PropTypes from 'prop-types';

import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { getArticles } from 'api/content.js';

import './ArticleList.css';

export default class ArticleList extends React.Component {
    static propTypes = {
        parentID: PropTypes.string,
        open: PropTypes.bool,
        onArticleToggle: PropTypes.func,
        likeArticles: PropTypes.array,
        onLikeIconToggle: PropTypes.func,
        chapterText: PropTypes.string,
        sectionText: PropTypes.string,
        onLoadingChange: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            isLikeIconChecked: []
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

        this.getArticles = this.getArticles.bind(this);
        this.updateLikeIconDisplay = this.updateLikeIconDisplay.bind(this);
    }

    componentDidMount() {
        this.getArticles();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.likeArticles != nextProps.likeArticles) {
            this.updateLikeIconDisplay(nextProps.likeArticles);
        }
    }

    render() {
        return (
            <Collapse in={this.props.open} timeout='auto'>
                <List component='div'>
                    {this.state.articles.map((obj, i) => (
                        <ListItem style={{paddingLeft: '3rem'}} key={i} button onClick={() => {this.props.onArticleToggle(obj.filename, obj.level, 
                                                                                                {chapterText: this.props.chapterText, 
                                                                                                 sectionText: this.props.sectionText, 
                                                                                                 articleText: obj.articleText});}}>
                            <Typography style={{color: this.getRefColor(obj.level), width: '1rem', fontWeight: 'bold'}}>{obj.level!='none'&&obj.level}</Typography>
                            <ListItemText primary={`(${i<this.articleNum.length && this.articleNum[i]})、${obj.articleText}`} />
                            <ListItemSecondaryAction>
                                <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon color='error'/>} onClick={event => {this.props.onLikeIconToggle(obj._id, event.target.checked)}} checked={this.state.isLikeIconChecked[i] || false}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        );
    }

    getArticles() {
        this.props.onLoadingChange(true, () => {
            getArticles(this.props.parentID).then(articles => {
                this.setState({articles: articles}, () => {
                    this.updateLikeIconDisplay(this.props.likeArticles);
                    this.props.onLoadingChange(false);
                });
            }).catch(err => {
                console.error('Error getting articles', err);
                this.props.onLoadingChange(false);
            });
        });
    }

    updateLikeIconDisplay(likeArticles) {
        let temp = this.state.articles.map(obj => (
            likeArticles.includes(obj._id) ? true : false 
        ));
        this.setState({isLikeIconChecked: temp});
    }

    getRefColor(ref) {
        switch (ref) {
            case 'A':
                return 'rgb(255, 0, 214)';
            case 'B':
                return 'rgb(101, 174, 242)';
            case 'C':
                return 'rgb(255, 122, 51)';
            default:
                return 'gray';
        }
    }
}