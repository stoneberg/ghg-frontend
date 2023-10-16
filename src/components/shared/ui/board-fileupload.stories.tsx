import { NextIntlClientProvider } from "next-intl";
import messages from '../../../../messages/ko.json';
import BoardFileUpload from "./board-fileupload";

const getDefaultComponent = () => {
  return  (<NextIntlClientProvider locale="ko" messages={messages}><BoardFileUpload/></NextIntlClientProvider>);
}

export default {
  component: getDefaultComponent,
  title: 'Board/FileUpload',
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
