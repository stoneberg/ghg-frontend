import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

const DefaultHeader = () => {
    const session = useSession();
    
    useEffect(() => {
        console.log(session);
    });

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
              <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-globe"></i> 
              </button>
              <div className="dropdown-menu">
                  <button className="dropdown-item" type="button" onClick={() => console.log('en-US')}>ENG</button>
                  <button className="dropdown-item" type="button" onClick={() => console.log('ko-KR')}>KOR</button>
              </div>
          </div>
          <button type="button" className="btn btn_login">
            <Link href="/login" style={{color:"white"}}>
              <i className="fa-solid fa-user"></i> Login
            </Link>
           </button>
        </div>
        <div className="btn_mb_menu_area">
          <button type="button" className="btn_mb_menu"><i className="fa-solid fa-bars"></i></button>
        </div>
      </header>
    </>
  );
};

export default React.memo(DefaultHeader);
