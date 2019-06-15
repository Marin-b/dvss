import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

import { getBetAmount } from "../../store/bet"
import { getBetDirection } from "../../store/bet"


const BetContainer = styled.div`
  background-color: #1853FD;
  padding: 10px 20px;
  height: 30vh;
  width: 30vw;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: white;
  font-size: 30px;
  line-height: 5px;
  box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.75);
  @media only screen and (max-width: 600px){
    width: 80vw;
  }
`

class ShowBet extends Component{
	render() {
	return(
		<BetContainer>
			You bet { this.props.betAmount } on {this.props.betDirection}
		</BetContainer>
		)
	}
}

const mapStateToProps = (state) => ({
	betAmount: getBetAmount(state),
	betDirection: getBetDirection(state)
})

export default connect(mapStateToProps)(ShowBet)