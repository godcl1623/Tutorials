import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SteamCreate = ({ handleSubmit }) => {
  const renderInput = ({ input, Label }) => {
    return (
      <div className="field" >
        <label>{ Label }</label>
        <input { ...input }/>
      </div>
    );
  };

  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <div>
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <Field name="title" component={renderInput} Label="Title: " />
        <Field name="description" component={renderInput} Label="Description: " />
        <button className="ui button primary">Submit</button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'CreateStream'
})(SteamCreate);