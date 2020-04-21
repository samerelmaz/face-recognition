import React, {Fragment} from 'react';
import styles from './form.module.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
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
                error: "Login information can't be empty."
            })
        } else {
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
                    this.props.handleViewChange('home', res)
                } else {
                    this.setState({
                        error: res
                    })
                }
            })
            .catch(() => this.setState({
                error: 'Something went wrong. Try again.'
            }))
        }   
    }
    render() {
        return (
           <Fragment>
               <button className={styles.backBtn}>Back</button>
               <button className={styles.otherForm} onClick={() => this.props.handleViewChange('register')}>Register</button>
               <h1 style={{textAlign: 'center',marginTop: '100px'}}>Please sign in with your user information</h1>
               <div className={styles.formContainer}>
                    <h3 className={styles.formHeader}>Login</h3>
                    <label className={styles.formLabel} htmlFor='email'>Email</label>
                    <input className={styles.formInput} type='email' id='email' placeholder='Enter your email' value={this.state.email} onChange={this.handleInputChange}/>
                    <label className={styles.formLabel} htmlFor='password'>Password</label>
                    <input className={styles.formInput} type='password' id='password' placeholder='Enter your password' value={this.state.password} onChange={this.handleInputChange}/>
                    {this.state.error? <p className={styles.formError}>{this.state.error}</p>:null}
                    <button className={styles.formButton} onClick={this.handleLogin}>Login</button>
                    <p className={styles.formMsg}>Don't have an account? <button onClick={() => this.props.handleViewChange('register')}>Register</button></p>
               </div>
               
           </Fragment> 
        )
    }
}

export default Login;