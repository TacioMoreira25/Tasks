import React, { useEffect, useState } from "react";
import {
  getTarefas,
  deleteTarefa,
  updateTarefa,
} from "../services/TaskServise";

function Tasks() {
  const [tarefas, setTarefas] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  async function carregarTarefas() {
    const dados = await getTarefas();
    setTarefas(dados);
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTarefa(id);
      await carregarTarefas();
      alert("Tarefa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      alert("Erro ao excluir tarefa.");
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleStatus = async (tarefa) => {
    try {
      const tarefaAtualizada = {
        ...tarefa,
        concluido: !tarefa.concluido,
      };
      await updateTarefa(tarefa.id, tarefaAtualizada);
      await carregarTarefas();
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
      alert("Erro ao atualizar status da tarefa.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Minhas Tarefas
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {tarefas.map((tarefa) => (
          <div
            key={tarefa.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
                {tarefa.titulo}
              </h3>
              <button
                onClick={() => handleDelete(tarefa.id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col">
              <p
                className={`text-gray-700 dark:text-gray-300 mb-2 whitespace-pre-wrap break-words ${
                  !expandedDescriptions[tarefa.id] ? "line-clamp-2" : ""
                }`}
              >
                {tarefa.descricao}
              </p>
              {tarefa.descricao.length > 100 && (
                <button
                  onClick={() => toggleDescription(tarefa.id)}
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium self-start"
                >
                  {expandedDescriptions[tarefa.id] ? "Ver menos" : "Ver mais"}
                </button>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Prazo:</span>{" "}
                {new Date(tarefa.prazo).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(tarefa)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    tarefa.concluido
                      ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
                      : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                  }`}
                >
                  {tarefa.concluido ? "Concluída" : "Pendente"}
                </button>
                <a
                  href={`/editar/${tarefa.id}`}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Editar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tarefas.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          Nenhuma tarefa encontrada. Adicione uma nova tarefa!
        </p>
      )}
    </div>
  );
}

export default Tasks;
