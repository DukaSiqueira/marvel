# CRUD de Usuários e Integração com API da Marvel

## Visão Geral
Este projeto consiste em uma aplicação full-stack que oferece operações CRUD (Create, Read, Update, Delete) para usuários, além de integração com a API da Marvel para exibição de informações sobre personagens. A aplicação possui uma estrutura backend desenvolvida em Node.js, Sequelize e Express.js, com autenticação JWT para proteger as rotas de acesso aos usuários. O frontend é desenvolvido em React, utilizando styled components, Material UI e axios para requisições HTTP, com o Vite sendo utilizado como ferramenta de build e desenvolvimento.

## Telas
### Home
- Essa tela lista seus pernsonagens favoritos, que podem ser escolhidos acessando a páginas de HERÓIS
![image](https://github.com/DukaSiqueira/marvel/assets/53954835/b442d670-7b9e-45bd-8867-fb8795ca6b2f)

### Tela de Heróis
- Essa tela lista os personagens dos quadrinhos da MARVEL. Integração feita utilizando API disponibilizada pela própria Marveç.
![image](https://github.com/DukaSiqueira/marvel/assets/53954835/f6b7afeb-c90a-43fc-9594-99fd49765c86)

### Tela de usuários
- Essa tela lista os usuários e permite que os usuários sejam excluídos.
![image](https://github.com/DukaSiqueira/marvel/assets/53954835/3710a392-abe9-4ffd-bb3d-4db10f1a833d)

## Requisitos

- Node.js
- Docker

## Configuração

1. Clone o repositório:
```git
git clone https://github.com/DukaSiqueira/marvel.git
```

2. Acesse o repositório
```cmd
cd marvel
```

3. Acesse o repositório
```cmd
cd backend
```

4. Instale as dependências do projeto

```js
npm install
```

5. Inicie o ambiente Docker-compose:
```docker
docker-compose up ou docker-compose up -d para rodar em nodemon
```

6. Reinicie o serviço Node:
Isso garante que a conexão entre a aplicação e o banco de dados ocorra de forma correta.
```docker
docker restart app
```

- O Serviço backend fica disponível em: http://localhost:5000
- O Serviço frontend fica disponível em: http://localhost:3000

- Observação: A primeira vez rodando o projeto, o serviço front-end demora alguns segundos para buildar

## Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis de ambiente:

- `DB_HOST`: Host do banco de dados.
- `DB_USER`: Usuário do banco de dados.
- `DB_PASSWORD`: Senha do banco de dados.
- `DB_NAME`: Nome do banco de dados.
- `JWT_SECRET`: Chave secreta para geração de tokens JWT.

Lembrando que ao rodar via Docker alguns desses valores já estão definidos no Serviço do MySQL. Outro ponto importante é que ao rodar localmente o Sequelize fica responsável por criar a tabela de usuários caso ela não exista.

## Uso

1. Acesse as rotas API:

- `GET /api/users`: Obter todos os usuários. Apenas quando autenticado.
- `GET /api/users/:id`: Obter um usuário específico. Apenas quando autenticado.
- `POST /api/users`: Criar um novo usuário.
- `PUT /api/users/:id`: Atualizar um usuário existente. Apenas quando autenticado.
- `DELETE /api/users/:id`: Excluir um usuário. Apenas quando autenticado.
- `POST /api/login`: Autenticar um usuário e obter um token JWT.

2. Registro de LOGS:
- O backend através de middlewares registra o log de suas chamadas. Esse registro fica armazenado em: `marvel\backend\src\logs\request.log`.

# Sobre a Arquitetura

## Componentes Principais do Frontend

- `React:` Utilizado como biblioteca principal para desenvolvimento do frontend, proporcionando uma abordagem declarativa e eficiente para criação de interfaces de usuário.

- `Styled Components:` Biblioteca utilizada para estilização de componentes React, permitindo a criação de estilos de forma dinâmica e baseada em JavaScript.

- `Material UI:` Biblioteca de componentes React baseada no Material Design, oferecendo uma ampla variedade de componentes prontos para uso e estilizados de forma consistente.

- `Axios:` Cliente HTTP utilizado para realizar requisições HTTP assíncronas para o backend, facilitando a integração entre o frontend e o backend.

- `Vite:` Utilizado como ferramenta de build e desenvolvimento para o frontend, o Vite oferece uma experiência de desenvolvimento rápida e eficiente, com suporte a recarregamento rápido (fast refresh) e construção otimizada para produção.

- `Tailwind CSS:` Framework de CSS utilizado para estilização de componentes e páginas do frontend. O Tailwind CSS oferece uma abordagem baseada em utilitários para estilização, permitindo a criação de interfaces de usuário flexíveis e altamente personalizáveis com uma sintaxe concisa.

## Componentes Principais do Backend
- `Node.js:` O Node.js é a plataforma escolhida para este projeto devido à sua eficiência no desenvolvimento de aplicativos back-end e sua capacidade de lidar com um grande número de conexões simultâneas de forma escalável.

- `Express.js:` Express.js é utilizado como o framework web para Node.js, facilitando a criação de rotas HTTP e o gerenciamento de solicitações e respostas.

- `Sequelize:` Sequelize é um ORM (Object-Relational Mapping) utilizado para mapear objetos JavaScript para modelos de dados relacionais e realizar operações no banco de dados de forma fácil e segura.

- `JSON Web Tokens (JWT):` Tokens JWT são utilizados para autenticação de usuários, oferecendo uma forma segura de transmitir informações de autenticação entre cliente e servidor.

## Integração com API da Marvel

Além das operações CRUD de usuários, o frontend também inclui integração com a API da Marvel para exibição de informações sobre personagens. Isso é realizado utilizando o Axios para realizar requisições HTTP para a API da Marvel e exibir os dados retornados na interface do usuário.

## Estrutura de Diretórios
```lua
|-- marvel/
|   |-- backend/
|   |   |-- src/
|   |   |   |-- controllers/
|   |   |   |-- logs/
|   |   |   |-- middlewares/
|   |   |   |-- models/
|   |   |   |-- routes/
|   |   |   |-- services/
|   |   |   |-- db.js
|   |   |-- index.js
|   |   |-- package-lock.json
|   |   |-- package.json
|   |
|   |-- frontend/
|   |   |-- public/
|   |   |-- src/
|   |   |   |-- components/
|   |   |   |-- images/
|   |   |   |-- pages/
|   |   |   |-- routes/
|   |   |   |-- services/
|   |   |   |-- App.js
|   |   |   |-- index.js
|   |   |-- package-lock.json
|   |   |-- package.json
|

```

## Fluxo de Dados (Backend)
- CRUD de Usuários: As requisições do usuário são roteadas para os controladores correspondentes, que chamam os métodos apropriados na camada de serviço (Service). A camada de serviço manipula as operações do banco de dados, como criar, ler, atualizar e excluir usuários.

- Autenticação JWT: Quando um usuário faz login, um token JWT é gerado e retornado ao cliente. Este token é então incluído nas requisições subsequentes do usuário para autenticação.

## Fluxo de Requisições HTTP (Backend)

- Roteamento: As rotas HTTP são definidas no arquivo de rotas (src/routes/) e os controladores correspondentes são chamados para lidar com as solicitações.

- Middlewares: Middlewares podem ser utilizados para realizar tarefas comuns, como autenticação, validação de entrada, etc., antes que as requisições alcancem os controladores.

## Fluxo de Dados (Frontend)

- Integração com a API da Marvel: O frontend faz requisições para a API da Marvel para obter informações sobre personagens, quadrinhos, eventos, etc. Essas requisições são tratadas nos componentes correspondentes.

- Manipulação de Dados no Cliente: Após receber os dados da API da Marvel, o frontend manipula essas informações de acordo com a lógica de negócios da aplicação. Por exemplo, exibindo os personagens em uma lista, filtrando-os com base em critérios de pesquisa, entre outras operações.

## Fluxo de Requisições HTTP (Frontend)

- Definição de Rotas no React Router: As rotas da aplicação frontend são definidas utilizando o React Router. Cada rota corresponde a uma URL específica e é associada a um componente React correspondente.

- Requisições para a API da Marvel: Quando um usuário interage com a aplicação (por exemplo, realiza uma pesquisa de personagem), o frontend faz requisições HTTP para a API da Marvel utilizando bibliotecas como Axios ou Fetch. Essas requisições são enviadas para as rotas definidas na API da Marvel.

- Tratamento de Respostas: Após receber as respostas da API da Marvel, o frontend processa os dados retornados e atualiza a interface do usuário de acordo com o resultado. Por exemplo, exibindo os resultados da pesquisa na tela.

- Manipulação de Estados: Durante todo o processo, o frontend gerencia os estados da aplicação utilizando o estado interno do React. Isso inclui estados de carregamento, estados de erro, dados recebidos da API, entre outros.

## Banco de Dados

- Modelos de Dados: Os modelos de dados são definidos na pasta src/models (Backend), utilizando o Sequelize para representar a estrutura das tabelas no banco de dados.

- Conexão com o Banco de Dados: A conexão com o banco de dados é estabelecida na inicialização da aplicação, utilizando as configurações fornecidas no arquivo index.js e src/db.js.

## Orquestração com Docker Compose
Este projeto foi organizado em três serviços Docker diferentes: frontend, backend e banco de dados. Cada serviço foi containerizado para garantir portabilidade e consistência no ambiente de desenvolvimento e produção.

- Frontend: O frontend da aplicação foi containerizado usando Docker e é gerenciado pelo Vite para um desenvolvimento rápido e eficiente.

- Backend: O backend foi containerizado com Docker e utiliza Node.js, Sequelize e Express.js.

- Banco de Dados: Utilizei o MySQL como banco de dados para armazenar os dados da aplicação. O banco de dados foi containerizado com Docker e é gerenciado pelo MySQL Server.

Para orquestrar esses serviços de forma integrada, utilizei o Docker Compose. O Docker Compose simplifica o processo de gerenciamento de múltiplos contêineres Docker, permitindo que eu defina e gerencie a configuração de todos os serviços em um único arquivo de configuração (docker-compose.yml). Isso facilita a configuração, inicialização e escalonamento dos serviços da aplicação em diferentes ambientes.
