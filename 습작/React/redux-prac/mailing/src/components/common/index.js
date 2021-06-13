/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { memberInfo } from '../../actions';
import { Select, Input, Label, Checkbox } from './module';
import { sources, favorite, provider, genders } from './tempDB';

const CommonForm = ({ memberId, member, memberInfo }) => {
  const { name, family, gender, email, interests, source, favorite_time } = member;

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful }
  } = useForm();

  const memberData = {
    _name: name || '',
    _family: family || '',
    _gender: gender || '',
    _email: email || '',
    _interests: interests || '',
    _source: source || '',
    _favorite: favorite_time || ''
  };

  const emailId = memberData._email.split('@')[0];
  const emailProvider = memberData._email.split('@')[1];

  useEffect(() => {
    const select = document.querySelectorAll('select');
    select.forEach(element => {
      element.value = '';
    });
    if (isSubmitSuccessful) {
      reset();
    }
    if (memberId !== undefined) {
      const getMemberInfo = async () => {
        const response = await axios
          .get(`http://localhost:3001/member/get/${memberId}`)
          .then(data => memberInfo(...data.data));
        return response;
      };
      getMemberInfo();
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
    if (member === undefined) {
      axios
        .post('http://localhost:3001/member/add', newData)
        .then(() => console.log('Data Post Success !'))
        .catch(err => console.error(err));
    } else {
      axios
        .post('http://localhost:3001/member/update/:id', newData)
        .then(() => console.log('Data Post Success !'))
        .catch(err => console.error(err));
    }
  };

  const onError = error => {
    // error.ref.style.border = '1px solid red';
    console.log(error);
  };
  // console.log(watch());

  const selections = () => {
    const values = [];
    for (let i = 0; i < 8; i++) {
      values.push(`lorem ${i + 1}`);
    }
    const tempInterests = values.map((value, i) => {
      const isChecked = memberData._interests.split(',').includes(value);
      return (
        <div key={i} id="selection-container">
          <Checkbox
            id={`cb${i + 1}`}
            type="checkbox"
            register={register}
            name="tempInterest"
            value={values[i]}
            isChecked={isChecked}
          />
          <p>{value}</p>
        </div>
      );
    });
    return tempInterests;
  };

  if (member === undefined) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmitSuccess, onError)}>
      <Label isFor="name" tag="이름" />
      <Input
        id="name-input"
        type="text"
        register={register}
        name="_name"
        isRequired={true}
        value={memberData._name}
      />
      <Label isFor="family" tag="성" />
      <Input
        id="family-input"
        type="text"
        register={register}
        name="family"
        value={memberData._family}
      />
      <Label isFor="gender" tag="성별" />
      <Select
        id="gender-input"
        array={genders}
        register={register}
        name="gender"
        value={memberData._gender}
      />
      <Label isFor="email" tag="이메일" />
      <section id="email-input">
        <Input type="text" register={register} name="email-id" value={emailId} />
        <span>@</span>
        <Select
          id="email-provider"
          array={provider}
          register={register}
          name="email-provider"
          value={emailProvider}
        />
      </section>
      <Label isFor="source" tag="가입경로" />
      <Select
        id="source-input"
        array={sources}
        register={register}
        name="source"
        value={memberData._source}
      />
      <Label isFor="interest" tag="관심사" />
      <section id="interest-input">{selections()}</section>
      <Label isFor="favorite" tag="희망 배송시간" />
      <Select
        id="favorite-input"
        array={favorite}
        register={register}
        name="favorite"
        value={memberData._favorite}
      />
      <input id="submit" type="submit" />
    </form>
  );
};

const mapStateToProps = state => {
  return { member: state.selectedMember };
};

export default connect(mapStateToProps, { memberInfo })(CommonForm);
