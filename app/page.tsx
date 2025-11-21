'use client'

import MainLayout from "./layouts/mainLayout";
import Api, {getCSRF} from "./_api/api";

getCSRF();
export default function MainPage() {
    
    return (
        <MainLayout>
            <h1 className="text-4xl pt-10 text-center">
                Welcome to lumina
            </h1>
        </MainLayout>
    );
}