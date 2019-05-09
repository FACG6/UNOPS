import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import SearchSidebar from '../../parts/SearchSidebar';
import MainSidebar from '../../parts/MainSidebar';
import Navbar from '../../parts/Navbar';
import WrappedTicket from '../../parts/WrappedTicket';
import './style.css';

export default class SearchPage extends Component {
 state = {
   
 }
 
  render() {
    if (this.props.searchResults) {
      return (
        <>
          <Navbar>
            <div className="search-page__nav-header">Your Search Results</div>
          </Navbar>
          <MainSidebar selected="search" />
          <SearchSidebar 
           updateSearch={this.props.updateSearch}
            earchValues={this.props.searchValues}
            sideBarSearch={this.props.sideBarSearch}
          />
          <main className="search-page__tickets-section" onScroll={this.scroll}>
            {this.props.searchResults.map(ticket => (
              <WrappedTicket key={ticket.uid} {...ticket} />
            ))}
          </main>
        </>
      );
    }
    return (
      <>
        <Navbar
          selected="pending"
          pending={this.props.pending}
          closed={this.props.closedosed}
          currentCategory="all-tickets"
        />
        <MainSidebar selected="search" />
        <SearchSidebar
          searchAction={this.props.searchAction}
          updateSearch={this.props.updateSearch}
          searchValues={this.props.searchValues}
        />
        <main className="search-page__tickets-section" onScroll={this.props.scroll}> 
          {this.props.tickets.map(ticket => (
            <WrappedTicket key={ticket.uid} {...ticket} />
          ))}
        </main>
      </>
    );
  }
}
