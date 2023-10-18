import { IBoard, IBoardListProps } from "@/types/board";
import { Table } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { TableProps } from 'antd/es/table';
import type { ExpandableConfig, TableRowSelection } from 'antd/es/table/interface';
import React, { PropsWithChildren, useState } from "react";
import style from "./board-list.module.css";
import BoardTitle from './board-title';
import BoardTotal from "./board-total";

type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';


const BoardList = <T extends object>({ className, columnHeaders, hasData, data, onSearch, pagination  }: PropsWithChildren<IBoardListProps>) => {
  const defaultTitle = () => (<BoardTitle onSearch={onSearch} />);
  const [bordered ] = useState(true);
  const [loading ] = useState(false);
  const [size ] = useState<SizeType>('small');
  const [expandable ] = useState<ExpandableConfig<IBoard> | undefined>(
    undefined,
  );
  const [showTitle ] = useState(true);
  const [showHeader ] = useState(true);
  const [rowSelection ] = useState<TableRowSelection<IBoardListProps> | undefined>(undefined);
  const [tableLayout ] = useState();
  const [top ]    = useState<TablePaginationPosition | 'none'>('none');
  const [bottom ] = useState<TablePaginationPosition>('bottomRight');
  const [ellipsis ] = useState(true);
  const [yScroll ] = useState(false);
  const [xScroll ] = useState<string>();
  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }

  const tableColumns = columnHeaders.map((item) => ({ ...item, ellipsis }));
  tableColumns[0].fixed = true;
  tableColumns[tableColumns.length - 1].fixed = 'right';

  const tableProps: TableProps<IBoard> = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: undefined,
    scroll,
    tableLayout,
  };
  
  return  (
    <>
       <section className="con_box no_border">
        <Table
          {...tableProps}
          pagination={
            { 
               ...pagination
              ,position: [top as TablePaginationPosition, bottom] 
              ,defaultPageSize: 10
              ,showSizeChanger: false
              ,showPrevNextJumpers:true
              ,hideOnSinglePage: false
              ,showQuickJumper: false
              ,prevIcon: ""
              ,nextIcon: ""
              ,className: "board-pagination"
              ,showTotal(total, range) {
                return <BoardTotal total={total} range={range} />
              }
            }
          }
          columns={tableColumns}
          dataSource={hasData ? data : []}
          scroll={scroll}
          className={className? style[className] : undefined}
        />
      </section>
    </>
  );
};

export default React.memo(BoardList) as typeof BoardList;
