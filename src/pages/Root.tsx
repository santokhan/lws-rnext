import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../blocks/Footer";
import Container from "../components/Container";
import Header from "../blocks/Header";
import { useAuth } from "../context/auth-context";

const RootLayout = (): ReactNode => {
    const { isLoading } = useAuth();

    return (
        <>
            <Header />
            <Container>
                {
                    isLoading ?
                        <p>Loading...</p>
                        :
                        <Outlet />
                }
            </Container>
            <Footer />
        </>
    );
};

export default RootLayout;
