import { IBaseCreateUpdateModel } from "@/types/common";

export interface IComment extends IBaseCreateUpdateModel {
    /// 답변 번호
    cmtSeq : number;
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
}

export interface IBoardCommentFormValue extends Omit<IComment, "id" | "createdAt" | "updatedAt"> {}
