import { TableProps } from "antd";
import React, { PropsWithChildren } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BoardPagenation from "./board-pagenation";

interface IDefaultTableProps<T> extends TableProps<T> {
  countLabel?: number;
}
type Inputs = {
  example: string
  exampleRequired: string
}

const DefaultBoardList = <T extends object>({
  children,
  countLabel,
  ...tableProps
}: PropsWithChildren<IDefaultTableProps<T>>) => {
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <section className="con_box no_border">
        <div className="con_header no_border">
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="board_search_wrap">
                  <div className="form-row align-items-center">
                      <div className="col-auto">
                          <div className="form-group">
                            <select className="form-control" id="ddlBoard" name="Search_Type"><option value="0">All</option>
                              <option value="1">Title</option>
                              <option value="2">Overview</option>
                              <option value="3">Writer</option>
                            </select>
                          </div>
                      </div>
                      <div className="col-auto">
                          <div className="form-group">
                            <input className="form-control" id="txtSearchText" name="Search_Text" placeholder="Please enter keyword." type="text" value="" />
                          </div>
                      </div>
                      <div className="col-auto">
                          <button className="btn btn_centero_outline_aqua" type="button" onClick={ () => console.log("sk") } >
                            Search
                          </button>
                      </div>
                  </div>
              </div>
            </form>
            <div>
              <button className="btn btn_centero_default" type="button" onClick={() => console.log("") }>Write</button>
            </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-sm centero_tbl board_tbl">
              <colgroup>
                  <col style={{"width": "80px;"}} />
                  <col style={{"width": "auto"}} />
                  <col style={{"width": "160px"}} />
                  <col style={{"width": "240px"}} /> 
              </colgroup>
              <thead>
                  <tr>
                      <th>
                          <div className="data_header">
                              <div>No</div>
                          </div>
                      </th>
                      <th>
                          <div className="data_header">
                              <div>Title</div>
                          </div>
                      </th>
                      <th>
                          <div className="data_header">
                              <div>Writer</div>
                          </div>
                      </th>
                      <th>
                          <div className="data_header">
                              <div>Create Date</div>
                          </div>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td title="33">1</td>
                      <td title="CENTERO Notice (CenteroAdmin)" className="text-left">
                          <div className="board_ellipsis">
                                  <a href="/Board/BoardDetail?ctr=TTKm8zOTKa3SbAnTDvd9PkxJHBd3wn8RcG1qdSBxY1NW4futlxcmcYBDaqvNPmjk2roDI1-srMwIgG4GEoEju0bIM2nR0JZGNUCOxVZWY6FphDgnDdbKhlhnSOg2838TR8v3uGjN6mGIO3hHyD573A,,">CENTERO Notice (CenteroAdmin)</a>
                              &nbsp;
                                  <span className="badge board_badge new" style={{"display" : "none"}}>N</span>
                                  <span className="badge board_badge attachments" style={{"display" : ""}}><i className="fa-solid fa-paperclip"></i></span>
                                  <span className="comment_num">[0]</span>
                          </div>
                      </td>
                      <td title="SystemAdmin">CenteroAdmin</td>
                      <td>2023-05-11 13:08:35</td>
                  </tr>
                  <tr>
                      <td title="32">2</td>
                      <td title="OOO" className="text-left">
                          <div className="board_ellipsis">
                                  <a href="/Board/BoardDetail?ctr=TTKm8zOTKa3SbAnTDvd9PkxJHBd3wn8RcG1qdSBxY1NW4futlxcmcYBDaqvNPmjkFaRcg94cC6NICboSSKBSa8cWXosM4ZLUeAurwlSxpkYbhVauBjBZdDIYo34hDLyMBGVg-On-a_E4amLFIZlgfA,,">OOO</a>
                              &nbsp;
                                  <span className="badge board_badge new" style={{"display" : "none"}}>N</span>
                                  <span className="badge board_badge attachments" style={{"display" : ""}}><i className="fa-solid fa-paperclip"></i></span>
                                  <span className="comment_num">[0]</span>
                          </div>
                      </td>
                      <td title="Dr.dre">CenteroAdmin</td>
                      <td>2023-04-28 11:00:32</td>
                  </tr>
              </tbody>
          </table>
      </div>
      <div className="con_footer">
        <BoardPagenation /> 
      </div>
    </section>
    </>
  );
};

export default React.memo(DefaultBoardList) as typeof DefaultBoardList;
