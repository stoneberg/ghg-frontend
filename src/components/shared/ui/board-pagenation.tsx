import "@/styles/Common/FileUpload/css/GTFu.Style.css";
import { TableProps } from "antd";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";

interface IDefaultTableProps<T> extends TableProps<T> {
  countLabel?: number;
}
type Inputs = {
  example: string
  exampleRequired: string
}

const BoardPagenation = <T extends object>({
  children,
}: PropsWithChildren<IDefaultTableProps<T>>) => {
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<Inputs>()

  return (
    <>
        <div className="list_result">Showing 
            <span className="bold">1</span> to <span className="bold">10</span> of <span className="bold">25</span> results</div>
            <div>
                <div className="" id="datatable-keytable_paginate">
                    <div className="dataTables_paginate paging_simple_numbers" id="datatable-keytable_paginate">
                    <nav>
                        <ul className="pagination">
                            <li className="active">
                                <a href="/Board/BoardList?ctr=TTKm8zOTKa3SbAnTDvd9PkxJHBd3wn8RcG1qdSBxY1MSyW9NpLb0zC-JdhAn7CeYJ9pOtjL-8ENagLnjzhG2_saGxi5deWNygbi--Tqhyf2nKXx7chRnpmpvxD-0GlpV-SbQow3bth-HDUIUhKemU6BmXoSs0BvDtApx2rjHmAkfq8afQnkuS-S2-prWqqWHqk-OGFnl5E0aQI69D0bbvqRvBwyUdQDSbHSDuj6m9WIFVMofogO5aQ49E9fY2gN6dU3Gd42W7q3XZp0l7Zt5Ctx3LIsAfL6gSq3EBuRJUNwzsqstHxCb1up4WM0hqdJzjwt8z7OAzUFajLrT5KP7xw,,">1</a></li>                      <li><a href="/Board/BoardList?ctr=TTKm8zOTKa3SbAnTDvd9PkxJHBd3wn8RcG1qdSBxY1MSyW9NpLb0zC-JdhAn7CeYJ9pOtjL-8ENagLnjzhG2_saGxi5deWNygbi--Tqhyf1HMswPLr6t0bgGDIhlKMFPKZwh9gw7EJvSaglK1uXQ9BZA_aOh-4Wtvf9IbXsxo7BynPa0xKrKkPzEIVUoEegjXsSgz8lzZShPQnJcUzb07ZyX9jdUAlzCGRzg52xJ3IF0B1eR1S1olkWw1gT89HqooUpYf_tuhrliYlZX1DqhMMRGlJdLJCVzVct2pfWsiMwvDBH9HXNHIVBaaH5s88F-qN6-EIVN7ZMYAaV-PWLYFQ,,">2</a>
                            </li>                    
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </>
  );
};

export default React.memo(BoardPagenation) as typeof BoardPagenation;
