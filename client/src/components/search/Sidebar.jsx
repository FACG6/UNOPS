import React from 'react';
import './style.css';
import Buttons from '../buttons/buttons';

function Sidebar() {
  return (
    <div className="container">
      <form>
        <div className="search-sidebar">
          <div className="margin searchbar">
            <input
              className=" searchform"
              type="text"
              placeholder="Search for tickets"
            />
            <div className="icon-div"><i className="fas fa-search" /></div>
          </div>
          <label htmlFor="user-select" className="margin label">Users:</label>
          <select id="user-select" className="margin user-select" name="users-select">
            <option value="All">All</option>
            <option value="Anies">Anies</option>
            <option value="Ahmed">Ahmed</option>
            <option value="Jamalat">Jamalat</option>
            <option value="Alaa">Alaa</option>
          </select>
          <label htmlFor="status-select" className="margin label">Status:</label>
          <select id="status-select" className="margin status-select" name="status">
            <option value="All">All</option>
            <option value="pending">pending</option>
            <option value="closed">closed</option>
          </select>
          <Buttons value="search" />
        </div>
      </form>
    </div>
  );
}
export default Sidebar;
