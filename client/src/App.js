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
  heigth: 100%;
  justify-content: space-between;
`
function App() {
  return (
     <Provider store={store}>
      <AppWrapper>
        <User />
        <Row>
          <Balance />
          <div />
          <Result />
        </Row>
        <Row>
          <History />
          <Block>
            <Timer />
            <Bet />
          </Block>
        </Row>
        <br />
      </AppWrapper>
    </Provider>
  );
}

export default App;
