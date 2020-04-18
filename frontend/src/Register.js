import React from 'react';

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
        fetch('http://localhost:3001/register', {
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
               <button onClick={() => this.props.handleViewChange('login')}>Login</button>
               <h3>Register</h3>
               <label htmlFor='name'>Name</label>
               <input type='text' id='name' placeholder='Enter your name' value={this.state.name} onChange={this.handleInputChange}/>
               <label htmlFor='email'>Email</label>
               <input type='email' id='email' placeholder='Enter your email' value={this.state.email} onChange={this.handleInputChange}/>
               <label htmlFor='password'>Password</label>
               <input type='password' id='password' placeholder='Minimum 6 characters' value={this.state.password} onChange={this.handleInputChange}/>
               <button onClick={this.handleRegister}>Register</button>
               {this.state.error? <p>{this.state.error}</p>:null}
               <p>Already have an account? <button onClick={() => this.props.handleViewChange('login')}>Login</button></p>
           </div> 
        )
    }
}

export default Register;