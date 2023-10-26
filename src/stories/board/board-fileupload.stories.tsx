import BoardFileUpload from "@/components/shared/ui/board/board-fileupload";
import { Button } from "antd";
import { NextIntlClientProvider } from "next-intl";
import messages from '../../../messages/ko.json';

const getDefaultComponent = () => {
  return (<NextIntlClientProvider locale="ko" messages={messages}>
    <div style={{ "padding": "30px" }}>
      <Button
        type="primary"
        style={{ marginTop: 16 }}
      >
        Start Upload
      </Button>
      <BoardFileUpload />
    </div>
  </NextIntlClientProvider>);
}

export default {
  component: getDefaultComponent,
  title: 'Board/FileUpload',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {
  },
};
