'use client'

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from 'react-responsive'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HotelImageUploader } from "../fileuploader"
import { toast } from "sonner"
import { FileWithPath } from "react-dropzone"   
import { endpoint, getLocation } from "@/lib/utils"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"


interface ChangestoRoom {
    Trigger: React.ReactNode;
}

export function CreateRoom({ Trigger }: ChangestoRoom) {
    const isBigScreen = useMediaQuery({ query: '(max-width: 700px)' })

    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        price: string;
        amenities: string;
        photo1: FileWithPath | undefined;
        otherPhotos1: FileWithPath[] | undefined;
        location: [number, number];
    }>({
        name: "Room4",
        description: "$ bedroom flat",
        price: "500",
        amenities: "Frideg",
        photo1: undefined,
        otherPhotos1: [],
        location: getLocation(),
    });

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(formData)
        try {
            const formDataToSend = {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                amenities: formData.amenities,
                photo1: formData.photo1,
                otherPhotos1: formData.otherPhotos1,
                location: formData.location,
            };

            const response = await fetch(`${endpoint(['rooms', 'create'])}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("token")}` // Include the token from local storage,
                },
                body: JSON.stringify(formDataToSend),
            });

            console.log(response)

            if (response.ok) {
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    amenities: "",
                    photo1: undefined,
                    otherPhotos1: [],
                    location: [0, 0],
                });
                const data = await response.json();
                toast.success("Room created")
                console.log(data);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || " Something went wrong");
                console.log(errorData.message)
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
                <DrawerContent className="bg-white px-4">
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <div className="py-5">
                                <DrawerTitle>Create Room</DrawerTitle>
                            </div>
                        </DrawerHeader>
                        <form onSubmit={handleSubmit} className="max-h-[500px] py-5  overflow-y-auto">
                            <div className=" flex flex-col gap-3 p-3">
                                <Input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    value={formData.name} 
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                    placeholder="Room name" 
                                    className="focus:border-blue-500 rounded p-2 outline-none border text-sm" 
                                />
                                <Textarea 
                                    name="description" 
                                    id="description" 
                                    value={formData.description} 
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                                    placeholder="Description" className="focus:border-blue-500 rounded resize-none h-[100px] p-2 w-full border outline-none text-sm"
                                ></Textarea>
                                <Input 
                                    type="text" 
                                    name="price" 
                                    id="price" 
                                    value={formData.price} 
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                                    placeholder="Price" 
                                    className="focus:border-blue-500 rounded outline-none p-2 border text-sm" 
                                />
                                <Input 
                                    type="text" 
                                    name="amenities" 
                                    id="amenities" 
                                    value={formData.amenities} 
                                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} 
                                    placeholder="Amenities" 
                                    className="focus:border-blue-500 rounded outline-none p-2 border text-sm" 
                                />
                                <HotelImageUploader
                                    photo1={formData.photo1}
                                    otherPhotos1={formData.otherPhotos1}
                                    fieldChange={(files) => setFormData({ ...formData, photo1: files?.[0], otherPhotos1: files.slice(1)})}
                                />
                            </div>
                            <DrawerFooter className="flex flex-col gap-3">
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white my-3">Submit</Button>
                                <DrawerClose asChild >
                                    <Button type="button" className="w-full text-white bg-red">Close</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </div>
                </DrawerContent>
            </Drawer>) : (
                <Sheet>
                    <SheetTrigger asChild>
                        {Trigger}
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[400px] z-[9999] sm:w-[540px] px-2 bg-white" >
                        <SheetHeader>
                            <SheetTitle>Create room</SheetTitle>
                        </SheetHeader>
                        <form onSubmit={handleSubmit} className="max-h-[500px] py-5  overflow-y-auto">
                            <div className=" flex flex-col gap-3 p-3">
                                <Input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    value={formData.name} 
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                    placeholder="Room name" 
                                    className="focus:border-blue-500 rounded p-2 outline-none border text-sm" 
                                />
                                <Textarea 
                                    name="description" 
                                    id="description" 
                                    value={formData.description} 
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                                    placeholder="Description" className="focus:border-blue-500 rounded resize-none h-[100px] p-2 w-full border outline-none text-sm"
                                ></Textarea>
                                <Input 
                                    type="text" 
                                    name="price" 
                                    id="price" 
                                    value={formData.price} 
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                                    placeholder="Price" 
                                    className="focus:border-blue-500 rounded outline-none p-2 border text-sm" 
                                />
                                <Input 
                                    type="text" 
                                    name="amenities" 
                                    id="amenities" 
                                    value={formData.amenities} 
                                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} 
                                    placeholder="Amenities" 
                                    className="focus:border-blue-500 rounded outline-none p-2 border text-sm" 
                                />
                                <HotelImageUploader
                                    photo1={formData.photo1}
                                    otherPhotos1={formData.otherPhotos1}
                                    fieldChange={(files) => setFormData({ ...formData, photo1: files?.[0], otherPhotos1: files.slice(1)})}
                                />
                            </div>
                            <SheetFooter className="flex flex-col gap-3 items-center">
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white my-3 flex-1">Submit</Button>
                                <SheetClose asChild className="flex-1">
                                    <Button type="button" className="w-full text-white bg-red">Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </form>
                    </SheetContent>
                </Sheet>
            )}
        </>

    )
}
