import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import colors from "../../style"
import { getTimer } from "../../store/timer"

const TimerBox = styled.div`
  color: ${colors.secondary};
  font-size: 50px;
  font-family: 'Press Start 2P', cursive;
  padding-right: 10px;
`
const SecBox = styled.div`
  font-size: 40px;
  color: ${colors.secondary};
  font-family: 'Press Start 2P', cursive;
`
class Timer extends Component{
  render () {
    return(
      <span style={{display: "flex", alignItems: "center"}}>
        <TimerBox>
          {this.props.timer}
        </TimerBox>
        <SecBox>
          Sec
        </SecBox>
      </span>
    )
  }
}

const mapStateToProps = (state) => ({
  timer: getTimer(state)
})

export default connect(mapStateToProps)(Timer)
