import BoardForm from "@/components/shared/ui/board/board-form";
import { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import messages from '../../../messages/ko.json';

const onCancel = () => {

}
const onFinish = () => {

}
const getDefaultTableForm = () => {
  return (<NextIntlClientProvider locale="ko" messages={messages}>
    <BoardForm onCancel={onCancel} onFinish={onFinish} />
  </NextIntlClientProvider>);
}

const meta: Meta<typeof BoardForm> = {
  component: getDefaultTableForm,
  title: 'Board/Form',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof BoardForm>;

export const Default = {
  args: {

  },
};
