import React, {Component} from 'react';
import Card from './cards-component'
import axios from 'axios';

import '../App.css'

const Commits = props=>(
		<h4>{props.commits._id}</h4>
)

export default class Commitslist extends Component{

	constructor(props){
		super(props);

		this.state = {commit: []};
	}

	componentDidMount(){
		axios.get('http://localhost:8080/')
		.then(response=>{
			this.setState({commit: response.data})
		})
		.catch((error)=>{
			console.log(error);
		})
	}

	commitsList(){
		return this.state.commit.map(currentcommit=>{
			return <Commits commits={currentcommit}/>
		})
	}

	render(){
		return(
		<div className="container d-flex justify-content-center align-items-center h-100">
			<div className="row">
				<div className="col-md-4">
					{ this.commitsList() }
				</div>
				<div className="col-md-4">
					<Card/>
				</div>

				<div className="col-md-4">
					<Card/>
				</div>
				
			</div>
		</div>
		)
	}

}