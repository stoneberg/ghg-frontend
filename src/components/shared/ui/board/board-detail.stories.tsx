import { IBoard } from "@/client/board/board";
import { NextIntlClientProvider } from "next-intl";
import messages from '../../../../../messages/ko.json';
import BoardDetail from "./board-detail";

const data: IBoard = {
  key: 1,
  title: "게시판 상세",
  writer: "작성자",
  date: "2022-01-30 11:00:00",
  deleteYn: "N",
  newYn: "Y",
  attachFileCnt: 1,
  commentCnt: 1
}

const onBack = () => {
  console.log("onBack");
}
const onDelete = () => {
  console.log("onDelete");
}
const onUpdate = () => {
  console.log("onUpdate");
}


const getDefaultTableForm = () => {
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
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};
