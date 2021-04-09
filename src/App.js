import { Component } from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCheck, faTrashAlt);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: '',

			userOptions: [
				{
					name: 'All',
					value: null,
				},
				{
					name: 'Completed',
					value: 'completed',
				},
				{
					name: 'Uncompleted',
					value: 'incomplete',
				},
			],
			userItems: [],
			selectedUserOption: null,
		};
	}

	handleChange = (e) => {
		this.setState({
			userInput: e.target.value,
		});
	};

	handleAdd = () => {
		const { userInput } = this.state;
		let newUserInput;
		if (userInput === '') {
			return;
		} else {
			newUserInput = userInput[0].toUpperCase() + userInput.slice(1);
		}

		const { userItems } = this.state;
		const indexAsID = userItems.length;

		const itemObject = {
			id: indexAsID,
			value: newUserInput,
			status: 'incomplete',
		};

		userItems.push(itemObject);

		this.setState({
			userItems: userItems,
			userInput: '',
		});
	};

	handleComplete = (itemId) => {
		let { userItems } = this.state;
		const item = userItems.find((userItem) => {
			return userItem.id === itemId;
		});

		if (!item) {
			return;
		}

		item.status = 'completed';

		this.setState((state) => ({
			userItems: userItems,
		}));
	};

	handleDelete = (itemId) => {
		const { userItems } = this.state;

		const item = userItems.find((item) => {
			return item.id === itemId;
		});

		if (!item) {
			return;
		}
		let newUserIndex = userItems.indexOf(item);

		userItems.splice(newUserIndex, 1);

		this.setState({
			userItems: userItems,
		});
	};

	handleSelect = (e) => {
		const index = e.target.value;
		const getOptions = this.state.userOptions[index];
		this.setState({
			selectedUserOption: getOptions.value,
		});
	};

	render() {
		console.log('submit =>', this.state.userItems);

		// let listItems =

		return (
			<div>
				<section className='section'>
					<div className='container'>
						<div>
							<h1 className='header'>
								<strong>Enter your activities</strong>
							</h1>

							<br />
							<div className='all'>
								<input
									className='input'
									type='text'
									value={this.state.userInput}
									onChange={this.handleChange}
								/>
								<button className='button' onClick={this.handleAdd}>
									Submit
								</button>
								<div className='select is-rounded'>
									<select onChange={this.handleSelect} className='is-hovered'>
										{this.state.userOptions.map((item, index) => (
											<option key={index} value={index}>
												{item.name}
											</option>
										))}
									</select>
								</div>
								<br />
								<div>
									<br />
									<h3 className='header'>
										<strong>My "To-Do" List</strong>
									</h3>
									<br />
									{this.state.userItems
										.filter((userItem) => {
											if (!this.state.selectedUserOption) {
												return true;
											} else {
												return (
													userItem.status === this.state.selectedUserOption
												);
											}
										})
										.map((item) => {
											return (
												<div key={item.id}>
													<p
														className='activity'
														style={{
															color:
																item.status === 'incomplete' ? 'blue' : 'red',
														}}>
														{item.value}
														<button
															type='button'
															className='button buttonAct'
															onClick={() => this.handleComplete(item.id)}>
															<FontAwesomeIcon icon='check' size='2x' />
														</button>
														<button
															type='button'
															className='button buttonDel'
															onClick={() => this.handleDelete(item.id)}>
															<FontAwesomeIcon icon='trash-alt' size='2x' />
														</button>
													</p>
												</div>
											);
										})}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default App;
