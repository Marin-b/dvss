import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import colors from "../../style"
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
	width: 0%;
  margin-left: -5%;
	color: ${colors.tertiary};
	font-size: 20px;
`

const GraphContainer = styled.div`
	height: 90%;
	border: ${colors.secondary} solid 5px !important;
	width: 100%;
	display: flex;
	justify-content: space-between;
	position: relative;
`

const DottedLineContainer = styled.div`
	height: 100%;
	width: 0%;
`

const DottedLine = styled.div`
	width: 50%;
	height: 100%;
	border-right: 2px dotted ${colors.tertiary};
`
class DirectionDisplay extends Component {
	render(){
		return(
			<Container>
				<Header>
					<HeaderLabel>

					</HeaderLabel>
					<HeaderLabel>
						-15s
					</HeaderLabel>
					<HeaderLabel>
						-10s
					</HeaderLabel>
					<HeaderLabel>
						-5s
					</HeaderLabel>
					<HeaderLabel>
						0s
					</HeaderLabel>
          <HeaderLabel>
            5s
          </HeaderLabel>
          <HeaderLabel>

          </HeaderLabel>
				</Header>
				<GraphContainer>
					<DottedLineContainer>

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
          <DottedLineContainer>
            <DottedLine />
          </DottedLineContainer>
          <DottedLineContainer>

          </DottedLineContainer>
					<DirectionContainer />
				</GraphContainer>
			</Container>
		)
	}
}

export default DirectionDisplay
