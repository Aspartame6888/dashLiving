import React, { Component } from "react";
import { render } from "react-dom";
import { createStore, combineReducers } from "redux";
import { connect, Provider } from "react-redux";
import { Progress } from "antd";
import "antd/dist/antd.css";

let initState = { count: 0 };
const countReducer = (state = initState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // Implement the increment, decrement and reset logic here
    case "INCREMENT":
      newState.count = newState.count + 5;
      if (newState.count >= 100) {
        return { count: 100 };
      }
      return newState;
    case "DECREMENT":
      newState.count = newState.count - 5;
      if (newState.count <= 0) {
        return { count: 0 };
      }
      return newState;
    case "RESET":
      return initState;
    default:
      return initState;
  }
};

const reducers = combineReducers({
  counter: countReducer,
});

const actions = {
  increment: () => store.dispatch({ type: "INCREMENT" }),
  decrement: () => store.dispatch({ type: "DECREMENT" }),
  reset: () => store.dispatch({ type: "RESET" }),
};

const store = createStore(reducers);

class App extends Component {
  render() {
    console.log(store.getState());
    return (
      <div>
        {/* Implement your text box and progress bar here*/}
        <h1>Value: {store.getState().counter.count}</h1>
        <div>
          {" "}
          <Progress
            strokeColor={{
              "0%": "yellow",
              "100%": "yellow",
            }}
            percent={store.getState().counter.count}
          />
        </div>
        <div
          style={{
            display: "block",
            content: "",
            clear: "both",
            marginTop: "18px",
          }}>
          <button onClick={this.props.increment}>Increment + 10%</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={this.props.decrement}>Decrement - 10%</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={this.props.reset}>Reset to 0</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ counter }) => {
  return { count: counter.count };
};

const AppContainer = connect(mapStateToProps, actions)(App);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
