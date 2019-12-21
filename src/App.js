import React from 'react';
import './App.css';

class App extends React.Component {
  render(){
    return(
      <div data-test='component-app'>
        <h1 data-test="counter-display">The counter value is</h1>
        <button data-test="increment-button">Increment</button>
      </div>
    )
  }
}

export default App;
