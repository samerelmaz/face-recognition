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
            boundingBox: null
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
                error: '',
                boundingBox: null,
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
                        boundingBox: res,
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
    componentDidMount() {
        document.querySelector('#input-link').addEventListener('keypress', (ev) => {
            if (ev.key === 'Enter') {
                this.handleDetectClick();
            }
        })
    }
    render() {
        return (
            <div className={this.state.showImage?styles.homeContainer+' '+styles.homeContainerImgClick:styles.homeContainer}>
                <button className={styles.logoutBtn} onClick={() => this.props.handleChangeLogStatus(null, false)}>Logout</button>
                <h1 className={styles.homeHeader}>Hello, {this.props.userInfo.name}</h1>
                <h2 className={styles.homeSubheader}>Start by pasting a link to a face image in the box below</h2>
                <div>
                    <input id='input-link' tabIndex='0' className={styles.linkInput} type='text' placeholder="Paste your face image link here" value={this.state.url} onChange={this.handleUrlInput}></input>
                    <button tabIndex='0' className={styles.detectBtn} onClick={this.handleDetectClick}>Detect</button>
                </div>
                {this.state.showImage?<Image error={this.state.error} url={this.state.url} boundingBox={this.state.boundingBox}/> :null}
                {this.state.error === "Image URL can't be empty"?<p className={styles.errorMsg}>Image URL can't be empty</p>:null}
            </div>
        )
    }
}

export default Home;