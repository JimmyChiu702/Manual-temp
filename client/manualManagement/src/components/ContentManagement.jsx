import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CsvIcon from '@material-ui/icons/ViewList';

import ChapterListManagement from 'components/ChapterListManagement.jsx';

import { csvUpload } from 'api/admin.js';

import './ContentManagement.css';

export default class ContentManagement extends React.Component {
    static propTypes = {
        onLoadingChange: PropTypes.func,
        part: PropTypes.number
    }

    constructor(props) {
        super(props);

        this.state = {
            isMoadlOpen: false,
            isCsvModalOpen: false,
            uploadFilename: '',
            articleInfo: null
        };

        this.uploadFile = null;

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleArticleToggle = this.handleArticleToggle.bind(this);
        this.handleCsvMgtToggle = this.handleCsvMgtToggle.bind(this);
        this.handleCsvModalClose = this.handleCsvModalClose.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    render() {
        const refDescr = this.state.articleInfo!=null ? this.getRefDescr(this.state.articleInfo.level) : null;
        const refColor = this.state.articleInfo!=null ? this.getRefColor(this.state.articleInfo.level) : null;

        return (
            <div>
                <Paper id='content-mgt-container'>
                    {this.state.articleInfo!=null &&
                        <Modal open={this.state.isModalOpen}
                            onClose={this.handleModalClose}>
                            <Paper id='article-content-paper'>
                                {this.state.articleInfo.level!='none' &&
                                    <Grid id='ref-container' container>
                                        <Grid xs={2} item>
                                            <Typography style={{marginTop: '0.5rem'}}>
                                                <font>參考度</font>
                                                <font style={{fontSize: '2.5rem', color: refColor}}>{' '}{this.state.articleInfo.level}</font>
                                            </Typography>
                                        </Grid>
                                        <Grid xs={10} item>
                                            <Typography style={{fontSize: '0.8rem'}}>
                                                {refDescr[0]}<br/>{refDescr[1]}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }
                                <iframe src={this.state.articleInfo.url} style={{width: '100%', height: '80vh'}} />
                            </Paper>
                        </Modal>
                    }
                    <ChapterListManagement part={this.props.part} onArticleToggle={this.handleArticleToggle} onLoadingChange={this.props.onLoadingChange} />
                </Paper>
                <Modal open={this.state.isCsvModalOpen}
                       onClose={this.handleCsvModalClose}
                >
                    <Paper className='modal-paper'>
                        <Typography variant='headline'>使用 CSV 管理</Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={3} className='margin-top-20px'>
                                <FormControl fullWidth>
                                    <Button component='label' variant='contained'>
                                        <Input type='file'
                                            inputRef={ref => this.uploadFile = ref}
                                            style={{display: 'none'}}
                                            onChange={this.handleFileSelect}
                                        />
                                        <Typography variant='body1'>上傳檔案</Typography>
                                    </Button>
                                </FormControl>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography className='margin-left-20px padding-top-30px' component='span'>
                                    {this.state.uploadFilename}
                                </Typography>
                            </Grid>
                        </Grid>
                        <div className='text-align-right margin-top-20px'>
                            <Button className='margin-right-10px'
                                    variant='outlined'
                                    color='primary'
                                    onClick={() => {this.handleCsvMgt('reset')}}
                            >
                                重設    
                            </Button>
                            <Button variant='contained'
                                    color='primary'
                                    onClick={() => {this.handleCsvMgt('append')}}
                            >
                                新增
                            </Button>   
                        </div> 
                    </Paper>
                </Modal>
                <div id='csv-mgt-icon'>
                    <Button variant='contained' onClick={this.handleCsvMgtToggle}>
                        <CsvIcon />{'\u00A0'}使用 CSV 管理
                    </Button>
                </div>
            </div>
        );
    }

    handleModalClose() {
        this.setState({isModalOpen: false});
    }

    handleArticleToggle(filename, level=null) {
        this.setState({isModalOpen: true, articleInfo: {url: `/document/${filename}`, level: level}});
    }

    handleCsvMgtToggle() {
        this.setState({isCsvModalOpen: true});
    }

    handleCsvModalClose() {
        this.uploadFile = null;
        this.setState({isCsvModalOpen: false});
    }

    handleFileSelect() {
        this.setState({uploadFilename: this.uploadFile.files[0].name});
    }

    handleCsvMgt(action) {
        if (this.uploadFile != null) {
            this.props.onLoadingChange(true, () => {
                const data = new FormData();
                data.append('file', this.uploadFile.files[0]);
                csvUpload(data, action).then(() => {
                    this.forceUpdate(() => {
                        this.props.onLoadingChange(false);
                        this.handleCsvModalClose();
                    });
                }).catch(err => {
                    console.error('Error managing content using csv file', err);
                    this.props.onLoadingChange(false);
                    alert('更新失敗');
                });
            });
        }
    }

    getRefDescr(level) {
        switch(level) {
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

    getRefColor(level) {
        switch(level) {
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