import defaultBoard from "./default-board-list";


export default {
  component: defaultBoard,
  title: 'Board/List',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};
