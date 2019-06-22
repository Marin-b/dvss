import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

import Dot from "./Dot"
import { getBitCoinPriceHistory } from "../../store/round"
import { getTimer } from "../../store/timer"


const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 0 5%;
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
		this.dots = [{ ...object.twenty, m: -25, x: 0, key: 0}, { ...object.ten, m: 0, x: 0, key: 1}, {...object.current, m: 25 , x: 0, key: 2}, { ...object.next, m: 50, x: 0, key: 3}, { ...object.next, m: 75, x: 0, key: 4}, { ...object.next, m: 100, x: 0, key: 5}]
		this.key = 6
		this.updateTimer = this.updateTimer.bind(this)
	}

	buildDots(){
		
	}

	getYPosition(direction){
		if (direction === 'up'){
			return 5
		} else if (direction === 'equal') {
			return 15
		} else if (direction === 'down') {
			return 25
		}
	}
	getTopPos(dir){
	 	if (dir === 'up'){
	 		return 10
		} else if (dir === 'down'){
			return 90
		}else {
			return 45
		}
	}

	updateTimer(){
		this.timer = this.props.timer
		if (this.timer === 0){
			this.dots.shift()
			this.dots.push({ d: 'equal', v: '?', m: 125, x: 125 + (2.5 * 10), key: this.key})
			this.key += 1 
		}
		this.dots.forEach((dot) => {
			dot.x = dot.m + (2.5 * this.timer)
			if(dot.x <= 0) {
				dot.m = -25
			} else if (dot.x <= 25) {
				dot.m = 0
			} else if (dot.x <= 50){
				dot.m = 25
			} else if (dot.x <= 75 ){
				dot.m = 50
			} else if (dot.x <= 100 ){
				dot.m = 75
			} else if (dot.x <= 125 ){
				dot.m = 100
			}
			if (dot.x <= 72.5 && dot.x >= 55){
				dot.d = this.props.btcHistory.current.d
			}
		})
	}

	render(){
		if(this.timer !== this.props.timer){
			this.updateTimer()
		}
		return(
			<Container>
				<SecondaryContainer>
					{this.dots.map((dot) => <Dot left={dot.x} top={this.getTopPos(dot.d)} key={dot.key} />)}
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