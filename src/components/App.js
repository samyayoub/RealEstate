import React, { Component } from "react";
import "../css/App.css";
import $ from "jquery";

import SearchHouses from "./SearchHouses";
import AddHouse from "./AddHouse";

class App extends Component {
	constructor() {
		super();
		this.state = {
			myHouses: [],
		};
	}

	componentDidMount() {
		var settings = {
			async: true,
			crossDomain: true,
			url:
				"https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=Nashville&limit=50&offset=0&state_code=TN",
			method: "GET",
			headers: {
				"x-rapidapi-host": "realtor.p.rapidapi.com",
				"x-rapidapi-key":
					"cbe2e8c125mshc1ca717e4b907b2p1f7802jsn4a024241a256",
			},
		};

		$.ajax(settings).done((response) => {
			this.setState({
				myHouses: response,
			});
			console.log(this.myHouses);
		});
	}

	// componentDidMount() {
	// 	fetch(
	// 		"https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=Nashville&limit=10&offset=0&state_code=TN",
	// 		{
	// 			method: "GET",
	// 			headers: {
	// 				"x-rapidapi-host": "realtor.p.rapidapi.com",
	// 				"x-rapidapi-key":
	// 					"cbe2e8c125mshc1ca717e4b907b2p1f7802jsn4a024241a256",
	// 			},
	// 		}
	// 	)
	// 		.then((res) => res.json())
	// 		.then((result) => {
	// 			this.setState({
	// 				myHouses: result.myHouses,
	// 			});
	// 			console.log(this.myHouses);
	// 		})
	// 	(error) => {
	// 		this.setState({
	// 			error
	// 		});
	// 	};
	// }

	render() {
		return (
			<div className="App">
				<div className="booyah-box">
					<SearchHouses />
					<AddHouse />
				</div>
			</div>
		);
	}
}

export default App;
