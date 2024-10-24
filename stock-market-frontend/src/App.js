// src/App.js

import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
	Link
} from "react-router-dom";
import "./App.css";

const Stocks = ({ addToWatchlist }) => {
	const [stocks, setStocks] = useState([]);

	useEffect(() => {
		// Fetch stock data from the backend
		fetch("http://localhost:5000/api/stocks")
			.then((res) => res.json())
			.then((data) => setStocks(data))
			.catch((error) => console.error("Error fetching stocks:", error));
	}, []);
	console.log(setStocks, "Stocksdata");

	const getRandomColor = () => {
		const colors = ["#FF0000", "#00FF00"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<div className="App">
			<h1>Stock Market MERN App</h1>
			<h2>Stocks</h2>
			<ul>
				<li style={{ background: '#EEEEEE', color: '#000000' }}>
					<div style={{ width: '20%' }}>
						company
					</div>
					<div style={{ width: '20%' }}>
						initial_price
					</div>
					<div style={{ width: '20%' }}>
						price_2002
					</div>
					<div style={{ width: '20%' }}>
						price_2007
					</div>
					<div style={{ width: '20%' }}>
						Add Button
					</div>
				</li>
				{stocks.map((stock) => (
					<li key={stock.symbol}>
						<div style={{ width: '20%' }}>{stock.company} ({stock.symbol}) -</div>
						<div style={{ width: '20%' }}><span style={{ color: getRandomColor() }}>
							{" "}
							${stock.initial_price}
						</span></div>
						<div style={{ width: '20%' }}><span style={{ color: getRandomColor() }}>
							{" "}
							${stock.price_2002}("2002")
						</span></div>
						<div style={{ width: '20%' }}><span style={{ color: getRandomColor() }}>
							{" "}
							${stock.price_2007}("2007")
						</span></div>
						<div style={{ width: '20%' }}><button onClick={() => addToWatchlist(stock)}>
							Add to My Watchlist
						</button></div>
					</li>
				))}
			</ul>
		</div >
	);
};

const Watchlist = ({ watchlist }) => {
	const getRandomColor = () => {
		const colors = ["#FF0000", "#00FF00"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<div className="App">
			<h1>Stock Market MERN App</h1>
			<h2>My Watchlist</h2>
			<ul>
				{watchlist.map((stock) => (
					<li key={stock.symbol}>
						{stock.company} ({stock.symbol}) -
						<span style={{ color: getRandomColor() }}>
							{" "}
							${stock.initial_price}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

function App() {
	const [watchlist, setWatchlist] = useState([]);

	const addToWatchlist = (stock) => {
		// Add stock to watchlist
		fetch("http://localhost:5000/api/watchlist", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(stock),
		})
			.then((res) => res.json())
			.then((data) => {
				// Show an alert with the message received from the server
				alert(data.message);
				setWatchlist([...watchlist, stock]);
			})
			.catch((error) =>
				console.error("Error adding to watchlist:", error)
			);
	};

	return (
		<Router>
			<nav>
				<NavLink to="/stocks">Stocks</NavLink>
				<NavLink to="/watchlist">Watchlist</NavLink>
			</nav>
			<Routes>
				<Route
					path="/stocks"
					element={<Stocks addToWatchlist={addToWatchlist} />}
				/>
				<Route
					path="/watchlist"
					element={<Watchlist watchlist={watchlist} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;

/*
import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
*/