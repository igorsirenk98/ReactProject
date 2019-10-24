import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import InvoiceItem from './InvoiceItem';

const columns = [
    {
        Header: 'Create',
        accessor: 'date_created'
    },
    {
        Header: 'No',
        accessor: 'number'
    },
    {
        Header: 'Supply',
        accessor: 'date_supplied'
    },
    {
        Header: 'Comment',
        accessor: 'comment'
    }
];

export default class InvoiceTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <h3>Invoices</h3>
                <ReactTable 
                    data={data}
                    columns={columns}
                />
            </div>
        )
    }
}