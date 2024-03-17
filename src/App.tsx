import "./App.css";
import MessageWindow from "./components/messageWindow";
import NavBar from "./components/navbar";

function App() {
    return (
        <div className="max-h-screen">
            <NavBar />
            <MessageWindow />
        </div>
    );
}

export default App;
