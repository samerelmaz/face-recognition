import React from 'react';
import styles from './form.module.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        }
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleRegister=this.handleRegister.bind(this);
    }
    handleInputChange(ev) {
        const elem = ev.target.id;
        const value = ev.target.value;
        const newState = {};
        newState[elem] = value;
        this.setState(newState);
    }
    handleRegister() {
        const simpleEmailRegex=/\S+@\S+\.\S+/; //don't want a very complex regex, this is just demo.
        const simplePasswordRegex=/\S{6,}/;
        if (this.state.name === '') {
              this.setState({
                error: "Name field can't be empty."
              }) 
        } else if (!simpleEmailRegex.test(this.state.email)) {
            this.setState({
                error: "Invalid email."
            })
        } else if (!simplePasswordRegex.test(this.state.password)) {
            this.setState({
                error: "Password must be at least 6 characters long."
            })
        } else {
            fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)    
            })
            .then(res => res.json())
            .then(res => { 
                if (res === 'Email already exists' || res === 'Something went wrong.') {
                    this.setState({
                        error: res
                    })
                } else {
                    this.setState({
                        error: ''
                    });
                    this.props.handleChangeLogStatus(res, true)
                }         
            })
            .catch(() => this.setState({
                error: 'Something went wrong. Try again.'
            }))
        }
    }
    render() {
        return (     
            <div className={styles.formContainer} id='register-form'>
                <h3 className={styles.formHeader}>Register</h3>
                <label className={styles.formLabel} htmlFor='name'>Name</label>
                <input className={styles.formInput} type='text' id='name' placeholder='Enter your name' value={this.state.name} onChange={this.handleInputChange}/>
                <label className={styles.formLabel} htmlFor='email'>Email</label>
                <input className={styles.formInput} type='email' id='email' placeholder='Enter your email' value={this.state.email} onChange={this.handleInputChange}/>
                <label className={styles.formLabel} htmlFor='password'>Password</label>
                <input className={styles.formInput} type='password' id='password' placeholder='Minimum 6 characters' value={this.state.password} onChange={this.handleInputChange}/>
                {this.state.error? <p className={styles.formError}>{this.state.error}</p>:null}
                <button className={styles.formButton} onClick={this.handleRegister}>Register</button>
            </div> 
        )
    }
}

export default Register;