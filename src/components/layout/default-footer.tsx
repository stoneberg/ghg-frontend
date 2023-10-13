import React from "react";

const DefaultFooter = () => {
  return (
    <>
     <footer className="footer">
      <div className="inner">
          <div className="footer_item copy">© Copyright 2022 Centero</div>
          <div className="footer_item menu"><a href="/Default/TermsAndConditions">Terms and Conditions</a></div>
          <div className="footer_item menu"><a href="/Default/PrivacyPolicy">Privacy Policy</a></div>
          <div className="footer_item email"><a href="mailto:centero_admin@sk.com" target="_blank"><i className="fa-solid fa-envelope"></i> centero_admin@sk.com</a></div>
          <div className="floating_menu">
              <button type="button" className="btn top"></button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default React.memo(DefaultFooter);
