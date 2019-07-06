import React from 'react';
import { Provider } from "react-redux";
import styled from "styled-components";

import store from "./store"
import User from "./components/user"
import Balance from "./components/balance"
import Timer from "./components/timer"
import Bet from "./components/bet"
import History from "./components/history"
import Result from "./components/result"

import colors from "./style"

const AppWrapper = styled.div`
  padding: 40px;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 600px){
    flex-direction: column;
  }
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
  justify-content: space-between;
  max-height: 100% !important;
`
const Logo = styled.div`
  color: ${colors.secondary}
  font-size: 40px;
  font-family: 'Press Start 2P', cursive;
  padding-bottom: 10px;
`
function App() {
  return (
     <Provider store={store}>
      <AppWrapper>
        <Logo>
          DVSS
        </Logo>
        <User />
        <Row>
          <Balance />
          <Timer />
          <Bet />
        </Row>
        <Row>

          <Block>
          </Block>
        </Row>
        <br />
      </AppWrapper>
    </Provider>
  );
}

export default App;
