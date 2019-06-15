import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

import { getTimer } from "../../store/timer"

const TimerBox = styled.div`
  color: #1853FD;
  font-size: 100px;
  margin: 40px 0;
`
class Timer extends Component{
  render () {
    return(
      <TimerBox>
        {this.props.timer} Sec
      </TimerBox>
    )
  }
}

const mapStateToProps = (state) => ({
  timer: getTimer(state)
})

export default connect(mapStateToProps)(Timer)
