{
  // todo리스트를 만들기 위한 타입 정의
  type ToDo = {
    title: string;
    desc: string;
  }

  // 작성된 todo리스트를 받아 데이터를 출력하는 함수
  function display(todo: ToDo) {
    // 현재는 아래와 같이 전달된 객체의 데이터를 수정 가능한 상황인데, 이렇게 객체를 가변적으로 이용할 수 있게 만드는 것은 매우 위험함
    todo.title = 'foo';
  }

  /*
    대처 방법: 함수가 인자로 받는 객체를 readonly로 만들어야 함
    이제까지 강의를 들으면서는 타입을 만들 때부터 readonly 속성을 부여하던지, 이미 존재하던 타입을 Mapped Type을 이용해 readonly 속성을 부여하는 방법을 사용했지만,
    타입스크립트에서 기본적으로 제공하는 타입을 사용할 수도 있음
    readonly 변환은 Readonly<대상 타입>과 같이 사용하면 됨
  */
  function displayRO(todo: Readonly<ToDo>) {
    // 아까와 다르게 수정 불가하다는 오류 메세지 출력
    todo.title = 'foo';
  }
}