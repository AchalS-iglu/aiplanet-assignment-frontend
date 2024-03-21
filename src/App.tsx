import "./App.css";
import MessageWindow from "./components/messageWindow";
import NavBar from "./components/navbar";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <MessageWindow />
        </div>
    );
}

export default App;
