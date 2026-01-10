import { useState, MouseEvent, useEffect } from "react";

interface ContextMenuProps {
    children: React.ReactNode;
    contextMenuId: any;
    openContextMenuText: string | null;
    secondaryActivator: React.ReactNode | null;
}

export default function ContextMenu({
    children,
    contextMenuId,
    openContextMenuText,
    secondaryActivator
}: ContextMenuProps) {
    const [context, setContext] = useState<{
        visible: boolean;
        x: number;
        y: number;
    }>({
        visible: false,
        x: 0,
        y: 0,
    });

    const openContextMenu = (event: MouseEvent | MouseEvent | PointerEvent) => {
        setContext({
            visible: true,
            x: event.clientX-200,
            y: event.clientY,
        });
    };

    const closeContextMenu = () => {
        setContext(prev => ({ ...prev, visible: false }));
    };

    return (
        <>
            {openContextMenuText && (
                <button
                    className="px-5 py-2 rounded-lg border-2 text-green-400 border-green-400 hover:bg-gray-100"
                    onClick={openContextMenu}
                >
                    {openContextMenuText}
                </button>)}

            {secondaryActivator && (
                <div
                    onClick={openContextMenu}
                >
                    {secondaryActivator}
                </div>)}

            {context.visible && (
                <div
                    className="fixed w-full h-screen top-0 left-0"
                    id={contextMenuId}
                >
                    <div
                        className="absolute w-full h-screen"
                        onClick={closeContextMenu}
                    >
                    </div>
                    <div
                        className="absolute bg-white"
                        style={{
                            left: `${context.x}px`,
                            top: `${context.y}px`,
                        }}
                    >

                        <button
                            className="absolute top-5 right-5"
                            onClick={closeContextMenu}
                        >
                            ❌
                        </button>
                        <div className="pt-15 px-10">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}