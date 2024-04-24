import styles from "./welcome-screen.module.scss";

type WelcomeProps = {
  handlePlayClick: () => void;
};

const WelcomeScreen = ({ handlePlayClick }: WelcomeProps) => {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageContent}>
          <h1 className={styles.title}>Kamoo</h1>
          <button
            className={styles.playButton}
            onClick={() => handlePlayClick()}
          >
            Play
          </button>
        </div>
      </div>
    </main>
  );
};

export default WelcomeScreen;
