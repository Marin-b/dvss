import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

import { getBitCoinPriceHistory } from "../../store/round"

const Container = styled.div`
	width: 100%;
	height: 10%;
`
const Header = styled.div`
	width: 100%;
	height: 30px;
	border-radius: 0px 10px 10px 0px;
	display: flex;
	background-color: #B0B0B0;
	position: relative;
`
const Shadow = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 0px 10px 10px 0px;
	box-shadow: 7px 7px 13px -7px rgba(0,0,0,0.75);
	z-index: 10;
	position: absolute;
`
const SixtyP = styled.div`
	width: 60%;
	height: 100%;
	border-radius: 0px 10px 10px 0px;
	background-color: #e6e6e6;
	display: flex;
	color: black;
`
const FortyP = styled.div`
	text-align: center; 
	color: ${(props) => props.color};
	width: 40%;
	display: flex;
	align-items: center;
	justify-content: center;
`
const SubSixty = styled.div`
	width: 50%;
	height: 100%;
	border-radius: 0px 10px 10px 0px;
	box-shadow: 7px 0px 13px -7px rgba(0,0,0,0.75);
	display: flex;
	align-items: center;
	justify-content: center;
`
const Content = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
`
const ThirtyP = styled.div`
	width: 30%;
	display: flex;
	align-items: center;
	justify-content: center;
`

class ValueDisplay extends Component {
	render(){
		return (
			<Container>
				<Header>
					<SixtyP>
						<SubSixty>
							-20s
						</SubSixty>
						<SubSixty>
							-10s
						</SubSixty>
					</SixtyP>
					<FortyP color="black">
						NOW
					</FortyP>
					<Shadow />
				</Header>
				<Content>
					<ThirtyP>
						{this.props.btcHistory.twenty.v} USD
					</ThirtyP>
					<ThirtyP>
						{this.props.btcHistory.ten.v} USD
					</ThirtyP>
					<FortyP color="black">
						{this.props.btcHistory.current.v} USD
					</FortyP>
				</Content>
			</Container>
			)
	}
}
const mapStateToProps = (state) => ({
	btcHistory: getBitCoinPriceHistory(state)
})
export default connect(mapStateToProps)(ValueDisplay)