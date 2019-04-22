import React from 'react';
import { Link, Route } from 'react-router-dom'
import './style.css'
const WrappedTicket = (props) => {
    console.log(props)
    return (
        <div className="wrapped-ticket-container">
            <div> {props.wrappedTickets ? props.wrappedTickets.map(wrappedticket =>
                <Route>
                    <Link to={`/ticket/${wrappedticket.id}`} className="wrapped-ticket-container__link">
                        <div className="wrapped-ticket-container__wrappedticket" >
                            <div className="wrapped-ticket-container__check-email-container"><input type="checkbox" className="wrapped-ticket-container__checkbox" />
                                {wrappedticket.email}
                            </div>
                            <p>{wrappedticket.subject}</p>
                            <p className="wrapped-ticket-container__wrappedticket__ticket-descreption">{wrappedticket.description.substring(0, 49)}...</p>
                            <p className="wrapped-ticket-container__date"> {wrappedticket.date} </p>
                        </div></Link>
                </Route>

            ) : <div />}
            </div>
        </div>
    )
}

export default WrappedTicket