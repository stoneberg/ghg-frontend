import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { forwardRef, useEffect, useMemo } from "react";

import "ag-grid-enterprise/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-enterprise/styles/ag-theme-alpine.css"; // Optional theme CSS
import ButtonForGrid from "./ButtonForGrid";
import CheckBoxForGrid from "./CheckBoxForGrid";
import DatePickerForGrid from "./DatePickerForGrid";
import ImageForGrid from "./ImageForGrid";
import SelectBoxForGrid from "./SelectBoxForGrid";

const CMMGrid = forwardRef<any, any>((props, ref) => {
    // const gridRef = props.ref;
    const gridStyle = useMemo(() => ({ height: 676, width: "100%" }), []);

    const components = useMemo(() => {
        return {
            buttonrenderer: ButtonForGrid,
            checkboxrenderer: CheckBoxForGrid,
            datepickerrenderer: DatePickerForGrid,
            imagerenderer: ImageForGrid,
            selectboxrenderer: SelectBoxForGrid,
        };
    }, []);

    useEffect(() => {}, []);

    return (
        <div>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact {...props} ref={ref} components={components} stopEditingWhenCellsLoseFocus={true} />
            </div>
        </div>
    );
});

export default CMMGrid;
