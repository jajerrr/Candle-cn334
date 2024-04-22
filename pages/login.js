import styles from '../styles/login.module.css'; 

export default function Login() {
    return (
        <div className={`bg-cover bg-center flex justify-center items-center ${styles.container}`}>
            <div className={styles.flexContainer}>
                <div className={styles.Box} style={{ display: 'flex',flexDirection: 'column'}}>
                    <img src="/logo.jpg" alt="Logo" width="200" height="100"  className="logo" />
                    <h1 className={styles.head}>LogIn</h1>
                    <p className={styles.sub}>Please enter your username and password to log in.</p>
                </div>
            </div>
        </div>
    );
}

