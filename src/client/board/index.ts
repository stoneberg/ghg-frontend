import { COMMON_YN, FLAG, HISTORY } from "@/enums/common";
import { IAttachFile } from "@/types/attach-file";
import { IBaseCreateUpdateModel, IBaseSearch } from "@/types/common";
import { IServerResponse } from "@/types/server-response";
import { IUploadFile } from "@/types/upload-file";
import qs from "qs";
import useSWR from "swr";
import { fetchResourceApi } from "../base";

export interface IBoard extends IBaseCreateUpdateModel {
  /* #region 파라메터 */
  // 게시글 번호
  brdSeq: number;
  // 부모 게시글 번호
  brdParentSeq?: number;
  // 게시판 카테고리
  brdCategory: string;
  /// 게시글 명
  brdTitle: string;
  /// 게시글 내용
  brdContents: string;
  /// 상단 노출 여부
  topYn?: COMMON_YN;
  /// 상단 노출 기간
  topEndDt?: string;
  /// 조회수
  readCnt?: string;
  /// 삭제 여부
  deletedYn?: COMMON_YN;
  /// 첨부파일 갯수
  attachFileCnt?: number;
  /// 댓글 갯수
  commentCnt?: number;
  /// 최신글 여부
  newYn?: COMMON_YN;
  /// 수정자 명 (조직명)
  updateNm?: string;
  rowNum?: number;
}

export interface IBoardSearch extends Partial<IBoard>, Pick<IBaseSearch, "searchType" | "searchText"> {
  // GHG_Program
  GHGProgram?: string;
  // BoardEntity 모델 
  boardEntity?: IBoard;
  // BoardEntity 리스트 
  boardEntityList?: IBoard[];
  // AttachFileEntity 모델
  attachFileEntity?: IAttachFile;
  /// AttachFileEntity 리스트
  attachFilesList?: IAttachFile[];
  /// Upload Control 용 
  uploadFile?: IUploadFile[];
  /// Biz 용 flag
  flag?: FLAG;
  history?: HISTORY;
}

export interface IBoardPagination {
  current: number
  , pageSize: number
  , total: number
  , perPage: number
  , isShowPrevButton?: boolean
  , isShowNextButton?: boolean
  , onChange: (page: number, pageSize: number) => void
}
export interface IBoardFormValue extends Omit<IBoard, "id" | "createdAt" | "updatedAt"> { }

export const useBoards = (params: IBoardSearch = {}) => {
  return useSWR<IServerResponse<IBoard>>(`api/sample/products?${qs.stringify(params)}`);
};

export const useBoard = (id: string | number) => {
  return useSWR<IServerResponse<IBoard>>(`api/sample/products/${id}`);
};

export const createBoard = (value: IBoardFormValue) => {
  return fetchResourceApi.ghgApi.post(`api/sample/products`, { body: JSON.stringify(value) });
};

export const updateBoard = (id: string, value: IBoardFormValue) => {
  return fetchResourceApi.ghgApi.put(`api/sample/products/${id}`, { body: JSON.stringify(value) });
};




