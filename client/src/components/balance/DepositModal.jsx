import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import colors from "../../style"
import { updatePayreq, getPayreq } from "../../store/user"

const TransparentBackground = styled.div`
  background-color: transparent;
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
  top: 10vh;
  left: 25vw;
  min-height: 100px;
  border-radius: 10px;
  background-color: ${colors.secondary};
  text-align: center;
  padding: 10px 20px;
  opacity: 1;
  z-index: 200;
  box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.75);
  @media only screen and (max-width: 600px){
    width: 80vw;
    left: 10vw;
  }
`
const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
`
const Exit = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 50px;
  color: ${colors.tertiary};
  cursor: pointer;
`
const getQRCodeUrl = (payreq) => `https://api.qrserver.com/v1/create-qr-code/?data=${payreq}&size=175x175`

class DepositModal extends Component {

  render() {
    return (
      <div>
        <ModalDiv>
          <RelativeContainer>
            <Exit onClick={() => { this.props.resetPayreq(undefined)}}>
              X
            </Exit>
          </RelativeContainer>
          <img src={getQRCodeUrl(this.props.payreq)} />
          <hr />
           <p style={{wordBreak: "break-word"}}>{this.props.payreq}</p>
        </ModalDiv>
        <TransparentBackground onClick={() => { this.props.resetPayreq(undefined)}} />
      </div>
      )
  }
}
//hello-921d5f3a8aa9f95c192a47817766efe1

const mapDispatchToProps = (dispatch) => ({
  resetPayreq: (value) => {dispatch(updatePayreq(value))}
})

const mapStateToProps = (state) => ({
  payreq: getPayreq(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal)



