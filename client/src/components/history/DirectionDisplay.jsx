import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

import DirectionContainer from "./DirectionContainer"

const Container = styled.div`
	width: 100%;
	height: 85%;
`
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 10%;
`

const HeaderLabel = styled.div`
	text-align: center;
	width: 10%;
	color: #B0B0B0;
	font-size: 20px;
`

const GraphContainer = styled.div`
	height: 90%;
	border: #1853FD solid 1px !important;
	border-radius: 20px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	position: relative;
`

const DottedLineContainer = styled.div`
	height: 100%;
	width: 10%;
`

const DottedLine = styled.div`
	width: 50%;
	height: 100%;
	border-right: 2px dotted #B0B0B0;
`
class DirectionDisplay extends Component {
	render(){
		return(
			<Container>
				<Header>
					<HeaderLabel>
						-30s
					</HeaderLabel>
					<HeaderLabel>
						-20s
					</HeaderLabel>
					<HeaderLabel>
						-10s
					</HeaderLabel>
					<HeaderLabel>
						0s
					</HeaderLabel>
					<HeaderLabel>
						10s
					</HeaderLabel>
				</Header>
				<GraphContainer>
					<DottedLineContainer>
						<DottedLine />
					</DottedLineContainer>
					<DottedLineContainer>
						<DottedLine />
					</DottedLineContainer>
					<DottedLineContainer>
						<DottedLine />
					</DottedLineContainer>
					<DottedLineContainer>
						<DottedLine />
					</DottedLineContainer>
					<DottedLineContainer>
						<DottedLine />
					</DottedLineContainer>
					<DirectionContainer />
				</GraphContainer>
			</Container>
		)
	}	
}

export default DirectionDisplay