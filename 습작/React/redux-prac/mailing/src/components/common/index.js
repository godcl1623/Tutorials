import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { memberInfo } from '../../actions';
import { Select, Input, Label, Checkbox } from './module';
import { source, favorite, provider, gender } from './tempDB';

const CommonForm = ({ memberId, member, memberInfo }) => {
  console.log(memberId, member);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful }
  } = useForm();

  const {
    name: _name,
    family: _family,
    gender: _gender,
    email: _email,
    interests: _interests,
    source: _source,
    favorite_time: _favorite
  } = member;

  useEffect(() => {
    const select = document.querySelectorAll('select');
    select.forEach(element => {
      element.value = '';
    });
    if (isSubmitSuccessful) {
      reset();
    }
    if (memberId !== undefined) {
      axios
        .get(`http://localhost:3001/member/get/${memberId}`)
        .then(data => memberInfo(...data.data));
    }
  }, [isSubmitSuccessful, reset, memberId, memberInfo]);

  const onSubmitSuccess = data => {
    const tempData = { ...data };
    const email = `${tempData['email-id']}@${tempData['email-provider']}`;
    delete tempData['email-id'];
    delete tempData['email-provider'];
    const interest = String(tempData.tempInterest);
    delete tempData.tempInterest;
    const newData = { ...tempData, email, interest };
    axios
      .post('http://localhost:3001/member/add', newData)
      .then(() => console.log('Data Post Success !'))
      .catch(err => console.error(err));
  };

  const onError = error => {
    // error.ref.style.border = '1px solid red';
    console.log(error);
  };
  // console.log(watch());

  const selections = () => {
    const cbValue = member === undefined ? '' : Array(_interests);
    const values = [];
    for (let i = 0; i < 8; i++) {
      values.push(`lorem ${i + 1}`);
    }
    const tempInterests = values.map((value, i) => {
      return (
        <div key={i} id="selection-container">
          <Checkbox
            id={`cb${i + 1}`}
            type="checkbox"
            register={register}
            name="tempInterest"
            value={cbValue}
          />
          {/* <input
            id={`cb${i + 1}`}
            type="checkbox"
            {...register('tempInterest')}
            value={values[i]}
          /> */}
          <p>{value}</p>
        </div>
      );
    });
    return tempInterests;
  };

  return (
    <form onSubmit={handleSubmit(onSubmitSuccess, onError)}>
      <Label isFor="name" tag="이름" />
      <Input
        id="name-input"
        type="text"
        register={register}
        name="name"
        isRequired={true}
        value={_name}
      />
      <Label isFor="family" tag="성" />
      <Input id="family-input" type="text" register={register} name="family" value={_family} />
      <Label isFor="gender" tag="성별" />
      <Select id="gender-input" array={gender} register={register} name="gender" value={_gender} />
      <Label isFor="email" tag="이메일" />
      <section id="email-input">
        <Input type="text" register={register} name="email-id" />
        <span>@</span>
        <Select id="email-provider" array={provider} register={register} name="email-provider" />
      </section>
      <Label isFor="source" tag="가입경로" />
      <Select id="source-input" array={source} register={register} name="source" value={_source} />
      <Label isFor="interest" tag="관심사" />
      <section id="interest-input">{selections()}</section>
      <Label isFor="favorite" tag="희망 배송시간" />
      <Select
        id="favorite-input"
        array={favorite}
        register={register}
        name="favorite"
        value={_favorite}
      />
      <input id="submit" type="submit" />
    </form>
  );
};

const mapStateToProps = state => {
  return { member: state.selectedMember };
};

export default connect(mapStateToProps, { memberInfo })(CommonForm);
