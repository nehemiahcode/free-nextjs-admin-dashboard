'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import ProtectedRoute from "@/components/Layouts/RouteLayout";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
          // Redirect the user to the login page or display an error message
          router.push("/auth/login");
      }
  }, []);


  return (
    <>
      <DefaultLayout>
        <Breadcrumb  pageName="Dashboard"/>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
