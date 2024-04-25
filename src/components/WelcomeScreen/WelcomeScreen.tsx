import Clouds from "../Clouds/Clouds";
import styles from "./welcome-screen.module.scss";

type WelcomeProps = {
  handlePlayClick: () => void;
};

const WelcomeScreen = ({ handlePlayClick }: WelcomeProps) => {
  return (
    <main className={styles.pageContainer}>
      <Clouds />
      <div className={styles.pageWrapper}>
        <div className={styles.pageContent}>
          <h1 className={styles.title}>Kamoo</h1>
          <div className={styles.menu}>
            <button
              className={`${styles.playButton} ${styles.button}`}
              onClick={() => handlePlayClick()}
            >
              Play
            </button>
            <a
              className={`${styles.menuLink}`}
              href="https://github.com/arangace/kamoo"
              target="noopener"
              rel="_blank"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WelcomeScreen;
