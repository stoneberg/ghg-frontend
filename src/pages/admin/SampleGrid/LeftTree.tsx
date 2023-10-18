import { DownOutlined } from "@ant-design/icons";
import { Tree, TreeProps } from "antd";
import { Key } from "antd/es/table/interface";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
// import { request } from "src/utils/axios";

const findExpandedKey = (arr: any[], keyList: Key[]) => {
    arr.forEach((node) => {
        if (node.children && node.children.length > 0 && node.children.find((child) => child.children.length > 0)) {
            keyList.push(node.CODE_CD);
            findExpandedKey(node.children, keyList);
        }
    });
};

const LeftTree = forwardRef<any, any>((props, ref) => {
    const { refGrid, messageApi, refSelectedNode } = props;
    const [treeData, setTreeData] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

    useImperativeHandle(
        ref,
        () => {
            return {
                renderTreeData: renderTreeData,
            };
        },
        []
    );

    useEffect(() => {
        renderTreeData();
    }, []);

    const onExpand = (keys, info) => {
        setExpandedKeys(keys);
    };

    const renderTreeData = () => {
        // request("get", "/sample/treeList", null).then((result) => {
        //   if (result.code != "S0000001" || result.dataSet.length < 1) {
        //     messageApi.open({
        //       type: "error",
        //       content: "조회된 정보가 없습니다.",
        //     });
        //     return;
        //   }
        //   let treeData = arrayToTree(result.dataSet, "root");
        //   let keyList = [];
        //   findExpandedKey(treeData, keyList);
        //   setExpandedKeys(keyList);
        //   setTreeData(treeData);
        // });
    };

    const onTreeNodeSelect: TreeProps["onSelect"] = async (keys, info) => {
        setSelectedKeys(keys);
        refSelectedNode.current = info.selected ? info.node : undefined;
        await refGrid.current.updateColDef(info.node);
        refGrid.current.getCodelist({ P_CODE_CD: keys });
    };

    return (
        <div
            style={{
                width: 300,
                marginTop: 24,
                marginRight: 5,
                background: "#ffff",
                borderRadius: "4px",
            }}
        >
            <Tree
                showLine
                switcherIcon={<DownOutlined />}
                expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                onSelect={onTreeNodeSelect}
                onExpand={onExpand}
                treeData={treeData}
                height={700}
            />
        </div>
    );
});

export default LeftTree;
