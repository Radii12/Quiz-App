import React, { Children } from "react";

export default function Footer({ children }) {
  return <footer style={{ marginTop: "20px" }}>{children}</footer>;
}
