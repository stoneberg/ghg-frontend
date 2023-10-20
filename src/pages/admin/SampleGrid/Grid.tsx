import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";

import { ColDef } from "ag-grid-enterprise";
import "ag-grid-enterprise/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-enterprise/styles/ag-theme-alpine.css"; // Optional theme CSS

import CMMGrid from "src/components/grid/CMMGrid";
import CellPop from "./CellPop";

import { fetchApi } from "src/client/base";

import { Button, Checkbox, Form } from "antd";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

const dateFormat = "YYYY-MM-DD";

const defaultRow = {
    crudFlag: "",
    codeCd: "",
    codeNm: "",
    langCd: "",
    codeLvl: 1,
    pcodeCd: null,
    dspOrder: null,
    useYn: "Y",
    expFrDt: "2001-01-01",
    expToDt: "9999-12-31",
    attr1Json: null,
    attr1Val: null,
    attr2Json: null,
    attr2Val: null,
    attr3Json: null,
    attr3Val: null,
    attr4Json: null,
    attr4Val: null,
    attr5Json: null,
    attr5Val: null,
    attr6Json: null,
    attr6Val: null,
    attr7Json: null,
    attr7Val: null,
    attr8Json: null,
    attr8Val: null,
    attr9Json: null,
    attr9Val: null,
    attr10Json: null,
    attr10Val: null,
};

const xlsJsonToRowData = (xlsJson: any, colDef: ColDef<any>[]) => {
    const rowData: any = [];

    if (xlsJson.length < 2) return [];

    const hIndex = {};
    colDef.forEach((col) => {
        if (xlsJson[0].includes(col.headerName)) {
            hIndex[col.field] = xlsJson[0].indexOf(col.headerName);
        }
    });

    xlsJson.forEach((row, index) => {
        if (index > 0) {
            const dRow = {};
            Object.entries(hIndex).forEach(([key, value]) => {
                dRow[key] = row[parseInt(value.toString())];
            });
            dRow["crudFlag"] = "C";
            rowData.push(dRow);
        }
    });

    return rowData;
};

const valueDisplayFormatter = (params) => {
    let name = params.value ? JSON.parse(params.value).name : undefined;
    return name;
};

