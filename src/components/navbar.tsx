import { getImageUrl } from "@/lib/utils";

function NavBar() {
    return (
        <nav className="flex justify-between h-16 shadow-md px-8 bg-secondary items-center sticky top-0 z-10">
            <img src={getImageUrl("ai-planet-logo.svg")} />
        </nav>
    );
}

export default NavBar;
