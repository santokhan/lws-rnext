import { Outlet } from "react-router-dom";
import Footer from "../blocks/Footer";
import Container from "../components/Container";
import Header from "../blocks/Header";
import { useAuth } from "../context/auth-context";
import React from 'react';
import Loading from "../components/Loading";

const RootLayout = () => {
    const { isLoading } = useAuth();

    return (
        <>
            <Header />
            <Container>
                {
                    isLoading ?
                        <Loading />
                        :
                        <Outlet />
                }
            </Container>
            <Footer />
        </>
    );
};

export default RootLayout;
