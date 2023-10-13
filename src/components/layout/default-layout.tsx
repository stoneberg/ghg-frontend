import { motion } from "framer-motion";
import { ChevronRight, Menu as MenuIcon } from "lucide-react";
import { NextComponentType, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import PageHeader from "./page-header";
export interface IPageHeader {
  title: string;
}
export type IDefaultLayoutPage<P = {}> = NextPage<P> & {
  getLayout(page: NextComponentType, props: unknown): React.ReactNode;
  pageHeader?: IPageHeader;
};

interface IDefaultLayoutProps {
  Page: IDefaultLayoutPage;
}

const DefaultLayout = ({ Page, ...props }: IDefaultLayoutProps) => {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false);
  const router = useRouter();

  const showSidebar = useCallback(() => {
    setIsShowSidebar(true);
  }, []);

  const hideSidebar = useCallback(() => {
    setIsShowSidebar(false);
  }, []);

  const setActive = useCallback((val: boolean) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setIsShowPopupMenu(val);
  }, []);

  useEffect(() => {
    setActive(false);
  }, [router.asPath, setActive]);

  return (
    <div>
      {/* mobile navigation */}
      <motion.div
        animate={isShowPopupMenu ? "open" : "closed"}
        initial={{ display: "none" }}
        variants={{
          open: { display: "block", opacity: 1, y: 0 },
          closed: { opacity: 0, y: "-10px", transitionEnd: { display: "none" } },
        }}
        transition={{ duration: 0.15 }}
        className="fixed bottom-0 left-0 right-0 z-30 w-full p-5 overflow-auto bg-white"
        style={{ top: "3.5rem" }}
      >
      </motion.div>

      <div >
        {Page.pageHeader ? (
          <PageHeader value={Page.pageHeader} />
        ) : !isShowSidebar ? (
          <div className="pt-5 pl-7">
            <button
              className="inline-flex items-center justify-center h-12 px-3 transition-all duration-300 rounded hover:bg-gray-200"
              onClick={showSidebar}
            >
              <MenuIcon className="w-5 h-5" />
              <span className="px-2">메뉴 열기</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <></>
        )}
        <section className="px-5 pb-5 sm:px-10">
          <Page {...props} />
        </section>
      </div>
    </div>
  );
};
export const getDefaultLayout = (Page: IDefaultLayoutPage, props: Record<string, unknown>) => {
  return <DefaultLayout {...props} Page={Page} />;
};
