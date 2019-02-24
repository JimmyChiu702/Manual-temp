import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AddIcon from '@material-ui/icons/AddCircle';

import { getSections, getArticles } from 'api/content.js';
import { createSection, modifySection, removeSection } from 'api/admin.js';

import SingleSectionManagement from 'components/SingleSectionManagement.jsx';

import './SectionListManagement.css';
import { ListItemText } from '../../node_modules/@material-ui/core';

export default class SectionListManagement extends React.Component {
    static propTypes = {
        onArticleToggle: PropTypes.func,
        onLoadingChange: PropTypes.func,
        open: PropTypes.bool,
        chapterID: PropTypes.string
    };
    
    constructor(props) {
        super(props);

        this.state = {
            sections: [],
            modalOpen: [false, false, false],
            modalInputText: ''
        };

        this.sectionToManage = null;

        this.handleCreateToggle = this.handleCreateToggle.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleDeleteToggle = this.handleDeleteToggle.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalInputChange = this.handleModalInputChange.bind(this);
        this.handleCreateSection = this.handleCreateSection.bind(this);
        this.handleModifySection = this.handlceModifySection.bind(this);
        this.handleRemoveSection = this.handleRemoveSection.bind(this);
        this.isChildEmpty = this.isChildEmpty.bind(this);
    }

    componentDidMount() {
        this.getSections();
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
                            <FormControl className='padding-top-20px' fullWidth>
                                <InputLabel>標題文字</InputLabel>
                                <Input value={this.state.modalInputText} onChange={this.handleModalInputChange} />
                            </FormControl>
                            <div className='text-align-right margin-top-20px'>
                                <Button variant='contained' onClick={this.handleCreateSection} color='primary'>送出</Button>
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
                                <Input value={this.state.modalInputText} onChange={this.handleModalInputChange} />
                            </FormControl>
                            <div className='text-align-right margin-top-20px'>
                                <Button variant='contained' onClick={this.handleModifySection} color='primary'>送出</Button>
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
                                <Button variant='contained' onClick={this.handleRemoveSection} color='primary'>確定</Button>
                            </div>
                        </Paper>
                    </Modal>
                </div>
                <Collapse in={this.props.open} timeout='auto'>
                    <List>
                        {this.state.sections.map((obj, i) => (
                            <SingleSectionManagement    section={obj}
                                                        chapterID={this.props.chapterID}
                                                        index={i}
                                                        onDeleteToggle={this.handleDeleteToggle}
                                                        onEditToggle={this.handleEditToggle}
                                                        onArticleToggle={this.props.onArticleToggle}
                                                        onLoadingChange={this.props.onLoadingChange} />
                        ))}
                        <ListItem button onClick={this.handleCreateToggle}>
                            <AddIcon className='margin-left-40px'/>
                            <ListItemText primary='新增'/>
                        </ListItem>
                    </List>
                </Collapse>
            </div>
        );
    }

    getSections() {
        getSections(this.props.chapterID).then(sections => {
            this.setState({sections: sections});
        }).catch(err => {
            console.error('Error getting sections', err);
        });
    }

    // modal related operation
    handleCreateToggle() {
        this.setState({modalOpen: [true, false, false]});
    }

    handleEditToggle(sectionID) {
        this.sectionToManage = sectionID;
        this.setState({modalOpen: [false, true, false]});
    }

    handleDeleteToggle(sectionID) {
        this.sectionToManage = sectionID;
        this.setState({modalOpen: [false, false, true]});
    }

    handleModalClose() {
        this.sectionToManage = null;
        this.setState({modalOpen: [false, false, false], modalInputText: ''})
    }

    handleModalInputChange(event) {
        this.setState({modalInputText: event.target.value});
    }

    // content management
    handleCreateSection() {
        if (!!this.state.modalInputText && !!this.props.chapterID) {
            this.props.onLoadingChange(true, () => {
                createSection(this.state.modalInputText, this.props.chapterID).then(sections => {
                    this.setState({sections: sections}, () => {
                        this.props.onLoadingChange(false);
                        this.handleModalClose();
                    });
                }).catch(err => {
                    this.props.onLoadingChange(false, () => {
                        alert('新增失敗')
                    });
                    console.error('Error creating section', err);
                });
            });
        }
    }   
    
    handlceModifySection() {
        if (!!this.sectionToManage && !!this.state.modalInputText) {
            this.props.onLoadingChange(true, () => {
                modifySection(this.sectionToManage, this.state.modalInputText).then(sections => {
                    this.setState({sections: sections}, () => {
                        this.props.onLoadingChange(false);
                        this.handleModalClose();
                    });
                }).catch(err => {
                    this.props.onLoadingChange(false, () => {
                        alert('編輯失敗');
                    });
                    console.error('Error modifying section', err);
                });
            })
        }
    }

    handleRemoveSection() {
        if (!!this.sectionToManage) {
            this.props.onLoadingChange(true, () => {
                this.isChildEmpty(isEmpty => {
                    if (isEmpty) {
                        removeSection(this.sectionToManage).then(sections => {
                            this.setState({sections: sections}, () => {
                                this.props.onLoadingChange(false);
                                this.handleModalClose();
                            });
                        }).catch(err => {
                            this.props.onLoadingChange(false, () => {
                                alert('刪除失敗');
                            });
                            console.error('Error deleting section', err);
                        });
                    } else {
                        this.props.onLoadingChange(false, () => {
                            alert('請先清除內容');
                        });
                    }
                });
            })
        }
    }

    isChildEmpty(callback) {
        getArticles(this.sectionToManage).then(articles => {
            if (articles.length==0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }
}