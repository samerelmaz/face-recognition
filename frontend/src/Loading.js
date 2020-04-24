import React, {Fragment} from 'react';
import styles from './loading.module.css';

function Loading(props) {
    let style;
    if (props.typeOfLoad === 'img') {
        style=props.imgLoaded?styles['lds-ring']+' '+styles.center:styles['lds-ring']+' '+styles['render-fix']+' '+styles.center;
    } else if (props.typeOfLoad === 'form') {
        style=styles['lds-ring']+' '+styles['lds-ring-form'];
    }
    return (
        <Fragment>
            <div className={style}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div> 
        </Fragment>
    )
}

export default Loading;