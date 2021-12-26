{
  /*
    # Union Types: OR
  */
  type Direction = 'left' | 'right' | 'up' | 'down';
  function move(direction: Direction) {
    console.log(direction);
  }
  move('right');

  type TileSize = 8 | 16 | 32;
  const tile: TileSize = 16;

  // function: login -> success, fail
  // 내 답안:
  type LoginResult = 'success' | 'fail';
  function login(result: LoginResult) {
    // do something
  };
  // 정답:
  type SuccessState = {
    response: {
      body: string;
    }
  };
  type FailState = {
    reason: string;
  };
  type LoginState = SuccessState | FailState;
  function login(id: string, pwd: string): Promise<LoginState> {
    // do something
    return {
      response: {
        body: 'logged in!',
      }
    }
  };

  // 퀴즈: printLoginState(state: LoginState)
  // success -> 성공 response body
  // fail -> 실패 이유
}