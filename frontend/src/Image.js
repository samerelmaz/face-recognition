import React from 'react';
import BoundingBox from './BoundingBox';
import styles from './image.module.css';
import Loading from './Loading';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgLoadComplete: false
        }
        this.handleImgLoad=this.handleImgLoad.bind(this);
    }
    handleImgLoad() { //checking if img is loaded before drawing boundingbox
        this.setState({
            imgLoadComplete: true
        })
    }
    render() {
        return (
            <div className={styles.imgContainer}>
               {this.props.error !== '' && this.state.imgLoadComplete?<p className={styles.errorMsg}>{this.props.error}</p>:null}
               <img src={this.props.url} alt='Unable to display image. Please make sure the URL is correct.' id='face-img' className={styles.faceImg} onLoad={this.handleImgLoad}/>
               {this.props.boundingBox && this.state.imgLoadComplete? <BoundingBox boundingBox={this.props.boundingBox} /> : null}
               {(!this.props.boundingBox && this.props.error === '')? <Loading imgLoaded={this.state.imgLoadComplete} typeOfLoad='img'/> : null}
            </div>
        )
    }
}

export default Image;