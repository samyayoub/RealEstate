// import { render } from "@testing-library/react";
import React, { Component } from "react";
import "../css/App.css";
import SelectUSState from "react-select-us-states";
import CurrencyFormat from "react-currency-format";
import { FcSearch } from "react-icons/fc";

class SearchProperties extends Component {
	constructor() {
		super();

		this.setNewValue = this.setNewValue.bind(this);
	}

	setNewValue(newValue) {
		console.log("this is the State code:" + newValue);
	}

	render() {
		// showing list of properties with link for more info
		// by looping through all the data was fetched from database
		const listProperties = this.props.properties.map((property) => (
			<div className="container" key={property.property_id}>
				{/* {console.log(property.listing_id)}; */}
				<a
					href={property.rdc_web_url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{/* Showing address of property */}
					<h5>
						{property.address.line}
						<br />
						{property.address.city},{property.address.state_code}{" "}
						{property.address.postal_code}
					</h5>
				</a>
				<br />
				{/* Showing description of property */}
				<h6>
					<b>Property Description:</b>
					<br />
					{property.beds} bedrooms, {property.baths} baths
					<br />
					{/* {property.building_size.size}, {property.building_size.units} */}
				</h6>
				<h6>
					<b>Asking Price: </b>
					<CurrencyFormat
						value={property.price}
						displayType={"text"}
						thousandSeparator={true}
						prefix={"$"}
					/>
				</h6>
				{/* Showing thumbnail of property (if avaiable) */}
				<a
					href={property.rdc_web_url}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						alt=""
						src={`${property.thumbnail}`}
						width="400"
						heigh="300"
						mode="fit"
					></img>
				</a>
			</div>
		));

		return (
			// Show fields for end user
			<div>
				<div className="list-box">
					<div>
						<form>
							<label>
								Enter City: <input type="text" name="city" />
							</label>
							<label>
								Select a state:{" "}
								<SelectUSState
									id="myId"
									className="myClassName"
									onChange={this.setNewValue}
								/>
							</label>
							<label>
								Enter Zip Cose: <input type="number" name="zipCode" />
							</label>
							<label>
								Enter Range:{" "}
								<select>
									<option value="5">5 Miles</option>
									<option value="25">25 Miles</option>
									<option value="50">50 Miles</option>
									<option value="75">75 Miles</option>
									<option value="100">100 Miles</option>
								</select>
							</label>
						</form>
					</div>
					<br />
					<button
						className="btn btn-primary"
						title="Search properties in specific area"
					>
						<FcSearch /> Search Properties
					</button>
				</div>
				<div>{listProperties}</div>
			</div>
		);
	}
}

export default SearchProperties;
