import React from 'react';
import { Provider } from "react-redux";
import styled from "styled-components";

import store from "./store"
import User from "./components/user"
import Balance from "./components/balance"
import Timer from "./components/timer"
import Bet from "./components/bet"

const AppWrapper = styled.div`
  padding: 40px;
`
const FirstRow = styled.div`
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
        <FirstRow>
          <Balance />
          <Timer />
          <Bet />
        </FirstRow>
      </AppWrapper>
    </Provider>
  );
}

export default App;
