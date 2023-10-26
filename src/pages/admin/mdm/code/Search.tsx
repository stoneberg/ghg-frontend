import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import { forwardRef, useEffect, useImperativeHandle } from "react";

const dateFormat = "YYYY-MM-DD";

const Search = forwardRef<any, any>((props, ref) => {
    const { refGrid } = props;
    const [form] = Form.useForm();
    const { Option } = Select;

    const { RangePicker } = DatePicker;

    useImperativeHandle(
        ref,
        () => {
            return {
                searchCodelist: searchCodelist,
            };
        },
        []
    );

    const initFormValues = () => {
        let period: dayjs.Dayjs[] = [];
        let now = dayjs();

        period.push(now);
        period.push(now);

        form.setFieldsValue({
            useYn: "",
            period: period,
        });
    };

    // Example load data from server
    useEffect(() => {
        initFormValues();
    }, []);

    const searchCodelist = () => {
        form.validateFields()
            .then((fields) => {
                let params = {
                    ...fields,
                    period: [fields.period[0].format(dateFormat), fields.period[1].format(dateFormat)],
                };

                refGrid.current.getCodelist(params);
            })
            .catch((e) => {
                console.log("validateFields: ", e);
            });
    };

    return (
        <div>
            <Form
                form={form}
                name="advanced_search"
                style={{
                    margin: "0 0 16px",
                    background: "lightgray",
                    padding: "12px",
                    borderRadius: "5px",
                }}
                onKeyUp={(e) => e.key === "Enter" && searchCodelist()}
            >
                <Row gutter={24}>
                    <Col span={5}>
                        <Form.Item name="searchText" label="검색조건">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item name="useYn" label="사용여부">
                            <Select style={{ width: "80px" }}>
                                <Option value="">전체</Option>
                                <Option value="Y">Y</Option>
                                <Option value="N">N</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="period" label="기간">
                            <RangePicker format={"YYYY-MM-DD"} />
                        </Form.Item>
                    </Col>
                    <Col span={5} />
                    <Col span={2}>
                        <Button type="primary" style={{ width: "100%" }} onClick={searchCodelist}>
                            조회
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
});

export default Search;
