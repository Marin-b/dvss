import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import colors from "../../style"
import Dot from "./Dot"

const Container = styled.div`
	width: 100%;
	height: 100%;
  margin-top: 40px;
`

const GraphContainer = styled.div`
	height: 100%;
	border-bottom: ${colors.secondary} solid 5px !important;
	width: 100%;
	display: flex;
	justify-content: space-between;
	position: relative;
`

const DottedLineContainer = styled.div`
	height: 100%;
  text-align: center;
`
const Header = styled.div`
  height: 40px
  text-align: center;
  color: ${colors.tertiary};
  font-size: 20px;
`
const DottedLine = styled.div`
	width: 50%;
	height: 85%;
	border-right: 2px dotted ${colors.tertiary};
`
class GraphOutline extends Component {
	render(){
		return(
			<Container>
				<GraphContainer>
					<DottedLineContainer>
					</DottedLineContainer>
					<DottedLineContainer>
            <Header>
              -5s
            </Header>
						<DottedLine />
					</DottedLineContainer>
					<DottedLineContainer>
            <Header>
              0s
            </Header>
            <DottedLine />
					</DottedLineContainer>
					<DottedLineContainer>
            <Header>
              5s
            </Header>
            <DottedLine />
					</DottedLineContainer>
					<DottedLineContainer>
            <Header>
              10s
            </Header>
            <DottedLine />
					</DottedLineContainer>
          <DottedLineContainer>
            <Header>
              15s
            </Header>
            <DottedLine />
          </DottedLineContainer>
          <DottedLineContainer>

          </DottedLineContainer>

				</GraphContainer>
			</Container>
		)
	}
}

export default GraphOutline
