import React from 'react';
import styles from './welcome.module.css';
import Login from './Login';
import Register from './Register';
import img from './images/1.jpg';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isLoginClicked: false,
            isRegisterClicked: false
        }
        this.handleLoginClick=this.handleLoginClick.bind(this);
        this.handleRegisterClick=this.handleRegisterClick.bind(this);
    }
    handleLoginClick() {
        this.setState({
            isLoginClicked: true,
            isRegisterClicked: false
        })
    }
    handleRegisterClick() {
        this.setState({
            isLoginClicked: false,
            isRegisterClicked: true
        })
    }
    componentDidMount() {
        document.querySelector('#welcome-container').addEventListener('mousedown', (ev) => {
            if (!(ev.target.tagName === 'BUTTON' ||
            ev.target.closest('div').id === 'login-form' ||
            ev.target.closest('div').id === 'register-form')) {
                this.setState({
                    isLoginClicked: false,
                    isRegisterClicked: false
                }) 
            }
        })
    }
    render() {
        return (
            <div className={styles.flex}>
                <div className={styles.imgContainer}>
                    <img src={img} alt='img' className={styles.img}/>
                </div>
                <div className={styles.welcomeContainer} id='welcome-container'>
                    <h1 className={styles.welcomeHeader}>Future Brain</h1>
                    <h2 className={styles.welcomeSubheader}>A smart face-recognition app</h2>
                    <div className={styles.container}>
                        {this.state.isLoginClicked?<Login handleChangeLogStatus={this.props.handleChangeLogStatus}/>:
                        <button className={styles.welcomeBtn} onClick={this.handleLoginClick}>Sign in</button>}
                        {this.state.isRegisterClicked?<Register handleChangeLogStatus={this.props.handleChangeLogStatus}/>:
                        <button className={styles.welcomeBtn} onClick={this.handleRegisterClick}>Register</button>}
                    </div>  
                </div>
            </div> 
        )
    }    
}

export default Welcome;