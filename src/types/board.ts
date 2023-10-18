import type { ColumnsType } from 'antd/es/table';

export interface IBoard {
  key: number;
  title: string;
  writer: string;
  date: string;
}

export interface IBoardTitleProps {
  onSearch?: ((values: any) => void);
}

export interface IBoardListProps {
  columnHeaders: ColumnsType<IBoard>,
  className?: string;
  hasData: boolean;
  data?: IBoard[];
  onSearch: (values: any) => void;
  pagination: IBoardPagination
}

export interface IBoardPagination {
   current: number
  ,pageSize: number
  ,total: number
  ,onChange: (page: number, pageSize:number) => void
}

