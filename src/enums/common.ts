

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
export enum AccountRole { "AdminRole" ,"TaxAdminRole", "AnonymousRole" , "AuditorRole" , "GeneralRole" , "GHGProgramRole" , "SystemAdminRole" };


export enum CONST_GLOBAL {   
    /// Session["MENU"]
    MENU="MENU",   
    /// 로그인 아이디 (회사외 맵핑)
    USER_ID="USER_ID",   
    /// 로그인 사용자 이름 (회사명과 맵핑)
    USER_NAME="USER_NM",
     /// 로그인 사용자 디스플레이 이름 (회사명과 맵핑)
    USER_DISPLAY_NM="USER_DISPLAY_NM", 
    /// 로그인 사용자 디스플레이 이름 영문(회사명 영문과 맵핑)
    USER_DISPLAY_NM_ENG="USER_DISPLAY_NM_ENG", 
     /// 로그인 사용자 이메일(회사 메일과 맵핑)   
    USER_EMAIL="USER_EMAIL", 
    /// 로그인 사용자 전화번호(회사 전화번호와 맵핑)
    USER_TELEPHONE="USER_TELEPHONE", 
    /// 사용자 역활 아이디
    ROLE_ID="ROLE_ID",
    /// 사용자 역할 명 
    ROLE_NM="ROLE_NM", 
    /// 사용자 타입
    ACCOUNT_TP="ACCOUNT_TP", 
     /// 국가코드
    COUNTRY_ID="COUNTRY_ID", 
    /// 국가명
    COUNTRY_KOR_NM="COUNTRY_KOR_NM", 
     /// 국가명
    COUNTRY_ENG_NM="COUNTRY_ENG_NM", 
     /// 사용자 설정 타임존  
    TIME_ZONE="TIME_ZONE", 
    /// 계정 활성화 여부    
    ACTIVATE_YN="ACTIVATE_YN", 
    /// 계정 결재 여부
    INVOICE_YN="INVOICE_YN", 
    /// 삭제 여부
    DELETE_YN="DELETE_YN", 
     /// 상위 조직 계정 ID
    MAIN_ACCOUNT_ID="MAIN_ACCOUNT_ID", 
    /// 계정 관리 권한(Y/N)
    ACCOUNT_MANAGEMENT_YN="ACCOUNT_MANAGEMENT_YN", 

}
