'use client'

import FormAuth from '../components/formAuth/formLog';
import { useState } from 'react';
import MainLayout from '../layouts/mainLayout';
import { useRouter } from "next/navigation";
import api, {getCSRF} from '../_api/api';

export default function Auth() {

    
    return (

            <FormAuth />
    )
}