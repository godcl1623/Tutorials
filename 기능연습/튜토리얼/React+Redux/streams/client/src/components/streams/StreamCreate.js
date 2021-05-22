import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SteamCreate = ({ handleSubmit }) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return(
        <div className="ui error message">
          <div className="header">{ error }</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, Label, meta }) => {
    const caseError = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={ caseError } >
        <label>{ Label }</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <div>
      <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
        <Field name="title" component={renderInput} Label="Title: " />
        <Field name="description" component={renderInput} Label="Description: " />
        <button className="ui button primary">Submit</button>
      </form>
    </div>
  );
};

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = '제목을 입력해야 합니다.';
  }

  if (!formValues.description) {
    errors.description = '설명을 입력해야 합니다.';
  }

  return errors;
}

export default reduxForm({
  form: 'CreateStream',
  validate: validate
})(SteamCreate);