import React from 'react';
import './style.css';

export default function SearchSidebar({
  updateSearch,
  searchValues: { ...searchValues },
  searchAction,
  sideBarSearch: { ...SearchSidebar },
}) {
  return (
    <aside className="search-sidebar">
      <form className="search-sidebar__form">
        <div className="search-sidebar__searchbar-div">
          <input
            key="search_input"
            type="text"
            id="searchbar"
            className="search-sidebar__searchbar"
            placeholder="Search for tickets"
            onChange={({ target: { value } }) => updateSearch('query', value)}

          />
          <div className="search-sidebar__search-icon-div">
            <i className="fas fa-search search-sidebar__search-icon" />
          </div>
        </div>
        <div className="search-sidebar__label">
          <span className="search-sidebar__label-text">User :</span>
          <select
            value={searchValues.user}
            name="users"
            id="users"
            className="search-sidebar__select"
            onChange={({ target: { value } }) => updateSearch('user', value === 'all' ? '' : value)}
          >
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
          <select
            value={searchValues.status}
            name="users"
            id="users"
            className="search-sidebar__select"
            onChange={({ target: { value } }) => updateSearch('status', value === 'all' ? '' : value)
            }
          >
            <option value="all" defaultValue>
              All
            </option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div
          role="button"
          tabIndex={0}
          className="search-sidebar__submit"
          onClick={searchAction}
          onKeyPress={({ charCode }) => {
            if (charCode === 13) searchAction();
          }}
        >
          Search
        </div>
      </form>
    </aside>
  );
}
