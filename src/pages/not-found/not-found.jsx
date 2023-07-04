import { Link } from 'react-router-dom';

import styles from './not-found.module.css';
import { routeMain } from "../../utils/data";

export const NotFound404 = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Oops! 404 Error</h1>
                    <p>The page you requested does not exist</p>
                    <br />
                    <br />
                    <p>check the address or try <Link to={routeMain} className={styles.link}>homepage</Link></p>
                </div>
            </div>
        </div>
    );
}