import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { motion } from "framer-motion";

import { Header, AnimRoutes } from "./components";
import { useContext } from "react";

import { CursorContext } from "./context/CursorContext";

const App = () => {
  const { cursorVariants, cursorBG } = useContext(CursorContext);

  return (
    <section>
      <Router>
        <Header />
        <AnimRoutes />
      </Router>
      {/* Cursor */}
      <motion.div
        variants={cursorVariants}
        animate={cursorBG}
        className="w-[32px] h-[32px] bg-primary fixed top-0 left-0 pointer-events-none z-50 rounded-full"
      ></motion.div>
    </section>
  );
};

export default App;
