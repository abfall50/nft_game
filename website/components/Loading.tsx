import styles from '../styles/Loading.module.css'

const Loading = () => {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center bg-[url('../public/bg_landing.jpg')] bg-cover ">
      <div className={styles.wrapper}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
      </div>
    </main>
  );
};

export default Loading;
