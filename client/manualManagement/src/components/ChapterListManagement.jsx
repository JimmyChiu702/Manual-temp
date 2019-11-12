import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';

import ChapterManagement from 'components/ChapterManagement.jsx';

import { getChapters, getSections, getArticles } from 'api/content.js';
import { createChapter, modifyChapter, removeChapter } from 'api/admin.js';

import './ChapterListManagement.css';

export default class ChapterListManagement extends React.Component {
    static propTypes = {
        onArticleToggle: PropTypes.func,
        onLoadingChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            chapters: [],
            modalOpen: [false, false, false],
            modalInputText: '',
            createContentType: 0  // 0 -> null, 1 -> section, 2 -> article
        };

        this.chapterToManage = null;

        this.handleCreateToggle = this.handleCreateToggle.bind(this);
        this.handleModifyToggle = this.handleModifyToggle.bind(this);
        this.handleRemoveToggle = this.handleRemoveToggle.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalInputChange = this.handleModalInputChange.bind(this);
        this.handleModalSelectChange = this.handleModalSelectChange.bind(this);
        this.handleCreateChapter = this.handleCreateChapter.bind(this);
        this.handleModifyChapter = this.handleModifyChapter.bind(this);
        this.handleRemoveChapter = this.handleRemoveChapter.bind(this);

        this.chapterNum = [
            '壹', '貳', '參', '肆', '伍', 
            '陸', '柒', '捌', '玖', '拾', 
            '拾壹', '拾貳', '拾參', '拾肆', '拾伍', 
            '拾陸', '拾柒', '拾捌', '拾玖', '貳拾',
            '貳拾壹', '貳拾貳', '貳拾參', '貳拾肆', '貳拾伍', 
            '貳拾陸', '貳拾柒', '貳拾捌', '貳拾玖', '參拾',
            '參拾壹', '參拾貳', '參拾參', '參拾肆', '參拾伍', 
            '參拾陸', '參拾柒', '參拾捌', '參拾玖', '肆拾',
            '肆拾壹', '肆拾貳', '肆拾參', '肆拾肆', '肆拾伍', 
            '肆拾陸', '肆拾柒', '肆拾捌', '肆拾玖', '伍拾'
        ];

        this.headArticle = {
            articleText: '高中生競賽/語言檢定一覽表',
            filename: '高中生競賽／語言檢定一覽表20181101.pdf'
        };

