export default function Popup({
    children,
    popupId,
    openPopupText
}: {
    children: React.ReactNode;
    popupId: any;
    openPopupText: string;
}) {

    const openPopup = (PopupId: string) => {
        let popup = document.getElementById(PopupId);
        popup?.classList.remove("hidden");
    }
    const closePopup = (PopupId: string) => {
        let popup = document.getElementById(PopupId);
        popup?.classList.add("hidden");
    }

    return (
        <>
            <button className="px-5 py-2 rounded-lg border-2 text-green-400 border-green-400 hover:bg-gray-100" onClick={() => openPopup(popupId)}> {openPopupText}</button >
            <div className="popup hidden flex items-center justify-center z-3" id={popupId}>
                <div
                    className="top-0 left-0 w-full h-screen absolute bg-black opacity-60"
                    onClick={() => closePopup(popupId)}
                ></div>
                <div className="w-2/4 bg-white gap-5 absolute">
                    <div className="relative">
                        <button className="absolute top-5 right-5" onClick={() => closePopup(popupId)}>❌</button>
                    </div>
                    <div className="p-20">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
