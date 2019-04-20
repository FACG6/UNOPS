import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import './style.css'
class WrappedTicket extends Component {
    state = {
        wrappedTickets: [],
    }
    componentDidMount() {
        this.setState({
            wrappedTickets: [{
                id: 1,
                email: 'jamalat@gmail.com',
                description: 'This is a sample ticket with some sample description',
                date: 'April 9'
                , subject: "subject"
            },
            {
                id: 2,
                email: 'jamalat@gmail.com',
                description: 'This is a sample ticket with some sample description',
                date: 'April 9'
                , subject: "subject"
            }, {
                id: 3,
                email: 'jamalat@gmail.com',
                description: 'This is a sample ticket with some sample description',
                date: 'April 9'
                , subject: "subject"
            }, {
                id: 4,
                email: 'jamalat@gmail.com',
                description: 'This is a sample ticket with some sample description',
                date: 'April 9'
                , subject: "subject"
            }]
        })
    }
    render() {
        if (this.state.wrappedTickets) {
            return (
                <div className="wrapped-ticket-container">
                    <div> {this.state.wrappedTickets.map(wrappedticket =>
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

                    )}
                    </div>
                </div>
            )

        } else
            return ""
    }
}

export default WrappedTicket