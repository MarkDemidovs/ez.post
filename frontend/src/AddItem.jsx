import { useState, useEffect } from "react";
import AddMenu from "./AddMenu";

export default function AddItem() {
  const [pressed, isPressed] = useState(false);

  useEffect(() => {
    console.log(pressed);
  }, [pressed]); // This will log `pressed` whenever it changes

  return (
    <div>
      <button
        onClick={() => {
          isPressed((prevPressed) => !prevPressed);
        }}
      >
        +
      </button>
      {pressed && (
        <AddMenu />
      )}
    </div>
  );
}
