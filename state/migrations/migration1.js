export const migration1 = ({data}) => {
  return {
    ...data,
    todo: data.todo.map((label, index) => ({
      label,
      id: index,
    })),
  };
};
