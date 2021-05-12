import { getNextSign, getSignImage, Status } from "../..//utils/common";
import React from "react";

import "../../App.css";
import "../../utils/grid.css";
import "./SignItem.css";

export class SignItem extends React.Component<{ sign: Sign, action?: (selectedSign: Sign) => void, status: Status }> {
  tick: number;
  hovered: boolean = false;
  interval: any;
  state = { currentSign: this.props.sign, status: Status.going };

  
  constructor(props: any) {
    super(props);
    this.tick = this.props.sign.isPlayer ? 1000 : 100;
  }

  componentDidMount() {
    let timer = 0;
    // Every second set currentSign to a random type, animation
    this.interval = setInterval(() => {
      timer += 1;
      if(this.hovered)
        return
      this.setState((state) => ({
        currentSign: {
          type: getNextSign(timer),
          isPlayer: this.props.sign.isPlayer,
        },
      }));
    }, this.tick);
  }

  toggle() {
    if(this.props.action){
      this.props.action(this.state.currentSign)
      this.hovered = false;
    }
  }

  getWinOrLossClass() {
    if(this.props.status === Status.win) {
      return 'bot-lose';
    }else if(this.props.status === Status.loss) {
      return 'player-lose';
    }else{
      return ''
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className={`${this.props.sign.isPlayer ? 'player' : 'bot'} col item-center ${this.getWinOrLossClass()}`}>
        <img
          className={`${
            this.state.currentSign.isPlayer ? "player-button" : "flip-horizontally"
          } sign`}
          src={
            this.props.status === Status.going
              ? getSignImage(this.state.currentSign.type)
              : getSignImage(this.props.sign.type)
          }
          onMouseOver={() => this.props.sign.isPlayer ? this.hovered = true : ''}
          onMouseLeave={() => this.hovered = false}
          alt="sign"
          onClick={() => this.toggle()}
        />
      </div>
    );
  }
}
