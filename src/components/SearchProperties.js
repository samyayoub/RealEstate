// import { render } from "@testing-library/react";
import React, { Component } from "react";
import "../css/App.css";
import SelectUSState from "react-select-us-states";
import CurrencyFormat from "react-currency-format";
import { FcSearch } from "react-icons/fc";

import { Button, Modal, ButtonToolbar } from "react-bootstrap";

class MyVerticallyCenteredModal extends React.Component {
	constructor() {
		super();

		this.state = {
			city: "",
			state: "",
			zipCode: "",
			radius: "",
		};
	}

	render() {
		return (
			<Modal
				{...this.props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Enter your search criteria
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="listing-box">
						<form noValidate onSubmit={this.handleSubmit}>
							<label>
								Enter City:{" "}
								<input
									type="text"
									name="city"
									value={this.state.city}
									onChange={this.handleChange}
								/>
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
								Enter Zip Cose:{" "}
								<input
									type="number"
									name="zipCode"
									value={this.state.zipCode}
									onChange={this.handleChange}
								/>
							</label>
							<label>
								Enter radius:{" "}
								<select
									type="number"
									name="radius"
									value={this.state.radius}
									onChange={this.handleChange}
								>
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
								>
									<FcSearch /> Search Properties
								</button>
							</div>
						</form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

class SearchProperties extends Component {
	constructor() {
		super();

		this.state = {
			city: "",
			state: "",
			zipCode: "",
			radius: "",
			modalShow: false,
		};

		this.setNewValue = this.setNewValue.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		let tempValues = {
			city: this.state.city,
			state: this.state.state,
			zipCode: this.state.zipCode,
			radius: this.state.radius,
		};

		this.props.searchProperty(tempValues);

		// this.setState({
		// 	city: "",
		// 	state: "",
		// 	zipCode: "",
		// 	radius: "",
		// });
	}

	render() {
		let modalClose = () => this.setState({ modalShow: false });

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
					{/* Size: {property.building_size.size}{" "}
					{property.building_size.units} */}
				</h6>
				<h6>
					<b>Asking Price: </b>
					{/* <CurrencyFormat
						value={property.price}
						displayType={"text"}
						thousandSeparator={true}
						prefix={"$"}
					/> */}
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
				<ButtonToolbar>
					<Button
						variant="primary"
						onClick={() => this.setState({ modalShow: true })}
					>
						Search Properties
					</Button>

					<MyVerticallyCenteredModal
						show={this.state.modalShow}
						onHide={modalClose}
					/>
				</ButtonToolbar>

				{/* <div className="listing-box">
					<form noValidate onSubmit={this.handleSubmit}>
						<label>
							Enter City:{" "}
							<input
								type="text"
								name="city"
								value={this.state.city}
								onChange={this.handleChange}
							/>
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
							Enter Zip Cose:{" "}
							<input
								type="number"
								name="zipCode"
								value={this.state.zipCode}
								onChange={this.handleChange}
							/>
						</label>
						<label>
							Enter radius:{" "}
							<select
								type="number"
								name="radius"
								value={this.state.radius}
								onChange={this.handleChange}
							>
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
							>
								<FcSearch /> Search Properties
							</button>
						</div>
					</form>
				</div> */}
				{/* <div>{listProperties}</div> */}
			</div>
		);
	}
}

export default SearchProperties;
