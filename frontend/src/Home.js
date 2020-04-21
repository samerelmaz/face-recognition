import React from 'react';
import Image from './Image';
import styles from './home.module.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            showImage: false,
            error: '',
            boundingBox: null,
            //numOfPrevImgs: this.getNumOfPrevImgs()
        }
        this.handleDetectClick=this.handleDetectClick.bind(this);
        this.handleUrlInput=this.handleUrlInput.bind(this);
        //this.getNumOfPrevImgs=this.getNumOfPrevImgs.bind(this);
    }
    /*getNumOfPrevImgs() {
        const windowWidth=document.getElementById('root').offsetWidth;
        if (windowWidth>a) {
            return 5
        } else if (windowWidth>b) {
            return 4
        } else if (windowWidth>c) {
            return 3
        } else {
            return 2
        } 
    }*/
    handleUrlInput(ev) {
        const imgUrl=ev.target.value;
        this.setState({
            url: imgUrl,
            showImage: false,
            boundingBox: null,
            error: ''
        })
    }
    handleDetectClick() {
        if (this.state.url !== '') {
            this.setState({
                showImage: true, 
                error: ''
            });
            const imgInfo = {
                url: this.state.url,
                userId: this.props.userInfo.user_id
            };
            fetch('http://localhost:3001/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(imgInfo)
            })
            .then(res => res.json())
            .then(res => {
                if (res === 'Could not detect any face. Try another picture.') {
                    this.setState({
                        error: res
                    })
                } else {
                    this.setState({
                        error: '',
                        boundingBox: res
                    })
                }
            })
            .catch(err => console.log(err))
        } else {
            this.setState({
                error: "Image URL can't be empty"
            })
        }
    }
    render() {
        return (
            <div className={styles.homeContainer}>
                <button className={styles.logoutBtn} onClick={() => this.props.handleChangeLogStatus(null, false)}>Logout</button>
                <h1 className={styles.homeHeader}>Hello, {/*this.props.userInfo.name*/}placeholder, cambiar</h1>
                <h2 className={styles.homeSubheader}>Start by pasting a link to a face image below</h2>
                <div>
                    <input className={styles.linkInput} type='text' placeholder="Paste your face image link here" value={this.state.url} onChange={this.handleUrlInput}></input>
                    <button className={styles.detectBtn} onClick={this.handleDetectClick}>Detect</button>
                </div>
                {this.state.showImage?<Image url={this.state.url} boundingBox={this.state.boundingBox}/>:null}
                {this.state.error?<p className={styles.errorMsg}>{this.state.error}</p>:null}
            </div>
        )
    }
}

export default Home;