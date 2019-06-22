import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

//import ValueDisplay from "./ValueDisplay"
import DirectionDisplay from "./DirectionDisplay"


const Container = styled.div`
	width: 60%;
	height: 60vh;
`

class History extends Component {
	render(){
		return(
			<Container>
				<DirectionDisplay />
			</Container>
		)
	}	
}

export default History