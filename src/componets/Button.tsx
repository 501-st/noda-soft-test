import React, {useCallback} from "react";

type ButtonProps = {
    onClick: () => void;
}

export const Button = ({onClick}: ButtonProps) => {

    const clearLocalStorage = useCallback(() => {
        localStorage.clear()
    }, [])

    return (
        <>
            <button type="button" onClick={onClick}>
                get random user
            </button>
            <button type="button" onClick={clearLocalStorage}>
                clear cache
            </button>
        </>
    );
}
