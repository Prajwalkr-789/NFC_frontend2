import { useState, useEffect } from "react";

function ExtraPage() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/Extra.html")
      .then((response) => response.text())
      .then((html) => setHtmlContent(html));
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

export default ExtraPage;