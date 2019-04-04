import React, { Component } from "react";
import "./App.css";
import HeadTitle from "./HeadTitle";
import Member from "./Member";
import { db } from "../firebaseConnect";

class App extends Component {
  state = {
    memberData: [],
    guestData: []
  };

  printData = () => {
    if (this.state.memberData !== null) {
      return this.state.memberData.map((value, key) => {
        return (
          <Member
            key={value.RFID}
            stt={key + 1}
            rfid={value.RFID}
            name={value.name}
            class={value.class}
            plate={value.plate}
            lastActivity={value.lastActivity}
            isCurrentlyIn={value.isCurrentlyin}
          />
        );
      });
    }
  };

  realtimeUpdate = () => {
    const memberData = [];

    db.collection("members").onSnapshot(querySnapshot => {
      const changes = querySnapshot.docChanges();

      changes.forEach(c => memberData.push(c.doc.data()));
    });
    this.setState({ memberData });
  };

  async componentDidMount() {
    const memberData = [];
    const guestData = [];

    await db
      .collection("members")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(c => memberData.push(c.data()));
      });
    this.setState({ memberData });

    await db
      .collection("guests")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(g => guestData.push(g.data()));
      });
    this.setState({ guestData });
  }

  getUpdate = () => {};

  render() {
    return (
      <div>
        <HeadTitle />
        <hr />
        <div className="container">
          <div className="row">
            <table className="table table-striped table-hover">
              <thead className="thead-inverse">
                <tr>
                  <th>STT</th>
                  <th>RFID</th>
                  <th>Họ tên</th>
                  <th>Lớp</th>
                  <th>Bển số xe</th>
                  <th>Trạng thái</th>
                  <th>Hoạt động cuối</th>
                </tr>
              </thead>
              <tbody>{this.printData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
