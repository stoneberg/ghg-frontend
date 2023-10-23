import { Select } from "antd";

function SelectBoxForGrid(props) {
    // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const handleChange = (value: any) => {
        props.setValue(props.mode == "multiple" ? value.join() : value);
        // props.setValue(value);
    };

    return (
        <Select
            mode={props.mode}
            placeholder="Select"
            style={{ width: "100%" }}
            onChange={handleChange}
            filterOption={true}
            options={props.options}
            value={props.mode == "multiple" ? (props.value ? props.value.split(",") : []) : props.value}
            maxTagCount="responsive"
        />
    );
}

export default SelectBoxForGrid;
