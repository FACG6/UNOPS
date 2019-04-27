import React from 'react';
import PropTypes from 'prop-types';
import OpenedTicket from '../../parts/OpenedTicket';
import MainSidebar from '../../parts/MainSidebar';
import TicketsSidebar from '../../parts/TicketsSidebar';
import Replies from '../../parts/Replies';
import Reply from '../../parts/Reply';
import './style.css';

export default function OpenedTicketPage({
  ticket,
  allTickets,
  myTickets,
  drafts,
  trash,
  category,
}) {
  if (!ticket) {
    return (
      <>
        <MainSidebar selected="tickets" />
        <TicketsSidebar
          allTickets={allTickets}
          myTickets={myTickets}
          drafts={drafts}
          trash={trash}
        />
        <main className="opened-ticket-page">
          <h1>This is not a valid ticket uid</h1>
        </main>
      </>
    );
  }
  const {
    from, subject, date, body, cc,
  } = ticket;
  return (
    <>
      <MainSidebar selected="tickets" />
      <TicketsSidebar
        allTickets={allTickets}
        myTickets={myTickets}
        drafts={drafts}
        trash={trash}
        selected={category}
      />
      <main className="opened-ticket-page">
        <OpenedTicket from={from} subject={subject} date={date} body={body} cc={cc} />
        <Replies tickets={[]} />
        <Reply />
      </main>
    </>
  );
}

OpenedTicketPage.propTypes = {
  ticket: PropTypes.instanceOf(Object).isRequired,
  allTickets: PropTypes.number.isRequired,
  myTickets: PropTypes.number.isRequired,
  trash: PropTypes.number.isRequired,
  drafts: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};
