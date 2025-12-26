import { useState, MouseEvent, useEffect } from "react";

interface ContextMenuProps {
    children: React.ReactNode;
    contextMenuId: any;
    openContextMenuText: string | null;
    secondaryActivatorId: string | null;
}

export default function ContextMenu({
    children,
    contextMenuId,
    openContextMenuText,
    secondaryActivatorId
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
    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (context.visible) {
                setContext(prev => ({ ...prev, visible: false }));
            }
        };

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [context.visible]);

    const openContextMenu = (event: MouseEvent | MouseEvent | PointerEvent) => {
        event.preventDefault();
        event.stopPropagation();
        let x = event.clientX;
        let y = event.clientY;
        setContext({
            visible: true,
            x,
            y,
        });
    };

    const closeContextMenu = (event: Event | MouseEvent | MouseEvent | PointerEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setContext(prev => ({ ...prev, visible: false }));
    };


    if (secondaryActivatorId) {
        let secondaryActivator = document.getElementById(secondaryActivatorId);
        if (secondaryActivator) {
            secondaryActivator.onclick = (event) => {
                openContextMenu(event);
            };
        }
    }

    if (context.visible) {
        const bgs = document.querySelectorAll('.contextMenu-bg');
        bgs.forEach(bg => {
            bg.addEventListener('click', closeContextMenu);
        });
    }



    return (
        <>
            {openContextMenuText && (
                <button
                    className="btn btn-reverse"
                    onClick={openContextMenu}
                >
                    {openContextMenuText}
                </button>)}

            {context.visible && (
                <div
                    className="z-50 contextMenu"
                    id={contextMenuId}
                >
                    <div className="contextMenu-bg"></div>
                    <div
                        className="absolute contextMenu-content"
                        style={{
                            left: `${context.x}px`,
                            top: `${context.y}px`,
                        }}
                    >
                        <div className="flex justify-end">
                            <button onClick={(event) => closeContextMenu(event)}>
                                ×
                            </button>
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}