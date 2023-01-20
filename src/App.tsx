import React from 'react';
import {
  BrowserRouter, Route,  Routes
} from "react-router-dom";
import './App.css';
import {TrickyWords} from "./app-main/TrickyWords";
import {HomePage} from "./app-main/HomePage";
import {NotFound} from "./app-main/NotFound";
import Layout from "./app-main/Layout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="words" element={<TrickyWords />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
