import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SteamCreate = () => {
  return (
    <div>
      <form>
        <Field name="title" />
        <Field name="description" />
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'CreateStream'
})(SteamCreate);