const Grid = forwardRef<any, any>((props, ref) => {
    const { refTree, refSearch, messageApi, refSelectedNode } = props;

    const gridRef = useRef<AgGridReact<any>>(null);
    const selectFile = useRef(null);

    enum crudColor {
        U = "orange", // 문자열을 입력할 수도 있다.
        C = "blue",
        D = "red",
    }

    useImperativeHandle(
        ref,
        () => {
            return {
                updateColDef: updateColDef,
                getCodelist: getCodelist,
            };
        },
        []
    );

    const crudStyle = (params) => {
        switch (params.value) {
            case "U":
                return { color: crudColor.U, backgroundColor: crudColor.U };
            case "C":
                return { color: crudColor.C, backgroundColor: crudColor.C };
            case "D":
                return { color: crudColor.D, backgroundColor: crudColor.D };
        }
    };

    const defaultColDef = useMemo(
        () => ({
            sortable: true,
            editable: true,
            resizable: true,
            flex: 1,
            suppressSizeToFit: false,
            filter: true,
        }),
        []
    );

    const [modalProps, setModalProps] = useState({ open: false });
    const [columnDefs, setColumnDefs] = useState<ColDef<any>[]>([
        {
            field: "crudFlag",
            headerName: "CRUD",
            maxWidth: 5,
            cellStyle: crudStyle,
            resizable: false,
        },
        { field: "pcodeCd", headerName: "부모코드", hide: true },
        {
            field: "pcodeNm",
            headerName: "분류",
            minWidth: 120,
            rowDrag: () => !(refSelectedNode?.current == undefined),
        },
        { field: "codeCd", headerName: "코드", minWidth: 120, flex: 1 },
        { field: "codeNm", headerName: "코드명", minWidth: 120, flex: 1 },
        { field: "langCd", headerName: "다국어코드", hide: true },
        { field: "codeLvl", headerName: "레벨", hide: true },
        { field: "dspOrder", headerName: "정렬순서", hide: true },
        {
            field: "useYn",
            headerName: "사용",
            minWidth: 60,
            maxWidth: 60,
            cellRenderer: "checkboxrenderer",
        },
        { field: "attr1Val", headerName: "속성1", minWidth: 80 },
        { field: "attr2Val", headerName: "속성2", minWidth: 80 },
        { field: "attr3Val", headerName: "속성3", minWidth: 80 },
        { field: "attr4Val", headerName: "속성4", minWidth: 80 },
        { field: "attr5Val", headerName: "속성5", minWidth: 80 },
        { field: "attr6Val", headerName: "속성6", minWidth: 80 },
        { field: "attr7Val", headerName: "속성7", minWidth: 80 },
        { field: "attr8Val", headerName: "속성8", minWidth: 80 },
        { field: "attr9Val", headerName: "속성9", minWidth: 80 },
        { field: "attr10Val", headerName: "속성10", minWidth: 80 },
        {
            field: "period",
            headerName: "기간",
            minWidth: 270,
            cellRenderer: "datepickerrenderer",
            cellRendererParams: { range: true, format: "YYYY-MM-DD" },
        },
        {
            field: "expFrDt",
            headerName: "시작일",
            hide: true,
        },
        {
            field: "expToDt",
            headerName: "종료일",
            hide: true,
        },
        {
            field: "attr1Json",
            headerName: "속성1 명",
            minWidth: 80,
            hide: true,
            valueFormatter: valueDisplayFormatter,
        },
        {
            field: "attr2Json",
            headerName: "속성2 명",
            minWidth: 80,
            hide: true,
            valueFormatter: valueDisplayFormatter,
        },
        {
            field: "attr3Json",
            headerName: "속성3 명",
            minWidth: 80,
            hide: true,
            valueFormatter: valueDisplayFormatter,
        },
        {
            field: "attr4Json",
            headerName: "속성4 명",
            minWidth: 80,
            hide: true,
            valueFormatter: valueDisplayFormatter,
        },
        {
            field: "attr5Json",
            headerName: "속성5 명",
            minWidth: 80,
            hide: true,
            valueFormatter: valueDisplayFormatter,
        },
        {
            field: "attr6Json",
            headerName: "속성6 명",
            minWidth: 80,
            hide: true,
            valueFormatter: valueDisplayFormatter,
        },
        {
            field: "attr7Json",
            headerName: "속성7 명",
            minWidth: 80,
            hide: true,
            valueFormatter: valueDisplayFormatter,
        },
        {
            field: "attr8Json",
            headerName: "속성8 명",
            minWidth: 80,
            hide: true,
            valueFormatter: valueDisplayFormatter,
        },
        {
            field: "attr9Json",
            headerName: "속성9 명",
            minWidth: 80,
            hide: true,
            valueFormatter: valueDisplayFormatter,
        },
        {
            field: "attr10Json",
            headerName: "속성10 명",
            minWidth: 80,
            hide: true,
            valueFormatter: valueDisplayFormatter,
        },
        {
            maxWidth: 50,
            headerCheckboxSelection: true,
            checkboxSelection: true,
        },
    ]);

    // Form
    const [form] = Form.useForm();

    const defaultModalProps = {
        open: false,
        title: "",
        attrName: "",
        attrType: "text",
        attrCode: "",
    };

    // Example of consuming Grid Event
    const cellClickedListener = (e) => {
        if (e.column.colId.includes("JSON")) {
            let mProps = {
                ...defaultModalProps,
                open: true,
                title: `${e.data.codeNm} > ${e.column.colDef.headerName}`,
            };
            if (e.value !== undefined) {
                mProps.attrName = JSON.parse(e.value).name;
                mProps.attrType = JSON.parse(e.value).type;
                mProps.attrCode = JSON.parse(e.value).code;
            }

            setModalProps(mProps);
        }
    };

    const handleModalResult = (result) => {
        if (result) {
            const currentCell = gridRef.current.api.getFocusedCell();
            gridRef.current.api
                .getDisplayedRowAtIndex(currentCell.rowIndex)
                .setDataValue(currentCell.column.getColId(), JSON.stringify(result));
            console.log("getFocusedCell", gridRef.current.api.getFocusedCell());
        }
        setModalProps(defaultModalProps);
    };

    const handleBtnDown = (e) => {
        gridRef.current.api.exportDataAsExcel({
            fileName: `공통코드_${dayjs().format("YYYYMMDD HHmmss")}.xlsx`,
            columnKeys: [
                "pcodeCd",
                "pCodeNm",
                "codeCd",
                "codeNm",
                "langCd",
                "codeLvl",
                "dspOrder",
                "useYn",
                "expFrDt",
                "expToDt",
                "attr1Val",
                "attr2Val",
                "attr3Val",
                "attr4Val",
                "attr5Val",
                "attr6Val",
                "attr7Val",
                "attr8Val",
                "attr9Val",
                "attr10Val",
            ],
        });
    };

    const handleBtnAdd = (e) => {
        if (refSelectedNode?.current == undefined) {
            messageApi.open({
                type: "warn",
                content: "상위 분류를 선택하세요.",
            });
            return;
        }

        const renderedNodes = gridRef.current?.api.getRenderedNodes() || [];

        let nextSeq =
            renderedNodes.length == 0
                ? 1
                : Math.max.apply(
                      null,
                      renderedNodes.map((node) => {
                          let seq = Number(node.data.codeCd.replace(node.data.pcodeCd, ""));

                          console.log(
                              "seq:",
                              seq,
                              node.data.codeCd.replace(node.data.pcodeCd, ""),
                              Number(node.data.codeCd.replace(node.data.pcodeCd, ""))
                          );
                          seq = Number.isNaN(seq) ? 0 : seq;
                          return seq;
                      })
                  ) + 1;

        const rowCnt = renderedNodes.length || 0;

        gridRef.current?.api.applyTransactionAsync(
            {
                addIndex: rowCnt,
                add: [
                    {
                        ...defaultRow,
                        crudFlag: "C",
                        codeCd: refSelectedNode?.current.codeCd + nextSeq.toString().padStart(2, "0"),
                        pcodeCd: refSelectedNode?.current.key,
                        pcodeNm: refSelectedNode?.current.title,
                        period: [dayjs().format(dateFormat), "9999-12-31"],
                        dspOrder: rowCnt + 1,
                    },
                ],
            },
            (e) =>
                gridRef.current?.api.startEditingCell({
                    rowIndex: rowCnt,
                    colKey: "codeNm",
                })
        );
    };

    const handleBtnDelete = (e) => {
        gridRef.current?.api.forEachNode((node) => {
            if (node?.isSelected()) {
                if (gridRef.current?.api.getValue("crudFlag", node) != "C") {
                    messageApi.open({
                        type: "warn",
                        content: "저장된 행은 삭제 할 수 없습니다.",
                    });
                    return;
                }
                node.setDataValue("crudFlag", "D");
            }
        });
    };

    const handleBtnSave = async (e) => {
        let data: any[] = [];
        gridRef.current.api.forEachNode((node) => {
            if (["C", "U", "D"].includes(node?.data.crudFlag)) {
                node.data.expFrDt = node.data.period[0];
                node.data.expToDt = node.data.period[1];
                node.data.langCd = node.data.langCd || node.data.codeNm;
                data.push(node?.data);
            }
        });

        const result: any = await fetchApi.post("api/ghg/v1/admin/codes/save", { json: { codeList: data } }).json();

        if (result.code != "OK") {
            messageApi.open({
                type: "error",
                content: "저장에 실패하였습니다.",
            });
            return;
        }
        refTree.current.renderTreeData();
        refSearch.current?.searchCodelist();
    };

    const getOptionList = async (code) => {
        let options = [];
        const result: any = await fetchApi.post("api/ghg/v1/admin/codes", { json: { pcodeCd: code } }).json();
        if (result.code != "OK") {
            return [];
        }

        options = result.dataSet;
        return options;
    };

    const updateColDef = async (node) => {
        let colDefs: ColDef<any>[] = gridRef.current?.api.getColumnDefs() || [];
        let regExAttrVal = /^attr([0-9]{1,2})Val$/;

        let pCodeList = [];

        // selectBox쓰는 속성들 코드리스트 전부를 한번에 조회한 후, 각 속성의 options로 셋팅한다.
        colDefs.forEach((colDef) => {
            const colId = colDef.colId || "";
            if (regExAttrVal.test(colId)) {
                const colHeaderInfo = node[colId.replace("Val", "Json")];

                if (colHeaderInfo) {
                    const hInfo = JSON.parse(colHeaderInfo);
                    pCodeList.push(hInfo.code);
                }
            }
        });

        let codeList = pCodeList.length > 0 ? await getOptionList(pCodeList) : [];

        colDefs.forEach((colDef) => {
            const colId = colDef.colId || "";
            if (regExAttrVal.test(colId)) {
                colDef.hide = true;
                colDef.cellRenderer = undefined;
                const colHeaderInfo = node[colId.replace("Val", "Json")];

                if (colHeaderInfo) {
                    colDef.hide = false;
                    const hInfo = JSON.parse(colHeaderInfo);
                    colDef.headerName = hInfo.name;

                    switch (hInfo.type) {
                        case "Checkbox":
                            colDef.cellRenderer = "checkboxrenderer";
                            break;
                        case "Select":
                            console.log("select?");
                            colDef.cellRenderer = "selectboxrenderer";

                            colDef.cellRendererParams = {
                                options: codeList
                                    .filter((data) => data.pcodeCd == hInfo.code)
                                    .map((data) => ({
                                        label: data.codeNm,
                                        value: data.codeCd,
                                    })),
                            };
                            break;
                        case "Date":
                            colDef.cellRenderer = "datepickerrenderer";
                            break;
                        case "Period":
                            colDef.width = 300;
                            colDef.cellRenderer = "datepickerrenderer";
                            colDef.cellRendererParams = {
                                range: true,
                                format: "YYYY-MM-DD",
                            };
                            break;
                        case "Image":
                            colDef.cellRenderer = "imagerenderer";
                            break;
                        default:
                            break;
                    }
                }
            }
        });
        gridRef.current.api.setColumnDefs(colDefs);
    };

    const getCodelist = (params: any) => {
        if (refSelectedNode.current) {
            params = { ...params, pcodeCd: [refSelectedNode.current.codeCd] };
        }

        fetchApi
            .post("api/ghg/v1/admin/codes", { json: params })
            .json()
            .then((result: any) => {
                console.log("getCodelist", result, result.data.length);
                if (result.code != "OK" || result.data.length < 1) {
                    messageApi.open({
                        type: "error",
                        content: "조회된 정보가 없습니다.",
                    });
                    gridRef.current?.api.setRowData([]);
                    return;
                }

                if (result.data.length > 0) {
                    let convData = result.data.map(
                        (data) => (data = { ...data, crudFlag: "", period: [data.expFrDt, data.expToDt] })
                    );
                    gridRef.current?.api.setRowData(convData);
                }
            });
    };

    const onCellValueChanged = (e) => {
        if (!["C", "D"].includes(e.node.data.crudFlag)) {
            e.node.setDataValue("crudFlag", "U");
        }
    };

    const handleChkAttrNm = (isChecked: boolean) => {
        let colDefs: ColDef<any>[] = gridRef.current.api.getColumnDefs() || [];

        let regExAttrVal = /^attr([0-9]{1,2})Json$/;

        colDefs.forEach((colDef) => {
            const colId = colDef.colId || "";
            if (regExAttrVal.test(colId)) {
                colDef.hide = !isChecked;
            }
        });
        gridRef.current.api.setColumnDefs(colDefs);
    };

    const handleRowDragEnd = (e) => {
        gridRef.current?.api.forEachNode((node) => {
            let newOrder = (node.rowIndex || 0) + 1;
            if (newOrder != node.data.dspOrder) {
                if (!["C", "D"].includes(node.data.crudFlag)) {
                    node.setDataValue("crudFlag", "U");
                }
                node.setDataValue("dspOrder", node.rowIndex || 0 + 1);
            }
        });
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result as ArrayBufferLike);
            const workbook = XLSX.read(data, { type: "array" });

            // 첫 번째 시트를 가져옴
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            // 셀 데이터를 파싱하여 출력
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const rowData = xlsJsonToRowData(jsonData, columnDefs).map(
                (data) => (data = { ...data, period: [data.expFrDt, data.expToDt] })
            );

            console.log("handleFileUpload:", rowData);

            gridRef.current?.api.applyTransaction({
                add: rowData,
            });
        };
    };

    return (
        <div style={{ height: 700, width: "100%" }}>
            <div style={{ display: "flex" }}>
                <Checkbox style={{ paddingLeft: 1, width: "20%" }} onChange={(e) => handleChkAttrNm(e.target.checked)}>
                    속성명 표시
                </Checkbox>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "80%",
                    }}
                >
                    <input ref={selectFile} type="file" style={{ display: "none" }} onChange={handleFileUpload} />
                    <Button size={"small"} style={{ width: 90 }} onClick={() => selectFile.current.click()}>
                        엑셀 업로드
                    </Button>
                    <Button size={"small"} style={{ width: 90 }} onClick={handleBtnDown}>
                        엑셀 다운로드
                    </Button>
                    <Button size={"small"} style={{ width: 60 }} onClick={handleBtnAdd}>
                        추가
                    </Button>
                    <Button size={"small"} style={{ width: 60 }} onClick={handleBtnDelete}>
                        삭제
                    </Button>
                    <Button size={"small"} style={{ width: 60 }} onClick={handleBtnSave}>
                        저장
                    </Button>
                </div>
            </div>
            <div className="ag-theme-alpine" style={{ width: "100%", height: 676 }}>
                <CMMGrid
                    ref={gridRef} // Ref for accessing Grid's API
                    // rowData={rowData} // Row Data for Rows
                    rowSelection="multiple"
                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    getRowClass={(params) => {
                        return params.data.crudFlag == "D" ? "cancled-row" : null;
                    }}
                    rowDragManaged={true}
                    suppressRowClickSelection={true}
                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                    onCellValueChanged={onCellValueChanged}
                    onRowDragEnd={handleRowDragEnd}
                />
            </div>
            <CellPop modalProps={modalProps} handleModalResult={handleModalResult} />
        </div>
    );
});

export default Grid;
