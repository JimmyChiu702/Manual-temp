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
            users: [],
            modalOpen: [false, false, false],
            input: this.initInputState
        }

        this.userToManage = null;

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleCreateToggle = this.handleCreateToggle.bind(this);
        this.handleModifyToggle = this.handleModifyToggle.bind(this);
        this.handleRemoveToggle = this.handleModifyToggle.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleModifyUser = this.handleModifyUser.bind(this);
        this.handleRemoveUser = this.handleRemoveUser.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div>使用者
                <Modal
                    open={this.state.modalOpen[0]}
                    onClose={this.handleModalClose}
                >
                    <Paper classNmae='modal-paper'>
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
                                value={this.state.input.userID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userID')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>使用者</InputLabel>
                            <Input
                                value={this.state.input.userID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userID')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>系所名稱</InputLabel>
                            <Input
                                value={this.state.input.userID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userID')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>密碼</InputLabel>
                            <Input
                                value={this.state.input.userID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userID')}}
                            />
                        </FormControl>
                        <div className='text-align-right margin-top-20px'>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={this.handleCreateUser}
                            >
                                送出FormContr使用者
                            </Button>
                        </div>
                    </Paper>
                </Modal>
                <Modal
                    open={this.state.modalOpen[1]}
                    onClose={this.handleModalClose}
                >
                    <Paper classNmae='modal-paper'>
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
                                value={this.state.input.userID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userID')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>系所 ID</InputLabel>
                            <Input
                                value={this.state.input.userID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userID')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>系所名稱</InputLabel>
                            <Input
                                value={this.state.input.userID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userID')}}
                            />
                        </FormControl>
                        <FormControl className='margin-top-10px' fullWidth>
                            <InputLabel>密碼</InputLabel>
                            <Input
                                value={this.state.input.userID}
                                onChange={event => {this.hamdleModalInputChange(event.target.value, 'userID')}}
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
                                送出
                            </Button>
                        </div>
                    </Paper>
                </Modal>
                <Paper id='user-management-container'>
                    <Table style={{tableLayout: 'auto'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>使用者 ID</TableCell>
                                <TableCell>使用者身分</TableCell>
                                <TableCell>系所名稱</TableCell>
                                <TableCell>管理</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map((user, i) => {
                                <TableRow>
                                    <TableCell>{i+1}</TableCell>
                                    <TableCell>{user.userID}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => {this.handleModifyToggle(user._id)}}>
                                            <CreateIcon />
                                        </IconButton>
                                        <IconButton onClick={() => {this.handleRemoveToggle(user._id)}}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                    <div id='add-btn'>
                        <Button
                            variant='contained'
                            onClick={this.handleCreateToggle}
                        >
                            <AddIcon />
                            新增使用者
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }

    getUsers() {
        getUsers().then(users => {
            this.setState({users: users});
        }).catch(err => {
            console.error('Error getting user: ', err);
        });
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
        this.setState({modalOpen: [false, false, false], input: this.initInputState});
    }

    handleCreateToggle() {
        this.setState({modalOpen: [true, false, false]});
    }

    handleModifyToggle(user_id) {
        this.userToManage = user_id;
        this.setState({modalopen: [false, true, false]});
    }

    handleRemoveToggle(user_id) {
        this.userToManage = user_id;
        this.setState({modalOpen: [false, false, true]});
    }

    handleCreateUser() {
        let input = this.state.input;
        if (input.userID!='' && input.userName!='' && input.password!='' && input.departmentID!='' && input.departmentName!='') {
            createUser(input).then(users => {
                this.setState({users: users}, () => {
                    this.handleModalClose();
                });
            }).catch(err => {
                console.error('Error creating user: ', err);
                alert('新增失敗');
            });
        }
    }

    handleModifyUser() {
        let input = this.state.input;
        if (input.userID!='' || input.userName!='' || input.password!='' || input.departmentID!='' || input.departmentName!='') {
            modifyUser(input).then(users => {
                this.setState({users: users}, () => {
                    this.handleModalClose();
                });
            }).catch(err => {
                console.error('Error modifying user: ', err);
                alert('編輯失敗');
            });
        }
    }

    handleRemoveUser() {
        if (this.userToManage != null) {
            removeUser(this.userToManage).then(users => {
                this.setState({users: users}, () => {
                    this.handleModalClose();
                })
            }).catch(err => {
                console.error('Error removing user: ', err);
                alert('刪除失敗');
            });
        }
    }
}