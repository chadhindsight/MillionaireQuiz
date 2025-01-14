import React from 'react';

import styles from './Modal.module.css';

const modal = (props) => {
    return (
        <div className={styles.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '' : '0'
        }}>  
        {props.children}  
        </div>
    )
}

export default modal;