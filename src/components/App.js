import React, { Component } from "react";
import "../css/App.css";
import $ from "jquery";

import SearchProperties from "./SearchProperties";

class App extends Component {
	constructor() {
		super();
		this.state = {
			properties: [],
		};
	}

	// Access information from the API
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
				properties: response.properties,
			});
		});
	}

	render() {
		// var address =
		// 	"https://www.google.com/maps/search/?api=1&map_action=map&center&basemap=satellite&zoom=21&query=3021+Mallory+Lane%2C+Franklin+TN+37067";

		// var address = "https://google.com";

		// var address = encodeURI(`${property.address.line}+ $
		// 					{property.address.city}+${property.address.state_code}+ $
		// 					{property.address.postal_code}`);

		return (
			<div className="App-box">
				<SearchProperties properties={this.state.properties} />
				<br />
			</div>
		);
	}
}

export default App;
