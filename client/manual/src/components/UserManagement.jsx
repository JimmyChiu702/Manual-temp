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
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/AddCircle';

import { getAllUsers, createUser, removeUser, modifyUser } from 'api/admin.js';

import './UserManagement.css';

export default class UserManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            modalOpen: [false, false, false],
            inputUserID: '',
            inputDepartmentName: '',
            inputPassword: ''
        }

        this.userToManage = null;

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalInputChange = this.handleModalInputChange.bind(this);
        this.handleCreateToggle = this.handleCreateToggle.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleDeleteToggle = this.handleDeleteToggle.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleRemoveUser = this.handleRemoveUser.bind(this);
        this.handleModifyUser = this.handleModifyUser.bind(this);
    }

    componentDidMount() {
        this.getAllUsers();
    }

    render() {
        return (
            <div>
                <Modal 
                        open={this.state.modalOpen[0]}
                        onClose={this.handleModalClose}
                    >
                    <Paper className='modalPaper'>
                        <Typography variant='headline'>新增</Typography>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>使用者身分</InputLabel>
                            <Input value={this.state.inputUserID} onChange={(event) => {this.handleModalInputChange(event.target.value, 'inputUserID')}} />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>系所名稱</InputLabel>
                            <Input value={this.state.inputDepartmentName} onChange={(event) => {this.handleModalInputChange(event.target.value, 'inputDepartmentName')}} />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>密碼</InputLabel>
                            <Input value={this.state.inputPassword} onChange={(event) => {this.handleModalInputChange(event.target.value, 'inputPassword')}} />
                        </FormControl>
                        <div className='text-align-right margin-top-20px'>
                            <Button variant='contained' color='primary' onClick={this.handleCreateUser}>送出</Button>
                        </div>
                    </Paper>
                </Modal>
                <Modal 
                        open={this.state.modalOpen[1]}
                        onClose={this.handleModalClose}
                    >
                    <Paper className='modalPaper'>
                        <Typography variant='headline'>編輯</Typography>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>使用者身分</InputLabel>
                            <Input value={this.state.inputUserID} onChange={(event) => {this.handleModalInputChange(event.target.value, 'inputUserID')}} />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>系所名稱</InputLabel>
                            <Input value={this.state.inputDepartmentName} onChange={(event) => {this.handleModalInputChange(event.target.value, 'inputDepartmentName')}} />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>密碼</InputLabel>
                            <Input value={this.state.inputPassword} onChange={(event) => {this.handleModalInputChange(event.target.value, 'inputPassword')}} />
                        </FormControl>
                        <div className='text-align-right margin-top-20px'>
                            <Button variant='contained' color='primary' onClick={this.handleModifyUser}>送出</Button>
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
                                <Button variant='contained' color='primary' onClick={this.handleRemoveUser}>確定</Button>
                            </div>
                        </Paper>
                    </Modal>
                <Paper id='userManagementContainerPaper'>
                    <Table style={{tableLayout: 'auto'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>號碼</TableCell>
                                <TableCell>身分</TableCell>
                                <TableCell>系所名稱</TableCell>
                                <TableCell>管理</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map((obj, i) => (
                                <TableRow>
                                    <TableCell>{i+1}</TableCell>
                                    <TableCell>{obj.userID}</TableCell>
                                    <TableCell>{obj.departmentName}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => {this.handleDeleteToggle(obj._id)}}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={() => {this.handleEditToggle(obj._id)}}>
                                            <CreateIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div id='addUserBtn'>
                        <Button variant='contained' onClick={this.handleCreateToggle}>
                            <AddIcon/>
                            新增使用者
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }

    getAllUsers() {
        getAllUsers().then(users => {
            this.setState({users: users});
        }).catch(err => {
            console.error('Error getting users: ', err);
        });
    }

    handleModalInputChange(newText, target) {
        this.setState({[target]: newText});
    }

    handleModalClose() {
        this.userToManage = null;
        this.setState({modalOpen: [false, false, false], inputUserID: '', inputDepartmentName: '', inputPassword: ''});
    }

    handleCreateToggle() {
        this.setState({modalOpen: [true, false, false]});
    }

    handleEditToggle(user_id) {
        this.userToManage = user_id;
        this.setState({modalOpen: [false, true, false]});
    }

    handleDeleteToggle(user_id) {
        this.userToManage = user_id;
        this.setState({modalOpen: [false, false, true]});
    }

    handleCreateUser() {
        if (!!this.state.inputUserID && !!this.state.inputDepartmentName && !!this.state.inputPassword) {
            createUser(this.state.inputUserID, this.state.inputDepartmentName, this.state.inputPassword).then(users => {
                this.setState({users: users}, () => {
                    this.handleModalClose();
                });
            }).catch(err => {
                console.error('Error creating user', err);
                alert('新增失敗');
            });
        }
    }

    handleRemoveUser() {
        if (!!this.userToManage) {
            removeUser(this.userToManage).then(users => {
                console.log(users);
                this.setState({users: users}, () => {
                    this.handleModalClose();
                })
            }).catch(err => {
                console.error('Error removing user', err);
                alert('刪除失敗');
            });
        }
    }

    handleModifyUser() {
        if (!!this.userToManage && (!this.state.inputUserID || !this.state.inputDepartmentName || !this.state.inputPassword)) {
            modifyUser(this.userToManage, this.state.inputUserID, this.state.inputDepartmentName, this.state.inputPassword).then(users => {
                this.setState({users: users}, () => {
                    this.handleModalClose();
                })
            }).catch(err => {
                console.error('Error modifying user', err);
                alert('編輯失敗');
            });
        }
    }
}