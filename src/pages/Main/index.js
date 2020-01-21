import React, { useState } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Container, Form, SubmitButton } from './styles';

import api from '../../services/api';

export default function Main() {
  const [repo, setRepo] = useState('');
  const [load, setLoad] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoad(true);
    const response = await api.get(`/repos/${repo}`);

    const data = {
      name: response.data.full_name,
    };
    setRepo([...repo, data]);
    setRepo('');
    setLoad(false);
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositorios
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={repo}
          onChange={e => setRepo(e.target.value)}
        />

        <SubmitButton loading={load}>
          {load ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
}
