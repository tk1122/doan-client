import React, { Component } from "react";
import moment from "moment";

export default class Guest extends Component {
  showTrangThai = () => {
    console.log(this.props.isCurrentlyIn);
    if (this.props.isCurrentlyIn) return <i className="fas fa-check-square" />;

    return <i className="fas fa-times-circle blue" />;
  };
  render() {
    return (
      <tr>
        <td>{this.props.stt}</td>
        <td>{this.props.RFID}</td>
        <td className=" text-center">{this.showTrangThai()}</td>
        <td>{moment(this.props.lastActivity.toDate()).fromNow()}</td>
      </tr>
    );
  }
}
