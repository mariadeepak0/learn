"use client"

import LoginPage from "../../../components/login/LoginPage";
import Category from "../../../components/categories/CategoriesBar";
import Header from "../../../components/header/Header";
import FooterModern from "../../../components/footer/Footer";

export default function Page(){
    return(
        <>
        <Header/>
        <Category/>
        <LoginPage/>
        <FooterModern/>
        </>
    )
}