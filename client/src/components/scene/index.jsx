import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import colors from "../../style"
import Value from "../value"
import { getStartValue, isBetPlaced, shouldDisplayScene, getBetResult } from "../../store/bet"

const SceneWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80vw;
  height: 50%;
  position: absolute;
  margin: 10vh 10vw;
  min-height: 100px;
  border-radius: 5px;
  background-color: ${colors.primary};
  text-align: center;
  padding: 10px 20px;
  opacity: 1;
  z-index: 200;
  box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.75);
  @media only screen and (max-width: 600px){
    width: 80vw;
    margin: 10vh 0;
  }
`
const BlackBackground = styled.div`
  background-color: #B0B0B0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  opacity: 0.5;
`

const StartValue = styled.div`
  color: ${colors.secondary};
  font-size: 50px;
  font-family: 'Press Start 2P', cursive;
  padding-right: 10px;
  transition: 5s font-size linear, margin-left 5s linear;
  bottom: 0px;
  position: absolute
`

class Scene extends Component {
  constructor(props)
  {
    super(props);
  }

  render()
  {
    if (!this.props.shouldDisplayScene)
    {
      return (<div />);
    }
    return(
      <div>
      {this.props.betResult && <div> {this.props.betResult} </div>}
       <SceneWrapper>
       <div style={{width: "400px", height: "10vh", position: "relative"}}>
        <StartValue>
          {this.props.startValue}
        </StartValue>
      </div>
      <Value placedBet={this.props.placedBet} />
      </SceneWrapper>
      <BlackBackground />
    </div>
    )
  }
}

const mapStateToProps = (state) =>
({
  startValue: getStartValue(state),
  placedBet: isBetPlaced(state),
  shouldDisplayScene: shouldDisplayScene(state),
  betResult: getBetResult(state)
})

export default connect(mapStateToProps)(Scene)
