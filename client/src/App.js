import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import LogoTicket from './components/OpenTickets/LogoTicket';
import ContentLogo from "./components/OpenTickets/ContentLogo";
import TickectSubject from "./components/OpenTickets/TickectSubject";
import Replies from "./components/OpenTickets/Replies";
import TheRely from "./components/OpenTickets/TheRely";

class App extends Component {
  render() {
    return (
      <React.Fragment>
         < LogoTicket />
    < ContentLogo />
      < TickectSubject />
     <Replies />
     < TheRely /> 
      </React.Fragment>
        
      
   

    );
  }
}

export default App;
