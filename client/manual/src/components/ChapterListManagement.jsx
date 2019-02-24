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

import SingleChapterManagement from 'components/SingleChapterManagement.jsx';

import { getChapters, getSections, getArticles } from 'api/content.js';
import { createChapter, modifyChapter, removeChapter } from 'api/admin.js';

import './ChapterListManagement.css';

export default class ChapterListManagement extends React.Component {
    static propTypes = {
        onArticleToggle: PropTypes.func,
        onLoadingChange: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            chapters: [],
            head: null,
            tail: null,
            modalOpen: [false, false, false],
            modalInputText: '',
            createModalContentType: 0   // 0 -> null, 1 -> section, 2 -> article,
        };
         
        this.chapterToManage = null;

        this.handleCreateToggle = this.handleCreateToggle.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleDeleteToggle = this.handleDeleteToggle.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalInputChange = this.handleModalInputChange.bind(this);
        this.handleModalSelectChange = this.handleModalSelectChange.bind(this);
        this.handleCreateChapter = this.handleCreateChapter.bind(this);
        this.handleModifyChapter = this.handleModifyChapter.bind(this);
        this.handleRemoveChapter = this.handleRemoveChapter.bind(this);
        this.updateChapters = this.updateChapters.bind(this);
        this.isChildEmpty = this.isChildEmpty.bind(this);
    }

    componentDidMount() {
        this.getChapters();
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
                                <div>
                                    <FormControl fullWidth>
                                        <InputLabel>標題文字</InputLabel>
                                        <Input value={this.state.modalInputText} onChange={this.handleModalInputChange} />
                                    </FormControl>
                                </div>
                                <div className='margin-top-20px'>
                                    <FormControl fullWidth>
                                        <InputLabel>內容種類</InputLabel>
                                        <Select
                                            value={this.state.createModalContentType}
                                            onChange={this.handleModalSelectChange}
                                        >
                                            <MenuItem value={1}>小節</MenuItem>
                                            <MenuItem value={2}>內容</MenuItem>     
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='margin-top-20px text-align-right'>
                                <Button variant='contained' onClick={this.handleCreateChapter} color='primary'>送出</Button>
                            </div>
                        </Paper>
                    </Modal>
                    <Modal
                        open={this.state.modalOpen[1]}
                        onClose={this.handleModalClose}
                    >
                        <Paper className='modalPaper'>
                            <Typography variant='headline'>編輯</Typography>
                            <FormControl className='padding-top-20px' fullWidth>
                                <InputLabel>標題文字</InputLabel>
                                <Input value={this.state.modalInputText} onChange={this.handleModalInputChange}/>
                            </FormControl>
                            <div className='margin-top-20px text-align-right'>
                                <Button variant='contained' onClick={this.handleModifyChapter} color='primary'>送出</Button>
                            </div>
                        </Paper>
                    </Modal>
                    <Modal
                        open={this.state.modalOpen[2]}
                        onClose={this.handleModalClose}
                    >
                        <Paper className='modalPaper'>
                            <Typography variant='headline'>刪除</Typography>
                            <Typography className='padding-top-20px' variant='body1'>確定要刪除嗎？</Typography>
                            <div className='margin-top-20px text-align-right'>
                                <Button variant='contained' onClick={this.handleRemoveChapter} color='primary'>確定</Button>
                            </div>
                        </Paper>
                    </Modal>
                </div>
                <List subheader={<ListSubheader component='div'>目錄</ListSubheader>}>
                    {!!this.state.head && 
                        <SingleChapterManagement    chapter={this.state.head} 
                                                    index={-1}
                                                    onDeleteToggle={this.handleDeleteToggle}
                                                    onEditToggle={this.handleEditToggle}
                                                    onArticleToggle={this.props.onArticleToggle} 
                                                    onLoadingChange={this.props.onLoadingChange} 
                                                    part={this.props.part} />
                    }
                    {this.state.chapters.map((obj, i) => (
                        <SingleChapterManagement    chapter={obj}
                                                    index={i}
                                                    onDeleteToggle={this.handleDeleteToggle}
                                                    onEditToggle={this.handleEditToggle}
                                                    onArticleToggle={this.props.onArticleToggle} 
                                                    onLoadingChange={this.props.onLoadingChange}
                                                    part={this.props.part} />
                    ))}
                    <ListItem button onClick={this.handleCreateToggle}>
                        <AddIcon className='margin-left-20px'/>
                        <ListItemText primary='新增'/>
                    </ListItem>
                    {!!this.state.tail && 
                        <SingleChapterManagement    chapter={this.state.tail}
                                                    index={-1}
                                                    onDeleteToggle={this.handleDeleteToggle}
                                                    onEditToggle={this.handleEditToggle}
                                                    onArticleToggle={this.props.onArticleToggle} 
                                                    onLoadingChange={this.props.onLoadingChange}
                                                    part={this.props.part} />
                    }
                </List>
            </div>
        );
    }

    getChapters() {
        getChapters(this.props.part).then(chapters => {
            this.updateChapters(chapters);
        }).catch(err => {
            console.error('Error getting chapters', err);
        }) 
    }

    updateChapters(chapters, callback=null) {
        let head = chapters.splice(chapters.findIndex(ch => ch.kind === 0), 1)[0];
        let tail = chapters.splice(chapters.findIndex(ch => ch.kind === 2), 1)[0];
        this.setState({head: head, tail: tail, chapters: chapters}, () => {
            if (callback)
                callback();
        });
    }

    // modal related operation
    handleCreateToggle() {
        this.setState({modalOpen: [true, false, false]});
    }

    handleEditToggle(chapterID) {
        this.chapterToManage = chapterID;
        this.setState({modalOpen: [false, true, false]});
    }

    handleDeleteToggle(chapterID) {
        this.chapterToManage = chapterID;
        this.setState({modalOpen: [false, false, true]});
    }

    handleModalClose() {
        this.chapterToManage = null;
        this.setState({modalOpen: [false, false, false], modalInputText: '', createModalContentType: null});
    }

    handleModalInputChange(event) {
        this.setState({modalInputText: event.target.value});
    }

    handleModalSelectChange(event) {
        this.setState({createModalContentType: event.target.value});
    }

    // content management
    handleCreateChapter() {
        if (!!this.state.modalInputText && !!this.state.createModalContentType) {
            createChapter(this.state.modalInputText, this.state.createModalContentType == 1 ? false : true, this.props.part).then(chapters => {
                this.updateChapters(chapters);
                this.handleModalClose();
            }).catch(err => {
                console.error('Error creating chapter', err);
                alert('新增失敗');
            });
        }
    }

    handleModifyChapter() {
        if (!!this.chapterToManage && !!this.state.modalInputText) {
            this.props.onLoadingChange(true, () => {
                modifyChapter(this.chapterToManage, this.state.modalInputText, this.props.part).then(chapters => {
                    this.updateChapters(chapters, () => {
                        this.props.onLoadingChange(false);
                        this.handleModalClose();
                    });
                }).catch(err => {
                    this.props.onLoadingChange(false, () => {
                        alert('編輯失敗');
                    })
                    console.error('Error modifying chapter', err);
                });
            })
        }
    }

    handleRemoveChapter() {
        if (!!this.chapterToManage) {
            this.props.onLoadingChange(true, () => {
                this.isChildEmpty(isEmpty => {
                    if (isEmpty) {
                        removeChapter(this.chapterToManage, this.props.part).then(chapters=> {
                            this.updateChapters(chapters, () => {
                                this.props.onLoadingChange(false);
                                this.handleModalClose();
                            });
                        }).catch(err => {
                            this.props.onLoadingChange(false, () => {
                                alert('刪除失敗');
                            });
                            console.error('Error removing chapter', err);
                        });
                    } else {
                        this.props.onLoadingChange(false, () => {
                            alert('請先清除內容');
                        });
                    }
                });
            });
        }
    }

    isChildEmpty(callback) {
        getSections(this.chapterToManage).then(chapters => {
            if (chapters.length==0) {
                getArticles(this.chapterToManage).then(articles => {
                    if (articles.length==0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
            } else {
                callback(false);
            }
        })
    }
}