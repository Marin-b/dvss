import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { Button, Input } from "semantic-ui-react";
import { getUserId } from "../../store/user"
import { getSocket } from "../../store/socket"
import colors from "../../style"

const StyledButton = styled(Button)`
  color: ${colors.tertiary} !important;
  width: 60%;
  margin-left: 5%;
  background-color: ${(props) => props.primary ? colors.primary: colors.secondary } !important;

`

const StyledInput = styled(Input)`
  width: 80%;
`

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

class Withdraw extends Component{
  constructor(props){
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

  render(){
    return(
      <Container>
        <StyledInput ref={this.amountInput} onKeyUp={this.checkInputValidity} placeholder="Amount" />
        <StyledButton onClick={this.handleDeposit}>
          Withdraw
        </StyledButton>
      </Container>
      )
  }
}

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  socket: getSocket(state)
})

export default connect(mapStateToProps)(Withdraw)
