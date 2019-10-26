import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ActionsTab extends Component {
    render() {
        return (
            <div className="tab">
                <h4>Actions</h4>
                <button className="button button_add" type="submit"><Link className="link" to='/creation'>Add new</Link></button>
            </div>
        )
    }
}