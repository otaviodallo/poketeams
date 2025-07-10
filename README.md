# PokéTeams API

Uma API RESTful para gerenciar Times de Pokémon criados por Treinadores. Os dados dos Pokémon são consultados na PokéAPI, enquanto os dados dos Treinadores e seus Times são persistidos localmente.

## 🚀 Funcionalidades

### Treinadores (Trainers)

- ✅ CRUD completo de treinadores
- ✅ Atributos: id, nome, cidade de origem (opcional)

### Times (Teams)

- ✅ CRUD completo de times
- ✅ Relação 1xN com treinadores (um treinador pode ter vários times)
- ✅ Atributos: id, nome do time, treinadorId

### Pokémon nos Times (TeamPokemon)

- ✅ Adicionar pokémon a um time (com validação na PokéAPI)
- ✅ Remover pokémon de um time
- ✅ Listar pokémons de um time (com dados enriquecidos da PokéAPI)
- ✅ Limite de 6 pokémons por time
- ✅ Validação de existência do pokémon na PokéAPI

## 🏗️ Arquitetura

- **Framework**: NestJS
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Validação**: class-validator e class-transformer
- **Documentação**: Swagger/OpenAPI
- **API Externa**: PokéAPI (https://pokeapi.co/)

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd poketeams
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://poketeams:poketeams123@localhost:5432/poketeams?schema=public"
PORT=3000
NODE_ENV=development
```

4. **Inicie o banco de dados**

```bash
docker-compose up -d
```

5. **Execute as migrações do Prisma**

```bash
npx prisma migrate dev
```

6. **Gere o cliente Prisma**

```bash
npx prisma generate
```

7. **Inicie a aplicação**

```bash
npm run start:dev
```

## 📚 Documentação da API

Acesse a documentação Swagger em: http://localhost:3000/api

## 🔗 Endpoints Principais

### Treinadores

- `GET /trainer` - Listar todos os treinadores
- `GET /trainer/:id` - Buscar treinador por ID
- `POST /trainer` - Criar novo treinador
- `PUT /trainer/:id` - Atualizar treinador
- `DELETE /trainer/:id` - Deletar treinador

### Times

- `GET /team` - Listar todos os times
- `GET /team/:id` - Buscar time por ID
- `GET /team/trainer/:trainerId` - Listar times de um treinador
- `POST /team` - Criar novo time
- `PUT /team/:id` - Atualizar time
- `DELETE /team/:id` - Deletar time

### Pokémon nos Times

- `GET /team-pokemon/teams/:teamId/pokemons` - Listar pokémons de um time
- `POST /team-pokemon/teams/:teamId/pokemons` - Adicionar pokémon ao time
- `DELETE /team-pokemon/teams/:teamId/pokemons/:pokemonId` - Remover pokémon do time
- `GET /team-pokemon/team/:teamId/count` - Contar pokémons em um time

## 📝 Exemplos de Uso

### Criar um Treinador

```bash
curl -X POST http://localhost:3000/trainer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ash Ketchum",
    "city": "Pallet Town"
  }'
```

### Criar um Time

```bash
curl -X POST http://localhost:3000/team \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Time dos Iniciais",
    "trainerId": "trainer-id-aqui"
  }'
```

### Adicionar Pokémon ao Time

```bash
curl -X POST http://localhost:3000/team-pokemon/teams/team-id-aqui/pokemons \
  -H "Content-Type: application/json" \
  -d '{
    "pokemonId": "pikachu"
  }'
```

### Listar Pokémon do Time

```bash
curl -X GET http://localhost:3000/team-pokemon/teams/team-id-aqui/pokemons
```

## 🔧 Scripts Disponíveis

- `npm run start:dev` - Inicia em modo desenvolvimento
- `npm run build` - Compila o projeto
- `npm run start:prod` - Inicia em modo produção
- `npm run test` - Executa os testes
- `npm run test:e2e` - Executa testes end-to-end

## 🐳 Docker

### Iniciar serviços

```bash
docker-compose up -d
```

### Parar serviços

```bash
docker-compose down
```

### Ver logs

```bash
docker-compose logs -f
```

## 🗄️ Banco de Dados

### Acessar pgAdmin

- URL: http://localhost:8080
- Email: admin@poketeams.com
- Senha: admin123

### Comandos Prisma

```bash
# Gerar migração
npx prisma migrate dev

# Resetar banco
npx prisma migrate reset

# Abrir Prisma Studio
npx prisma studio
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📦 Estrutura do Projeto

```
src/
├── common/                 # Serviços compartilhados
│   ├── prisma.service.ts   # Serviço do Prisma
│   ├── poke-api.service.ts # Serviço da PokéAPI
│   └── common.module.ts    # Módulo comum
├── trainer/                # Módulo de treinadores
│   ├── dto/               # DTOs do trainer
│   ├── trainer.controller.ts
│   ├── trainer.service.ts
│   ├── trainer.repository.ts
│   └── trainer.module.ts
├── team/                   # Módulo de times
│   ├── dto/               # DTOs do team
│   ├── team.controller.ts
│   ├── team.service.ts
│   ├── team.repository.ts
│   └── team.module.ts
├── team-pokemon/           # Módulo de pokémons nos times
│   ├── dto/               # DTOs do team-pokemon
│   ├── team-pokemon.controller.ts
│   ├── team-pokemon.service.ts
│   ├── team-pokemon.repository.ts
│   └── team-pokemon.module.ts
├── app.module.ts
└── main.ts
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.
