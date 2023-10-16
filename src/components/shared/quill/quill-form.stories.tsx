import { NextIntlClientProvider } from "next-intl";
import messages from '../../../../messages/ko.json';
import QuillForm from "./quill-form";

const getForm = () => {
  return  (<NextIntlClientProvider locale="ko" messages={messages}><QuillForm/></NextIntlClientProvider>);
}

export default {
  component: getForm,
  title: 'Quill/Form',
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
