import React from "react";
import { getSignImage } from "../../utils/common";

import "../../App.css";
import "./SignButton.css";

export class SignButton extends React.Component<{
  signType: SignType;
  action: () => void;
}> {
  render() {
    return (
      <div>
        <img
          className="sign border"
          src={getSignImage(this.props.signType)}
          alt=""
          onClick={this.props.action}
        />
      </div>
    );
  }
}
