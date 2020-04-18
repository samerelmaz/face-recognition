import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
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
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)    
        })
        .then(res => res.json())
        .then(res => {

        })
    }
    render() {
        return (
           <div>
               <button>Back</button>
               <button onClick={() => this.props.handleViewChange('register')}>Register</button>
               <h3>Login</h3>
               <label htmlFor='email'>Email</label>
               <input type='email' id='email' placeholder='Enter your email' value={this.state.email} onChange={this.handleInputChange}/>
               <label htmlFor='password'>Password</label>
               <input type='password' id='password' placeholder='Minimum 6 characters' value={this.state.password} onChange={this.handleInputChange}/>
               <button onClick={this.handleLogin}>Login</button>
               {this.state.error? <p>{this.state.error}</p>:null}
               <p>Don't have an account? <button onClick={() => this.props.handleViewChange('register')}>Register</button></p>
           </div> 
        )
    }
}

export default Login;