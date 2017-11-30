// var React = require('react');
// var	ReactDOM = require('react-dom');
import React from 'react';
import ReactDOM from 'react-dom';
//import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
//require('bootstrap/dist/css/bootstrap.css');
//import 'bootstrap/dist/css/bootstrap-theme.css';


var	App = require('./components/App.js');
//var Home = require('./components/home.js');
var Header = require('./components/header.js');

ReactDOM.render(<Header />, document.getElementById('side_bar'));
//ReactDOM.render(<Home />, document.getElementById('react-container'));