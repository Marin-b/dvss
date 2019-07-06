import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

import Dot from "./Dot"
import { getBitCoinPriceHistory } from "../../store/round"
import { getTimer } from "../../store/timer"

const MAXTIMER = 5

const NEWDOTS = {
  x: 100 + (100/6),
  d: 'equal'
}

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: hidden;
`

const SecondaryContainer = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`

class DirectionContainer extends Component {
	constructor(props){
		super(props)
		const object = this.props.btcHistory
		this.timer = this.props.timer
		this.dots = []
		this.key = 0
		this.updateTimer = this.updateTimer.bind(this)
    this.updateDirection = this.updateDirection.bind(this)
    let mult = -(2 * (100 / 6))
    for (let i = 0; i <= 10; i ++){
      this.dots.push({...NEWDOTS, m: mult, key: this.key})
      mult += 100/6
      this.key += 1
    }
	}

	buildDots(){

	}

	getTopPos(dir){
	 	if (dir === 'up'){
	 		return 4
		} else if (dir === 'down'){
			return 85
		}else {
			return 40
		}
	}
  updateDirection(){
  }
	updateTimer(){
		this.timer = this.props.timer
		if (this.timer === 0){
		  this.dots.shift()
			this.dots.push({ d: 'equal', m: 100, x: 100 + 2 * (100/6), key: this.key})
			this.key += 1
      let mult = -(2 * (100 / 6))
      this.dots.forEach((dot) => {
        dot.m = mult
        dot.x = mult + 3.3 * 5
        mult += 100/6
      })
		} else {
      this.dots.forEach((dot) => {
        dot.x = dot.m + (3.33 * this.timer)
        this.dots[5].d = this.props.btcHistory.current.d
      })
    }
	}

	render(){
		if(this.timer !== this.props.timer){
			this.updateTimer()
		}
		return(
			<Container>
				<SecondaryContainer>
					{this.dots.map((dot) => <Dot left={dot.x - 4} top={this.getTopPos(dot.d)} key={dot.key} />)}
				</SecondaryContainer>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	btcHistory: getBitCoinPriceHistory(state),
	timer: getTimer(state)
})


export default connect(mapStateToProps)(DirectionContainer)
