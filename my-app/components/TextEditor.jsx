'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

if (typeof window !== 'undefined') {
  const ReactDOM = require('react-dom');
  if (!ReactDOM.findDOMNode) {
    ReactDOM.findDOMNode = (node) => {
      if (node?.nodeType === 1) return node;
      return node?.findDOMNode?.() || null;
    };
  }
}

const LoadingEditor = () => (
  <div className="min-h-[200px] border border-gray-300 rounded-lg bg-gray-50 animate-pulse flex items-center justify-center">
    <div className="text-gray-500">Loading editor...</div>
  </div>
);

const ReactQuill = dynamic(()=> import('react-quill'),{ssr:false,loading:()=><LoadingEditor/>});

const TextEditor = ({value,onChange})=>{
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['code-block'],
      ['link','image'],
      ['clean']
    ],
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'strike','code-block','list','image', 'bullet','link'];

  return (
    <div className="relative">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Start writing your blog post..."
        className="height-controlled-editor"
      />
    </div>
  );
};

export default TextEditor;
