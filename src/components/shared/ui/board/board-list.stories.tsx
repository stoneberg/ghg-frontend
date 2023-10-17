import { NextIntlClientProvider } from "next-intl";
import messages from '../../../../../messages/ko.json';
import BoardList from "./board-list";

const GetDefaultTableForm = () => {
  return  (
          <NextIntlClientProvider locale="ko" messages={messages}>
            <BoardList className={"components-table-demo-control-bar"} />
          </NextIntlClientProvider>
      ); 
}
export default {
  component: GetDefaultTableForm,
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
