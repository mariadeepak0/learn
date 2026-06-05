"use client";
// --- ONE-LINER findDOMNode polyfill (very simple) ---
if (typeof window !== "undefined")
  try {
    const rd = require("react-dom");
    if (!rd.findDOMNode)
      rd.findDOMNode = (inst) =>
        inst?.current ?? (inst && inst.nodeType === 1 ? inst : null);
  } catch (e) {}

import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { marked } from "marked";
import Button from "../../../inputs/Button";
import TextInput from "../../../inputs/TextInput";
import CategoryAttributes from "./CategoryAttributes";
import styles from "./newItemStyles";
//import FilesSection from "./FilesSection";
//import SupportPricingSection from "./SupportPricingSection";
import { fetchCategories } from "../../../../slice/categorySlice";
import { fetchSubcategories } from "../../../../slice/subcategorySlice";
//import FreeItemReviewerSection from "./FreeItemReviewerSection";
import { runAi } from "../../../../ai/Ai";
import axios from "axios";
import { createAuthorItem } from "../../../../slice/authorItemSlice";
import categoriesStyles from "../../../categories/categoriesStyles";

const NewItemForm = ({mode="create",itemId=null,current=null}) => {
  const router=useRouter();
  const dispatch=useDispatch();
  const searchParams=useSearchParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [version, setVersion] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [tags, setTags] = useState([]);
  const [previewType, setPreviewType] = useState("");
  const [previewFiles, setPreviewFiles] = useState("");
  const [mainFileType, setMainFileType] = useState("");
  const [mainFileLink, setMainFileLink] = useState("");
   const [mainFileUpload, setMainFileUpload] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [supportMessage, setSupportMessage] = useState("");
  const [supported, setSupported] = useState("no");
  const [regularPrice, setRegularPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [isFree, setIsFree] = useState("");
  const [reviewerMessage, setReviewerMessage] = useState("");
  const [status, setStatus] = useState("");
   const { list: categories } = useSelector((s) => s.categories);
  const { list: subcategories } = useSelector((s) => s.subcategories);
  useEffect(()=>{
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
  },[dispatch]);

  useEffect(()=>{
    const slug=searchParams.get("category");
    if(!slug||categories.length===0) return
    const match=categories.find((c)=>c.slug===slug);
    if(match)
      setCategoryId(match._id);

  },[searchParams,categories])

  const filteredSubcategories=subcategories.filter((s)=>
  typeof s.category_id==="string"
  ? s.category_id===categoryId
  :s.category_id?._id===categoryId
);
 

 const generateDescriptionWithAI=async()=>{
  if(!name || !categoryId) return;
  const categoryName=categories.find((c)=>c._id===categoryId)?.name|| "General";
  const subCategoryName=subCategoryId ?subcategories.find((s)=>s._id===subCategoryId)?.name||"":"";
  const prompt=`
  Write a professional marketplace product description in markdown
  Item Name:${name}
  Category:${categoryName}
  Sub Category:${subCategoryName}
  Tags:${tags.join(",")}
  Rules:
- Use headings
- Use bullet points
- Clean structure
- No pricing
  `;
  try{
    const markdown=await runAi(prompt);
    const html=marked.parse(markdown);
    setDescription(html)

  }catch(err){
     console.error("AI ERROR:", err);
      alert("Failed to generate description");

  }
 };
const handleSubmit=async(e)=>{
    e.preventDefault();
}


  return (
    <Box sx={styles.page}>
      {/* Header */}
      <Box sx={styles.header}>
        <Box>
          <Typography sx={styles.title}>New Item</Typography>
          <Typography sx={styles.subtitle}>Manage your items.</Typography>
        </Box>

        <Button variant="contained" onClick={() => router.back()}>
          Back
        </Button>

      </Box>
      <Paper elevation={0} sx={styles.card}>
        <Typography sx={styles.sectionTitle}>Name and Description</Typography>
        <Divider sx={styles.divider}/>
        <Box sx={styles.field}>
          <TextInput
          label="Name"
          required
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />

        </Box>
        <Box sx={{position:"relative"}}>
          <Tooltip title="Generaate description with AI">
            <IconButton
            onClick={generateDescriptionWithAI}
            sx={{
              position:"absolute",
              top:8,
              right:8,
              zIndex:10,
              color:"#890eee",
              backgroundColor:"#f5f3ff",
               "&:hover": {
                  backgroundColor: "#ede9fe",
                },
            }}
            >
              <AutoAwesomeIcon fontSize="small"/>

            </IconButton>

          </Tooltip>
          <Box sx={{
            ...styles.editorWrapper,
            border:"5px solid #890eeeff",
            "& .ql-container":{minHeight:200},
          }}>
            <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Write item description"/>

          </Box>

        </Box>

      </Paper>
      <CategoryAttributes
      categoryId={categoryId}
      subCategoryId={subCategoryId}
      categories={categories}
      subcategories={filteredSubcategories}
      version={version}
      demoLink={demoLink}
      tags={tags}
      onCategoryChange={(id)=>{
        setCategoryId(id);
        setSubCategoryId("");
      }}
      onSubCategoryChange={(id)=>setSubCategoryId(id)}
      onVersionChange={(e)=>setVersion(e.target.value)}
      onDemoLinkChange={(e)=>setDemoLink(e.target.value)}
      onTagsChange={(newTags)=>setTags(newTags)}
      />
      <Box sx={styles.actions}>
        <Button onClick={handleSubmit}>Save Item</Button>

      </Box>

  

    </Box>
  );
};

export default NewItemForm;