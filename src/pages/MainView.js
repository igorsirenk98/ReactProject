import React from 'react';
import ActionsTab from '../components/ActionsTab';
import InvoiceTable from '../components/InvoiceTable';

const MainView = () => (
    <div>
        <h2 className="title">Invoices</h2>
        <ActionsTab />
        <InvoiceTable />
    </div>
);

export default MainView;
