import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

export const NotFound404 = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Oops! 404 Error</h1>
                    <p>The page you requested does not exist</p>
                    <br />
                    <br />
                    <p>check the address or try <Link to='/' className={styles.link}>homepage</Link></p>
                </div>
            </div>
        </div>
    );
}