import React, {Component} from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import ReverseDotBackground from "../../assets/ReverseDot.png"
import DotBackground from "../../assets/dot.png"
import colors from '../../style'

import { getTimer } from "../../store/timer"

const Point = styled.div`
  position: absolute;
  height: 100px;
  width: 100px;
  background-image: url(${props => props.direction !== undefined ? DotBackground : ReverseDotBackground});
  background-size: 100%;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  display: flex;
  align-items: center;
  justify-content: center;
  left: ${props => props.pos}%;
  transition: left 1s linear, top 0.5s;
  top: ${props => {switch(props.direction){
    case "up":
      return 25
    case "down":
      return 80
    default:
      return 50
  }}}%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`

class Dot extends Component{
  constructor(props){
    super(props)
    this.pos = 0 - (this.props.timer * 3.33)
    this.timer = undefined
  }

	render(){
    if (this.timer !== this.props.timer && this.props.timer !== 0){
      this.timer = this.props.timer
      this.pos += 3.33
    }
		return(
  			<Point pos={this.pos} direction={this.props.direction}>

  			</Point>
			)
	}
}

const mapStateToProps = (state) => ({
  timer: getTimer(state)
})

export default connect(mapStateToProps)(Dot)
