import { Form, Input, Modal, Select, TreeSelect } from "antd";
import { forwardRef, useEffect, useState } from "react";
import { fetchApi } from "src/client/base";
import { arrayToTree } from "src/utils/commUtil";

const CellPop = forwardRef<any, any>((props) => {
    const { open, title, attrName, attrType, attrCode } = props.modalProps;
    const handleModalResult = props.handleModalResult;
    const [form] = Form.useForm();
    const { Option } = Select;
    const [inpuValue, setInputValue] = useState("");
    const [treeData, setTreeData] = useState([]);
    const [selectedCode, setSelectedCode] = useState("");
    const [treeSelectDisable, setTreeSelectDisable] = useState(false);

    const initFormValues = () => {
        form.setFieldsValue({
            name: attrName,
            type: attrType,
            code: attrCode,
        });
        setTreeSelectDisable(!["Select", "MultiSelect"].includes(form.getFieldValue("type")));
    };

    useEffect(() => {
        renderTreeData();
    }, []);

    useEffect(() => {
        initFormValues();
    }, [props]);

    const renderTreeData = () => {
        fetchApi
            .get("api/ghg/v1/admin/codes/trees")
            .json()
            .then((result: any) => {
                if (result.code != "OK" || result.data.length < 1) {
                    return;
                }
                let treeData = arrayToTree(result.data, null);
                setTreeData(treeData);
            });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    const handelTyleSelected = (value) => {
        setTreeSelectDisable(!["Select", "MultiSelect"].includes(value));
    };

    const onSelect = (value, node) => {
        setSelectedCode(node.CODE_CD);
    };

    const handleOk = () => {
        let result = {
            name: form.getFieldValue("name"),
            type: form.getFieldValue("type"),
        };
        if (["Select", "MultiSelect"].includes(form.getFieldValue("type"))) {
            result["code"] = form.getFieldValue("code");
        }

        handleModalResult(result);
    };

    const handleCancel = () => {
        handleModalResult();
    };

    return (
        <Modal
            title={title}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            width={500}
            // centered
        >
            <Form form={form} layout="vertical">
                <Form.Item label="명칭" name="name">
                    <Input onChange={onInputChange} />
                </Form.Item>
                <Form.Item name="type" label="유형">
                    <Select onSelect={handelTyleSelected}>
                        <Option value="Text">Text</Option>
                        <Option value="Select">Select</Option>
                        <Option value="MultiSelect">MultiSelect</Option>
                        <Option value="Date">Date</Option>
                        <Option value="Period">Period</Option>
                        <Option value="Checkbox">CheckBox</Option>
                        <Option value="Image">Image</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="code" label="공통코드">
                    <TreeSelect
                        disabled={treeSelectDisable}
                        showSearch
                        style={{ width: "100%" }}
                        onSelect={onSelect}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        placeholder="Please select"
                        treeData={treeData}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default CellPop;
