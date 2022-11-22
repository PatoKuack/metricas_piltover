import React from "react";
import ReactDOM from 'react-dom';
import App from "./components/App.jsx";
import './styles/main.css';
// import './utils/template.js';

console.log("Paso 1: ¡completed!");
// ReactDOM.render(<div><h1>Paso 2: ¡Funcionó!</h1><img src="./assets/images/LUNAR.jpg"/></div>, document.getElementById('app'));
ReactDOM.render(<App />, document.getElementById('app'));