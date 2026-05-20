import KycForm from "../../../components/kycform/KycForm";
import Category from "../../../components/categories/CategoriesBar";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

export default function KycFormCreate(){
    return(
        <>
        <Header/>
        <Category/>
        <KycForm/>
        <Footer/>
        </>
    )
}