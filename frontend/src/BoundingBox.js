import React, {Fragment} from 'react';

function BoundingBox(props) {
    let boxArr=[];
    let imgHeight=document.querySelector('#face-img').offsetHeight;
    let imgWidth=document.querySelector('#face-img').offsetWidth;
    for (let i=0;i<props.boundingBox.length;i++) {
        boxArr.push(<div key={'box'+i} style={{
            position: 'absolute',
            top: props.boundingBox[i].top_row*imgHeight,
            right: imgWidth - props.boundingBox[i].right_col*imgWidth,
            bottom: imgHeight - props.boundingBox[i].bottom_row*imgHeight,
            left: props.boundingBox[i].left_col*imgWidth,
            border: '1px solid #7a00ff'
        }}></div>)
    }
    return (
    <Fragment>
        {boxArr}
    </Fragment>)  
}


export default BoundingBox;