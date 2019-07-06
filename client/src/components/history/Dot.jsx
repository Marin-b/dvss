import React, {Component} from 'react';
import styled from "styled-components";

import colors from '../../style'

const Point = styled.div`
	position: absolute;
	left: ${props => props.left}%
	top: ${props => props.top}%;
	transition: left 1s linear, top 0.5s ease;
  box-shadow: 15px 5px 0 0 ${colors.secondary}, 20px 5px 0 0 ${colors.secondary}, 25px 5px 0 0 ${colors.secondary}, 10px 10px 0 0 ${colors.secondary}, 15px 10px 0 0 ${colors.secondary}, 20px 10px 0 0 ${colors.secondary}, 25px 10px 0 0 ${colors.secondary}, 30px 10px 0 0 ${colors.secondary}, 5px 15px 0 0 ${colors.secondary}, 10px 15px 0 0 ${colors.secondary}, 15px 15px 0 0 ${colors.secondary}, 20px 15px 0 0 ${colors.secondary}, 25px 15px 0 0 ${colors.secondary}, 30px 15px 0 0 ${colors.secondary}, 35px 15px 0 0 ${colors.secondary}, 5px 20px 0 0 ${colors.secondary}, 10px 20px 0 0 ${colors.secondary}, 15px 20px 0 0 ${colors.secondary}, 20px 20px 0 0 ${colors.secondary}, 25px 20px 0 0 ${colors.secondary}, 30px 20px 0 0 ${colors.secondary}, 35px 20px 0 0 ${colors.secondary}, 5px 25px 0 0 ${colors.secondary}, 10px 25px 0 0 ${colors.secondary}, 15px 25px 0 0 ${colors.secondary}, 20px 25px 0 0 ${colors.secondary}, 25px 25px 0 0 ${colors.secondary}, 30px 25px 0 0 ${colors.secondary}, 35px 25px 0 0 ${colors.secondary}, 10px 30px 0 0 ${colors.secondary}, 15px 30px 0 0 ${colors.secondary}, 20px 30px 0 0 ${colors.secondary}, 25px 30px 0 0 ${colors.secondary}, 30px 30px 0 0 ${colors.secondary}, 15px 35px 0 0 ${colors.secondary}, 20px 35px 0 0 ${colors.secondary}, 25px 35px 0 0 ${colors.secondary};
	-webkit-transform: translate(-100%, -100%);
  transform: translate(-50%, -50%);
  height: 5px;
  width: 5px;
  display: inline-block;
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
