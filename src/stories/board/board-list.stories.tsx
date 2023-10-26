import { IBoard } from "@/client/board";
import { BoardList, TitleCellRenderer } from "@/components/shared/ui/board/board-list";
import BoardPaginator from "@/components/shared/ui/board/board-paginator";
import BoardTitle from "@/components/shared/ui/board/board-title";
import { COMMON_YN } from "@/enums/common";
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import utc from 'dayjs/plugin/utc';
import { NextIntlClientProvider } from "next-intl";
import { useMemo, useState } from "react";
import messages from '../../../messages/ko.json';

dayjs.extend(utc);
dayjs.extend(timezone);
const YN = ['Y', 'N'];
const FILECNT = [0, 1, 2, 3, 4];
const d2 = dayjs.utc('2013-11-18 11:55').tz('Asia/Seoul')
const data1: IBoard[] = [];

for (let i = 1; i <= 50; i++) {
  data1.push({
    brdSeq: i,
    brdCategory: `게시판 ${i}`,
    brdContents: `게시판 내용 ${i}`,
    brdTitle: `writer ${i}`,
    createDt: d2.format('YYYY-MM-DD HH:mm:ss'),
    createNm: "bruce ",
    deletedYn: COMMON_YN.Y,
    newYn: COMMON_YN.Y,
    attachFileCnt: FILECNT[i % 5],
    commentCnt: 1,
    rowNum: i
  });
}

const GetComponent = () => {
  const commonMessages = messages['Common'];
  const columns: ColumnsType<IBoard> = [
    {
      title: commonMessages['CMM_T_0001']['value'],
      dataIndex: 'key',
      width: "80px",
      align: 'center',
    },
    {
      title: commonMessages['CMM_T_0002']['value'],
      dataIndex: 'title',
      ellipsis: true,
      width: "auto",
      align: 'center',
    },
    {
      title: commonMessages['CMM_T_0003']['value'],
      dataIndex: 'writer',
      ellipsis: true,
      width: "240px",
      align: 'center',
    },
    {
      title: commonMessages['CMM_T_0007']['value'],
      dataIndex: 'date',
      width: "240px",
      align: 'center',
    }
  ];
  const linkUrl = "/board/detail";
  const detailUrlParameters = (props) => ({ "brdSeq": props.data.brdSeq });

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: commonMessages['CMM_T_0001']['value']
      , field: "rowNum"
      , minWidth: "80"
      , cellStyle: { "textAlign": 'center' }
    },
    {
      headerName: commonMessages['CMM_T_0002']['value']
      , field: "brdTitle"
      , minWidth: "100"
      , cellStyle: { "textAlign": 'center' }
      , cellRenderer: (props) => <TitleCellRenderer {...props} detailUrl={linkUrl} detailUrlParameters={detailUrlParameters} />
    },
    {
      headerName: commonMessages['CMM_T_0003']['value']
      , field: "createNm"
      , minWidth: "240"
      , cellStyle: { textAlign: 'center' }
    },
    {
      headerName: commonMessages['CMM_T_0007']['value']
      , field: "createDt"
      , minWidth: "240"
      , cellStyle: { textAlign: 'center' }
    }
  ]);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const [datas, setDatas] = useState(data1.slice(0, 10));
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: data1.length,
    perPage: 5,
    onChange: (page: number, pageSize: number) => {
      setPageInfo({ ...pageInfo, current: page });
      setDatas(data1);
    }
  })
  const onSearch = (searchValues: any) => {
    console.log("searchValues ", searchValues);
  }
  const onWrite = () => {
    console.log("onWrite ");
  }
  const onPageChange = (page: number) => {
    setDatas(data1.slice((page - 1) * pageInfo.pageSize, (page - 1) * pageInfo.pageSize + pageInfo.pageSize));
    setPageInfo({ ...pageInfo, current: page });
  }

  return (
    <NextIntlClientProvider locale="ko" messages={messages}>
      <section className="con_box no_border centero_tb" style={containerStyle} >
        <BoardTitle onSearch={onSearch} onWriteLink={onWrite} />
        <BoardList className={"components-table-demo-control-bar"}
          columnHeaders={columnDefs}
          data={datas} />
        <BoardPaginator data={datas} pageInfo={pageInfo} onChangePage={onPageChange} />
      </section>
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
