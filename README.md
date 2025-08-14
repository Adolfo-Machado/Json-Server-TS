# JSON Server API

Este projeto implementa um servidor de API RESTful utilizando `json-server`, `express` e `typescript`. É uma ferramenta poderosa para prototipagem rápida e desenvolvimento de front-end, fornecendo um back-end falso com zero codificação.

## Features

-   **Servidor RESTful completo:** Fornece endpoints para operações CRUD (GET, POST, PUT, PATCH, DELETE).
-   **Base de dados em JSON:** Utiliza um arquivo `db.json` simples para armazenar os dados.
-   **Middleware de Delay:** Simula a latência da rede com um atraso configurável.
-   **Middleware de Log:** Registra informações detalhadas sobre cada requisição recebida.
-   **Reescrita de Rotas:** Permite a personalização das URLs da API.
-   **Suporte a TypeScript:** Código totalmente tipado para maior robustez e manutenibilidade.
-   **Recarregamento automático:** Utiliza `nodemon` para reiniciar o servidor automaticamente durante o desenvolvimento.

## Variáveis de Ambiente

Para configurar o comportamento do servidor, você pode criar um arquivo `.env` na raiz do projeto.

```bash
# Porta em que o servidor será executado
PORT=3000

# Habilita/desabilita o middleware de log de requisições
# Valores possíveis: true, false
LOG_ENABLED=true

# Habilita/desabilita o middleware de delay
# Valores possíveis: true, false
DELAY_ENABLED=true

# Tempo de delay em milissegundos
DELAY_MS=1000
```

## Primeiros Passos

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 16 ou superior)
-   [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/Adolfo-Machado/Json-Server-TS.git
    cd Json-Server-TS
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando o Servidor

Para iniciar o servidor em modo de desenvolvimento com recarregamento automático, execute:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000` (ou na porta definida em seu arquivo `.env`).

## Endpoints da API

O `json-server` cria automaticamente os seguintes endpoints com base no arquivo `src/mock/db.json`.

### Endpoints Disponíveis

-   `/heroes`
-   `/villains`
-   `/produtos`
-   `/categorias`

### Exemplos de Requisições

-   `GET /heroes`: Retorna todos os heróis.
-   `GET /heroes/1`: Retorna o herói com `id=1`.
-   `POST /heroes`: Adiciona um novo herói.
-   `PUT /heroes/1`: Atualiza o herói com `id=1`.
-   `PATCH /heroes/1`: Atualiza parcialmente o herói com `id=1`.
-   `DELETE /heroes/1`: Deleta o herói com `id=1`.

### Filtros e Paginação

O `json-server` suporta filtros, ordenação e paginação.

-   **Filtrar:** `GET /heroes?name=Wolverine`
-   **Ordenar:** `GET /heroes?_sort=name&_order=asc`
-   **Paginar:** `GET /heroes?_page=1&_limit=5`

## Reescrita de Rotas

O servidor está configurado para reescrever certas rotas para maior conveniência.

1.  **Prefixo `/api`:** Todas as requisições para `/api/*` são redirecionadas para `/*`.
    -   Exemplo: `GET /api/heroes` é o mesmo que `GET /heroes`.

2.  **Busca por nome:** As buscas por nome são convertidas para o parâmetro de busca `q` do `json-server`.
    -   `GET /heroes?name=Wolverine` é reescrito para `GET /heroes?q=Wolverine`
    -   `GET /villains?name=Thanos` é reescrito para `GET /villains?q=Thanos`
    -   `GET /produtos?nome=Coca` é reescrito para `GET /produtos?q=Coca`
    -   `GET /categorias?nome=Refrigerantes` é reescrito para `GET /categorias?q=Refrigerantes`


### Exemplo de busca

- `http://localhost:3000/heroes`
- `http://localhost:3000/heroes?name=Batman`


### Para buscas parciais

- `http://localhost:3000/heroes?name=Wolverine`
- `http://localhost:3000/heroes?name=bat`


Tambem pode-se usar o operador _like do json-server. Assim, a requisição ficaria assim:
- `http://localhost:3000/heroes?name_like=mul`


Quando usa q=:term, o json-server faz uma busca global e parcial (como _like) em todos os campos do objeto.
A reescrita no `jsonServer.rewriter` transforma a consulta ?name=hom em ?q=hom, aproveitando a funcionalidade nativa do json-server para realizar buscas parciais.


Exemplo de paginação
- `http://localhost:3000/heroes/?_page=1&_limit=3`


Exemplo de ordenação
- `http://localhost:3000/heroes/?_sort=name&_order=asc`




#### Dicas
https://www.fabricadecodigo.com/json-server/