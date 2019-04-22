import React from 'react';
import { Link, Route } from 'react-router-dom'
import './style.css'
const WrappedTicket = (props) => {
    return (
        <div className="wrapped-ticket-container">
                <Route>
            <div> {props.wrappedTickets ? props.wrappedTickets.map(wrappedticket =>
                    <Link to={`/ticket/${wrappedticket.id}`} className="wrapped-ticket-container__link">
                        <div className="wrapped-ticket-container__wrappedticket" >
                            <div className="wrapped-ticket-container__check-email-container"><input type="checkbox" className="wrapped-ticket-container__checkbox" />
                                {wrappedticket.email}
                            </div>
                            <p>{wrappedticket.subject}</p>
                            <p className="wrapped-ticket-container__ticket-descreption">{wrappedticket.description.substring(0, 49)}...</p>
                            <p className="wrapped-ticket-container__date"> {wrappedticket.date} </p>
                        </div></Link>

            ) : <div />}
            </div>
                </Route>
        </div>
    )
}

export default WrappedTicket