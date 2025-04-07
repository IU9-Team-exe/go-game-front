import React, { useState } from "react";
import styles from "./AuthForm.module.css";

const VideoBackground = ({ videos }) => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideo((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <video
      key={videos[currentVideo]}
      className={styles.videoBackground}
      src={videos[currentVideo]}
      autoPlay
      muted
      playsInline
      onEnded={handleVideoEnd}
    />
  );
};

export default VideoBackground;
