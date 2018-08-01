import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import Input from './input';

import {required,nonEmpty,number,length} from '../validators';
import { submitForm } from '../actions';

class Complaint extends React.Component{
    onSubmit(values) {
        return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    if (
                        res.headers.has('content-type') &&
                        res.headers
                            .get('content-type')
                            .startsWith('application/json')
                    ) {
                        // It's a nice JSON error returned by us, so decode it
                        return res.json().then(err => Promise.reject(err));
                    }
                    // It's a less informative error returned by express
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
                return;
            })
            .then(() => console.log('Submitted with values', values))
            .catch(err => {
                const {reason, message, location} = err;
                if (reason === 'ValidationError') {
                    // Convert ValidationErrors into SubmissionErrors for Redux Form
                    return Promise.reject(
                        new SubmissionError({
                            [location]: message
                        })
                    );
                }
                return Promise.reject(
                    new SubmissionError({
                        _error: 'Error submitting message'
                    })
                );
            });
    }

    render(){
       let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    Message submitted successfully
                </div>
            );
        }

        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div className="message message-error">{this.props.error}</div>
            );
        }


        return(
    <form  onSubmit={this.props.handleSubmit(values =>
        this.onSubmit(values)
    )}>
        {successMessage}
        {errorMessage}
        <h2>Report a problem with your delivery</h2>
        <label htmlFor="trackingNumber">Tracking number</label>
        <br/>
        
        <Field component={Input} name="trackingNumber" value="12345" id="trackingNumber" validate={[required,nonEmpty,length,number]} />
          <br/><br/>
       
       
        <label htmlFor="issue">What is your issue?</label>
        <br/>
        <Field component="select" name="issue" id="issue" >
            <option value="not-delivered">My delivery hasn't arrived</option>
            <option value="wrong-item">The wrong item was delivered</option>
            <option value="missing-part">Part of my order was missing</option>
            <option value="damaged">Some of my order arrived damaged</option>
            <option value="other">Other (give details below)</option>
        </Field>
      
        <br/>  <br/>
       <label htmlFor="details">Give more details (optional)</label>
       <br/>
        
        <Field component={Input} element="textarea"  name="details" id="details" validate={[required,nonEmpty]}>Test this</Field>
        <br/>
        <button type="submit">Submit</button>

    </form>


        );
    }

}


export default reduxForm({
    form:'complaint'

})(Complaint);