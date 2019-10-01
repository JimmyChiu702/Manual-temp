import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AddIcon from '@material-ui/icons/AddCircle';

import SectionManagement from 'components/SectionManagement.jsx';

import { getSections, getArticles } from 'api/content.js';
import { createSection, modifySection, removeSection } from 'api/admin.js';

import './SectionListManagement.css';

export default class SectionListManagement extends React.Component {
    static propTypes = {
        chapterID: PropTypes.string,
        sectionID: PropTypes.string,
        open: PropTypes.bool,
        onArticleToggle: PropTypes.func,
        onLoadingChange: PropTypes.func,
        part: PropTypes.number
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
        this.handleModifyToggle = this.handleModifyToggle.bind(this);
        this.handleRemoveToggle = this.handleRemoveToggle.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalInputChange = this.handleModalInputChange.bind(this);
        this.handleCreateSection = this.handleCreateSection.bind(this);
        this.handleModifySection = this.handleModifySection.bind(this);
        this.handleRemoveSection = this.handleRemoveSection.bind(this);
        this.isChildEmpty = this.isChildEmpty.bind(this);
    
        this.sectionNum = [
            '一', '二', '三', '四', '五', 
            '六', '七', '八', '九', '十', 
            '十一', '十二', '十三', '十四', '十五', 
            '十六', '十七', '十八', '十九', '二十',
            '二十一', '二十二', '二十三', '二十四', '二十五', 
            '二十六', '二十七', '二十八', '二十九', '三十',
            '三十一', '三十二', '三十三', '三十四', '三十五', 
            '三十六', '三十七', '三十八', '三十九', '四十',
            '四十一', '四十二', '四十三', '四十四', '四十五', 
            '四十六', '四十七', '四十八', '四十九', '五十'
        ];
    }

    componentDidMount() {
        this.getSections();
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
                            <div className='margin-top-20px text-align-right'>
                                <Button variant='contained' onClick={this.handleCreateSection} color='primary'>送出</Button>
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
                                <Button variant='contained' onClick={this.handleModifySection} color='primary'>送出</Button>
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
                                <Button variant='contained' onClick={this.handleRemoveSection} color='primary'>確定</Button>
                            </div>
                        </Paper>
                    </Modal>
                </div>
                <Collapse in={this.props.open} timeout='auto'>
                    <List>
                        {this.state.sections.map((obj, i) => (
                            <SectionManagement index={i}
                                               section={obj}
                                               sectionNum={i<this.sectionNum.length ? this.sectionNum[i] : this.sectionNum[this.sectionNum.length-1]}
                                               chapterID={this.props.chapterID}
                                               onArticleToggle={this.props.onArticleToggle}
                                               onModifyToggle={this.handleModifyToggle}
                                               onRemoveToggle={this.handleRemoveToggle}
                                               onLoadingChange={this.props.onLoadingChange}
                                               part={this.props.part}
                            />
                        ))}
                        <ListItem button onClick={this.handleCreateToggle}>
                            <AddIcon className='margin-left-40px' />
                            <ListItemText primary='新增小節' />
                        </ListItem>
                    </List>
                </Collapse>
            </div>
        );
    }

    getSections() {
        this.props.onLoadingChange(true, () => {
            getSections(this.props.chapterID).then(sections => {
                this.setState({sections: sections}, () => {
                    this.props.onLoadingChange(false);
                });
            }).catch(err => {
                console.error('Error getting sections', err);
                this.props.onLoadingChange(false);
            });
        });
    }

    handleCreateToggle() {
        this.setState({modalOpen: [true, false, false]});
    }

    handleModifyToggle(sectionID) {
        this.sectionToManage = sectionID;
        this.setState({modalOpen: [false, true, false]});
    }

    handleRemoveToggle(sectionID) {
        this.sectionToManage = sectionID;
        this.setState({modalOpen: [false, false, true]});
    }

    handleModalClose() {
        this.sectionToManage = null;
        this.setState({modalOpen: [false, false, false], modalInputText: ''});
    }

    handleModalInputChange(event) {
        this.setState({modalInputText: event.target.value});
    }

    handleCreateSection() {
        if (this.state.modalInputText!='') {
            this.props.onLoadingChange(true, () => {
                createSection(this.state.modalInputText, this.props.chapterID).then(sections => {
                    this.setState({sections: sections}, () => {
                        this.handleModalClose();
                        this.props.onLoadingChange(false);
                    });
                }).catch(err => {
                    console.error('Error creating section', err);
                    this.props.onLoadingChange(false);
                    alert('新增失敗');
                });
            });
        }
    }

    handleModifySection() {
        if (this.sectionToManage!=null && this.state.modalInputText!='') {
            this.props.onLoadingChange(true, () => {
                modifySection(this.sectionToManage, this.state.modalInputText).then(sections => {
                    this.setState({sections: sections}, () => {
                        this.props.onLoadingChange(false);
                        this.handleModalClose();
                    });
                }).catch(err => {
                    console.error('Error modifying section', err);
                    this.props.onLoadingChange(false);
                    alert('編輯失敗');
                });
            });
        }
    }

    handleRemoveSection() {
        if (this.sectionToManage!=null) {
            this.props.onLoadingChange(true, () => {
                this.isChildEmpty(isEmpty => {
                    if (isEmpty) {
                        removeSection(this.sectionToManage).then(sections => {
                            this.setState({sections: sections}, () => {
                                this.props.onLoadingChange(false);
                                this.handleModalClose();
                            });
                        }).catch(err => {
                            console.error('Error removing section', err);
                            this.props.onLoadingChange(false);
                            alert('刪除失敗');
                        });
                    } else {
                        this.props.onLoadingChange(false);
                        alert('請先清除內容');
                    }
                });
            });
        }
    }

    isChildEmpty(callback) {
        getArticles(this.sectionToManage).then(articles => {
            if (articles.length == 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }
}