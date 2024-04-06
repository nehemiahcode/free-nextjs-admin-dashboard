'use client'

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Field, Form, Formik } from "formik"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { toast } from "sonner"
import * as Yup from "yup";
import { useRouter } from "next/navigation"
import { useMediaQuery } from "react-responsive"
import { ScrollArea } from "@/components/ui/scroll-area"


const BookRoomSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(0, "Must not be empty!")
        .max(50, "Too Long!")
        .required("Required"),
    guests: Yup.number()
        .min(0, "Must not be empty")
        .max(14, "Too Long!")
        .required("Required"),
    price: Yup.number()
        .min(0, "Must not be empty")
        .required("Required field"),
        
    email: Yup.string().email("Invalid email").required("Required"),
});

interface BookRoomProps {
    userId: string | null;
    roomId: string;
    Trigger: React.ReactNode;
}

export default function BookRoom({ userId, roomId, Trigger }: BookRoomProps) {
    const router = useRouter()
    const isBigScreen = useMediaQuery({ query: '(max-width: 700px)' })
    const userToken = localStorage.getItem("token")

    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch(
                "https://flexstay-backend.onrender.com/api/bookings/createBooking",
                {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values),
                },
            );
            if (response.ok) {
                toast.success("Room booked succesfully");
                router.refresh();
            } else {
                const data = await response.json();
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };
    return (

        <>
            {isBigScreen ? (<Drawer>
                <DrawerTrigger asChild>
                    {Trigger}
                </DrawerTrigger>
                <DrawerContent className="bg-white px-10 dark:bg-black z-50 h-[80%]">
                <ScrollArea className="full">
                    <div className=" mx-auto w-full px-5  h-full">
                        <DrawerHeader>
                            <div className="py-3">
                                <DrawerTitle>
                                    <h1 className="text-2xl text-white font-semibold">
                                        Create Your Booking
                                    </h1></DrawerTitle>
                            </div>
                        </DrawerHeader>
                        <Formik
                            initialValues={{
                                userId: userId,
                                roomId: roomId,
                                fullname: "Nehemiah Ekemezzie",
                                email: "nehemiah123@gmail.com",
                                price: 500,
                                guests: 2,
                                dateFrom: "2024-01-25T06:00:31.859Z",
                                dateTo: "2024-01-25T06:00:31.859Z"
                            }}
                            validationSchema={BookRoomSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                               <Form className="py-4 w-full">
                               <div className="mb-3">
                                   <label
                                       htmlFor="firstName"
                                       className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium"
                                   >
                                       Full Name
                                   </label>
                                   <Field
                                       type="text"
                                       id="fullname"
                                       name="fullname"
                                       disabled={isSubmitting}
                                       className="w-full rounded-md bg-white border border-gray-[#f3f2f2] px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                   />
                                   {errors.fullname && touched.fullname ? (
                                       <div className="text-xs text-red">{errors.fullname}</div>
                                   ) : null}
                               </div>
                               {/* Other form fields */}
                               <div className="grid grid-cols-2 gap-4 place-items-center">
                                   <div className="mb-3 flex flex-col w-full">
                                       <label
                                           htmlFor="price"
                                           className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium"
                                       >
                                           Price
                                       </label>
                                       <Field
                                           type="tel"
                                           inputMode="numeric"
                                           id="price"
                                           name="price"
                                           disabled={isSubmitting}
                                           className="w-full bg-white rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                       />
                                       {errors.price && touched.price ? (
                                           <div className="text-xs text-red">{errors.price}</div>
                                       ) : null}
                                   </div>
                                   <div className="mb-3 flex flex-col w-full">
                                       <label
                                           htmlFor="guest"
                                           className="text-gray-700 dark:text-gray-300 mb-1 block font-medium"
                                       >
                                           Guests
                                       </label>
                                       <Field
                                           type="tel"
                                           id="guests"
                                           name="guests"
                                           disabled={isSubmitting}
                                           className="w-full bg-white rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                       />
                                       {errors.guests && touched.guests ? (
                                           <div className="text-xs text-red">{errors.guests}</div>
                                       ) : null}
                                   </div>
                                   {/* Add more fields here */}
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="mb-3">
                                       <label
                                           htmlFor="email"
                                           className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium"
                                       >
                                           Email Address
                                       </label>
                                       <Field
                                           type="email"
                                           id="email"
                                           name="email"
                                           disabled={isSubmitting}
                                           className="w-full bg-white rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                       />
                                       {errors.email && touched.email ? (
                                           <div className="text-xs text-red">{errors.email}</div>
                                       ) : null}
                                   </div>
                                   <div className="mb-3">
                                       <label
                                           htmlFor="dateFrom"
                                           className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium"
                                       >
                                           Date From
                                       </label>
                                       <Field
                                           type="dateFrom"
                                           id="dateFrom"
                                           name="dateFrom"
                                           disabled={isSubmitting}
                                           className="w-full bg-white rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                       />
                                       {errors.dateFrom && touched.dateFrom ? (
                                           <div className="text-xs text-red">{errors.dateFrom}</div>
                                       ) : null}
                                   </div>
                                   <div className="mb-3">
                                       <label
                                           htmlFor="dateTo"
                                           className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium"
                                       >
                                           Date To
                                       </label>
                                       <Field
                                           type="dateTo"
                                           id="dateTo"
                                           name="dateTo"
                                           disabled={isSubmitting}
                                           className="w-full bg-white rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                       />
                                       {errors.dateTo && touched.dateTo ? (
                                           <div className="text-xs text-red">{errors.dateTo}</div>
                                       ) : null}
                                   </div>
                               </div>
                               <Button
                                   type="submit"
                                   disabled={isSubmitting}
                                   className="flex w-full justify-center rounded-md mt-2 border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                               >
                                   {isSubmitting ? "Please wait..." : "Book room"}
                               </Button>
                           </Form>
                           
                            )}
                        </Formik>
                    </div>
                    </ScrollArea>
                </DrawerContent>
            </Drawer>) : (
                <Sheet>
                    <SheetTrigger asChild>
                        {Trigger}
                    </SheetTrigger>
                    <SheetContent side="right" className="z-[9999] w-[400px] px-2 bg-white dark:bg-black  " >
                        <SheetHeader>
                            <SheetTitle><h1 className="text-xl font-semibold text-white py-3">Create your booking</h1></SheetTitle>
                        </SheetHeader>
                        <Formik
                            initialValues={{
                                userId: userId,
                                roomId: roomId,
                                fullname: "Nehemiah Ekemezzie",
                                email: "nehemiah123@gmail.com",
                                price: 500,
                                guests: 2,
                                dateFrom: "2024-01-25T06:00:31.859Z",
                                dateTo: "2024-01-25T06:00:31.859Z"
                            }}
                            validationSchema={BookRoomSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="firstName"
                                            className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium"
                                        >
                                            Full Name
                                        </label>
                                        <Field
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            disabled={isSubmitting}
                                            className="w-full rounded-md border border-gray-[#f3f2f2] px-3 bg-white py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                        />
                                        {errors.fullname && touched.fullname ? (
                                            <div className=" text-xs text-red">{errors.fullname}</div>
                                        ) : null}
                                    </div>
                                    {/* Repeat the same structure for other form fields */}
                                    <div className="grid grid-cols-2 gap-4 place-items-center">
                                   <div className="mb-3 flex flex-col w-full">
                                       <label
                                           htmlFor="price"
                                           className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium"
                                       >
                                           Price
                                       </label>
                                       <Field
                                           type="tel"
                                           inputMode="numeric"
                                           id="price"
                                           name="price"
                                           disabled={isSubmitting}
                                           className="w-full bg-white rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                       />
                                       {errors.price && touched.price ? (
                                           <div className="text-xs text-red">{errors.price}</div>
                                       ) : null}
                                   </div>
                                   <div className="mb-3 flex flex-col w-full">
                                       <label
                                           htmlFor="guest"
                                           className="text-gray-700 dark:text-gray-300 mb-1 block font-medium"
                                       >
                                           Guests
                                       </label>
                                       <Field
                                           type="tel"
                                           id="guests"
                                           name="guests"
                                           disabled={isSubmitting}
                                           className="w-full bg-white rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                       />
                                       {errors.guests && touched.guests ? (
                                           <div className="text-xs text-red">{errors.guests}</div>
                                       ) : null}
                                   </div>
                                   {/* Add more fields here */}
                               </div>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="email"
                                            className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium"
                                        >
                                            Email Address
                                        </label>
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            disabled={isSubmitting}
                                            className="w-full bg-white rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                        />
                                        {errors.email && touched.email ? (
                                            <div className=" text-xs text-red">{errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="dateFrom"
                                            className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium"
                                        >
                                            DateFrom
                                        </label>
                                        <Field
                                            type="dateFrom"
                                            id="dateFrom"
                                            name="dateFrom"
                                            disabled={isSubmitting}
                                            className="w-full bg-white rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                        />
                                        {errors.dateFrom && touched.dateFrom ? (
                                            <div className=" text-xs text-red">{errors.dateFrom}</div>
                                        ) : null}

                                    </div>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="dateTo"
                                            className="text-gray-700 dark:text-gray-300 mb-1 block text-sm font-medium"
                                        >
                                            DateTo
                                        </label>
                                        <Field
                                            type="dateTo"
                                            id="dateTo"
                                            name="dateTo"
                                            disabled={isSubmitting}
                                            className="w-full bg-white rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                        />
                                        {errors.dateTo && touched.dateTo ? (
                                            <div className=" text-xs text-red">{errors.dateTo}</div>
                                        ) : null}

                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full justify-center rounded-md my-4 border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        {isSubmitting ? "Please wait..." : "Book room"}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </SheetContent>
                </Sheet>
            )}
        </>
    )
}


