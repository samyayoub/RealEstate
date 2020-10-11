import React, { Component } from "react";
import "../css/App.css";
import $ from "jquery";

import SearchHouses from "./SearchHouses";
import AddHouse from "./AddHouse";

class App extends Component {
	constructor() {
		super();
		this.state = {
			houses: [],
		};
	}

	componentDidMount() {
		var settings = {
			async: true,
			crossDomain: true,
			url:
				"https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=Nashville&limit=25&offset=0&state_code=TN",
			method: "GET",
			headers: {
				"x-rapidapi-host": "realtor.p.rapidapi.com",
				"x-rapidapi-key":
					"cbe2e8c125mshc1ca717e4b907b2p1f7802jsn4a024241a256",
			},
		};

		$.ajax(settings).done((response) => {
			this.setState({
				houses: response.properties,
			});
		});
	}

	render() {
		return (
			<div className="App">
				<ul>
					{/* <SearchHouses items={this.state.houses} /> */}
					{this.state.houses.map((house) => (
						<li>{house.address.line}</li>
					))}
				</ul>
			</div>
		);
	}
}

export default App;
