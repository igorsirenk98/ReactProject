import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class CreateInvoiceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitNumber: '',
            invoiceDate: '',
            supplyDate: '',
            comment: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    onFocusDate(event) {
        const { currentTarget } = event;
        currentTarget.type = 'date';
    }

    onBlurDate(event) {
        const { currentTarget } = event;
        currentTarget.type = 'text';
        currentTarget.placeholder = 'Select date';
    }

    handleChange(event) {
        const { target } = event;
        const { name } = target;
        const { value } = target;

        this.setState({
            [name]: value,
        });
    }

    formatDate(date) {
        const formattedDate = moment(date).format('DD-MM-YYYY');

        return formattedDate;
    }

    submitHandler(event) {
        event.preventDefault();

        const data = {
            _id: Math.floor(Math.random() * 101),
            number: this.state.submitNumber,
            date_created: this.formatDate(this.state.invoiceDate),
            date_supplied: this.formatDate(this.state.supplyDate),
            comment: this.state.comment,
        };

        fetch('http://localhost:3004/data', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .catch(err => console.log('Error: ', err))
            .then(() => this.props.history.push('/'));
    }

    render() {
        return (
            <div>
                <h2 className="title">Create Invoice</h2>
                <form className="invoice-form" onSubmit={this.submitHandler}>
                    <fieldset className="invoice-form__fieldset fieldset">
                        <label className="fieldset__label">
                            Number:
                            <br />
                            <input
                                className="fieldset__input fieldset__input_number"
                                name="submitNumber"
                                type="text"
                                value={this.state.number}
                                minLength="3"
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                        <label className="fieldset__label">
                            Invoice Date:
                            <br />
                            <input
                                className="fieldset__input fieldset__input_date"
                                name="invoiceDate"
                                type="text"
                                value={this.state.invoiceDate}
                                onFocus={this.onFocusDate}
                                onBlur={this.onBlurDate}
                                onChange={this.handleChange}
                                placeholder="Select date"
                                required
                            />
                        </label>
                        <label className="fieldset__label">
                            Supply Date:
                            <br />
                            <input
                                className="fieldset__input fieldset__input_date"
                                name="supplyDate"
                                type="text"
                                value={this.state.supplyDate}
                                onFocus={this.onFocusDate}
                                onBlur={this.onBlurDate}
                                onChange={this.handleChange}
                                placeholder="Select date"
                                required
                            />
                        </label>
                        <label className="fieldset__label fieldset__label_textarea">
                            Comment:
                            <br />
                            <textarea
                                className="fieldset__input fieldset__input_textarea"
                                name="comment"
                                value={this.state.comment}
                                maxLength="160"
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                    </fieldset>
                    <input
                        className="invoice-form__button button button_add"
                        type="submit"
                        value="Save"
                    />
                </form>
            </div>
        );
    }
}

export default withRouter(CreateInvoiceForm);
