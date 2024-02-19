import React, { useEffect, useState } from "react";
import "./App.css"; // Import your CSS file
import Header from "./components/Header";
import Splashscreen from "./components/Splashscreen";
import AboutUs from "./components/AboutUs";

const App = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showAboutSection, setShowAboutSection] = useState(false);
  const [showScrollUpText, setShowScrollUpText] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      // Once scrolling animation is complete
      if (position >= window.innerHeight / 2) {
        setShowAboutSection(true);
      }

      // When About Us section is scrolled into view
      if (position >= window.innerHeight) {
        setShowScrollUpText(false);
      } else {
        setShowScrollUpText(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // If the "Scroll up" text has smoothly disappeared
    if (!showScrollUpText) {
      // Set a timer to delay showing the "About Us" section
      const timer = setTimeout(() => {
        setShowAboutSection(true);
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timer);
    }
  }, [showScrollUpText]);

  // Calculate opacity of the first and second text based on scroll position
  const opacityFirstText = Math.max(0, Math.min(1, 1 - scrollPosition / (window.innerHeight / 2)));
  const opacitySecondText = Math.max(
    0,
    Math.min(1, (scrollPosition - window.innerHeight / 1.5) / (window.innerHeight / 10))
  );

  // CSS transition styles for the "Scroll up" text
  const scrollUpTextStyles = {
    opacity: showScrollUpText ? opacitySecondText : 0,
    transition: "opacity 1s ease",
  };

  return (
    <div>
      <Header />
      <Splashscreen />
      <div className="container">
        <div className="content">
          <h2 className="text" style={{ opacity: opacityFirstText }}>
            <p>Crafting digital products with soul, enchanting users with love.</p>
          </h2>
          <h2 className="text" style={scrollUpTextStyles}>
            <p>we shape success with web, app and 3D, crafting your perfect journey digital</p>
          </h2>
        </div>
      </div>
      {showAboutSection && <AboutUs />}
      <div className="background-content" style={{ height: "100vh" }}>
        {/* Your content behind the scrolling text goes here */}
        <p>This is some content behind the scrolling text.</p>
      </div>
    </div>
  );
};

export default App;
