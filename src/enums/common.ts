

export enum COMMON_YN { "Y" , "N" };

/**
 * Flag 
 * CREATE : 신규입력  =  0
 * UPDATE : 기존수정  =  1
 * DELETE : 삭제      =  2
 */
export enum  FLAG    { "CREATE" , "UPDATE" , "DELETE" };
/**
 * 히스토리 여부
 * YES: 히스토리를 저장합니다.        
 * NO: 히스토리를 저장하지 않습니다. 
 */
export enum HISTORY { "YES" , "NO" };

/**
 * 방법론 타입
 * C: Concept
 * M: Methodology
 */
export enum MTDType { "C" , "M" };


/**
 * 프로젝트 타입
 * PIP: 파이프라인
 * PJT: 프로젝트
 * MNT: 모니터링 및 그레딧
 */
export enum PJTType { "PIP" , "PJT" , "MNT" };

/**
 * 프로젝트 타입
 * AdminRole: 관리자  AdminRole
 * AnonymousRole: 게스트 AnonymousRole
 * AuditorRole: 검증기관 AuditorRole
 * GeneralRole: 일반  GeneralRole
 * GHGProgramRole: 인증센터 GHGProgramRole
 * SystemAdminRole: 시스템 관리자 SystemAdminRole
 */
export enum AccountRole { "AdminRole" , "AnonymousRole" , "AuditorRole" , "GeneralRole" , "GHGProgramRole" , "SystemAdminRole" };



