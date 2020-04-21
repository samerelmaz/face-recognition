import React from 'react';
import styles from './welcome.module.css';

function Welcome(props) {
    return (
        <div className={styles.welcomeContainer}>
            <h1 className={styles.welcomeHeader}>Smart Face</h1>
            <h2 className={styles.welcomeSubheader}>A smart face recognition app</h2>
            <div className={styles.btnContainer}>
                <button className={styles.welcomeBtn} onClick={() => props.handleViewChange('login')}>Sign in</button>
                <button className={styles.welcomeBtn} onClick={() => props.handleViewChange('register')}>Register</button>
            </div>    
        </div>
    )
}

export default Welcome;