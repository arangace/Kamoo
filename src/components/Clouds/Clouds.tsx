import { useEffect, useState } from "react";
import styles from "./Clouds.module.scss";

type CloudProp = {
  topOffset: number;
  animationSpeed: number;
  direction: string;
  animationDelay: number;
};

const Clouds = () => {
  const [cloudsData, setClouds] = useState<CloudProp[]>();

  // Function to generate initial cloud data (optional)
  const generateClouds = () => {
    const cloudCount = 5; // Adjust the number of clouds
    const newClouds = [];
    for (let i = 0; i < cloudCount; i++) {
      newClouds.push({
        topOffset: Math.floor(Math.random() * 25),
        animationSpeed: Math.random() * 5 + 20,
        animationDelay: Math.random() * 10 + 3,
        direction: Math.random() < 0.5 ? "right" : "left",
      });
    }
    setClouds(newClouds);
  };

  useEffect(() => {
    generateClouds();
  }, []);

  return (
    <div className={styles.cloudsContainer}>
      {cloudsData &&
        cloudsData.map((cloud) => (
          <img
            key={cloud.topOffset}
            id={`cloud-${cloud.topOffset}`}
            className={`${styles.cloud} ${styles[cloud.direction]}`}
            alt="cloud"
            src="./assets/images/cloud3.png"
            style={{
              top: `${cloud.topOffset}vh`,
              animationDuration: `${cloud.animationSpeed}s`,
              animationDelay: `${cloud.animationDelay}s`,
            }}
          />
        ))}
    </div>
  );
};

export default Clouds;
