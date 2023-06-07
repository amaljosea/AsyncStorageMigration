export const migration2 = ({data}) => {
  return {
    ...data,
    todo: data.todo.map((todoItem, index) => ({
      ...todoItem,
      isDone: false,
    })),
  };
};
