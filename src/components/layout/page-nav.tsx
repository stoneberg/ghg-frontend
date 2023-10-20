import React from "react";

const PageNav = () => {
  return (
    <>
     <nav aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-divider" id="LocationNav">
        <li className="breadcrumb-item">
           <i className="fas fa-house"></i>
         홈  
        </li>
        <li className="breadcrumb-item active" aria-current="page">
                로그인  
        </li>
        </ol>
    </nav>
    </>
  );
};

export default React.memo(PageNav);
