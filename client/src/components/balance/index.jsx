import React, {Component} from 'react';
import { connect } from "react-redux";
import { getSocket } from "../../store/socket"
import { getPayreq } from "../../store/user"

import BalanceContainer from "./BalanceContainer"

class Balance extends Component {
  render (){
    return (
      <div>
        <BalanceContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  payreq: getPayreq(state)
})

export default connect(mapStateToProps)(Balance)
