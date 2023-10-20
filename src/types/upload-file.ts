
export interface IUploadFile {
    /// 파일의 그룹 ID 입니다. FileId와 FileSeq를 결합하면 고유한 파일정보가 됩니다.
    fileId: string;
    /// 기존에 업로드 되었던 파일들의 최대 SEQ 값입니다.
    /// 새로 추가 된 파일의 SEQ 값을 생성하는데에 사용됩니다.
    maxFileSeq: number;
    /// <summary>
    /// 업로드 된 파일 리스트입니다.
    /// </summary>
    uploadFileList: IUploadFileInfo[];
    /// <summary>
    /// 기존에 업로드 되었던 파일의 리스트입니다.
    /// </summary>
    exitFileList: IUploadFileResult[];
    /// <summary>
    /// 삭제 된 파일 리스트입니다.
    /// </summary>
    deleteFileList: IUploadFileInfo[];
    /// 파일이 업로드 될 subFolder 입니다.
    /// 2019\01\01 이라면, 2019|01|01 와 같이 입력합니다.
    subFolder: string;
    /// 삭제 된 파일 정보 문자열입니다.
    deleteFileString: string;
    /// 업로드 된 파일 정보 문자열입니다.
    uploadFileString: string;
}

export interface IUploadFileInfo {
    /// <summary>
    /// 파일 seq(순위) 입니다.
    /// </summary>
    fileSeq: number;
    /// 업로드 된 파일 원본 이름입니다.
    fileName: string;
    /// 실제 서버에 저장 된 파일 이름입니다.
    changeFileName: string;
    /// 파일 크기 입니다.
    fileSize: number;
    /// 업로드 된 파일의 확장자입니다.
    fileType: string;
}
export interface IUploadFileResult {
    // 파일을 다운로드 하기 위한 action URL 값입니다.
    url: string;
    /// 파일이 화면에 표시될 이름 값입니다.
    name: string; 
    /// 업로드 된 파일의 확장자입니다.
    type: string;
    /// 업로드 된 파일의 크기입니다.
    size: number; 
    /// 업로드 된 파일을 삭제하기 위한 action url 값입니다.
    deleteUrl: string; 
    /// 삭제 타입입니다.
    deleteType?: string;
}



