import React from 'react';
import styles from './form.module.css';
import Loading from './Loading';
import logIcon from './images/login.svg';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            showLoading: false
        }
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    handleInputChange(ev) {
        const elem = ev.target.id;
        const value = ev.target.value;
        const newState = {};
        newState[elem] = value;
        this.setState(newState);
    }
    handleLogin() {
        if (this.state.email === '' || this.state.password === '') {
            this.setState({
                error: "Login information can't be empty.",
                showLoading: false
            })
        } else {
            this.setState({
                showLoading: true,
                error: ''
            });
            fetch('http://localhost:3001/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)    
            })
            .then(res => res.json())
            .then(res => {
                if (typeof res === 'object') {
                    this.props.handleChangeLogStatus(res, true);
                }
                else {
                    this.setState({
                        error: res,
                        showLoading: false
                    })
                }
            })
            .catch(() => this.setState({
                error: 'Something went wrong. Try again.',
                showLoading: false
            }))
        }   
    }
    render() {
        return (
            <div className={styles.formContainer} id='login-form'>
                <h3 className={styles.formHeader}>
                    Login
                    <img src={logIcon} alt='Login icon' className={styles.formIcon}></img>
                </h3>
                <label className={styles.formLabel} htmlFor='email'>Email</label>
                <input tabIndex='0' className={styles.formInput} type='email' id='email' placeholder='Enter your email' value={this.state.email} onChange={this.handleInputChange}/>
                <label className={styles.formLabel} htmlFor='password'>Password</label>
                <input tabIndex='0' className={styles.formInput} type='password' id='password' placeholder='Enter your password' value={this.state.password} onChange={this.handleInputChange}/>
                {this.state.error? <p className={styles.formError}>{this.state.error}</p>:null}
                {this.state.showLoading?<Loading typeOfLoad='form' />:<button tabIndex='0' className={styles.formButton} onClick={this.handleLogin}>Login</button>}
            </div>  
        )
    }
}

export default Login;