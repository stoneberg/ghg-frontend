import { IBoard } from "@/client/board";
import Comment from "@/components/shared/ui/comment/comment";
import { COMMON_YN } from "@/enums/common";
import type { Meta, StoryObj } from '@storybook/react';
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import utc from 'dayjs/plugin/utc';
import { getCommentList } from "dummy/comment";
import { NextIntlClientProvider } from "next-intl";
import enmessages from '../../../messages/en.json';
import messages from '../../../messages/ko.json';

dayjs.extend(utc);
dayjs.extend(timezone);
const boardDetail: IBoard = {
  brdSeq: 1,
  brdParentSeq: 0,
  brdCategory: "",
  brdTitle: "",
  brdContents: "",
  topYn: COMMON_YN.Y,
  topEndDt: "",
  readCnt: "",
  deletedYn: COMMON_YN.Y,
  attachFileCnt: 0,
  commentCnt: 0,
  newYn: COMMON_YN.Y,
  updateNm: "",
}

const d2 = dayjs.utc('2013-11-18 11:55').tz('Asia/Seoul')
const YN = ['Y', 'N'];

const getDefaultTableForm = (props) => {
  return (
    <NextIntlClientProvider locale="ko" messages={messages}>
      <Comment {...props} />
    </NextIntlClientProvider>
  );
}

const meta: Meta<typeof Comment> = {
  component: getDefaultTableForm,
  title: 'Comment/Overview',
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};
type Story = StoryObj<typeof Comment>;

export default meta;

export const EmptyComment = {
  args: {
    boardDetail: { ...boardDetail, ...{ "commentCnt": 0 } },
    sessionStatus: "authenticated"
  },
  name: "댓글수[0] 쓰기가능"
};
export const EmptyCommentAndImposibleWriteComment = {
  args: {
    boardDetail: { ...boardDetail, ...{ "commentCnt": 0 } },
    sessionStatus: "unauthenticated"
  },
  name: "댓글수[0] 쓰기 불가능"
};

export const MultiComment1: Story = {
  decorators: [],
  name: '댓글수[33] LV < 2',
  parameters: {
  },
  args: {
    boardDetail: { ...boardDetail, ...{ "commentCnt": 33 } },
    sessionStatus: "authenticated"
  },
};
export const ParentComment1: Story = {
  decorators: [],
  name: '대댓글',
  parameters: {

  },
  args: {
    boardDetail: { ...boardDetail, ...{ commentCnt: 2 } },
    comments: getCommentList().concat(getCommentList({
      cmtSeq: 2,
      cmtParentSeq: 2,
      cmtContents: "대댓글"
    }, 1)),
    sessionStatus: "authenticated"
  },
};

export const ImpossibleWriteComment: Story = {
  decorators: [],
  name: '쓰기불가능',
  parameters: {

  },
  args: {
    boardDetail: { ...boardDetail, ...{ "commentCnt": 1 } },
    comments: getCommentList(),
    sessionStatus: "unauthenticated"
  },
};

export const MoreComment: Story = {
  decorators: [],
  name: '댓글 더보기',
  parameters: {

  },
  args: {
    boardDetail: { ...boardDetail, ...{ "commentCnt": 51 } },
    sessionStatus: "authenticated"
  },
};

export const EngComment: Story = {
  decorators: [],
  name: '영문버전',
  render: (args) => (
    <NextIntlClientProvider locale="en" messages={enmessages} >
      <Comment {...args} />
    </NextIntlClientProvider >
  ),
  args: {
    boardDetail: { ...boardDetail, ...{ "commentCnt": 1 } },
    comments: getCommentList(),
    sessionStatus: "authenticated"
  },
};

export const ReplyComment: Story = {
  decorators: [],
  name: 'Reply',
  render: (args) => (
    <NextIntlClientProvider locale="en" messages={enmessages} >
      <Comment {...args} />
    </NextIntlClientProvider >
  ),
  args: {
    boardDetail: { ...boardDetail, ...{ "commentCnt": 1 } },
    comments: getCommentList({ replyWriteYn: COMMON_YN.Y }),
    sessionStatus: "authenticated",
  },
};




