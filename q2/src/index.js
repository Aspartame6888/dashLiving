import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';

const countReducer = (state = { count: 0}, action) => {
 switch (action.type) {
     // Implement the increment, decrement and reset logic here
   default: return state;
 }
}

const reducers = combineReducers({
 counter: countReducer,
})

const actions = {
 increment: () => ({ type: 'INCREMENT' }),
 decrement: () => ({ type: 'DECREMENT' }),
 reset: () => ({ type: 'RESET'})
};

const store = createStore(reducers);

class App extends Component {
 render() {
   return (
     <div>
       {/* Implement your text box and progress bar here*/}
       <div style={{ display: 'block', content: '', clear: 'both', 'margin-top': '18px'}}>
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
}

const AppContainer = connect(mapStateToProps, actions)(App);

render(
 <Provider store={store}>
   <AppContainer />
 </Provider>,
 document.getElementById('root')
);
