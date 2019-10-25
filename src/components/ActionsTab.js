import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ActionsTab extends Component {
    render() {
        return (
            <div>
                <h4>Actions</h4>
                <button type="submit"><Link to='/creation'>Add new</Link></button>
            </div>
        )
    }
}