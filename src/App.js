import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      counter: 0,
      error: false
    }
  }
  render(){
    return(
      <div data-test='component-app'>
        <h1 data-test="counter-display">The counter value is {this.state.counter}</h1>
        {
          this.state.error ? <p data-test="error-message">Counter cannot go below 0</p> : ''
        }
        <button 
        data-test="increment-button"
        onClick={() => this.setState(
          prevState =>  ({counter: prevState.counter + 1, error:false})
          )
        }
        >Increment</button>
        <button 
        data-test="decrement-button"
        onClick={() => this.setState(
          prevState => {
            if(prevState.counter>0){
              return {counter: prevState.counter-1, error: false}
            }
            else{
              return {counter: 0, error:true}
            }
          }
        )}
        >Decrement</button>
      </div>
    )
  }
}

export default App;
