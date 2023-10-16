import { Table, TableProps } from "antd";
import numeral from "numeral";
import React, { PropsWithChildren } from "react";

interface IDefaultTableProps<T> extends TableProps<T> {
  countLabel?: number;
}

const DefaultTableBackup = <T extends object>({
  children,
  countLabel,
  ...tableProps
}: PropsWithChildren<IDefaultTableProps<T>>) => {
  return (
    <Table<T>
      size="small"
      rowKey="id"
      tableLayout="fixed"
      scroll={{ x: 800 }}
      bordered
      {...(countLabel && { title: () => <p>{numeral(countLabel).format("0,0")}건</p> })}
      {...tableProps}
    >
      {children}
    </Table>
  );
};

export default React.memo(DefaultTableBackup) as typeof DefaultTableBackup;
