import { NextComponentType, NextPage } from "next";
import { useRouter } from "next/router";
import PageHeader from "./page-header";
import PageNav from "./page-nav";
export interface IPageHeader {
  title: string;
}
export type IDefaultLayoutPage<P = {}> = NextPage<P> & {
  getLayout(page: NextComponentType, props: unknown): React.ReactNode;
  pageHeader?: IPageHeader;
  isShowHeader?: false | boolean; 
  isHideNav?: true | boolean; 
};

interface IDefaultLayoutProps {
  Page: IDefaultLayoutPage;
}

const DefaultLayout = ({ Page, ...props }: IDefaultLayoutProps) => {
  const router = useRouter();
  
  return (
    <div>
      <div >
        {Page.isShowHeader && Page.pageHeader ? (
         <PageHeader value={Page.pageHeader} /> 
        ) :"" }
        {!Page.isHideNav ? (
         <PageNav  /> 
        ) :"" }
        <section >
          <Page {...props} />
        </section>
      </div>
    </div>
  );
};
export const getDefaultLayout = (Page: IDefaultLayoutPage, props: Record<string, unknown>) => {
  return <DefaultLayout {...props} Page={Page} />;
};
