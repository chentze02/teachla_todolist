import { useState } from "react";
// ​
// export interface ItemProps {
//   todo: string;
// }
function Item(content) {
  const [isStriked, setIsStriked] = useState(false);
  return (
    <div>
      {
        !isStriked ? <div> {} </div> : <i><div> {props.todo}</div></i>
      }
      <button
        onClick={() => {
          setIsStriked(!isStriked);
        }}
      >
        {" "}
        Done{" "}
      </button>
    </div>
  );
}
export default Item;