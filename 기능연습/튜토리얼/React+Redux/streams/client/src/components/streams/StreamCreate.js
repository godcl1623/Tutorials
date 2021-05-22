import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SteamCreate = () => {
  const renderInput = ({ input, Label }) => {
    return (
      <div className="field" >
        <label>{ Label }</label>
        <input { ...input }/>
      </div>
    );
  };

  return (
    <div>
      <form className="ui form">
        <Field name="title" component={renderInput} Label="Title: " />
        <Field name="description" component={renderInput} Label="Description: " />
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'CreateStream'
})(SteamCreate);