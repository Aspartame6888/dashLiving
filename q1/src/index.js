import React, { Component } from "react";
import { render } from "react-dom";
import { Calendar } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import moment from "moment";
import "moment/locale/en-gb";

class App extends Component {
  render() {
    moment.locale("en-gb", {
      week: {
        dow: 1, /// Date offset
      },
      weekdaysMin: "Sun_Mon_Tue_Wen_Thr_Fri_Sat".split("_"),
    });

    return (
      <div>
        <div
          style={{ width: 1000, border: "1px solid #d9d9d9", borderRadius: 4 }}>
          <Calendar fullscreen={false} />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
