import React, { Component } from 'react';
import ActionsTab from '../components/ActionsTab';
import InvoiceTable from '../components/InvoiceTable';

export default class MainView extends Component {
    render() {
        return (
            <div className="main-view">
                <h2 className="main-view__title">Invoices</h2>
                <ActionsTab />
                <InvoiceTable />
            </div>
        )
    }
}