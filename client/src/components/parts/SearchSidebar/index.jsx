import React from 'react';
import './style.css';

export default function SearchSidebar() {
  return (
    <aside className="search-sidebar">
      <form className="search-sidebar__form">
        <div className="search-sidebar__searchbar-div">
          <input
            type="text"
            id="searchbar"
            className="search-sidebar__searchbar"
            placeholder="Search for tickets"
          />
          <div className="search-sidebar__search-icon-div">
            <i className="fas fa-search search-sidebar__search-icon" />
          </div>
        </div>
        <div className="search-sidebar__label">
          <span className="search-sidebar__label-text">User :</span>
          <select name="users" id="users" className="search-sidebar__select">
            <option value="all" defaultValue>
              All
            </option>
            <option value="Ahmed">Ahmed</option>
            <option value="Jamalat">Jamalat</option>
            <option value="Alaa">Alaa</option>
            <option value="Anies">Ahmed</option>
          </select>
        </div>
        <div className="search-sidebar__label">
          <span className="search-sidebar__label-text">Status :</span>
          <select name="users" id="users" className="search-sidebar__select">
            <option value="all" defaultValue>
              All
            </option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="search-sidebar__submit">Search</div>
      </form>
    </aside>
  );
}
