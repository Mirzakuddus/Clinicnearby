import { useState } from "react";

 function useUpload() {
  const [loading, setLoading] = useState(false);

  const upload = async ({ file }) => {
    setLoading(true);
    try {
      // Example: upload to backend or cloud
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:5500/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return { url: data.url, error: null };
    } catch (err) {
      console.error("Upload failed:", err);
      return { url: null, error: "Upload failed" };
    } finally {
      setLoading(false);
    }
  };

  return [upload, { loading }];
}
export default useUpload;