import React from "react";
import PropTypes from "prop-types";
import ReplyCard from "../ReplyCard";
import "./style.css";

export default function Replies({ tickets }) {
  return (
    <section className="replies-section">
      <div className="replies-section__text">Replies:</div>
      {tickets.map(ticket => (
        <ReplyCard {...ticket} />
      ))}
    </section>
  );
}

Replies.propTypes = {
  tickets: PropTypes.instanceOf(Array).isRequired
};
