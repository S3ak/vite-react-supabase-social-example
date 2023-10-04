import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/navbar";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <small>Created with ❤️ by You</small>
      </footer>
    </>
  );
}

export default App;
