import React, {Component} from 'react';
import { connect } from "react-redux";
import { getSocket } from "../../store/socket"
import { getPayreq } from "../../store/user"

import BalanceContainer from "./BalanceContainer"
import DepositModal from "./DepositModal"

class Balance extends Component {
  render (){
    return (
      <div>
        <BalanceContainer />
        {this.props.payreq && <DepositModal />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  payreq: getPayreq(state)
})

export default connect(mapStateToProps)(Balance)
