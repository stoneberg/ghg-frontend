import { IBoard, IBoardPagination } from "@/client/board";
import "@/styles/Common/FileUpload/css/GTFu.Style.css";
import _ from "lodash";
import React, { PropsWithChildren, useMemo } from "react";

interface IBoardPaginationProps {
  data?: IBoard[];
  pageInfo?: IBoardPagination
  onChangePage: (pageNum: number) => void;
}
const defaultPageInfo: Partial<IBoardPagination> = {
  perPage: 10,
  pageSize: 10,
}

const BoardPaginator = ({
  data, pageInfo, onChangePage
}: PropsWithChildren<IBoardPaginationProps>) => {
  const pagination = { ...defaultPageInfo, ...pageInfo };
  let totalPageSize = useMemo(() => Math.ceil(pageInfo.total / pageInfo.pageSize), []);
  let pageStartNum = (Math.ceil(pageInfo.current / pagination.perPage) - 1) * pagination.perPage + 1;
  let pageLastNum = (pageStartNum - 1) + pagination.perPage;
  let nextPageStartNum = pageLastNum + 1;
  let prevPageStartNum = pageStartNum - pagination.perPage;
  if (pageLastNum > totalPageSize) pageLastNum = totalPageSize;

  return (
    <>
      <div className="con_footer">
        <div className="list_result">Showing
          <span className="bold">{data[0].rowNum} </span> to <span className="bold">{data[data.length - 1].rowNum}</span> of <span className="bold">{pageInfo.total}</span> results</div>
        <div>
          <div className="" id="datatable-keytable_paginate">
            <div className="dataTables_paginate paging_simple_numbers" id="datatable-keytable_paginate">
              <nav>
                <ul className="pagination">
                  {prevPageStartNum > 0 ?
                    <li className="previous">
                      <a aria-label="Previous" onClick={() => onChangePage(prevPageStartNum)} style={{ "cursor": "pointer" }}>
                        <span aria-hidden="true">Previous</span>
                      </a>
                    </li> : ""
                  }
                  {_.range(pageStartNum, pageLastNum + 1).map((index) => {
                    return (<li key={index} className={pageInfo.current == index ? "active" : ""}>
                      <a onClick={() => onChangePage(index)} style={{ "cursor": "pointer" }}>{index}</a>
                    </li>);
                  })}
                  {nextPageStartNum <= totalPageSize ?
                    <li className="next">
                      <a aria-label="Next" onClick={() => onChangePage(nextPageStartNum)} style={{ "cursor": "pointer" }}>
                        <span aria-hidden="true">Next</span>
                      </a>
                    </li>
                    : ""}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(BoardPaginator) as typeof BoardPaginator;
