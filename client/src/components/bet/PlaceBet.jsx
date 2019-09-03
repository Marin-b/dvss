import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { Button, Input, Icon } from "semantic-ui-react";
import Slider  from 'rc-slider';
import 'rc-slider/assets/index.css';

import Dollar from "../../assets/dollar.png"
import Bitcoin from "../../assets/bitcoin.png"
import equalSign from "../../assets/Equal.png"
import colors from "../../style";
import { getSocket } from "../../store/socket"
import { getUserId, getPayreq } from "../../store/user"


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);

const MAX = 100
const MIN = 0
const DEFAULT = 1000
const STEPS = 100

const BetContainer = styled.div`
  background-color: ${colors.primary};
  padding: 10px 20px;
  height: 40vh;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const DownIcon = styled.div`
  background-image: url(${Dollar});
  height: 100px;
  background-size: cover;
  image-rendering: pixelated;
  width: 100px;
  background-position: center;
`

const UpIcon = styled.div`
  background-image: url(${Bitcoin});
  height: 100px;
  background-size: cover;
  image-rendering: pixelated;
  width: 100px;
  background-position: center;
`

const EqualIcon = styled.div`
  background-image: url(${equalSign});
  height: 100px;
  background-size: cover;
  image-rendering: pixelated;
  width: 100px;
  background-position: center;
`

const StyledButton = styled(Button)`
  color: ${(props) => props.primary ? "white": colors.secondary } !important;
  margin: 0 auto !important;
  background-color: ${(props) => props.primary ? colors.secondary: "white" } !important;
  border: ${(props) => props.primary ? colors.secondary: "white"  } solid 1px !important;
  border-radius: 0px !important;
  font-family: 'Press Start 2P', cursive !important;
  font-size: 15px !important;
  min-height: 20% !important;
`

const Highlight = styled.div`
  border: 4px solid white
  width: 30%;
  height: 100%;
  position: absolute;
  transition: left 0.5s linear;
  left: ${props => {switch (props.position){
      case "up":
        return "1"
      case "equal":
        return "35"
      default:
        return "69"
    }}}%;
`
const OptionsBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30%;
`
const Option = styled.div`
  width: 30%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border:  4px solid transparent;
  padding: 5px;
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
class PlacedBet extends Component {
  constructor(props){
    super(props)
    this.state = ({
      direction: "up",
      value: DEFAULT,
      buttonHover: false
    })
    this.canPlaceBet = true
    this.switchDirection = this.switchDirection.bind(this)
    this.updateBetValue = this.updateBetValue.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.placeBet = this.placeBet.bind(this)
    this.toggleButtonHover = this.toggleButtonHover.bind(this)
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
      this.props.socket.emit("placeBet", this.state.value, this.state.direction, this.props.userId)
      setTimeout(() => this.canPlaceBet = true , 1000)
    }
  }

  toggleButtonHover(){
    this.setState({buttonHover: !this.state.buttonHover})
  }

  switchDirection(direction) {
    this.setState({
      direction: direction,
    })
  }

  render() {
    return (
      <BetContainer>
        <div>
          <div style={{opacity: 1, fontFamily: "'Press Start 2P', cursive", color: "white", fontSize: "20px", paddingBottom: "10px"}}>
            {this.state.value} SAT
          </div>
          <Range min={MIN} max={MAX} value={this.state.value / 100} onChange={this.updateBetValue} />
        </div>
        <OptionsBox style={{position: "relative"}}>
          <Highlight position={this.state.direction}/>
          <Option selected={this.state.direction === "up"} onClick={() => {this.switchDirection("up")}}>
            <UpIcon />
          </Option>
          <Option selected={this.state.direction === "equal"} onClick={() => {this.switchDirection("equal")}} >
            <EqualIcon />
          </Option>
          <Option selected={this.state.direction === "down"} onClick={() => {this.switchDirection("down")}}>
            <DownIcon />
          </Option>
        </OptionsBox>
        <StyledButton onClick={this.placeBet} primary={this.state.buttonHover} onMouseEnter={this.toggleButtonHover} onMouseLeave={this.toggleButtonHover} >
          Play
        </StyledButton>
      </BetContainer>
      )
  }
}

const mapDispatchToProps = (dispatch) => ({

})

const mapStateToProps = (state) => ({
  socket: getSocket(state),
  userId: getUserId(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(PlacedBet)
