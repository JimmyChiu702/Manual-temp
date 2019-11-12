import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import SubIcon from '@material-ui/icons/Remove';

import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

import './DocumentDisplay.css';

export default class DocumentDisplay extends React.Component {
    static propTypes = {
        url: PropTypes.string,
        level: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            numPages: 0,
            scale: 1.4,
            isModalOpen: false
        };
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        
        this.onLoadingSuccess = this.onLoadingSuccess.bind(this);
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    render() {
        const pages = [];
        if (this.state.numPages>0) {
            for (let i=1; i<this.state.numPages; i++) {
                pages.push(<Page id={i} pageNumber={i} scale={this.state.scale}  onContextMenu={() => console.log('page')}/>)
            };
        }

        const levelDiscr = this.getLevelDiscr(this.props.level);
        const levelColor = this.getLevelColor(this.props.level);

        return (
            <div id='pdf-container' onContextMenu={() => console.log('container')}>
                <Document file={this.props.url} onLoadSuccess={this.onLoadingSuccess} onContextMenu={event => event.preventDefault()}>
                    {pages}
                </Document>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.handleModalClose}
                >
                    <Paper id='level-info'>
                        <Typography style={{marginTop: '0.5rem'}}>
                            <font>參考度</font>
                            <font style={{fontSize: '2.5rem', color: levelColor}}>{' '}{this.props.level}</font>
                        </Typography>
                        <Typography style={{fontSize: '1rem', marginTop: '1rem'}}>
                            {levelDiscr[0]}<br/>{levelDiscr[1]}
                        </Typography>
                    </Paper>
                </Modal>
                {this.props.level != 'none' && 
                    <Button id='level-btn' variant='fab' aria-label='level' onClick={this.handleModalOpen} style={{color: 'white', backgroundColor: levelColor}}>
                        <span>{this.props.level}</span>
                    </Button>
                }
                <Button id='document-fab-add' variant="fab" aria-label="add" onClick={this.handleZoomIn}>
                    <AddIcon />
                </Button>
                <Button id='document-fab-sub' variant="fab" aria-label="sub" onClick={this.handleZoomOut}>
                    <SubIcon />
                </Button>
            </div>
        );
    }

    onLoadingSuccess(page) {
        this.setState({numPages: page._pdfInfo.numPages});
    }

    handleZoomIn() {
        this.setState(prevState => ({
            scale: prevState.scale<2 ? prevState.scale+0.2 : prevState.scale
        }));
    }

    handleZoomOut() {
        this.setState(prevState => ({
            scale: prevState.scale>0.8 ? prevState.scale-0.2 : prevState.scale
        }));
    }

    handleModalOpen() {
        this.setState({isModalOpen: true});
    }

    handleModalClose() {
        this.setState({isModalOpen: false});
    }

    getLevelDiscr(level) {
        switch (level) {
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

    getLevelColor(level) {
        switch (level) {
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