        this.tailArticle = {
            articleText: '高中生競賽手冊附錄',
            filename: '高中生競賽手冊_附錄.pdf'
        };
    }

    componentDidMount() {
        this.getChapters();
    }

    render() {
        return (
            <div>
                <div>
                    <Modal open={this.state.modalOpen[0]}
                           onClose={this.handleModalClose}
                    >
                        <Paper className='modal-paper'>
                            <Typography variant='headline'>新增</Typography>
                            <FormControl fullWidth>
                                <InputLabel>標題文字</InputLabel>
                                <Input value={this.state.modalInputText} onChange={this.handleModalInputChange} />
                            </FormControl>
                            <FormControl fullWidth className='margin-top-20px'>
                                <InputLabel>內容種類</InputLabel>
                                <Select value={this.state.createContentType}
                                        onChange={this.handleModalSelectChange}
                                >
                                    <MenuItem value={1}>小節</MenuItem>
                                    <MenuItem value={2}>內容</MenuItem>
                                </Select>
                            </FormControl>
                            <div className='margin-top-20px text-align-right'>
                                <Button variant='contained' onClick={this.handleCreateChapter} color='primary'>送出</Button>
                            </div>
                        </Paper>
                    </Modal>
                    <Modal open={this.state.modalOpen[1]}
                           onClose={this.handleModalClose}
                    >
                        <Paper className='modal-paper'>
                            <Typography variant='headline'>編輯</Typography>
                            <FormControl fullWidth>
                                <InputLabel>標題文字</InputLabel>
                                <Input value={this.state.modalInputText} onChange={this.handleModalInputChange} />
                            </FormControl>
                            <div className='margin-top-20px text-align-right'>
                                <Button variant='contained' onClick={this.handleModifyChapter} color='primary'>送出</Button>
                            </div>
                        </Paper>
                    </Modal>
                    <Modal open={this.state.modalOpen[2]}
                           onClose={this.handleModalClose}
                    >
                        <Paper className='modal-paper'>
                            <Typography variant='headline'>刪除</Typography>
                            <Typography variant='body1'>確定要刪除嗎？</Typography>
                            <div className='margin-top-20px text-align-right'>
                                <Button variant='contained' onClick={this.handleRemoveChapter} color='primary'>確定</Button>
                            </div>
                        </Paper>
                    </Modal>
                </div>
                <List subheader={<ListSubheader component='div'>目錄</ListSubheader>}>
                    <ListItem button onClick={() => {this.props.onArticleToggle(this.headArticle.filename, 'none')}}>
                        <ListItemText className='padding-left-20px' primary={this.headArticle.articleText} />
                    </ListItem>
                    {this.state.chapters.map((obj, i) => (
                        <ChapterManagement index={i}
                                           chapter={obj}
                                           chapterNum={i<this.chapterNum.length ? this.chapterNum[i] : this.chapterNum[this.chapterNum.length-1]}
                                           onArticleToggle={this.props.onArticleToggle}
                                           onModifyToggle={this.handleModifyToggle}
                                           onRemoveToggle={this.handleRemoveToggle}
                                           onLoadingChange={this.props.onLoadingChange}
                                           part={this.props.part}
                        />
                    ))}
                    <ListItem button onClick={this.handleCreateToggle}>
                        <AddIcon className='margin-left-20px'/>
                        <ListItemText primary='新增章節' />
                    </ListItem>
                    <ListItem button onClick={() => {this.props.onArticleToggle(this.tailArticle.filename, 'none')}}>
                        <ListItemText className='padding-left-20px' primary={this.tailArticle.articleText} />
                    </ListItem>
                </List>
            </div>
        );
    }

    getChapters() {
        this.props.onLoadingChange(true, () => {
            getChapters(this.props.part).then(chapters => {
                this.setState({chapters: chapters}, () => {
                    this.props.onLoadingChange(false);
                });
            }).catch(err => {
                console.error('Error getting chapters', err);
                this.props.onLoadingChange(false);
            });
        })
    }

    handleCreateToggle() {
        this.setState({modalOpen: [true, false, false]});
    }

    handleModifyToggle(chapterID, text='') {
        this.chapterToManage = chapterID;
        this.setState({modalOpen: [false, true, false], modalInputText: text});
    }

    handleRemoveToggle(chapterID) {
        this.chapterToManage = chapterID
        this.setState({modalOpen: [false, false, true]});
    }

    handleModalClose() {
        this.chapterToManage = null;
        this.setState({modalOpen: [false, false, false], modalInputText: '', createContentType: 0});
    }

    handleModalInputChange(event) {
        this.setState({modalInputText: event.target.value})
    }

    handleModalSelectChange(event) {
        this.setState({createContentType: event.target.value});
    }

    handleCreateChapter() {
        if (this.state.modalInputText!='' && this.state.createContentType!=0) {
            this.props.onLoadingChange(true, () => {
                createChapter(this.state.modalInputText, this.state.createContentType==1 ? false : true, this.props.part).then(chapters => {
                    this.setState({chapters: chapters}, () => {
                        this.handleModalClose();
                        this.props.onLoadingChange(false);
                    });
                }).catch(err => {
                    console.error('Error creating chapter', err);
                    this.props.onLoadingChange(false);
                    alert('新增失敗');
                });
            });
        }
    }

    handleModifyChapter() {
        if (this.chapterToManage!=null && this.state.modalInputText!='') {
            this.props.onLoadingChange(true, () => {
                modifyChapter(this.chapterToManage, this.state.modalInputText, this.props.part).then(chapters => {
                    this.setState({chapters: chapters}, () => {
                        this.handleModalClose();
                        this.props.onLoadingChange(false);
                    });
                }).catch(err => {
                    console.error('Error modifying chapter', err);
                    this.props.onLoadingChange(false);
                    alert('編輯失敗');
                });
            });
        }
    }

    handleRemoveChapter() {
        if (this.chapterToManage!=null) {
            this.props.onLoadingChange(true, () => {
                this.isChildEmpty(isEmpty => {
                    if (isEmpty) {
                        removeChapter(this.chapterToManage, this.props.part).then(chapters => {
                            this.setState({chapters: chapters}, () => {
                                this.handleModalClose();
                                this.props.onLoadingChange(false);
                            });
                        }).catch(err => {
                            console.error('Error removing chapter', err);
                            this.props.onLoadingChange(false);
                            alert('刪除失敗');
                        })
                    } else {
                        this.props.onLoadingChange(false);
                        alert('請先清除內容');
                    }
                });
            });
        }
    }

    isChildEmpty(callback) {
        getSections(this.chapterToManage).then(sections => {
            if (sections.length==0) {
                getArticles(this.chapterToManage).then(articles => {
                    if (articles.length==0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(false);
            }
        });
    }
}