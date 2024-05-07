# Usa a imagem oficial do Node.js como base
FROM node:latest

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package.json .
COPY package-lock.json .

# Instala as dependências da aplicação
RUN npm install

# Copia todos os arquivos do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Define a porta que será exposta pelo contêiner
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "run", "dev"]
