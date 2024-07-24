import Navigation from "./components/navigation";
import { Outlet } from "react-router-dom";

export function Format() {
    return (
        <>
            <Navigation/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}