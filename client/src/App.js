import React from 'react';
import { Provider } from "react-redux";
import styled from "styled-components";
import { Container, Row, Col} from "react-bootstrap"

import store from "./store"
import User from "./components/user"
import Balance from "./components/balance"
import Value from "./components/value"
import Bet from "./components/bet"
import Scene from "./components/scene"
import colors from "./style"
import Dollar from "./assets/dollar.png"

const AppWrapper = styled.div`
  padding: 2vw;
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

const LeftColumn = styled.div`
  height: 80vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 25vw;
  min-width: 360px;
`

function App() {
  return (
     <Provider store={store}>
      <User />
      <Scene />
      <AppWrapper>
      <img className="ld ld-bounce-a-px" src={Dollar} style={{animationDuration: "3.0s"}}/>
        <Container>
          <Row>
            <LeftColumn>
              <Logo>
                DVSS
              </Logo>
              <Balance />
              <Bet />
            </LeftColumn>
            <Col />
          </Row>
        </Container>
      </AppWrapper>
        <br />
    </Provider>
  );
}

export default App;
