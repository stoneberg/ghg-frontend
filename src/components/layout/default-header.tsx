import { AccountRole } from "@/enums/common";
import type { MenuProps } from 'antd';
import { Dropdown } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const dropDownMenus: MenuProps['items'] = [
  {
    key: "1",
    label: (
      <button className="dropdown-item" type="button" onClick={() => console.log('en-US')}>ENG</button>
    ),
  },
  ,{
    key: "2",
    label: (
      <button className="dropdown-item" type="button" onClick={() => console.log('ko-KR')}>KOR</button>
    ),
  },
];

const DefaultHeader = () => {
    const { data: session } = useSession();
    const [ items, setItems ] = useState<MenuProps['items']>([]);

    let menuKeyIndex = 0;
    const t = useTranslations("Common");
    
    useEffect(() => {
      if (session && session.user) {
          const menuItems: MenuProps['items'] = [
          {
            key: menuKeyIndex++,
            label: (
              <button className="dropdown-item" type="button" >
                  <i className="fa-solid fa-user"></i> { session.user.userName }
              </button>
            ),
          },
        ];
         // javascript: sessionStorage.setItem('CurrentMenuID', '@System.Configuration.ConfigurationManager.AppSettings["DEFAULT_ADMIN_MENU"]'); location.href='/Admin/CodeList'; 
        if (session.user.roleId == AccountRole.SystemAdminRole ) {
          menuItems.push({
            key: menuKeyIndex++,
            label:(
              <button className="dropdown-item" type="button" onClick={ () => console.log("")}>
                <i className="fa-solid fa-user-gear"></i> Admin
              </button>
            )
          });
        }
          // javascript: sessionStorage.setItem('CurrentMenuID', '@System.Configuration.ConfigurationManager.AppSettings["TAX_ADMIN_MENU"]'); location.href='/Admin/TaxListForTaxTeam'; 
        if (session.user.roleId == AccountRole.TaxAdminRole ) {
          menuItems.push({
            key: menuKeyIndex++,
            label:(
              <button className="dropdown-item" type="button" onClick={ () => console.log("")}>
                <i className="fa-solid fa-user-gear"></i> Tax List
              </button>
            )
          });
        }
          // location.href='@Url.Action("MyPage", "Account")'
        if (session.user.roleId == AccountRole.AnonymousRole ) {
          menuItems.push({
            key: menuKeyIndex++,
            label:(
              <button className="dropdown-item" type="button" onClick={ () => console.log("")}>
                <i className="fa-solid fa-user-gear"></i> {t('CMM_T_0069.value')}
              </button>
            )
          });
        }
        /** "location.href='@Url.Action("AccountDetail", "Account")'" */
        menuItems.push({
            key: menuKeyIndex++,
            label:(
                <button className="dropdown-item" type="button" onClick={null}>
                  <i className="fa-solid fa-user"></i> {t('CMM_T_0067.value')}
                </button>
            )
          });
        /** "location.href='@Url.Action("Logout", "Default")' */
        menuItems.push({
            key: menuKeyIndex++,
            label:(
              <button className="dropdown-item" type="button" onClick={() => signOut({ callbackUrl: "/login"})}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> {t('CMM_T_0068.value')} 
                </button>
            )
        });
        
        setItems(menuItems);
        console.log("items!!!", menuItems);
      }
    }, [menuKeyIndex, session, t]);

  return (
    <>
      <header className="gnb_wrap">
        <h1><Link href="/" className="logo_centero" aria-label="Centero" /></h1>
      
        <div className="gnb_group">
          <ul className="gnb_depth1">
             
          </ul>
        </div>
        <div className="topmenu">
          <div className="dropdown">
            <Dropdown 
              menu={{ items: dropDownMenus }}
              trigger={['click']}
            >
                <button className="btn btn-secondary dropdown-toggle" type="button" >
                  <i className="fa-solid fa-globe"></i> ENG
              </button>
            </Dropdown>
          </div>
          
          { !session ||  ( session && (!session.user || !session.user.userId) ) ? (
          <button type="button" className="btn btn_login">
            <Link href="/login" style={{color:"white"}}>
              <i className="fa-solid fa-user"></i> Login
            </Link>
           </button> ) : 
        (
          <div className="dropdown">
            <Dropdown
                  menu={{ items }} 
                  trigger={['click']}
                  dropdownRender={(menu) => (
                      <>
                        {React.cloneElement(menu as React.ReactElement )}
                      </>
                    )}
                  >
                  <button className="btn btn-secondary dropdown-toggle" type="button" onClick={(e) => e.preventDefault()}>
                      <i className="fa-solid fa-user"></i>   { session.user.userName } 
                  </button>
              </Dropdown>
            </div>
          )
        }
        </div>
        <div className="btn_mb_menu_area">
          <button type="button" className="btn_mb_menu">
            <i className="fa-solid fa-bars"></i>
            </button>
        </div>
      </header>
    </>
  );
};

export default React.memo(DefaultHeader);
