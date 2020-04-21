import React from 'react';
import BoundingBox from './BoundingBox';
import styles from './image.module.css';

function Image(props) {
    return (
        <div className={styles.imgContainer}>
           <img src={props.url} alt='Face' id='face-img' className={styles.faceImg}/>
           {props.boundingBox? <BoundingBox boundingBox={props.boundingBox} />:null}
        </div>
    )
}

export default Image;