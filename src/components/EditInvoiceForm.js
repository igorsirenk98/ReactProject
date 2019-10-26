import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class EditInvoiceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navigate: '/',
            submitNumber: props.location.props.number,
            invoiceDate: props.location.props.date_created,
            supplyDate: props.location.props.date_supplied,
            comment: props.location.props.comment
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

    convertDate(date) {
        const splittedDate = date.split('-');

        if (moment(date, 'DD-MM-YYYY').isValid() && splittedDate[0].length === 2) {
            const dateValue = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');

            return dateValue;
        } else {
            return date;
        }
        
    }

    checkDate(date) {
        const splittedDate = date.split('-');

        if (splittedDate[0].length > 2) {
            const dateValue = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');

            return dateValue;
        }
    }

    submitHandler(event) {
        event.preventDefault();

        const data = {
            _id: this.props.location.props._id,
            number: this.state.submitNumber,
            date_created: this.checkDate(this.state.invoiceDate),
            date_supplied: this.checkDate(this.state.supplyDate),
            comment: this.state.comment
        };

        fetch(`http://localhost:3004/data/${data._id}`, {
            method: 'PATCH', headers: new Headers({ 'Content-Type': 'application/json' }), body: JSON.stringify(data) 
        })
            .then(res => res.json())
            .catch(err => console.log('Error: ', err))
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
                        <input name="submitNumber" type="text" value={this.state.submitNumber} minLength="3" onChange={this.handleChange} required/>
                    </label>
                    <br/>
                    <label>
                        Invoice date:
                        <br/>
                        <input name="invoiceDate" type="date" value={this.convertDate(this.state.invoiceDate)} onChange={this.handleChange} placeholder="Select date" required/>
                    </label>
                    <br/>
                    <label>
                        Supply date:
                        <br/>
                        <input name="supplyDate" type="date" value={this.convertDate(this.state.supplyDate)} onChange={this.handleChange} placeholder="Select date" required/>
                    </label>
                    <br/>
                    <label>
                        Comment:
                        <br/>
                        <input name="comment" type="text" value={this.state.comment} maxLength="160" onChange={this.handleChange} required />
                    </label>
                    <br/>
                    <input type="submit" value="Save"></input>
                </form>
            </div>
        );
    }
}

export default withRouter(EditInvoiceForm);