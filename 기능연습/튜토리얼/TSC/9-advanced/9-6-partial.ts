{
  type ToDo = {
    title: string;
    desc: string;
    label: string;
    priority: 'high' | 'low';
  };

  // todo 자리에 들어온 객체의 프로퍼티를 fieldsToUpdate 자리에서 작성한 데이터에 해당하는 부분으로 수정함
  function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    return { ...todo, ...fieldsToUpdate };
  }

  // 사용례
  const todo: ToDo = {
    title: 'learn TypeScript',
    desc: 'study hard',
    label: 'study',
    priority: 'high'
  };

  const updated = updateTodo(todo, { priority: 'low' });
  console.log(updated); // priority만 low로 변경
}