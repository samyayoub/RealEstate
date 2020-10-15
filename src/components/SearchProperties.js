// import { render } from "@testing-library/react";
import React, { Component } from "react";

class SearchProperties extends Component {
	render() {
		return (
			<div>
				<button
					className="btn btn-primary"
					title="Search properties in specific area"
				>
					Search Properties
				</button>
			</div>
		);
	}
}

export default SearchProperties;
