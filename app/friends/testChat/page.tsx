'use client'

// import { useRouter } from "next/navigation";
import api, { getCSRF } from '../../_api/api'
import { useState } from 'react';

export default function TestChat() {
    // const router = useRouter();

    const [form, setForm] = useState({
        content: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSend = async (e: any) => {
        e.preventDefault();

        if (!form.content.trim()) {
            alert("Message cannot be empty");
            return;
        }

        try {
            await getCSRF();
            const res = await api.post("/sendMessage", {
                content: form.content.trim(),
            });
            setForm({ content: "" });
            console.log("Message sent successfully:", res.data);
            alert(res.data.message);

        } catch (err: any) {
            alert(err.response?.data?.message || "Error sending message");
        }
    }
    return (
        <form onSubmit={handleSend}>
            <input type="text" name="content" id="content" value={form.content} onChange={handleChange} />
            <button type="submit">
                send mess
            </button>
        </form>
    );
}