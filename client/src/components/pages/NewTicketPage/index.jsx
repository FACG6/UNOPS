import React from 'react';
import PropTypes from 'prop-types';
import NewTicket from '../../parts/NewTicket';
import MainSidebar from '../../parts/MainSidebar';
import TicketSidebar from '../../parts/TicketsSidebar';
import Navbar from '../../parts/Navbar';
import './style.css';

export default function NewTicketPage({
  allTickets, myTickets, drafts, trash,
}) {
  return (
    <>
      <MainSidebar selected="tickets" />
      <TicketSidebar allTickets={allTickets} myTickets={myTickets} drafts={drafts} trash={trash} />
      <Navbar>
        <span className="new-ticket-page__navbar-header">Create a new ticket</span>
      </Navbar>
      <main className="new-ticket-page">
        <NewTicket />
      </main>
    </>
  );
}

NewTicketPage.propTypes = {
  allTickets: PropTypes.number.isRequired,
  myTickets: PropTypes.number.isRequired,
  drafts: PropTypes.number.isRequired,
  trash: PropTypes.number.isRequired,
};
