import React , { Component } from "react";
export default class TheRely extends Component {
    render() {
        return (
            <section className="text_reply">
                <h2>Reply</h2>
                <div className="content_reply">
                    <div className="icon_reply">
                    <div className="area_reply">

                    </div>
                    <input type="submit" name="reply" id="btn_reply"/>
                    </div>
                </div>
            </section>
        );
    }
}