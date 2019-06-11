import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { Button, Input, Icon } from "semantic-ui-react";
import Slider  from 'rc-slider';
import 'rc-slider/assets/index.css';

import { getSocket } from "../../store/socket"
import { getUserId } from "../../store/user"
import { getRoundId} from "../../store/round"

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);

const MAX = 10000
const MIN = 0
const DEFAULT = 1000
const STEPS = 100

const BetContainer = styled.div`
  background-color: #1245ff;
  padding: 10px 20px;
  height: 30vh;
  width: 30vw;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.75);
  @media only screen and (max-width: 600px){
    width: 80vw;
  }
`

const StyledButton = styled(Button)`
  color: ${(props) => props.primary ? "white": "#1245ff" } !important;
  width: 40%;
  margin: 0 auto !important;
  background-color: ${(props) => props.primary ? "#1245ff": "white" } !important;
  border: white solid 1px !important;
`
const CustomIcon = styled.div`
  font-size: 55px;
  color: white;
  cursor: pointer;
`
const OptionsBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 30px;
  height: 30%;
`
const Option = styled.div`
  width: 20%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: ${(props) => props.selected ? "2px solid white" : "0px solid white"};
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;

`
const StyledIcon = styled(Icon)`
  margin: 0 auto !important;
  cursor: pointer;
`
const OptionText = styled.div`
  color: white;
  opacity: 0.7;
  font-size: 20px;
`
class Bet extends Component {
  constructor(props){
    super(props)
    this.state = ({
      direction: "up",
      value: DEFAULT
    })
    this.canPlaceBet = true
    this.switchDirection = this.switchDirection.bind(this)
    this.updateBetValue = this.updateBetValue.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.placeBet = this.placeBet.bind(this)
  }

  updateBetValue(event){
    this.setState({
      value: event * 100
    })
  }

  increment(){
    if (this.state.value > MAX - STEPS){
       this.setState({
        value: MAX
      })
    } else {
      this.setState({
        value: this.state.value + STEPS
      })
    }
  }

  decrement(){
    if (this.state.value < MIN + STEPS){
      this.setState({
        value: MIN
      })
    } else {
      this.setState({
        value: this.state.value - STEPS
      })
    }
  }

  placeBet(){
    if(this.canPlaceBet){
      this.canPlaceBet = false
      this.props.socket.emit("placeBet", this.state.value, this.state.direction, this.props.userId, this.props.roundId)
      setTimeout(() => this.canPlaceBet = true , 1000)
    }
  }

  switchDirection(direction) {
    this.setState({
      direction: direction,
    })
  }

  render() {
    return (
      <BetContainer>
        <OptionsBox style={{height: "25%"}}>
          <StyledIcon inverted name='minus' size='big' onClick={this.decrement}/>
          <OptionText style={{opacity: 1}}>
            {this.state.value} SAT
          </OptionText>
          <StyledIcon inverted name='plus' size='big' onClick={this.increment}/>
        </OptionsBox>
        <Range min={MIN} max={MAX / 100 } value={this.state.value / 100} onChange={this.updateBetValue} />
        <OptionsBox>
          <Option selected={this.state.direction === "up"} onClick={() => {this.switchDirection("up")}}>
            <StyledIcon inverted  name='chevron up' size='big'  />
            <OptionText>Up</OptionText>
          </Option>
          <Option selected={this.state.direction === "equal"} onClick={() => {this.switchDirection("equal")}} >
            <CustomIcon>=</CustomIcon>
            <OptionText>Stay</OptionText>
          </Option>
          <Option selected={this.state.direction === "down"} onClick={() => {this.switchDirection("down")}} >
            <StyledIcon inverted name='chevron down' size='big' />
            <OptionText>Down</OptionText>
          </Option>
        </OptionsBox>
        {this.props.roundId && <StyledButton onClick={this.placeBet} >
          Place Bet
        </StyledButton>}
      </BetContainer>
      )
  }
}

const mapDispatchToProps = (dispatch) => ({

})

const mapStateToProps = (state) => ({
  socket: getSocket(state),
  userId: getUserId(state),
  roundId: getRoundId(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Bet)
