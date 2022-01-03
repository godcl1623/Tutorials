{
  // 에러를 세분화
  type SuccessState = {
    result: 'success';
  }

  type ErrorReasons = 'offline' | 'down' | 'timeout';

  type NetworkErrorState = {
    result: 'fail';
    reason: ErrorReasons;
  }

  type ResultState = SuccessState | NetworkErrorState;

  class NetworkClient {
    tryConnect(state: boolean, reason?: ErrorReasons = 'timeout'): ResultState {
      if (state) {
        return {
          result: 'success'
        }
      } else {
        return {
          result: 'fail',
          reason
        }
      }
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      this.client.tryConnect(true);
      // login.....
    }
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      try {
        this.userService.login();
      } catch (error) {
        console.log('catched !');
      }
    }
  }

  const client = new NetworkClient();
  const service new UserService(client);
  const app = new App(service);
  app.run();
}