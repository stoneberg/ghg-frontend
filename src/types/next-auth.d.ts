/* @see https://authjs.dev/getting-started/typescript#extend-default-interface-properties */
/**
 * name, email, image 외에 추가 속성을 정의
 */
import { AccountRole, COMMON_YN } from "@/enums/common";
import { DefaultSession } from "next-auth";


declare module "next-auth" {

  interface ILoginUser {
    /// 사용자 로그인 아이디 입니다.
    userId: string;
    userName: string;
    /// 로그인 사용자 디스플레이 이름 입니다.
    userDisplayName: string;
    /// 로그인 사용자 디스플레이 이름 영문입니다.
    userDisplayNameEng: string;
    /// 로그인 사용자의 이메일
    userEmail: string;
    // 로그인 사용자의 전화번호  
    userTelephone: string;
    //로그인 사용자의 역할 ID
    roleId?: AccountRole | string;
    /// 로그인 사용자의 역할명
    roleName?: string;
    /// 로그인 사용자의 타입
    accountType?: string;
    // 로그인 사용자의 국가 ID
    countryId?: string;
    /// 로그인 사용자의 국가 명 (KOR)
    countryKorName?: string;
    /// 로그인 사용자의 국가 명(ENG)
    countryEngName?: string;
    ///로그인 사용자의 설정 타입존
    timeZone?: string;
    /// 로그인 사용자의 계정 활성화 여부
    activateYn: COMMON_YN;
    /// 로그인 사용자의 계정 결재 여부 
    invoiceYn: COMMON_YN;
    /// 로그인 사용자 계정 삭제 여부 
    deleteYn: COMMON_YN;
    /// 사용자 로그인 Main 아이디 입니다.
    mainAccountId: string;
    // 계정 관리 권한입니다.(Y/N)
    accountManagementYn?: COMMON_YN;
  }

  interface Session {
    user: {
      id: string;
      login: string;
    } & DefaultSession["user"] & ILoginUser;
  }

}
