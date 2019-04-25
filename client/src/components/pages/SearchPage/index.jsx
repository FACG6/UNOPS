import React from 'react';
import PropTypes from 'prop-types';
import SearchSidebar from '../../parts/SearchSidebar';
import MainSidebar from '../../parts/MainSidebar';
import Navbar from '../../parts/Navbar';
import WrappedTicket from '../../parts/WrappedTicket';
import './style.css';

export default function SearchPage({
  searchResults, tickets, searchAction, pending, closed,
}) {
  if (searchResults) {
    return (
      <>
        <Navbar>
          <div className="search-page__nav-header">Your Search Results</div>
        </Navbar>
        <MainSidebar selected="search" />
        <SearchSidebar />
        <main className="search-page__tickets-section">
          {searchResults.map(ticket => (
            <WrappedTicket {...ticket} />
          ))}
        </main>
      </>
    );
  }
  return (
    <>
      <Navbar selected="pending" pending={pending} closed={closed} currentCategory="all" />
      <MainSidebar selected="search" />
      <SearchSidebar />
      <main className="search-page__tickets-section">
        {tickets.map(ticket => (
          <WrappedTicket {...ticket} />
        ))}
      </main>
    </>
  );
}

SearchPage.propTypes = {
  searchResults: PropTypes.instanceOf(Array),
  tickets: PropTypes.instanceOf(Array),
  searchAction: PropTypes.instanceOf(Function).isRequired,
  pending: PropTypes.number,
  closed: PropTypes.number,
};

SearchPage.defaultProps = {
  searchResults: undefined,
  tickets: undefined,
  pending: 0,
  closed: 0,
};
