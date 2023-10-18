import { NextIntlClientProvider } from "next-intl";
import messages from '../../../../messages/ko.json';
import BoardList from "./default-board-list-type1";

const getDefaultComponent = () => {
  return  (<NextIntlClientProvider locale="ko" messages={messages}><BoardList/></NextIntlClientProvider>);
}

export default {
  component: getDefaultComponent,
  title: 'Board/List1',
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
