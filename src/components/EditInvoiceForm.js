import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class EditInvoiceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitNumber: props.location.props.number,
            invoiceDate: props.location.props.date_created,
            supplyDate: props.location.props.date_supplied,
            comment: props.location.props.comment,
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
        const splittedDate = date.split('-');

        if (moment(date, 'DD-MM-YYYY').isValid() && splittedDate[0].length === 2) {
            const dateValue = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');

            return dateValue;
        }

        return date;
    }

    checkDate(date) {
        const splittedDate = date.split('-');

        if (splittedDate[0].length > 2) {
            const dateValue = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');

            return dateValue;
        }

        return date;
    }

    submitHandler(event) {
        event.preventDefault();

        const data = {
            _id: this.props.location.props._id,
            number: this.state.submitNumber,
            date_created: this.checkDate(this.state.invoiceDate),
            date_supplied: this.checkDate(this.state.supplyDate),
            comment: this.state.comment,
        };

        fetch(`http://localhost:3004/data/${data._id}`, {
            method: 'PATCH',
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
                <h2 className="title">Edit Invoice</h2>
                <form className="invoice-form" onSubmit={this.submitHandler}>
                    <fieldset className="invoice-form__fieldset fieldset">
                        <label className="fieldset__label">
                            Number:
                            <br />
                            <input
                                className="fieldset__input fieldset__input_number"
                                name="submitNumber"
                                type="text"
                                value={this.state.submitNumber}
                                minLength="3"
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                        <label className="fieldset__label">
                            Invoice date:
                            <br />
                            <input
                                className="fieldset__input fieldset__input_date"
                                name="invoiceDate"
                                type="text"
                                value={this.formatDate(this.state.invoiceDate)}
                                onFocus={this.onFocusDate}
                                onBlur={this.onBlurDate}
                                onChange={this.handleChange}
                                placeholder="Select date"
                                required
                            />
                        </label>
                        <label className="fieldset__label">
                            Supply date:
                            <br />
                            <input
                                className="fieldset__input fieldset__input_date"
                                name="supplyDate"
                                type="text"
                                value={this.formatDate(this.state.supplyDate)}
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

export default withRouter(EditInvoiceForm);
