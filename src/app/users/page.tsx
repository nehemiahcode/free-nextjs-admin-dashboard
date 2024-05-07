import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import UserPage from '@/components/Users/page'
import React from 'react'
import Photo from "../../../public/images/user/240_.jpg"

export default function Users() {
    const userCard = [
        { imgUrl: Photo, _id: "2wjbknkjvbdciufhn", name: "Ekemezie", username: "nehemiah-ad" },
        { imgUrl:Photo, _id: "2wjbknkjvbdciufhn", name: "Ekemezie", username: "nehemiah-ad" }
    ]
    return (
        <DefaultLayout>
            <Breadcrumb pageName={'Users'} />
            <UserPage userCard={userCard} />
        </DefaultLayout>
    )
}
