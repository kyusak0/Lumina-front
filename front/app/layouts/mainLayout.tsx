import Header from "../components/Header";

export default function mainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}