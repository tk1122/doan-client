import React, { Component } from "react";

export default class Member extends Component {
  showTrangThai = () => {
    if (this.props.isCurrentlyIn) return <i className="fas fa-times-circle" />;

    return <i className="fas fa-check-square" />;
  };
  render() {
    return (
      <tr>
        <td>{this.props.stt}</td>
        <td>{this.props.rfid}</td>
        <td>{this.props.name}</td>
        <td>{this.props.class}</td>
        <td>{this.props.plate}</td>
        <td>{this.showTrangThai()}</td>
        <td>{new Date(this.props.lastActivity.toDate()).toString()}</td>
      </tr>
    );
  }
}
