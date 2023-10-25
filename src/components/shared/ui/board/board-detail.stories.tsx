import { NextIntlClientProvider } from "next-intl";
import messages from '../../../../../messages/ko.json';
import BoardDetail from "./board-detail";

const onBack = () => {
  console.log("onBack");
}
const onDelete = () => {
  console.log("onDelete");
}
const onUpdate = () => {
  console.log("onUpdate");
}


const getDefaultTableForm = ({data}) => {
  return  (<NextIntlClientProvider locale="ko" messages={messages}>
      <BoardDetail data={data}
        onBack={onBack}
        onDelete={onDelete} 
        onUpdate={onUpdate}
  
      />
    </NextIntlClientProvider>);
}

export default {
  component: getDefaultTableForm,
  title: 'Board/Detail',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    data: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};
