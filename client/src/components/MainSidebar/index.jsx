import React from "react";
import "./style.css";
import { ReactComponent as Logo } from "./../../logo.svg";

export default ({ selected }) => (
  <aside className="main-side-bar">
    <a href="/" className="logo-div tab">
      <Logo />
    </a>

    <a href="/" className={`tickets tab ${selected === "t" ? "focus" : ""}`}>
      <i class="fas fa-ticket-alt ticket-icon" />
      <span className="tickets-text text">Tickets</span>
    </a>

    <a href="/" className={`search tab ${selected === "s" ? "focus" : ""}`}>
      <i class="fas fa-search search-icon" />
      <span className="search-text text">Search</span>
    </a>

    <a href="/" className={`reports tab ${selected === "r" ? "focus" : ""}`}>
      <i class="fas fa-chart-bar chart-icon" />
      <span className="reports-text text">Reports</span>
    </a>
  </aside>
);
