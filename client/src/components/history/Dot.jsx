import React, {Component} from 'react';
import styled from "styled-components";



const Point = styled.div`
	height: 50px;
	width: 50px;
	border-radius: 50%;
	background-color: #1853FD;
	position: absolute;
	left: ${props => props.left}%
	-webkit-transform: translate(-50%, -50%); 
	top: ${props => props.top}%;
	transition: left 1s linear, top 0.5s ease;
	box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.75);
`

class Dot extends Component{
	render(){
		return(
			<Point left={this.props.left} top={this.props.top}>

			</Point>
			)
	}
}

export default Dot