import React, {Component} from 'react';
import Navigation from './layout/navbar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Launch from './launch';
import Home from'./home';

class App extends Component {

  render(){
    return (
      <Router>  
          <Navigation/>
        <div style={{textAlign:"center"}}>
          <div className={{      
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            flexWrap: 'wrap',}}>
              <Route exact path="/" component={Home} />
              <Route exact path="/launch/:flight_number" component={Launch} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;



