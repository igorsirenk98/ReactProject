import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';

export default class InvoiceTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invoices: []
        };
    }

    componentDidMount() {
        this.getInvoiceTableData();
    }

    getInvoiceTableData() {
        fetch('http://localhost:3004/data')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    invoices: json,
                })
            })
            .catch(error => console.log('Error: ', error));
    }

    deleteInvoice(id) {
        fetch(`http://localhost:3004/data/${id}`, { method: 'delete'})
            .then(res => res.json())
            .catch(error => console.log('Error: ', error))
            .then(() => this.getInvoiceTableData());
    }

    render() {
        let { invoices } = this.state;
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
            },
            {
                Header: 'Actions',
                Cell: props => {
                    return (
                        <div>
                            <button
                                onClick={() => console.log('Edit', props)}
                            ><Link to={{
                                pathname: `/editing`,
                                props: props.original
                            }} >Edit</Link></button>
                            <button
                                onClick={() => this.deleteInvoice(props.original._id)}
                            >Delete</button>
                        </div>
                    );
                }
            }
        ];

        return (
            <div>
                <h3>Invoices</h3>
                <ReactTable 
                    data={invoices}
                    columns={columns}
                />
            </div>
        )
    }
}