import { IUploadFileResult } from "@/types/upload-file";

export const arrayToTree = (arr, parent, addLeaf = true) => {
  return arr
    .filter(
      (item) =>
        item.P_CODE_CD === parent &&
        (addLeaf ? true : arr.find((temp) => temp.P_CODE_CD === item.CODE_CD))
    )
    .map((child) => ({
      ...child,
      title: child.CODE_NM,
      value: child.CODE_CD,
      key: child.CODE_CD,
      children: arrayToTree(arr, child.CODE_CD, addLeaf),
    }));
};

export const getUploadFileResult = (subFolder: string, fileSeq: number, orgName: string, chgName: string, fileType: string, fileSize: number): IUploadFileResult => {
    orgName = orgName;
    chgName = chgName;
    return {
        url: "/Files/Find/" + subFolder + "/" + orgName + "/" + chgName + "/" + fileType, 
        deleteUrl: "/Files/Delete/" + subFolder + "/" + fileSeq + "/" + orgName + "/" + chgName + "/" + fileType + "/" + fileSize,
        size: fileSize, 
        type: fileType, 
        name: orgName
    } as IUploadFileResult;
}

export const getPagination = () => {
  
}


