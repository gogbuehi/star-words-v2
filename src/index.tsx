import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Maths from "./Maths";
import Layout from "./app-main/Layout";
import {HomePage} from "./app-main/HomePage";
import {TrickyWords} from "./app-main/TrickyWords";
import {NotFound} from "./app-main/NotFound";
import {Giraffe} from "./Giraffe";
import Division from "./Division";
import Addition from "./Addition";
import Subtraction from "./Subtraction";
import MathDevice from "./app-main/Tism/MathDevice";
import PracticeWriting from "./app-main/Writing/PracticeWriting";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MathDevice />} />
        <Route path="giraffe" element={<Giraffe />} />
        <Route path="write" element={<PracticeWriting />} />
        <Route path="words" element={<TrickyWords />} />
        <Route path="addition" element={<Addition />} />
        <Route path="multiplication" element={<Maths />} />

        <Route path="division" element={<Division />} />
        <Route path="subtraction" element={<Subtraction />} />
        <Route path="math" element={<MathDevice />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
