import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Login from "./components/Login";
// import SearchComponent from "./components/search";
// import Home from "./components/Homepage";
// import NewTicket from "./components/NewTicket";
// import MainSidebar from "./components/MainSidebar";
// import WrappedTicket from "./components/WrappedTicket";
// import Replies from "./components/Replies";
import Reply from "./components/parts/Reply";

class App extends Component {
  state = {
    wrappedTickets: [],
    replies: []
  };

  componentDidMount() {
    this.setState({
      replies: [
        {
          id: 1,
          email: "jamalat@getsMaxListeners.com",
          message:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, "
        },
        {
          id: 2,
          email: "jamalat@getMadxListeners.com",
          message:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, "
        },
        {
          id: 3,
          email: "jamalat@getMaxListeners.com",
          message:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, "
        }
      ],
      wrappedTickets: [
        {
          id: 1,
          email: "jamalat@gmail.com",
          description: "This is a sample ticket with some sample description",
          date: "April 9",
          subject: "subject"
        },
        {
          id: 2,
          email: "jamalat@gmail.com",
          description: "This is a sample ticket with some sample description",
          date: "April 9",
          subject: "subject"
        },
        {
          id: 3,
          email: "jamalat@gmail.com",
          description: "This is a sample ticket with some sample description",
          date: "April 9",
          subject: "subject"
        },
        {
          id: 4,
          email: "jamalat@gmail.com",
          description: "This is a sample ticket with some sample description",
          date: "April 9",
          subject: "subject"
        }
      ]
    });
  }

  render() {
    if (this.state.replies) {
      return (
        <BrowserRouter>
          <Switch>
            {/* <Route exact path="/" />
            <Route exact path="/new-ticket" component={NewTicket} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/main-sidebar"
              component={() => <MainSidebar selected="tickets" />}
            /> */}
            <Route exact path="/ticket" component={() => <Reply />} />
          </Switch>
        </BrowserRouter>
      );
    }
    return <h2>There are no Replies yet.</h2>;
  }
}
export default App;
