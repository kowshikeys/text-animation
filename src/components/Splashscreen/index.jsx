import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Splashscreen.scss";
import ambient from "../../assets/audio/ambient-loop-drone.wav";
import { useGeneralStore } from "../../store/generalStore";

const Splashscreen = () => {
  const [close, setClose] = useState(false);
  const audioRef = useRef(null);
  const isAmbientPlaying = useGeneralStore((store) => store.isAmbientPlaying);
  const setIsAmbientPlaying = useGeneralStore((store) => store.setIsAmbientPlaying);

  useEffect(() => {
    if (close) {
      audioRef.current = new Audio(ambient);
      audioRef.current.loop = true;
      audioRef.current.play();
      setIsAmbientPlaying(true);
    }
  }, [close, setIsAmbientPlaying]);

  useEffect(() => {
    if (isAmbientPlaying) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isAmbientPlaying, setIsAmbientPlaying]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="splashscreen"
        animate={{ opacity: close ? 0 : 1 }}
        transition={{ duration: 1, type: "tween", delay: 0.5 }}
        style={{ pointerEvents: close ? "none" : "auto" }}
      >
        <motion.div className="btn">
          <motion.button
            animate={{ scale: close ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setClose(true)}
          >
            Enter
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Splashscreen;
