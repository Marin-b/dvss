import React, {Component} from 'react';
import { connect } from "react-redux";
import { isUserConnected } from "../../store/user"
import { getSocket } from "../../store/socket"

import LoginModal from "./LoginModal"

class User extends Component {
  render (){
    return (
      <div>
      { !this.props.isConnected ? <LoginModal /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isConnected: isUserConnected(state),
})

export default connect(mapStateToProps)(User)
