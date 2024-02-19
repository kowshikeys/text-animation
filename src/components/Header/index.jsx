import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Header.scss";
import logo from "../../assets/logo.svg";
import logo2 from "../../assets/logo2.svg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <header className="header">
        <div className="logo">
          <motion.img
            key={"logo1"}
            src={logo}
            alt=""
            animate={{ y: !isScrolled ? 0 : -27, opacity: !isScrolled ? 1 : 0 }}
            transition={{ type: "tween" }}
          />
          <motion.img
            key={"logo2"}
            src={logo2}
            alt=""
            animate={{ y: isScrolled ? 0 : 27, opacity: isScrolled ? 1 : 0 }}
            transition={{ type: "tween" }}
          />
        </div>
        <nav></nav>
      </header>
    </AnimatePresence>
  );
};

export default Header;
