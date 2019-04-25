import React from 'react';
import PropTypes from 'prop-types';
import NewTicket from '../../parts/NewTicket';
import MainSidebar from '../../parts/MainSidebar';
import TicketSidebar from '../../parts/TicketsSidebar';
import Navbar from '../../parts/Navbar';
import './style.css';

export default function NewTicketPage({
  all, my, drafts, trash,
}) {
  return (
    <>
      <MainSidebar selected="tickets" />
      <TicketSidebar all={all} my={my} drafts={drafts} trash={trash} />
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
  all: PropTypes.number.isRequired,
  my: PropTypes.number.isRequired,
  drafts: PropTypes.number.isRequired,
  trash: PropTypes.number.isRequired,
};
