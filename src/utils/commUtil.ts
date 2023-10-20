import { IUploadFileResult } from "@/types/upload-file";

export const arrayToTree = (arr, parent, addLeaf = true) => {
    return arr
        .filter((item) => {
            return item.pcodeCd === parent && (addLeaf ? true : arr.find((temp) => temp.pcodeCd === item.codeCd));
        })
        .map((child) => ({
            ...child,
            title: child.codeNm,
            value: child.codeCd,
            key: child.codeCd,
            children: arrayToTree(arr, child.codeCd, addLeaf),
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


