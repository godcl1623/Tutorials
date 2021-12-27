{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: 'loading';
  };

  type SuccessState = {
    state: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  // 내 답안
  // const printLoginState = (state: ResourceLoadState): void => {
  //   switch (state.state) {
  //     case 'loading':
  //       console.log('👀 loading...');
  //       break;
  //     case 'success':
  //       console.log('😃 loaded');
  //       break;
  //     case 'fail':
  //       console.log('😱 no network');
  //       break;
  //     default:
  //       throw new Error(`invalid state input: ${state}`);
  //   }
  // };
  // 풀이
  function printLoginState(state: ResourceLoadState) {
    switch (state.state) {
      case 'loading':
        console.log('👀 loading...');
        break;
      case 'success':
        console.log('😃 loaded');
        break;
      case 'fail':
        console.log('😱 no network');
        break;
      default:
        throw new Error(`invalid state input: ${state}`);
    }
  }
  printLoginState({ state: 'loading' }); // 👀 loading...
  printLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
  printLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
}
