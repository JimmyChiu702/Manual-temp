import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';

import { getAllArticles } from 'api/content.js';

import './LikeList.css';

export default class LikeList extends React.Component {
    static propTypes = {
        onArticleToggle: PropTypes.func,
        onLikeIconToggle: PropTypes.func,
        likeArticles: PropTypes.array,
        onLoadingChange: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            likeArticles: [],
            articles: []
        }

        this.getArticles = this.getArticles.bind(this);
        this.updateLikeArticleList = this.updateLikeArticleList.bind(this);
    }

    componentDidMount() {
        this.getArticles();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.likeAricles != nextProps.likeArticles)
            this.updateLikeArticleList(nextProps.likeArticles)
    }

    render() {
        return (
            <div className='padding-30px'>
                {this.state.likeArticles.length > 0 ?
                    <List>
                        {this.state.articles.map((obj, i) => {
                            if (this.state.likeArticles.includes(obj._id))
                                return (
                                    <ListItem button key={i} onClick={() => {this.props.onArticleToggle(obj.filename);}} >
                                        <ListItemText primary={obj.articleText}/>
                                        <ListItemSecondaryAction>
                                            <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon color='error'/>} onClick={() => {this.props.onLikeIconToggle(obj._id, false);}} checked={true} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            else return '';
                        })}
                    </List> :
                    <Typography variant='display1' gutterBottom align='center'>目前尚無任何的收藏項目喔</Typography>
                }
            </div>
        );
    }

    getArticles() {
        this.props.onLoadingChange(true, () => {
            getAllArticles(this.props.part).then(articles => {
                this.setState({articles: articles}, () => {
                    this.updateLikeArticleList(this.props.likeArticles);
                    this.props.onLoadingChange(false);
                });
            }).catch(err => {
                console.error('Error getting articles', err);
                this.props.onLoadingCHange(false);
            });
        });
  
    }

    updateLikeArticleList(likeArticles) {
        this.setState({likeArticles: likeArticles});
    }
}