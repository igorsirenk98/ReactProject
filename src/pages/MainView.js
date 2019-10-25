import React, { Component } from 'react';
import ActionsTab from '../components/ActionsTab';
import InvoiceTable from '../components/InvoiceTable';

export default class MainView extends Component {
    render() {
        return (
            <div>
                <ActionsTab />
                <InvoiceTable />
            </div>
        )
    }
}