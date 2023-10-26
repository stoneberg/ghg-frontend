import { IUploadFileResult } from "@/types/upload-file";
import numeral from "numeral";

export const byteToSuffix = (bytes: number | string) => {
    const suffix = ["B", "KB", "MB", "GB", "TB"];
    let byteNumber = bytes as number;
    let format = "";
    suffix.some((element, i) => {
        if (byteNumber < 1000) {
            if (i == 0) {
                format = `${byteNumber} ${element}`;
                return true;
            } else {
                format = numeral(byteNumber).format('0.00').concat(" " + element);
                return true;
            }
        } else {
            byteNumber = byteNumber / 1024;
            return false;
        }
    });
    if (format == '')
        format = numeral(byteNumber).format('0,0.0').concat(" " + suffix[suffix.length - 1]);
    return format;
}

export const getFileExtension = (fileName: string) => {
    if (fileName.lastIndexOf(".") > 0)
        return fileName.substring(fileName.lastIndexOf("."));
    return "";
}

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
