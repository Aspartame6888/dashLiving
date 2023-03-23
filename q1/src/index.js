import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
 render() {
   return (
    
      <div>Implement your calendar here</div>
   );
 }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
