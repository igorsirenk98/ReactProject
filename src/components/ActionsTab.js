import React from 'react';
import { Link } from 'react-router-dom';

const ActionsTab = () => (
    <div className="tab">
        <h4>Actions</h4>
        <button className="button button_add" type="submit">
            <Link className="link" to="/creation">
                Add new
            </Link>
        </button>
    </div>
);

export default ActionsTab;
