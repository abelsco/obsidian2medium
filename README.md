# Obsidian to Medium

API de integração da API do Medium.com com arquivos do seu cofre local do Obsidian


Desenvolvido com express 


## Como usar

      yarn install
      yarn run dev

Copie o .env_exemple e realize as alterações

Com o httpie faça os testes

      http localhost:3000 
      http POST localhost:3000 fileName=<your/file.md>
