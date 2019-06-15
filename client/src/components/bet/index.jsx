import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { Button, Input, Icon } from "semantic-ui-react";
import Slider  from 'rc-slider';
import 'rc-slider/assets/index.css';

import PlaceBet from "./PlaceBet"
import ShowBet from "./ShowBet"

import { isBetPlaced } from "../../store/bet"

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);

const MAX = 10000
const MIN = 0
const DEFAULT = 1000
const STEPS = 100

class Bet extends Component {
  render() {
   return(
    <div>
      {this.props.betPlaced ? <ShowBet/> : <PlaceBet/>}
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  betPlaced: isBetPlaced(state)
})

export default connect(mapStateToProps)(Bet)
