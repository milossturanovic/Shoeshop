import React from "react";



// Obavjestenje za gresku
const Message = ({ variant, children }) => {
  return <div className={`alert ${variant}`}>{children}</div>;
};

Message.defaultProps = {
  variant: "alert-info",
};

export default Message;
