import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SteamCreate = () => {
  const renderInput = ({ input }) => {
    return <input { ...input }/>
  };

  return (
    <div>
      <form>
        <Field name="title" component={renderInput} />
        <Field name="description" component={renderInput} />
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'CreateStream'
})(SteamCreate);