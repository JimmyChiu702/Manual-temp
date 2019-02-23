import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import SearchIcon from '@material-ui/icons/search';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { getArticles } from 'api/content.js';

import './SearchList.css';

export default class SearchList extends React.Component {
    static propTypes = {
        onArticleToggle: PropTypes.func,
        onLikeIconToggle: PropTypes.func,
        likeArticles: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            inputText: null,
            isLikeIconChecked: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateLikeIconDisplay = this.updateLikeIconDisplay.bind(this);
    }

    componentDidMount() {
        this.getArticles();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.likeArticles != nextProps.likeArticles)
            this.updateLikeIconDisplay(nextProps.likeArticles);
    }

    render() {
        return (
            <div className='padding-30px'>
                <div id='searchBoxOuterContainer'>
                    <div id='searchBoxInnerContainer'>
                        <Input 
                            fullWidth={true}
                            onChange={this.handleInputChange}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <SearchIcon />
                                </InputAdornment>
                        }/>
                    </div>
                </div>
                {!!this.state.inputText && !!this.state.articles.length > 0 &&
                    <List>
                        {this.state.articles.map((obj, i) => {
                            if (obj.articleText.toLowerCase().includes(this.state.inputText.toLowerCase()))
                                return (
                                    <ListItem button key={i} onClick={() => {this.props.onArticleToggle(obj.filename);}} >
                                        <ListItemText primary={obj.articleText}/>
                                        <ListItemSecondaryAction>
                                            <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon color='error'/>} onClick={event => {this.props.onLikeIconToggle(obj._id, event.target.checked)}} checked={this.state.isLikeIconChecked[i]}/>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            else return '';
                        })}
                    </List>
                }
            </div>
        );
    }

    getArticles() {
        getArticles().then(articles => {
            this.setState({articles: articles}, () => {
                this.updateLikeIconDisplay(this.props.likeArticles);
            });
        }).catch(err => {
            console.error('Error getting articles', err);
        });
    }

    handleInputChange(event) {
        this.setState({inputText: event.target.value});
    }

    updateLikeIconDisplay(likeArticles) {
        let temp = this.state.articles.map(obj => (
            likeArticles.includes(obj._id) ? true : false 
        ));
        this.setState({isLikeIconChecked: temp});
    }
}