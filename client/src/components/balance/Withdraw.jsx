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
    this.handleWithdraw = this.handleWithdraw.bind(this)
    this.amountInput = React.createRef()
  }

  handleWithdraw() {
    this.props.socket.emit("newWithdrawal", this.amountInput.current.inputRef.current.value, this.props.userId )
  }

  render(){
    return(
      <Container>
        <StyledInput ref={this.amountInput}  placeholder="Amount" />
        <StyledButton onClick={this.handleWithdraw}>
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
