import React, { Fragment } from 'react';
import Image from './Image';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            showImage: false,
            error: '',
            boundingBox: null
        }
        this.handleDetectClick=this.handleDetectClick.bind(this);
        this.handleUrlInput=this.handleUrlInput.bind(this);
    }
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
    }
    render() {
        return (
            <Fragment>
                <button onClick={() => this.props.handleViewChange('welcome')}>Logout</button>
                <h1>Hello, {this.props.userInfo.name}</h1>
                <input type='text' placeholder="Paste your face image link here" value={this.state.url} onChange={this.handleUrlInput}></input>
                <button onClick={this.handleDetectClick}>Detect</button>
                {this.state.showImage?<Image url={this.state.url} boundingBox={this.state.boundingBox}/>:null}
                {this.state.error?<p>{this.state.error}</p>:null}
            </Fragment>
        )
    }
}

export default Home;