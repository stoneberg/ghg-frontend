import { NextIntlClientProvider } from "next-intl";
import messages from '../../../../messages/ko.json';
import DefaultBoardForm from "./default-board-form";

const getDefaultTableForm = () => {
  return  (<NextIntlClientProvider locale="ko" messages={messages}><DefaultBoardForm/></NextIntlClientProvider>);
}

export default {
  component: getDefaultTableForm,
  title: 'Board/Form',
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
