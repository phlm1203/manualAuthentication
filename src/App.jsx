import { useState } from "react";

import { GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword,} from "firebase/auth";

import { auth } from "./firebase/config";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState(null);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // PARTE DO LOGIN COM GOOGLE
  async function entrarComGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      const resultado = await signInWithPopup(auth, provider);

      setUsuario(resultado.user);
    } catch (erro) {
      console.error("Erro ao entrar com Google:", erro);
    }
  }

  // PARTE DO CADASTRO COM EMAIL E SENHA
  async function cadastrarComEmail() {
    try {
      const resultado = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      setUsuario(resultado.user);

      setEmail("");
      setSenha("");

    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);

      alert("Erro ao cadastrar: Possível conta já existente ou senha inválida.");
    }
  }

  // PARTE DO LOGOUT
  async function fazerLogout() {
    try {
      await signOut(auth);

      setUsuario(null);
    } catch (erro) {
      console.error("Erro ao fazer logout:", erro);
    }
  }

  return (
    <main className="pagina">

      {!usuario ? (

        <section className="card-login">

          <h1>
            Criar conta
          </h1>

          <p className="descricao">
            Crie sua conta para começar.
          </p>


{/* CADASTRO */}

  <div className="formulario">

    <label>E-mail</label>

    <input type="email"placeholder="seuemail@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>

    <label>Senha</label>

    <input type="password"placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>

    <button className="botao-cadastro" onClick={cadastrarComEmail}>Criar conta</button>

    </div>


{/* LINHAZINHA */}

  <div className="separador">

    <span></span>

      <p>ou</p>

    <span></span>

  </div>


{/* GOOGLE */}

  <button className="botao-google" onClick={entrarComGoogle}>
    <span className="google-icon">G</span> Continuar com Google
  </button>

  </section>

      ) : (

  <section className="card-usuario">
    <h1>
      Olá,{" "}
      {usuario.displayName || "usuário"}!
    </h1>

    <p className="descricao">Você está conectado à aplicação.</p>

  <div className="dados-usuario">
    <p><strong>Nome:</strong>
    <br />
    {usuario.displayName || "Não informado"}
    </p>

    <p><strong>E-mail:</strong>
    <br />
    {usuario.email}
    </p>

</div>

  <button className="botao-logout" onClick={fazerLogout}> Fazer logout </button>

</section>

      )}

    </main>
  );
}

export default App;
