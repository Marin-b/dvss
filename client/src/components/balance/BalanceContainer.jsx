import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import styled from "styled-components";
import { Button, Input } from "semantic-ui-react";

import { isUserConnected,
         getBalance,
         getUserName,
         getUserId,
       } from "../../store/user"
import { getSocket } from "../../store/socket"

const Header = styled.div`
  font-size: 40px;
  color: #1245ff;
  padding: 20px;
`

const BalanceBox = styled.div`
  background-color: #1245ff;
  padding: 20px;
  height: 25vh;
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
const ActionContainer = styled.div`
  display:flex;
  margin: 0 auto;
  width: 80%;
  justify-content: space-between;
`
const BalanceText = styled.div`
  color: white;
  font-size: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`
const StyledButton = styled(Button)`
  color: ${(props) => props.primary ? "white": "#1245ff" } !important;
  width: 40%;
  margin-left: 5%;
  background-color: ${(props) => props.primary ? "#1245ff": "white" } !important;
  border: white solid 1px !important;
`

const StyledInput = styled(Input)`
  width: 50%;
  margin: 0 auto;
`

class BalanceContainer extends Component {
  constructor(props) {
    super(props)
    this.handleDeposit = this.handleDeposit.bind(this)
    this.checkInputValidity = this.checkInputValidity.bind(this)
    this.amountInput = React.createRef()
  }

  checkInputValidity() {
    this.amountInput.current.inputRef.current.value=this.amountInput.current.inputRef.current.value.replace(/[^\d]/,'')
  }

  handleDeposit() {
    if(this.props.userId){
      this.props.socket.emit("newDeposit", this.amountInput.current.inputRef.current.value, this.props.userId)
    }
  }

  render () {
    return (
      <div>
        <BalanceBox>
          <BalanceText>
            Balance: &nbsp;
            <b> {this.props.balance}</b>
          </BalanceText>
            <br />
          <StyledInput onKeyUp ={this.checkInputValidity} ref={this.amountInput} />
          <ActionContainer>
            <StyledButton onClick={this.handleDeposit}>
              Deposit
            </StyledButton>
            <StyledButton primary >
              Withdraw
            </StyledButton>
          </ActionContainer>
        </BalanceBox>
      </div>
      )
  }
}

const mapStateToProps = (state) => ({
  isConnected: isUserConnected(state),
  balance: getBalance(state),
  socket: getSocket(state),
  userName: getUserName(state),
  userId: getUserId(state),
})

export default connect(mapStateToProps)(BalanceContainer)
