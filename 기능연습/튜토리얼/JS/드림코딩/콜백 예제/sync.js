'use strict';

class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === 'taraczel' && password === '123456') ||
        (id === 'papercages' && password === '987654')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'taraczel') {
        onSuccess({ name: 'taraczel', role: 'admin' });
      } else {
        onError(new Error('no access'));
      }
    }, 1000);
  }
}

// 1. 백엔드와 통신을 위해 정보를 입력받을 변수를 선언
const userStorage = new UserStorage();

// 2. 사용자의 id를 받음
const id = prompt('enter your id');

// 3. 사용자 비번을 받음
const password = prompt('enter your password');

// 4. 2와 3에서 받은 데이터를 입력해 로그인 시도
userStorage.loginUser(
	id,
	password,
	user => {
		userStorage.getRoles(
			user,
			userWithRole => {
				alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role.`);
			},
			erorr => {
				console.log(error);
			}
		);
	},
	error => {
		console.log(error);
	}
);
