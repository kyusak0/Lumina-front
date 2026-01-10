export default function Popup({
    children,
    popupId,
    openPopupTrigger
}: {
    children: React.ReactNode;
    popupId: any;
    openPopupTrigger: React.ReactElement;
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
            <div className="" onClick={() => openPopup(popupId)}>
                {openPopupTrigger}
            </div >
            <div className="w-full fixed top-0 left-0 hidden z-3" id={popupId}>
                <div
                    className="w-full top-0 left-0 h-screen absolute bg-black opacity-60"
                    onClick={() => closePopup(popupId)}
                ></div>
                <div className="w-2/4 bg-white top-25 left-[25%] absolute">
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
