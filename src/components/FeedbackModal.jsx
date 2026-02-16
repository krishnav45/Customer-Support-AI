import React from "react";

function FeedbackModal({ close }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h4>Provide Additional Feedback</h4>
        <textarea placeholder="Write your feedback..." />
        <button onClick={close}>Submit</button>
      </div>
    </div>
  );
}

export default FeedbackModal;
