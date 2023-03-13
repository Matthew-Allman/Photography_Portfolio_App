import React, { useState, useEffect, createContext } from "react";

export const CursorContext = createContext();

const CursorProvider = ({ children }) => {
  const [cursorPos, setCursorPos] = useState({
    x: 0,
    y: 0,
  });

  const [cursorBG, setCursorBG] = useState("default");
  const [loading, setLoading] = useState(false);

  const mobileViewport = window.innerWidth < 768;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (mobileViewport) {
      setCursorBG("none");
    } else {
      const move = (event) => {
        setCursorPos({
          x: event.clientX,
          y: event.clientY,
        });
      };
      window.addEventListener("mousemove", move);

      return () => {
        window.removeEventListener("mousemove", move);
      };
    }
  });

  const cursorVariants = {
    default: {
      x: cursorPos.x - 16,
      y: cursorPos.y - 16,
      backgroundColor: "#0e1112",
    },

    text: {
      width: "150px",
      height: "150px",
      x: cursorPos.x - 72,
      y: cursorPos.y - 72,
      backgroundColor: "#fff",
      mixBlendMode: "difference",
    },

    none: {
      width: 0,
      height: 0,
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  };

  const mouseEnterHandler = () => {
    setCursorBG("text");
  };

  const mouseLeaveHandler = () => {
    setCursorBG("default");
  };

  return (
    <CursorContext.Provider
      value={{
        cursorVariants,
        cursorBG,
        mouseEnterHandler,
        mouseLeaveHandler,
        loading,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export default CursorProvider;
