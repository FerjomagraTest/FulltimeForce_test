import React, {Component} from 'react'
import MachuPicchu from '../assets/965.jpg'

export default class CardsList extends Component{
	render(){
		return(
			<div className="card col-md-6">
				<img src={MachuPicchu} alt=""/>
				<div className="card-body">
					<h4 className="card-title"> My title</h4>
					<p className="card-text-secondary">Use the Google Maps Area Calculator Tool to draw an area on a map and find out the measurement of the enclosed area. Click on the map to start drawing</p>
				</div>
			</div>
		)
	}
}