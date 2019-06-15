import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { Button, Input } from "semantic-ui-react";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import { getSocket } from "../../store/socket"

const BlackBackground = styled.div`
  background-color: #B0B0B0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  opacity: 0.5;
`
const ModalDiv = styled.div`
  width: 50vw;
  position: absolute;
  margin: 10vh 25vw;
  min-height: 100px;
  border-radius: 10px;
  background-color: white;
  text-align: center;
  padding: 10px 20px;
  opacity: 1;
  z-index: 200;
  box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.75);
  @media only screen and (max-width: 600px){
    width: 80vw;
    margin: 10vh 0;
  }
`
const Welcome = styled.h3`
  font-size: 20px;
  color: #B0B0B0;
  opacity: 1;
`
const InlineForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
`
const StyledInput = styled(Input)`
  width: 70%;
`
const StyledButton = styled(Button)`
  color: ${(props) => props.primary ? "white": "#1853FD" } !important;
  width: 20%;
  margin-left: 5%;
  background-color: ${(props) => props.primary ? "#1853FD": "white" } !important;
  border: #1853FD solid 1px !important;
  &:active{
    border-radius: 20px;
  }
`
class LoginModal extends Component{
  constructor(props){
    super(props)
    this.signupRef = React.createRef();
    this.loginRef = React.createRef();
    this.socket = this.props.socket
    this.handleUserCreation = this.handleUserCreation.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      error: false
    }
  }

  componentDidMount() {
    this.socket.on("unableToConnect", () => {
      this.setState({error: true})
    })
  }
  handleUserCreation(){
    const nickName = this.signupRef.current.inputRef.current.value
    if(nickName !== ""){
      const key = crypto.randomBytes(16).toString('hex')
      const socket = this.socket
      prompt("keep this key private, you will need it to load your balance if you decide to come back another time:\n\n", nickName + "-" + key)
      bcrypt.hash(key, 12).then((hashedKey) =>{
        socket.emit("createUser", nickName, hashedKey)
     })
    }
  }

  handleLogin() {
    const socket = this.socket
    const key = this.loginRef.current.inputRef.current.value
    socket.emit("userConnecting", key)
  }

  render(){
    return (
      <div>
        <ModalDiv>
          <Welcome>
            Welcome to <b style={{color: "#1853FD", fontWeight: "1000"}}>dvss</b>, <br /> please login or create an account
          </Welcome>
          <InlineForm>
            <StyledInput placeholder="Nickname" ref={this.signupRef} />
            <StyledButton primary onClick={this.handleUserCreation} >
              Create
            </StyledButton>
          </InlineForm>
          <br />
          { this.state.error && <p>Unable to connect, check your key and try again </p>}
          <InlineForm>
            <StyledInput placeholder="Hash key" ref={this.loginRef} />
            <StyledButton secondary onClick={this.handleLogin} >
              Login
            </StyledButton>
          </InlineForm>
        </ModalDiv>
        <BlackBackground />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  socket: getSocket(state)
})
export default connect(mapStateToProps)(LoginModal)
