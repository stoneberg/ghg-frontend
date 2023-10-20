import { IBoard } from "@/client/board";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import 'ag-grid-enterprise';
import { GridApi } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import style from "./board-list.module.css";

interface IBoardListProps {
  columnHeaders: object[],
  className?: string;
  data?: IBoard[];
}

export const TitleCellRenderer = (props) => { 

  const parameters = props.detailUrlParameters(props);
  return (
  <>
    <Link href={{
            pathname: props.detailUrl,
            query: parameters,
          }} scroll={false} className={style["board-a"]}>{props.value}
    </Link> &nbsp;
    <span className="badge board_badge new" style={{"display" : `${props.data.newYn == 'Y' ? "":"none"}`}}>N</span>
    <span className="badge board_badge attachments" style={{"display" : `${props.data.attachFileCnt > 0 ? "":"none"}`}}>
      <i className="fa-solid fa-paperclip"></i>
    </span>
    <span className="comment_num">{props.data.commentCnt}</span>
  </>
)}

export const BoardList = ({ className, columnHeaders, data }: PropsWithChildren<IBoardListProps>) => {
  const gridStyle     = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      sortable: false,
      minWidth: 100,
      filter: false,
      resizable: false,
      suppressSizeToFit: true,
      cellStyle:  {textAlign: 'center'},
      initialPinned: false, 
      pinned: null,
    };
  }, []);
  const gridRef = useRef();
  useEffect(() => {
      if (gridRef && gridRef.current ) {
        const { api } = gridRef.current;
        const gridApi = api as GridApi; 
      }
  })

  return  (
    <>
        <div className="ag-theme-alpine " style={gridStyle}>
          <AgGridReact 
            ref={gridRef}
            rowData={data} 
            columnDefs={columnHeaders} 
            defaultColDef={defaultColDef}
            domLayout='autoHeight' 
            pagination={false}
            suppressContextMenu={true}
            suppressPaginationPanel={true}
            ></AgGridReact>
        </div>
    </>
  );
};
