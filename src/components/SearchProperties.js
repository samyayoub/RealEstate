// import { render } from "@testing-library/react";
import React, { Component } from "react";
import "../css/App.css";
import SelectUSState from "react-select-us-states";
import CurrencyFormat from "react-currency-format";
import { FcSearch } from "react-icons/fc";
import MyModalComponent from "../components/Modal";
import { Button } from "react-bootstrap";

class SearchProperties extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			city: "",
			state: "",
			zipCode: "",
			radius: "",
			show: false,
			title: "",
			body: "",
			data: [],
		};

		this.setNewValue = this.setNewValue.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleShowProperties = this.handleShowProperties.bind(this);
	}

	setNewValue(newValue) {
		this.setState({
			state: newValue,
		});
	}

	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		e.target.reset();
		let tempValues = {
			city: this.state.city,
			state: this.state.state,
			zipCode: this.state.zipCode,
			radius: this.state.radius,
		};

		this.props.searchProperty(tempValues);
	}

	handleShowProperties = () => {
		const listProperties = this.props.properties.map((property) => (
			<div className="listing-box" key={property.property_id}>
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
					{/* Size: {property.building_size.size}{" "}
					{property.building_size.units} */}
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
		this.setState({
			data: listProperties,
		});
	};

	handleShow = () => {
		const myObject = (
			<div className="listing-box">
				<form
					noValidate
					onSubmit={this.handleSubmit}
					onChange={this.handleChange}
				>
					<label>
						Enter City: <input type="text" name="city" />
					</label>
					<label>
						Select a state:{" "}
						<SelectUSState
							id="myId"
							className="myClassName"
							onChange={this.setNewValue}
							value={this.setNewValue}
						/>
					</label>
					<label>
						Enter Zip Code: <input type="number" name="zipCode" />
					</label>
					<label>
						Enter radius:{" "}
						<select type="number" name="radius">
							<option value="5">5 Miles</option>
							<option value="25">25 Miles</option>
							<option value="50">50 Miles</option>
							<option value="75">75 Miles</option>
							<option value="100">100 Miles</option>
						</select>
					</label>
					<br />
					<div>
						<button
							className="btn btn-primary"
							title="Search properties in specific area"
							type="submit"
							onClick={this.handleShowProperties}
						>
							<FcSearch /> Search Properties
						</button>
					</div>
				</form>
			</div>
		);

		this.setState({
			show: true,
			title: "Search Properties",
			body: myObject,
			// data: myObject,
		});
	};

	handleClose = (fromModal) => {
		// alert(fromModal.msg);

		this.setState({
			show: false,
		});
	};

	render() {
		// showing list of properties with link for more info
		// by looping through all the data was fetched from database

		return (
			<div>
				<Button variant="primary" onClick={this.handleShow}>
					Search Properties
				</Button>

				<MyModalComponent
					show={this.state.show}
					title={this.state.title}
					body={this.state.body}
					data={this.state.data}
					onClick={this.handleClose}
					onHide={this.handleClose}
				/>
			</div>
		);
	}
}

export default SearchProperties;
