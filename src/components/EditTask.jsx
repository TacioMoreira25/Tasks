import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTarefaById, updateTarefa } from "../services/TaskServise";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prazo, setPrazo] = useState("");
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    const carregarTarefa = async () => {
      try {
        const tarefa = await getTarefaById(id);
        setTitulo(tarefa.titulo);
        setDescricao(tarefa.descricao);
        setPrazo(new Date(tarefa.prazo).toISOString().split("T")[0]);
        setConcluido(tarefa.concluido);
      } catch (error) {
        console.error("Erro ao carregar tarefa:", error);
        alert("Erro ao carregar tarefa.");
        navigate("/");
      }
    };

    carregarTarefa();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !descricao || !prazo) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const tarefaAtualizada = {
        id: Number(id),
        titulo,
        descricao,
        prazo,
        concluido,
      };

      await updateTarefa(id, tarefaAtualizada);
      alert("Tarefa atualizada com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert("Erro ao atualizar tarefa.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Editar Tarefa
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Título
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descrição
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Prazo
          </label>
          <input
            type="date"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Salvar Alterações
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
