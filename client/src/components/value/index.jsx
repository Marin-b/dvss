import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import colors from "../../style"
import { getStartValue } from "../../store/bet"
import { getValue } from "../../store/value"

const ValueBox = styled.div`
  color: ${props => props.increase ? colors.orange : colors.secondary};
  font-size: ${(props) => props.minimize ? 10 : 50}px;
  font-family: 'Press Start 2P', cursive;
  padding-right: 10px;
  transition: 5s font-size linear, margin-left 5s linear;
  margin-left: ${(props) => props.minimize ? 50 : 0}%;
`
const UsdBox = styled.div`
  font-size: ${(props) => props.minimize ? 0 : 40}px;
  color: ${props => props.increase ? colors.secondary : colors.quaternary};
  font-family: 'Press Start 2P', cursive;
  transition: 5s font-size linear;
`

const TagDiv = styled.div`
  display: inline-flex;
  align-items: center;
  opacity: ${(props) => props.minimize ? 0 : 1};
  position: absolute;
  left: 0;
  bottom: ${(props) => props.minimize ? 200 : 0}px;
  transition: 5s bottom linear, 5s opacity linear;
`

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class ValueTag extends Component{
  constructor(props)
  {
    super(props);
    this.value = this.props.value;
    this.minimize = false;
  }

  componentDidMount()
  {
    sleep(500).then(() => {
      this.minimize = this.props.shouldMin ? true : false;
    })
  }

  render()
  {
    return(
      <TagDiv minimize={this.minimize} >
        <ValueBox minimize={this.minimize} increase={this.value > this.props.startValue}>
          {this.value}
        </ValueBox>
      </TagDiv>
    )
  }
}

class Value extends Component{
  constructor(props)
  {
    super(props);
    this.values = [];
    this.key = 0;
    this.updateValues = this.updateValues.bind(this);
  }

  updateValues(){
    this.values.unshift({value: this.props.value, key: this.key})
    this.key += 1;
    if (this.values.length > 10)
    {
      this.values.pop();
    }
    this.forceUpdate();
    if (!this.props.placedBet)
    {
      console.log("clearing interval")
      clearInterval(this.interval);
    }
  }

  componentDidMount()
  {
   this.interval = setInterval(this.updateValues, 1000)
  }


  render () {
    return(
      <div style={{position: "relative", width: "400px", height: "10vh"}}>
      {this.values.map(val => {
        return <ValueTag key={val.key} value={val.value} startValue={this.props.startValue} shouldMin={this.props.placedBet}/>
      })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  startValue: getStartValue(state),
  value: getValue(state)
})

export default connect(mapStateToProps)(Value)
