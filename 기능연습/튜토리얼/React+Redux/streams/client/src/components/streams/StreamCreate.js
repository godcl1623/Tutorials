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

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = '제목을 입력해야 합니다.';
  }

  if (formValues.description.length < 10) {
    errors.description = '설명을 10글자 이상 입력해야 합니다.';
  }

  return errors;
}

export default reduxForm({
  form: 'CreateStream'
})(SteamCreate);