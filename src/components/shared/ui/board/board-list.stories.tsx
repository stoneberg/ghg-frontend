import { IBoard } from "@/types/board";
import type { ColumnsType } from 'antd/es/table';
import { NextIntlClientProvider } from "next-intl";
import { useState } from "react";
import messages from '../../../../../messages/ko.json';
import BoardList from "./board-list";

const GetComponent = () => {
  const commonMessages = messages['Common']; 
  const columns: ColumnsType<IBoard> = [
  {
    title: commonMessages['CMM_T_0001']['value'],
    dataIndex: 'key',
  },
  {
    title: commonMessages['CMM_T_0002']['value'],
    dataIndex: 'title',
    render: (text) => <a>{text}</a>,
    ellipsis: true,
  },
  {
    title: commonMessages['CMM_T_0003']['value'],
    dataIndex: 'writer',
    ellipsis: true,
  },
  {
    title: commonMessages['CMM_T_0007']['value'],
    dataIndex: 'date',
  }
];

  const data1: IBoard[] = [];
  for (let i = 1; i <= 300; i++) {
    data1.push({
      key: i,
      title: '게시판 ',
      writer: 'writer',
      date: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }

  const [ pagenation, setPagenation ] = useState({
    current: 1,
    pageSize:10,
    total: data1.length,
    onChange: (page: number, pageSize: number) => {
      console.log("page " , page, pageSize);
      pagenation.current= page;
      setPagenation({...pagenation, current:page});
    }
  })
  const onSearch = (searchValues: any) => {
    console.log("searchValues ", searchValues);
  }

  return  (
          <NextIntlClientProvider locale="ko" messages={messages}>
            <BoardList className={"components-table-demo-control-bar"} 
                      columnHeaders={columns}
                      hasData={true} 
                      data={data1}
                      pagination={pagenation}
                      onSearch={onSearch}
          />
          </NextIntlClientProvider>
      ); 
}
export default {
  component: GetComponent,
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
