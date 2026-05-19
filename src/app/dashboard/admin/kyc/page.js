"use client"

import KycSettings from "../../../../../components/dashboard/admin/KycSettings/KycSettingsForm";
import { useState } from 'react';
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "../../../../../components/dashboard/admin/Sidebar";
import Topbar from "../../../../../components/dashboard/admin/Topbar";

export default function Page(){
    const [mobileOpen,setMobileOpen]=useState(false);
    return(
        <Box sx={{display:"flex",minHeight:"100vh",bgcolor:"#eef6fb"}}>
            <CssBaseline/>
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
            <Box conditions="main"
            sx={{flex:1}}>
                <Topbar onMenuClick={()=>setMobileOpen(true)}/>
                    <KycSettings/>

            </Box>

        </Box>
    )
}
