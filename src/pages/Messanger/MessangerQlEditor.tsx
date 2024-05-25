import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react"

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./MessangerQlEditor.css";
const MessangerQlEditor = ({sendImMessage}) => {
//   const Editor = {
//     modules: {
//       toolbar: [
//         [{ header: "1" }, { header: "2" }, { font: [] }],
//         [{ size: [] }],
//         ["bold", "italic", "underline", "strike", "blockquote"],
//         [
//           { list: "ordered" },
//           { list: "bullet" },
//           { indent: "-1" },
//           { indent: "+1" },
//         ],
//         ["link", "image", "video"],
//         ["clean"],
//       ],
//       clipboard: {
//         // toggle to add extra line breaks when pasting HTML:
//         matchVisual: false,
//       },
//     },
//     modules: [
//       "header",
//       "font",
//       "size",
//       "bold",
//       "italic",
//       "underline",
//       "strike",
//       "blockquote",
//       "list",
//       "bullet",
//       "indent",
//       "link",
//       "image",
//       "video",
//     ],
//   };

  const [value, setValue] = useState("");
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       ["link", "image"],
//       ["clean"],
//     ],
//   };

  const formats = ['header', 'font', 'size'];
  return (
    <Box  mb={"0.5rem"}>
      <ReactQuill
        theme={"snow"}
        onChange={setValue}
        value={value}
        // modules={modules}
        // formats={formats}
        // bounds={".app"}
        placeholder={"Enter your Messages here"}
        onKeyDown={(e) => {
          if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            // this.myFormRef.submit();
            // alert("Enter key pressed");
            sendImMessage(value)
          }
        }}
      />
    </Box >
  );
};

export default MessangerQlEditor;
