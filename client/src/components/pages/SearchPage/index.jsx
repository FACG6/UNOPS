import React from 'react';
import PropTypes from 'prop-types';
import SearchSidebar from '../../parts/SearchSidebar';
import MainSidebar from '../../parts/MainSidebar';
import Navbar from '../../parts/Navbar';
import WrappedTicket from '../../parts/WrappedTicket';
import './style.css';

export default function SearchPage({
  searchResults,
  tickets,
  updateSearch,
  pending,
  closed,
  searchValues,
  searchAction,
}) {
  if (searchResults) {
    return (
      <>
        <Navbar>
          <div className="search-page__nav-header">Your Search Results</div>
        </Navbar>
        <MainSidebar selected="search" />
        <SearchSidebar searchAction={searchAction} />
        <main className="search-page__tickets-section">
          {searchResults.map(ticket => (
            <WrappedTicket key={ticket.uid} {...ticket} />
          ))}
        </main>
      </>
    );
  }
  return (
    <>
      <Navbar selected="pending" pending={pending} closed={closed} currentCategory="all-tickets" />
      <MainSidebar selected="search" />
      <SearchSidebar
        searchAction={searchAction}
        updateSearch={updateSearch}
        searchValues={searchValues}
      />
      <main className="search-page__tickets-section">
        {tickets.map(ticket => (
          <WrappedTicket key={ticket.uid} {...ticket} />
        ))}
      </main>
    </>
  );
}

SearchPage.propTypes = {
  searchResults: PropTypes.instanceOf(Array),
  tickets: PropTypes.instanceOf(Array),
  updateSearch: PropTypes.instanceOf(Function).isRequired,
  pending: PropTypes.number,
  closed: PropTypes.number,
};

SearchPage.defaultProps = {
  searchResults: undefined,
  tickets: undefined,
  pending: 0,
  closed: 0,
};
