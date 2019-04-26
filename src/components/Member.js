import React, { Component } from "react";
import moment from "moment";

export default class Member extends Component {
  showTrangThai = () => {
    console.log(this.props.isCurrentlyIn);
    if (this.props.isCurrentlyIn) return <i className="fas fa-check-square" />;
    // demo
    return <i className="fas fa-times-circle blue" />;
  };
  render() {
    return (
      <tr>
        <td>{this.props.stt}</td>
        <td>{this.props.MSSV}</td>
        <td>{this.props.name}</td>
        <td>{this.props.class}</td>
        <td>{this.props.plate}</td>
        <td className=" text-center">{this.showTrangThai()}</td>
        <td>{moment(this.props.lastActivity.toDate()).fromNow()}</td>
      </tr>
    );
  }
}
