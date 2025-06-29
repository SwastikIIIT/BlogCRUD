import React from "react";
import EditPost from "../../../components/EditPost";

const EditPage=async({params})=>{
  const {slug}=await params;
  
  return( 
     <EditPost slug={slug} />
  )
};

export default EditPage;
