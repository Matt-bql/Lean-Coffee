import React, { useContext } from "react";
import { TopicContext } from "./Contexts/TopicContext";
import Timer from "./Timer/Timer.js";
import DragandDropContainer from "./DragandDrop/DragandDropContainer.js.js";

export default function DiscussionSession() {
  const { topics } = useContext(TopicContext);
  return (
    <div style={{ color: "white" }}>
      Session Started.
      <Timer />
      <DragandDropContainer />
    </div>
  );
}
