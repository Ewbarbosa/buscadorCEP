import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handle() {
    if (input === '') {
      alert("O campo não pode ser vazio.")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');

    } catch {
      alert("Erro ao buscar");
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">
        Buscador CEP
      </h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={input}
          onChange={(evento) => setInput(evento.target.value)}
        />

        <button className="buttonSearch" onClick={handle}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (

        <main className="main">
          <h2> CEP: {cep.cep}</h2>

          <span> {cep.logradouro}</span>
          <span> {cep.complemento}</span>
          <span> {cep.bairro}</span>
          <span> {cep.localidade} - {cep.uf}</span>
        </main>

      )}

    </div>
  );
}

export default App;
