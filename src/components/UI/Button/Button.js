import React from 'react';

import styles from './Button.module.css';

const button = props => <button {...props} className={styles.button}>{props.children}</button>

export default button;
