import { IComment } from "@/client/comment";
import { COMMON_YN } from "@/enums/common";

const YN = ['Y', 'N'];
export const getCommentList = (options: object = {}, size: number = 1, startNum = 1) => {

    const defaultOption = (i: number) => ({
        cmtSeq: i,
        cmtParentSeq: 0,
        cmtContents: `comment contents ${i}`,
        deletedYn: YN[i % 2],
        LVL: 1,
        replyNm: "",
        createNm: "작성자",
        createDt: "2023-01-30 10:20:00",
        replyWriteYn: COMMON_YN.N
    })

    const mockCommentList: Partial<IComment>[] = [];
    for (let i = startNum; i < startNum + size; i++) {
        mockCommentList.push({ ...defaultOption(i), ...options });
    }
    console.log(size, startNum)
    return mockCommentList;
}