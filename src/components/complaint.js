import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from './input';
import {required,nonEmpty,number,length} from '../validators';

class Complaint extends React.Component{

    render(){
        return(
    <form onSubmit={this.props.handleSubmit(values=>console.log(values))}>
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