import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/AddCircle';

import SingleArticleManagement from 'components/SingleArticleManagement.jsx';

import { getArticles } from 'api/content.js';
import { createArticle, modifyArticle, removeArticle } from 'api/admin.js';

import './ArticleListManagement.css';

export default class ArticleListManagement extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        parentID: PropTypes.string,
        onArticleToggle: PropTypes.func,
        onLoadingChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            modalOpen: [false, false, false],
            modalInputText: '',
            articleLevel: null,
            uploadFileName: ''
        }
        
        this.articleToManage = null;
        this.uploadFile = null;

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

        this.handleCreateToggle = this.handleCreateToggle.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleDeleteToggle = this.handleDeleteToggle.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalInputChange = this.handleModalInputChange.bind(this);
        this.handleModalSelectChange = this.handleModalSelectChange.bind(this);
        this.handleCreateArticle = this.handleCreateArticle.bind(this);
        this.handleModifyArticle = this.handleModifyArticle.bind(this);
        this.handleRemoveArticle = this.handleRemoveArticle.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    componentDidMount() {
        this.getArticles();
    }

    render() {
        return (
            <div>
                <div>
                    <Modal
                        open={this.state.modalOpen[0]}
                        onClose={this.handleModalClose}
                    >
                        <Paper className='modalPaper'>
                            <Typography variant='headline'>新增</Typography>
                            <div>
                                <FormControl className='padding-top-20px' fullWidth>
                                    <InputLabel>標題文字</InputLabel>
                                    <Input value={this.state.modalInputText} onChange={this.handleModalInputChange} />
                                </FormControl>
                                <div className='margin-top-20px'>
                                    <FormControl fullWidth>
                                        <InputLabel>參考度</InputLabel>
                                        <Select
                                            value={this.state.articleLevel}
                                            onChange={this.handleModalSelectChange}
                                        >
                                            <MenuItem value='A'>A</MenuItem>
                                            <MenuItem value='B'>B</MenuItem>     
                                            <MenuItem value='C'>C</MenuItem>     
                                        </Select>
                                    </FormControl>
                                </div>
                                <Grid className='margin-top-20px' spacing={4} container>
                                    <Grid xs={3} item>
                                        <FormControl fullWidth>
                                            <Button component='label' variant='contained'>
                                                <Input type='file' inputRef={(ref) => {this.uploadFile = ref;}} style={{display: 'none'}} onChange={this.handleFileSelect}/>
                                                <Typography variant='body1'>上傳檔案</Typography>
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={9} item>
                                        <Typography className='margin-left-20px padding-top-10px' component='span'>{this.state.uploadFileName}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className='text-align-right margin-top-20px'>
                                <Button variant='contained' onClick={this.handleCreateArticle} color='primary'>送出</Button>
                            </div>
                        </Paper>
                    </Modal>
                    <Modal
                        open={this.state.modalOpen[1]}
                        onClose={this.handleModalClose}
                    >
                        <Paper className='modalPaper'>
                            <Typography variant='headline'>編輯</Typography>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel>標題文字</InputLabel>
                                    <Input value={this.state.modalInputText} onChange={this.handleModalInputChange} />
                                </FormControl>
                                <Grid className='margin-top-20px' spacing={4} container>
                                    <Grid xs={3} item>
                                        <FormControl fullWidth>
                                            <Button component='label' variant='contained'>
                                                <Input type='file' inputRef={(ref) => {this.uploadFile = ref;}} style={{display: 'none'}} onChange={this.handleFileSelect}/>
                                                <Typography variant='body1'>上傳檔案</Typography>
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={9} item>
                                        <Typography className='margin-left-20px padding-top-10px' component='span'>{this.state.uploadFileName}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className='text-align-right margin-top-20px'>
                                <Button variant='contained' onClick={this.handleMModifyArticle} color='primary'>送出</Button>
                            </div>
                        </Paper>
                    </Modal>
                    <Modal
                        open={this.state.modalOpen[2]}
                        onClose={this.handleModalClose}
                    >
                        <Paper className='modalPaper'>
                            <Typography variant='headline'>刪除</Typography>
                            <Typography variant='body1' className='padding-top-20px'>確定要刪除嗎？</Typography>
                            <div className='text-align-right margin-top-20px'>
                                <Button variant='contained' onClick={this.handleRemoveArticle} color='primary'>確定</Button>
                            </div>
                        </Paper>
                    </Modal>
                </div>
                <Collapse in={this.props.open} timeout='auto'>
                    <List component='div'>
                        {this.state.articles.map((obj, i) => (
                            <SingleArticleManagement    article={obj}
                                                        index={i}
                                                        onDeleteToggle={this.handleDeleteToggle}
                                                        onEditToggle={this.handleEditToggle}
                                                        onArticleToggle={this.props.onArticleToggle} 
                                                        onLoadingChange={this.props.onLoadingChange} />
                        ))}
                        <ListItem button onClick={this.handleCreateToggle}>
                            <AddIcon className='margin-left-60px'/>
                            <ListItemText primary='新增'/>
                        </ListItem>
                    </List>
                </Collapse>
            </div>
        );
    }

    getArticles() {
        getArticles(this.props.sectionID == '' ? this.props.chapterID : this.props.sectionID).then(articles => {
            this.setState({articles: articles});
        }).catch(err => {
            console.error('Error getting articles', err);
        });
    }

    handleCreateToggle() {
        this.setState({modalOpen: [true, false, false]});
    }

    handleEditToggle(articleID) {
        this.articleToManage = articleID; 
        this.setState({modalOpen: [false, true, false]});
    }

    handleDeleteToggle(articleID) {
        this.articleToManage = articleID;
        this.setState({modalOpen: [false, false, true]});
    }

    handleModalClose() {
        this.articleToManage = null;
        this.setState({modalOpen: [false, false, false], modalInputText: '', articleLevel: null, uploadFileName: ''});
    }

    handleModalInputChange(event) {
        this.setState({modalInputText: event.target.value});
    }

    handleModalSelectChange(event) {
        this.setState({articleLevel: event.target.value})
    }

    handleFileSelect() {
        this.setState({uploadFileName: this.uploadFile.files[0].name});
    }

    handleCreateArticle() {
        if (!!this.uploadFile.files[0] && !!this.state.modalInputText && !!this.props.chapterID && !!this.props.sectionID && !!this.props.articleLevel) {
            const data = new FormData();
            data.append('file', this.uploadFile.files[0]);
            data.append('articleText', this.state.modalInputText);
            data.append('chapterID', this.props.chapterID)
            data.append('sectionID', this.props.sectionID);
            data.append('level', this.state.articleLevel);
            data.append('part', this.props.part)
            this.props.onLoadingChange(true, () => {
                createArticle(data).then(articles => {
                    this.setState({articles: articles}, () => {
                        this.handleModalClose();
                        this.props.onLoadingChange(false);
                    });
                }).catch(err => {
                    this.props.onLoadingChange(false, () => {
                        alert('新增失敗');
                    });
                    console.error('Error creating articles', err);
                });
            })
        }
    }

    handleModifyArticle() {
        const data = new FormData();
        data.append('articleID', this.state.articleToManage);
        if (!!this.uploadFile.files[0])
            data.append('file', this.uploadFile.files[0]);
        if (!!this.modalInputText)
            data.append('articleText', this.state.modalInputText);
        this.props.onLoadingChange(true, () => {
            modifyArticle(data).then(articles => {
                this.setState({articles: articles}, () => {
                    this.handleModalClose();
                    this.props.onLoadingChange(false);
                });
            }).catch(err => {
                this.props.onLoadingChange(false, () => {
                    alert('編輯失敗');
                });
                console.error('Error modifying article', err);
            });
        });

    }

    handleRemoveArticle() {
        if (!!this.articleToManage) {
            this.props.onLoadingChange(true, () => {
                removeArticle(this.articleToManage).then(articles => {
                    this.setState({articles: articles}, () => {
                        this.props.onLoadingChange(false);
                        this.handleModalClose();
                    });
                }).catch(err => {
                    this.props.onLoadingChange(false, () => {
                        alert('刪除失敗');
                    });
                    console.error('Error deleting article;', err);
                });
            });
        }
    }
} 