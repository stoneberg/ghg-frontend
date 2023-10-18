import React, { PropsWithChildren } from "react";

interface IBoardTotalProps {
  total: number;
  range: [number, number];
}

const BoardTotal = <T extends object>({ total, range }: PropsWithChildren<IBoardTotalProps>) => {
  return  (
    <>
      <div className="con_footer">
       <div className="list_result">Showing 
            <span className="bold">{range[0]}</span> to <span className="bold">{range[1]}</span> of <span className="bold">{total}</span> results
        </div>
      </div>
    </>
  );
};

export default React.memo(BoardTotal) as typeof BoardTotal;
