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
function App() {
  return (
     <Provider store={store}>
      <AppWrapper>
        <User />
        <Row>
          <Balance />
          <Timer />
          <Bet />
        </Row>
        <br />
        <Row>
          <History />
          <Result />
        </Row>
      </AppWrapper>
    </Provider>
  );
}

export default App;
