import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { getBalance } from "../../store/user"
import { getCurrentBtc } from "../../store/round"
import colors from "../../style"

const BalanceText = styled.div`
  color: ${colors.secondary};
  font-size: 24px;
  display: flex;
  width: 100%;
  margin: 0 auto;
`

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
class Balance extends Component{
  render (){
    return(
      <Container>
        <BalanceText>
            <b> {this.props.balance}</b>&nbsp; SAT
        </BalanceText>
        <BalanceText style={{opacity: "0.8", fontSize: '20px'}}>
          <b> {Math.floor(((this.props.balance/100000000) * this.props.current) * 100) / 100}</b> &nbsp;USD
        </BalanceText>
      </Container>
      )
  }
}

const mapStateToProps = (state) =>({
  balance: getBalance(state),
  current: getCurrentBtc(state) || 0
})
export default connect(mapStateToProps)(Balance)
