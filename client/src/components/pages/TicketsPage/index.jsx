import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainSidebar from '../../parts/MainSidebar';
import TicketsSidebar from '../../parts/TicketsSidebar';
import Navbar from '../../parts/Navbar';
import WrappedTicket from '../../parts/WrappedTicket';
import './style.css';

export default class extends Component {
  state = {
    tickets: this.props.tickets || {
      all: {
        pending: [],
        closed: [],
      },
      my: {
        pending: [],
        closed: [],
      },
      drafts: [],
      trash: [],
    },
    currentCategory: this.props.match.params.category || 'all',
    currentStatus: this.props.match.params.status || 'pending',
    allChecked: false,
    markAs: null,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      tickets: nextProps.tickets,
      currentCategory: nextProps.match.params.category,
      currentStatus: nextProps.match.params.status,
    });
  }

  toggleAllChecked = () => {
    this.setState({ allChecked: !this.state.allChecked });
  };

  render() {
    const { currentCategory, currentStatus, allChecked, markAs, tickets } = this.state;

    if (!(currentCategory === 'trash' || currentCategory === 'drafts')) {
      var pendingLength = tickets[currentCategory].pending.length,
        closedLength = tickets[currentCategory].closed.length,
        allLength = tickets.all.pending.length + tickets.all.closed.length,
        myLength = tickets.my.pending.length + tickets.my.closed.length,
        ticketsToRender = tickets[currentCategory][currentStatus];
    } else {
      var pendingLength = 'null',
        closedLength = 'null',
        allLength = tickets.all.pending.length + tickets.all.closed.length,
        myLength = tickets.my.pending.length + tickets.my.closed.length,
        ticketsToRender = tickets[currentCategory][currentStatus];
    }

    return (
      <>
        <MainSidebar selected="tickets" />
        <TicketsSidebar
          selected={currentCategory}
          all={allLength}
          my={myLength}
          trash={tickets.trash.length}
          drafts={tickets.drafts.length}
        />
        {pendingLength !== 'null' ? (
          <Navbar
            selected={currentStatus}
            currentCategory={currentCategory}
            pending={pendingLength}
            closed={closedLength}
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
            <span className="tickets-page__select-all" onClick={this.toggleAllChecked}>
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
