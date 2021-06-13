/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React, { useEffect, useRef } from 'react';
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
    formState: { isSubmitSuccessful },
    setValue
  } = useForm();

  const memberData = {
    _email: email || '',
    _interests: interests || ''
  };

  const emailId = memberData._email.split('@')[0];
  const emailProvider = memberData._email.split('@')[1];

  const test = () => {
    setValue('name', name);
    setValue('family', family);
    setValue('gender', gender);
    setValue('email-id', emailId);
    setValue('email-provider', emailProvider);
    setValue('tempInterests', interests);
    setValue('source', source);
    setValue('favorite', favorite_time);
  };

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
          .then(data => memberInfo(...data.data))
          .then(result => {
            test();
          });
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
    const interest = String(tempData.tempInterests);
    delete tempData.tempInterests;
    const newData = { ...tempData, email, interest };
    if (member.name === undefined) {
      console.log('foo');
      // console.log(newData);
      axios
        .post('http://localhost:3001/member/add', newData)
        .then(() => console.log('Data Post Success !'))
        .catch(err => console.error(err));
    } else {
      console.log(newData);
      axios
        .post(`http://localhost:3001/member/update/${memberId}`, newData)
        .then(() => console.log('Data Post Success !'))
        .catch(err => console.error(err));
    }
  };

  const onError = error => {
    // error.ref.style.border = '1px solid red';
    console.log(error);
  };
  // console.log(watch());

  const testest = [];

  const selections = () => {
    const values = [];
    for (let i = 0; i < 8; i++) {
      values.push(`lorem ${i + 1}`);
    }
    const tempInterests = values.map((value, i) => {
      const isChecked = memberData._interests.split(',').includes(value);
      // const isChecked = [true, true, false, false, true, true, false, true];
      const newRef = React.createRef();
      testest.push(newRef);
      return (
        <div key={i} id="selection-container">
          {/* <Checkbox
            id={`cb${i + 1}`}
            type="checkbox"
            register={register}
            name="tempInterest"
            isChecked={isChecked}
            ref={testest}
            onClick={e => {
              console.log(testest.current);
            }}
          /> */}
          <input id={`cb${i + 1}`} type={"checkbox"} {...register("tempInterests")} defaultChecked={isChecked} ref={newRef} value={values[i]} />
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
        name="name"
        isRequired={true}
      />
      <Label isFor="family" tag="성" />
      <Input
        id="family-input"
        type="text"
        register={register}
        name="family"
      />
      <Label isFor="gender" tag="성별" />
      <Select
        id="gender-input"
        array={genders}
        register={register}
        name="gender"
      />
      <Label isFor="email" tag="이메일" />
      <section id="email-input">
        <Input type="text" register={register} name="email-id" />
        <span>@</span>
        <Select
          id="email-provider"
          array={provider}
          register={register}
          name="email-provider"
        />
      </section>
      <Label isFor="source" tag="가입경로" />
      <Select
        id="source-input"
        array={sources}
        register={register}
        name="source"
      />
      <Label isFor="interest" tag="관심사" />
      <section id="interest-input">{selections()}</section>
      <Label isFor="favorite" tag="희망 배송시간" />
      <Select
        id="favorite-input"
        array={favorite}
        register={register}
        name="favorite"
      />
      <input id="submit" type="submit" />
    </form>
  );
};

const mapStateToProps = state => {
  return { member: state.selectedMember };
};

export default connect(mapStateToProps, { memberInfo })(CommonForm);
