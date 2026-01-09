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
            <div className="popup hidden flex flex-col items-center justify-center" id={popupId}>
                <div className="popup-bg top-0 left-0 absolute z-index-1" onClick={() => closePopup(popupId)}></div>
                <div className="popup-content flex flex-col gap-5 absolute z-index-2">
                    <div className="relative">
                        <button className="absolute top-2 right-2" onClick={() => closePopup(popupId)}>❌</button>
                    </div>
                    <div className="flex flex-col items-center p-20">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
