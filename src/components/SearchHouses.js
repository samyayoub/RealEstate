import React, { Component } from "react";

class SearchHouses extends Component {
	render() {
		// const listHouses = Array.from(this.props);
		const listHouses = Array.from(this.props).map((house) => (
			<div>
				<div>{house.property_id}</div>
				<div>{house.agents}</div>
			</div>
		));

		// const listHouses = Array.from(this.props);

		return <div>{listHouses}</div>;
		// return listHouses;
	}
}

export default SearchHouses;
