import { DatePicker } from "antd";
import dayjs from "dayjs";

function DatePickerForGrid(props) {
    const { RangePicker } = DatePicker;
    const onChange = (value, dateString) => {
        if (props.range) props.setValue([value[0].format("YYYY-MM-DD"), value[1].format("YYYY-MM-DD")]);
        else props.setValue(value.format("YYYY-MM-DD"));
    };

    if (props.range)
        return (
            <RangePicker
                // defaultValue={[dayjs(), dayjs("9999-12-31", "YYYY-MM-DD")]}
                value={
                    props.value
                        ? [dayjs(props.value[0], "YYYY-MM-DD"), dayjs(props.value[1], "YYYY-MM-DD")]
                        : props.setValue([
                              dayjs().format("YYYY-MM-DD"),
                              dayjs("9999-12-31", "YYYY-MM-DD").format("YYYY-MM-DD"),
                          ])
                }
                format={props.format}
                onChange={onChange}
            />
        );
    else
        return (
            <DatePicker
                // defaultValue={dayjs()}
                value={props.value ? dayjs(props.value, "YYYY-MM-DD") : dayjs()}
                format={props.format}
                onChange={onChange}
            />
        );
}

export default DatePickerForGrid;
