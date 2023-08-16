import React, { Component } from "react";
import { render } from "react-dom";
import { HomePage } from "./HomePage.js";
import { Footer } from "./Footer.js";

const App = () => {
  return (
    <div className="bg-stone-200 flex flex-col items-center min-h-screen">
      <HomePage />
      <Footer/>
    </div>
  );
};

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);
