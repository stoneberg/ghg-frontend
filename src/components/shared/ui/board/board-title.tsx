import React, { PropsWithChildren } from "react";

interface IBoardTitleProps {
  className?: string;
}

const BoardTitle = <T extends object>({ className }: PropsWithChildren<IBoardTitleProps>) => {
  return  (
    <>
     <div className="con_header no_border">
       <div className="board_search_wrap">
        <div className="form-row align-items-center">
          <div className="col-auto">
            <div className="form-group">
              <select className="form-control" id="ddlBoard" name="Search_Type">
                <option value="0">All</option>
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
          <div>
            <button className="btn btn_centero_default" type="button" onClick={() => console.log("") }>Write</button>
          </div>
      </div>
    </>
  );
};

export default React.memo(BoardTitle) as typeof BoardTitle;
