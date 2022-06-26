# Obsidian to Medium

API de integração da API do Medium.com com arquivos do seu cofre local do Obsidian


Desenvolvido com express 


## Como usar

Atualmente o projeto conta com uma API e um shell interativo REPL, para realizar a configuração inicial renomeie o arquivo .env_exemple para .env e realize as mudanças necessárias.


### API

      yarn install
      yarn run dev

Com o httpie ou semelhante faça os testes

      http localhost:3000 
      http POST localhost:3000 fileName=<your/file.md>


### REPL

      ./repl.mjs
