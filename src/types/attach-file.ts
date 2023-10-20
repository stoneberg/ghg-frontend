import { IBaseModel } from './common';

export interface IAttachFile extends IBaseModel {
  // 파일 번호
  attachSeq: number; 
  // 파일 카테고리
  attachCategory: string; 
  // 파일 카테고리 DIV
  attachCategoryDIV: string; 
  // 파일 카테고리 SEQ
  attachCategorySeq: string;
  // 파일 그룹
  attachFileGroup: number;
  // 파일 경로
  attachFilePath: string; 
  // 파일 원본 이름
  attachRealFileNm: string;
  // 파일 서버 이름
  attachServerFileNm: string;
  // 파일 크기
  attachFileSize: number; 
  // 파일 확장자
  attachFileType: string; 
  // 사용 여부
  useYn: string; 
  // 참조
  attachRemarks: string; 
  /// 생성자
  createId: string;  
  // 생성일시
  createDt: string;  
  //레벨 (평가 의견 파일)
  LVL: string; 
}
