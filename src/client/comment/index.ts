import { COMMON_YN } from "@/enums/common";
import { IBaseCreateUpdateModel, IBaseSearch } from "@/types/common";
import { IServerResponse } from "@/types/server-response";
import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "../base";

export interface IComment extends IBaseCreateUpdateModel {
    /// 답변 번호
    cmtSeq: number;
    /// 답변 부모 번호
    cmtParentSeq: number;
    /// 답변 내용
    cmtContents: string;
    /// 답변 카테고리
    cmtCategory: string;
    /// 답변 카테고리 DIV
    cmtCategoryDiv: string;
    /// 답변 카테고리 번호
    cmtCategorySeq: string;
    /// 삭제 유무
    deletedYn: string;
    /// 더보기 플래그
    moreFlag: number;
    /// 글 레벨
    LVL: number;
    /// 글 등록 권한
    authCreate: string;
    /// 글 수정 권한
    authUpdate: string;
    /// 글 읽기 권한
    authRead: string;
    /// 글 삭제 권한
    authDelete: string;
    /// CommentEntity 모델
    commentEntity?: IComment;
    /// CommentEntity 리스트 
    commentEntityList?: IComment[];
    /// 답글자 
    replyNm?: string;
    // 
    replyWriteYn?: COMMON_YN | string
    modifyYn?: COMMON_YN | string
}

export interface ICommentSearch extends Partial<IComment>, Pick<IBaseSearch, "searchType" | "searchText"> {
    // GHG_Program
    GHGProgram?: string;
}
export interface ICommentFormValue extends Omit<IComment, "id" | "createdAt" | "updatedAt"> { }

export const useComments = (params: ICommentSearch = {}) => {
    return useSWR<IServerResponse<IComment>>(`api/sample/products?${qs.stringify(params)}`);
};

export const useComment = (id: string | number) => {
    return useSWR<IServerResponse<IComment>>(`api/sample/products/${id}`);
};

export const createComment = (value: ICommentFormValue) => {
    return fetchApi.post(`api/sample/products`, { body: JSON.stringify(value) });
};

export const updateComment = (id: string, value: ICommentFormValue) => {
    return fetchApi.put(`api/sample/products/${id}`, { body: JSON.stringify(value) });
};
export const replyComment = (id: string, value: ICommentFormValue) => {
    return fetchApi.put(`api/sample/products/${id}`, { body: JSON.stringify(value) });
};
