{
  /*
    Discriminated Union 타입이란, 일반적인 Union 타입에 구분을 위한 key를 추가한 형태를 말한다.
    예를 들어, index란 key를 부여하고 1번 타입에는 값으로 1, 2번 타입에는 값으로 2와 같이 할당하면 된다.
    이렇게 할 경우 함수 내부 스코프에서 공통된 key 프로퍼티에 접근이 가능하므로, in 연산자를 사용하지 않고도 각각의 경우에 맞는 input에 접근하도록 만들 수 있다.
  */

  // ※※※※※ Discriminated Union이 적용되지 않은, 좋지 않은 코드 ※※※※※
  // type SuccessState = {
  //   response: {
  //     body: string;
  //   };
  // };
  // type FailState = {
  //   reason: string;
  // };
  // type LoginState = SuccessState | FailState;
  // function login(): LoginState {
  //   return {
  //     response: {
  //       body: 'logged in !'
  //     }
  //   };
  // };
  // const printLoginState = (state: LoginState) => {
  //   if ('response' in state) {
  //     console.log(`🎉' ${state.response.body}`);
  //   } else {
  //     console.log(`😭' ${state.reason}`);
  //   }
  // };

  // ※※※※※ Discriminated Union을 적용한 코드 ※※※※※
  type SuccessState = {
    result: 'success';
    response: {
      body: string;
    };
  };
  type FailState = {
    result: 'fail';
    reason: string;
  };
  type LoginState = SuccessState | FailState;
  function login(): LoginState {
    return {
      result: 'success',
      response: {
        body: 'logged in !'
      }
    };
  };
  const printLoginState = (state: LoginState) => {
    if (state.result === 'success') {
      console.log(`🎉' ${state.response.body}`);
    } else {
      console.log(`😭' ${state.reason}`);
    }
  };
}
