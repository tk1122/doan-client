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

  async componentDidMount() {
    const memberData = [];
    const guestData = [];

    await db.collection("members").onSnapshot(querySnapshot => {
      querySnapshot.docs.forEach(m => memberData.push(m.data()));
    });
    this.setState({ memberData });

    await db.collection("guests").onSnapshot(querySnapshot => {
      querySnapshot.docs.forEach(g => guestData.push(g.data()));
    });
    this.setState({ guestData });
  }

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
