import React, { Component } from 'react';
import InvoiceTable from './components/InvoiceTable';
import ActionsTab from './components/ActionsTab';

class App extends Component {
  	render() {
    	return (
	      	<div className="container">
				<h2>Invoices</h2>
				<ActionsTab />
				<InvoiceTable />
	      	</div>
	    );
	}
}

export default App;
