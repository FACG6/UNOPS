import React, { Component } from "react";
import PropTypes from "prop-types";
import MainSidebar from "../../parts/MainSidebar";
import TicketsSidebar from "../../parts/TicketsSidebar";
import Navbar from "../../parts/Navbar";
import WrappedTicket from "../../parts/WrappedTicket";
import "./style.css";

export default class extends Component {
  state = {
    tickets: this.props.tickets || {
      allTickets: {
        pending: [],
        closed: []
      },
      myTickets: {
        pending: [],
        closed: []
      },
      drafts: [],
      trash: []
    },
    currentCategory: this.props.match.params.category || "all-tickets",
    currentStatus: this.props.match.params.status || "pending",
    allChecked: false,
    markAs: null
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      tickets: nextProps.tickets,
      currentCategory: nextProps.match.params.category,
      currentStatus: nextProps.match.params.status
    });
  }

  toggleAllChecked = () => {
    this.setState({ allChecked: !this.state.allChecked });
  };

  render() {
    const {
      currentCategory,
      currentStatus,
      allChecked,
      markAs,
      tickets
    } = this.state;

    if (!(currentCategory === "trash" || currentCategory === "drafts")) {
      var pendingTicketsCount = tickets[currentCategory].pending.length,
        closedTicketsCount = tickets[currentCategory].closed.length,
        allTicketsCound =
          tickets.all.pending.length + tickets.all.closed.length,
        myTicketsCount = tickets.my.pending.length + tickets.my.closed.length,
        ticketsToRender = tickets[currentCategory][currentStatus];
    } else {
      var pendingTicketsCount = null,
        closedTicketsCount = null,
        allTicketsCound =
          tickets.all.pending.length + tickets.all.closed.length,
        myTicketsCount = tickets.my.pending.length + tickets.my.closed.length,
        ticketsToRender = tickets[currentCategory][currentStatus];
    }

    return (
      <>
        <MainSidebar selected="tickets" />
        <TicketsSidebar
          selected={currentCategory}
          allTickets={allTicketsCound}
          myTickets={myTicketsCount}
          trash={tickets.trash.length}
          drafts={tickets.drafts.length}
        />
        {!pendingTicketsCount ? (
          <Navbar
            selected={currentStatus}
            currentCategory={currentCategory}
            pending={pendingTicketsCount}
            closed={closedTicketsCount}
          />
        ) : (
          <Navbar
            selected={currentStatus}
            currentCategory={currentCategory}
            children={currentCategory}
          />
        )}
        <main className="tickets-page">
          <div className="tickets-page__header">
            <span
              className="tickets-page__select-all"
              onClick={this.toggleAllChecked}
            >
              Select all
            </span>
            <select name="markAs" id="markAs" className="tickets-page__mark-as">
              <option value="null" selected disabled hidden>
                Mark as
              </option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          {ticketsToRender.map(ticket => (
            <WrappedTicket {...ticket} allChecked={allChecked} />
          ))}
        </main>
      </>
    );
  }
}
