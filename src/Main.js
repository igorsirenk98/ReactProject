import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainView from './pages/MainView';
import CreateInvoiceView from './pages/CreateInvoiceView';
import EditInvoiceView from './pages/EditInvoiceView';

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={MainView} />
            <Route path="/creation" component={CreateInvoiceView} />
            <Route path="/editing" component={EditInvoiceView} />
        </Switch>
    </main>
);

export default Main;
