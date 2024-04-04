import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

interface Dialog {
    Title: string;
    children: React.ReactNode;
    Action: React.ReactNode;
    Trigger:React.ReactNode;
}

export function AlertDialogBox({ Title, children, Action, Trigger }: Dialog) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
             {Trigger}
            </AlertDialogTrigger>
            <AlertDialogContent className={`bg-white z-[9999]`}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{Title}</AlertDialogTitle>
                </AlertDialogHeader>
                {children}
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>{Action}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
