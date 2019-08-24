import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/AddCircle';
import PersonIcon from '@material-ui/icons/Person';
import CsvIcon from '@material-ui/icons/ViewList';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getUsers, getUserInfo, createUser, modifyUser, removeUser, csvMgt } from 'api/user.js';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.initInputState = {
            userID: '',
            userName: '',
            password: '',
            departmentID: '',
            departmentName: ''
        };

        this.state = {
            uesrInfo: null,
            users: [],
            modalOpen: [false, false, false, false],
            input: this.initInputState,
            uploadFileName: '',
            loading: false
        }

        this.userToManage = null;

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleCreateToggle = this.handleCreateToggle.bind(this);
        this.handleModifyToggle = this.handleModifyToggle.bind(this);
        this.handleRemoveToggle = this.handleRemoveToggle.bind(this);
        this.handleCsvMgtToggle = this.handleCsvMgtToggle.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleModifyUser = this.handleModifyUser.bind(this);
        this.handleRemoveUser = this.handleRemoveUser.bind(this);
        this.handleFileSelect = this.handleCsvMgtToggle.bind(this);
    }

    componentDidMount() {
        this.getUserInfo();
        this.getUsers();
    }

    render() {
        return (
            <div>
                <Modal open={this.state.loading}>
                    <div id='circle-progress-container'>
                        <CircularProgress id='circle-progress' style={{margin: 'auto', outline: 'none'}} color='primary' size={100} auto/>
                    </div>
                </Modal>
                <Modal
                    open={this.state.modalOpen[0]}
                    onClose={this.handleModalClose}
                >
                    <Paper className='modal-paper'>
                        <Typography variant='headline'>新增</Typography>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>使用者 ID</InputLabel>
                            <Input
                                value={this.state.input.userID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userID')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>使用者名稱</InputLabel>
                            <Input
                                value={this.state.input.userName}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userName')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>系所 ID</InputLabel>
                            <Input
                                value={this.state.input.departmentID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'departmentID')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>系所名稱</InputLabel>
                            <Input
                                value={this.state.input.departmentName}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'departmentName')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>密碼</InputLabel>
                            <Input
                                value={this.state.input.password}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'password')}}
                            />
                        </FormControl>
                        <div className='text-align-right margin-top-20px'>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={this.handleCreateUser}
                            >
                                送出
                            </Button>
                        </div>
                    </Paper>
                </Modal>
                <Modal
                    open={this.state.modalOpen[1]}
                    onClose={this.handleModalClose}
                >
                    <Paper className='modal-paper'>
                        <Typography variant='headline'>編輯</Typography>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>使用者 ID</InputLabel>
                            <Input
                                value={this.state.input.userID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userID')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>使用者名稱</InputLabel>
                            <Input
                                value={this.state.input.userName}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userName')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>系所 ID</InputLabel>
                            <Input
                                value={this.state.input.departmentID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'departmentID')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>系所名稱</InputLabel>
                            <Input
                                value={this.state.input.departmentName}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'departmentName')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>密碼</InputLabel>
                            <Input
                                value={this.state.input.password}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'password')}}
                            />
                        </FormControl>
                        <div className='text-align-right margin-top-20px'>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={this.handleModifyUser}
                            >
                                送出
                            </Button>
                        </div>
                    </Paper>
                </Modal>
                <Modal
                    open={this.state.modalOpen[2]}
                    onClose={this.handleModalClose}
                >
                    <Paper className='modal-paper'>
                        <Typography variant='headline'>刪除</Typography>
                        <Typography className='margin-top-20px' variant='body1'>確定要刪除嗎？</Typography>
                        <div className='text-align-right margin-top-20px'>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={this.handleRemoveUser}
                            >
                                確定
                            </Button>
                        </div>
                    </Paper>
                </Modal>
                <Modal
                    open={this.state.modalOpen[3]}
                    onClose={this.handleModalClose}
                >
                    <Paper className='modal-paper'>
                        <Typography variant='headline'>使用 CSV 管理</Typography>
                        <Grid className='margin-top-20px' spacing={8} container>
                            <Grid xs={4} item>
                                <FormControl fullWidth>
                                    <Button component='label' variant='contained'>
                                        <Input 
                                            type='file' 
                                            inputRef={(ref) => {this.uploadFile = ref;}} 
                                            style={{display: 'none'}} 
                                            onChange={this.handleFileSelect}
                                        />
                                        <Typography variant='body1'>上傳檔案</Typography>
                                    </Button>
                                </FormControl>
                            </Grid>
                            <Grid xs={8} item>
                                <Typography className='margin-left-20px padding-top-10px' component='span'>
                                    {this.state.uploadFileName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <div className='text-align-right margin-top-20px'>
                            <Button
                                className='margin-right-10px'
                                variant='outlined'
                                color='primary'
                                onClick={() => {this.handleCsvMgt('reset')}}
                            >
                                重設
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => {this.handleCsvMgt('add')}}
                            >
                                新增
                            </Button>
                        </div>
                    </Paper>
                </Modal>
                <AppBar position='static' color='primary'>
                    <Toolbar>
                        <a href='/entry'>
                            <img src='/userManagement/images/Logo.png' id='logoImg'/>
                        </a>
                        <div style={{flexGrow: 1}}></div>
                        <PersonIcon className='margin-right-10px' />
                        <div className='margin-right-30px'>
                            <Typography variant='subheading' color='secondary'>{!!this.state.userInfo && `${this.state.userInfo.departmentName} - ${this.state.userInfo.userName}`}</Typography>            
                        </div>
                        <Button variant='outlined' color='secondary' href='/logout'>登出</Button>
                    </Toolbar>
                </AppBar>
                <Typography variant='display3' align='center' id='headline'>
                    高中生競賽<br />語言檢定資訊查詢平台
                </Typography>
                <Paper id='user-management-container'>
                    <Table style={{tableLayout: 'auto'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>編號</TableCell>
                                <TableCell>使用者 ID</TableCell>
                                <TableCell>使用者名稱</TableCell>
                                <TableCell>系所名稱</TableCell>
                                <TableCell>管理</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map((user, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i+1}</TableCell>
                                    <TableCell>{user.userID}</TableCell>
                                    <TableCell>{user.userName}</TableCell>
                                    <TableCell>{user.departmentName}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => {this.handleModifyToggle(user._id)}}>
                                            <CreateIcon />
                                        </IconButton>
                                        <IconButton onClick={() => {this.handleRemoveToggle(user._id)}}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>)
                            )}
                        </TableBody>
                    </Table>
                    <div className='btn'>
                        <Button
                            variant='contained'
                            onClick={this.handleCreateToggle}
                        >
                            <AddIcon />
                            {'\u00A0'}新增使用者
                        </Button>
                    </div>
                    <div className='btn'>
                        <Button
                            variant='contained'
                            onClick={this.handleCsvMgtToggle}
                        >
                            <CsvIcon />
                            {'\u00A0'}使用 CSV 管理
                        </Button>
                    </div>
                </Paper>
                <Typography id='footer' variant='body2' align='center'>Copyright &#9400; 2017 國立清華大學教務處招生策略中心。版權所有</Typography>
            </div>
        );
    }

    getUserInfo() {
        getUserInfo().then(userInfo => {
            this.setState({userInfo: userInfo});
        }).catch(err => {
            console.error('Error getting user information', err);
        });
    }

    getUsers() {
        this.setState({loading: true}, () => {
            getUsers().then(users => {
                this.setState({users: users, loading: false});
            }).catch(err => {
                this.setState({loading: false});
                console.error('Error getting user: ', err);
            });
        })
    }

    hamdleModalInputChange(text, target) {
        this.setState(prevState => ({
            input: {
                ...prevState.input,
                [target]: text
            }
        }));
    }

    handleModalClose() {
        this.setState({modalOpen: [false, false, false, false], input: this.initInputState, uploadFileName: ''});
    }

    handleCreateToggle() {
        this.setState({modalOpen: [true, false, false, false]});
    }

    handleModifyToggle(user_id) {
        this.userToManage = user_id;
        this.setState({modalOpen: [false, true, false, false]});
    }

    handleRemoveToggle(user_id) {
        this.userToManage = user_id;
        this.setState({modalOpen: [false, false, true, false]});
    }

    handleCsvMgtToggle() {
        this.setState({modalOpen: [false, false, false, true]});
    }

    handleFileSelect() {
        this.setState({uploadFileName: this.uploadFile.files[0].name}, () => {console.log(this.state)});
    }

    handleCreateUser() {
        let input = this.state.input;
        if (input.userID!='' && input.userName!='' && input.password!='' && input.departmentID!='' && input.departmentName!='') {
            this.setState({loading: true}, () => {
                createUser(input).then(users => {
                    this.setState({users: users, loading: false}, () => {
                        this.handleModalClose();
                    });
                }).catch(err => {
                    console.error('Error creating user: ', err);
                    alert('新增失敗');
                    this.setState({loading: false});
                });
            });
        }
    }

    handleModifyUser() {
        let input = this.state.input;
        input.user_id = this.userToManage;
        if (input.userID!='' || input.userName!='' || input.password!='' || input.departmentID!='' || input.departmentName!='') {
            this.setState({loading: true}, () => {
                modifyUser(input).then(users => {
                    this.setState({users: users, loading: false}, () => {
                        this.handleModalClose();
                    });
                }).catch(err => {
                    console.error('Error modifying user: ', err);
                    alert('編輯失敗');
                    this.setState({loading: false});
                });
            });
        }
    }

    handleRemoveUser() {
        if (this.userToManage != null) {
            this.setState({loading: true}, () => {
                removeUser(this.userToManage).then(users => {
                    this.setState({users: users, loading: false}, () => {
                        this.handleModalClose();
                    })
                }).catch(err => {
                    console.error('Error removing user: ', err);
                    alert('刪除失敗');
                    this.setState({loading: false});
                });
            });
        }
    }

    handleCsvMgt(operation) {
        if (!!this.uploadFile.files[0]) {
            this.setState({loading: true}, () => {
                const data = new FormData();
                data.append('userList', this.uploadFile.files[0]);
                csvMgt(data, operation).then(users => {
                    this.setState({users: users, loading: false}, () => {
                        this.handleModalClose();
                    });
                }).catch(err => {
                    console.error('Error managing user: ', err);
                    alert('操作失敗');
                    this.setState({loading: false});
                });
            });
        }
    }
}