import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class CreateInvoiceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navigate: '/',
            submitNumber: '',
            invoiceDate: '',
            supplyDate: '',
            comment: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    formatDate(date) {
        const inputDate = new Date(date);
        let day = inputDate.getUTCDate();
        let month = inputDate.getUTCMonth() + 1;
        let year = inputDate.getUTCFullYear();
        let formattedDate = '';

        day = day < 10 ? `0 + ${day}` : day;
        month = month < 10 ? `0 + ${month}` : month;

        formattedDate = `${day}-${month}-${year}`;

        return formattedDate;
    }

    submitHandler(event) {
        event.preventDefault();

        const data = {
            _id: Math.floor(Math.random() * 101),
            number: this.state.submitNumber,
            date_created: this.formatDate(this.state.invoiceDate),
            date_supplied: this.formatDate(this.state.supplyDate),
            comment: this.state.comment
        };

        fetch('http://localhost:3004/data', {
            method: 'POST', headers: new Headers({ 'Content-Type': 'application/json' }), body: JSON.stringify(data) 
        })
            .then(res => res.json())
            .catch(err => console.log('Error: ', err))
            .then(res => console.log('Success: ', res))
            .then(() => this.props.history.push('/'));
    }

    render() {
        return (
            <div>
                <h3>Invoices</h3>
                <form onSubmit={this.submitHandler}>
                    <label>
                        Number:
                        <br/>
                        <input name="submitNumber" type="text" value={this.state.number} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Invoice date:
                        <br/>
                        <input name="invoiceDate" type="date" value={this.state.invoiceDate} onChange={this.handleChange} placeholder="Select date"/>
                    </label>
                    <br/>
                    <label>
                        Supply date:
                        <br/>
                        <input name="supplyDate" type="date" value={this.state.supplyDate} onChange={this.handleChange} placeholder="Select date"/>
                    </label>
                    <br/>
                    <label>
                        Comment:
                        <br/>
                        <input name="comment" type="text" value={this.state.comment} onChange={this.handleChange}></input>
                    </label>
                    <br/>
                    <input type="submit" value="Save"></input>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateInvoiceForm);