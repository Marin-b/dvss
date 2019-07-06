import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { Tabs, Tab } from "react-bootstrap"
import Balance from './Balance'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import colors from '../../style'

const Header = styled.div`
  font-size: 40px;
  color: ${colors.primary};
  padding: 20px;
`

const BalanceBox = styled.div`
  background-color: transparent;
  height: 25vh;
  width: 300px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ActionContainer = styled.div`
  display:flex;
  margin: 0 auto;
  width: 80%;
  justify-content: space-between;
`

class BalanceContainer extends Component {
  render () {
    return (
      <div>
        <BalanceBox>
          <Tabs defaultActiveKey="balance" id="uncontrolled-tab-example">
            <Tab eventKey="balance" title="Balance" >
              <Balance />
            </Tab>
            <Tab eventKey="deposit" title="Deposit">
              <Deposit />
            </Tab>
            <Tab eventKey="withdraw" title="Withdraw">
              <Withdraw />
            </Tab>
          </Tabs>
        </BalanceBox>
      </div>
      )
  }
}


export default BalanceContainer
