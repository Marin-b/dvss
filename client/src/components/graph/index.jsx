import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

//import ValueDisplay from "./ValueDisplay"
import GraphOutline from "./Outline"
import Dot from "./Dot"
import { getValues } from "../../store/round"

const Container = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
`

class Graph extends Component {
  constructor(props) {
    super(props)
    this.values = []
    this.keyPoints = []
    this.key = 0
  }

  getDirectionFromValues = () => {
    if (this.values[0] > this.values[1]){
      return "up"
    } else if (this.values[0] < this.values[1]){
      return "down"
    } else {
      return "equal"
    }
  }
  updateKeyPoints = () => {
    if(this.values.length !== 0){this.keyPoints.unshift({d: undefined, k: this.key})}
    this.values = this.props.values
    if(this.keyPoints.length > 8) {
      this.keyPoints.pop();
    }
    this.key += 1;
    if(this.keyPoints.length > 3) {
      this.keyPoints[3].d = this.getDirectionFromValues()
    }
  }

	render(){
    if (this.values !== this.props.values) {
      this.updateKeyPoints()
    }
		return(
      <Container >
			 <GraphOutline />
       {this.keyPoints.map((point) => {
        return <Dot key={point.k} direction={point.d} />
       })}
      </Container>
		)
	}
}
const mapStateToProps = (state) => ({
  values: getValues(state)
})
export default connect(mapStateToProps)(Graph)
