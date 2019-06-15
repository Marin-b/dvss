import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

import { getResult } from "../../store/round"

const ResultBox = styled.div`
  width: 35%;
  height: 150px;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  div{
    margin: 0 auto;
  }
`

class Result extends Component{
  constructor(props){
    super(props)
    this.boxContent = this.boxContent.bind(this)
  }
  boxContent(){
    if(this.props.result.dir === "up"){
      return(<div>Increased by {this.props.result.diff}</div>)
    } else if (this.props.result.dir === "down"){
      return(<div>Decreased by {this.props.result.diff}</div>)
    } else{
      return(<div> Stayed the same</div>)
    }
  }
  render () {
    return(
      <ResultBox>
        { this.boxContent()}
      </ResultBox>
    )
  }
}

const mapStateToProps = (state) => ({
  result: getResult(state)
})

export default connect(mapStateToProps)(Result)
