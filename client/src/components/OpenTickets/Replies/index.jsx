import React , { Component } from "react";
export default class Replies extends Component {
    render() {
        return (
            <section className="replies">
                <h2>Replies</h2> 
                <div className="content_firstReply">
                    <h3 className="title_name">
                    Email: user.email@gmail.com
                    </h3>
                    <h3>
                    Message:Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                    </h3>
                </div>
            </section>
        );
    }
}