import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useForm } from "react-hook-form";
import { CreateAccountInterface } from "./interface/createAccountInterface";
import { useEffect, useState } from "react";
import { TokenInterface } from "./interface/TokenInterface";
import { MessageInterface } from "./interface/messageInterface";

function App() {
  const { register, handleSubmit } = useForm<CreateAccountInterface>();

  const [Token, setToken] = useState<string | null>("");

  const [Input, setInput] = useState("");

  const [Data, setData] = useState<MessageInterface[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      getMessage();
    }
  }, []);

  async function signIn(data: CreateAccountInterface): Promise<void> {
    try {
      const dataFetch = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const token: TokenInterface = await dataFetch.json();
      localStorage.setItem("token", token.access_token);
      setToken(token.access_token);
      getMessage();
    } catch (error) {
      alert(error);
    }
  }

  async function sendMessage(message: string): Promise<void> {
    try {
      await fetch("http://localhost:3000/api/message", {
        method: "POST",
        body: JSON.stringify({ message: message }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Token}`,
        },
      });
      await getMessage();
    } catch (error) {
      alert(error);
    }
  }

  async function getMessage(): Promise<void> {
    const token = localStorage.getItem("token");

    const fetchData = await fetch("http://localhost:3000/api/message", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const data = await fetchData.json();

    setData(data);
  }

  async function signUp(data: CreateAccountInterface): Promise<void> {
    try {
      await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      await signIn(data);
    } catch (error) {
      alert(error);
    }
  }

  function disconnect(): void {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {!Token ? (
          <form>
            <input
              placeholder="Utilisateur"
              {...register("username", { required: true })}
            />
            <input
              placeholder="Mot de passe"
              {...register("password", { required: true })}
            />
            <button onClick={handleSubmit(signIn)}>Connexion</button>{" "}
            <button onClick={handleSubmit(signUp)}>Inscription</button>
          </form>
        ) : (
          <>
            <div>
              <button onClick={disconnect}> Deconnecter </button>
            </div>
            <input value={Input} onChange={(e) => setInput(e.target.value)} />
            <div>
              <button onClick={async () => await sendMessage(Input)}>
                Nouveau message
              </button>
            </div>
            {Data.map((d) => (
              <p key={d._id}> {d.message} </p>
            ))}
          </>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
