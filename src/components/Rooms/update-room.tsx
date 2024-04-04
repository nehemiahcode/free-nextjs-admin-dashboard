'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from 'react-responsive'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import * as Yup from "yup"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/navigation"



const UpdateRoomSchema = Yup.object().shape({
    name: Yup.string()
        .min(0, "Must not be empty!")
        .max(50, "Too Long!")
        .required("Required"),
    description: Yup.string()
        .min(0, "Must not be empty!")
        .required("Required")
});

interface UpdateRoomProps {
    Trigger: React.ReactNode;
    roomId: string | null;
    userToken: string | null;
    roomDetails: { name: string; description: string };
}


export function UpdateRoom({ Trigger, userToken, roomId, roomDetails }: UpdateRoomProps) {
    const isBigScreen = useMediaQuery({ query: '(max-width: 700px)' })
    const router = useRouter()
    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch(`https://flexstay-backend.onrender.com/api/rooms/update/${roomId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}` 
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Room succesfully updated");
                console.log(data);
                location.reload()
            } else {
                const errorData = await response.json();
                console.error(errorData.message || " Something went wrong");
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
                <DrawerContent className="bg-white dark:bg-black px-4 py-4">
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <div className="py-5">
                                <DrawerTitle className="dark:text-white">Update Room</DrawerTitle>
                            </div>
                        </DrawerHeader>
                        <div className=" max-h-[300px]  overflow-y-auto">
                            <Formik
                                initialValues={roomDetails}
                                validationSchema={UpdateRoomSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, errors, touched }) => (
                                    <Form>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="name"
                                                className="text-gray-700 dark:text-white mb-1 block text-sm font-medium"
                                            >
                                                Room Name
                                            </label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder={`${roomDetails.name.substring(0, 6)}....`}
                                                disabled={isSubmitting}
                                                className="w-full rounded-md border border-gray-[#f3f2f2] px-3 bg-white py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            />
                                            {errors.name && touched.name ? (
                                                <div className=" text-xs text-red">{errors.name}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="description"
                                                className="text-gray-700 dark:text-white mb-1 block text-sm font-medium"
                                            >
                                                Description
                                            </label>
                                            <Field
                                                type="text"
                                                id="description"
                                                name="description"
                                                placeholder={`${roomDetails.description.substring(0, 20)}....`}
                                                disabled={isSubmitting}
                                                className="w-full rounded-md border border-gray-[#f3f2f2] px-3 bg-white py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            />
                                            {errors.description && touched.description ? (
                                                <div className=" text-xs text-red">{errors.description}</div>
                                            ) : null}
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex w-full justify-center rounded-md my-4 border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                                        >
                                            {isSubmitting ? "Please wait..." : "Update room"}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>) : (
                <Sheet>
                    <SheetTrigger asChild>
                        {Trigger}
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[400px] z-[9999] sm:w-[540px] px-2 bg-white dark:bg-black" >
                        <SheetHeader>
                            <SheetTitle>Update Room</SheetTitle>
                        </SheetHeader>
                        <div className=" max-h-[500px] py-5  overflow-y-auto">
                            <Formik
                                initialValues={roomDetails}
                                validationSchema={UpdateRoomSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, errors, touched }) => (
                                    <Form>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="name"
                                                className="text-gray-700 dark:text-white mb-1 block text-sm font-medium"
                                            >
                                                Room Name
                                            </label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder={`${roomDetails.name.substring(0, 6)}....`}
                                                disabled={isSubmitting}
                                                className="w-full rounded-md border border-gray-[#f3f2f2] px-3 bg-white py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            />
                                            {errors.name && touched.name ? (
                                                <div className=" text-xs text-red">{errors.name}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="description"
                                                className="text-gray-700 dark:text-white mb-1 block text-sm font-medium"
                                            >
                                                Description
                                            </label>
                                            <Field
                                                type="text"
                                                id="description"
                                                name="description"
                                                placeholder={`${roomDetails.description.substring(0, 20)}....`}
                                                disabled={isSubmitting}
                                                className="w-full rounded-md border border-gray-[#f3f2f2] px-3 bg-white py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            />
                                            {errors.description && touched.description ? (
                                                <div className=" text-xs text-red">{errors.description}</div>
                                            ) : null}
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex w-full justify-center rounded-md my-4 border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                                        >
                                            {isSubmitting ? "Please wait..." : "Update room"}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </SheetContent>
                </Sheet>
            )}
        </>

    )
}
