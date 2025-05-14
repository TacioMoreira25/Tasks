import axios from "axios";

const API_URL = "http://localhost:5188/api/Tarefa";

export const getTarefas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTarefaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Criar uma nova tarefa
export const createTarefa = async (novaTarefa) => {
  const response = await axios.post(API_URL, novaTarefa);
  return response.data;
};

// Atualizar uma tarefa
export const updateTarefa = async (id, tarefaAtualizada) => {
  const response = await axios.put(`${API_URL}/${id}`, tarefaAtualizada);
  return response.data;
};

// Deletar uma tarefa
export const deleteTarefa = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
