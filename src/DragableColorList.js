import React from "react";
import DragableColorBox from "./DragableColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DragableColorList = SortableContainer(props => {
  return (
    <div style={{ height: "100%" }}>
      {props.colorList.map((color, i) => (
        <DragableColorBox
          color={color.color}
          index={i}
          name={color.name}
          key={color.name}
          deleteColor={props.deleteColor}
        />
      ))}
    </div>
  );
});

export default DragableColorList;
