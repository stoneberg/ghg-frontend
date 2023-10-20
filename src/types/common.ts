export type uuid = string;
export type timestamptz = string;
export type ISO8601DateTime = string;

export interface IBaseModel {
    loginUserId?: string;
    /// Response 결과 
    isResult?: boolean;
    // Response 결과 데이터
    resultData?: object;
    // 페이지 번호
    pageNumber?: number;
    // 페이지 정렬 컬럼
    pageSortCol?: string;
    // 페이지 정렬
    pageSort?: string;
    // 페이지 당 게시물 수
    rowcount?: number;
    // 전체 게시물 수
    totalCount?: number;
    // FLAG 값 여부 (더보기 버튼에 사용)
    moreFlag?: number; 
    /* region 날짜 검색조건 관련 */
    // 검색시작일(yyyyMMddHHmm): 에러 발생시간 FROM
    createTimeFrom?: string; 
    // 검색종료일(yyyyMMddHHmm): 에러 발생시간 TO
    createTimeTo?: string; 
}

export interface IBaseCreateUpdateModel {
    /// 작성자 ID
    createId?: string;
    /// 작성자 NM
    createNm?: string;
    // 생성 일자
    createDt?: string;
    /// 수정자 ID
    updateId?: string; 
    /// 수정 일자
    updateDt?: string;
}
export interface IBaseSearch {
        /* region 검색 관련 Properties */ 
    // 검색 조건
    searchType?: string; 
    // 검색어
    searchText?: string;
}
