import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ChapterListManagement from 'components/ChapterListManagement.jsx';

import './ContentManagement.css';

export default class ContentManagement extends React.Component {
    static propTypes = {
        onLoadingChange: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            articleUrl: null,
            articleLevel: ''
        }

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleArticleToggle = this.handleArticleToggle.bind(this);
    }

    render() {
        const refDiscr = this.getRefDiscr(this.state.articleLevel);
        const refColor = this.getRefColor(this.state.articleLevel);
        return (
            <Paper id='contentManagementContainer'>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.handleModalClose}
                >
                    <Paper id='articleContentDisplay'>
                        {this.state.articleLevel != 'none' && 
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
                        <iframe src={this.state.articleUrl} style={{width: '100%', height: '80vh'}} />
                    </Paper>
                </Modal>
                
                <ChapterListManagement part={this.props.part} onArticleToggle={this.handleArticleToggle} onLoadingChange={this.props.onLoadingChange} />
            </Paper>
        );
    }

    handleModalClose() {
        this.setState({isModalOpen: false});
    }

    handleArticleToggle(filename, level=null) {
        this.setState({isModalOpen: true, articleUrl: `/document/${filename}`, articleLevel: level});
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