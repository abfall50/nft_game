import styles from '../styles/Loader.module.css'

const Loader = () => {
  return (
    <>
      <div className={styles.dot_spinner}>
        <div className={styles.dot_spinner__dot}></div>
        <div className={styles.dot_spinner__dot}></div>
        <div className={styles.dot_spinner__dot}></div>
        <div className={styles.dot_spinner__dot}></div>
        <div className={styles.dot_spinner__dot}></div>
        <div className={styles.dot_spinner__dot}></div>
        <div className={styles.dot_spinner__dot}></div>
        <div className={styles.dot_spinner__dot}></div>
      </div>
    </>
  );
};

export default Loader;
