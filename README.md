README.

Configurar para testes:

(1)*******************
    Primeira vez que for usar...

Clonar projeto com o comando no cmd: git clone https://github.com/laisriquieri/projeto-integrador-1.git

Entrar na pasta do projeto clonado.

Renomear o arquivo .env.example para .env

Se ainda não tiver o CLI do ADONIS, instalar com: npm i --global @adonisjs/cli

Dentro da pasta do projeto clonado usar o comando no cmd: npm install

Dentro da pasta do projeto clonado usar o comando no cmd: npm install sqlite3 --save

Dentro da pasta do projeto clonado usar o comando no cmd: adonis migration:run

Dentro da pasta do projeto clonado usar o comando no cmd: adonis key:generate

Dentro da pasta do projeto clonado usar o comando no cmd: adonis serve --dev

Acessar rota: http://127.0.0.1:3333/usuario
Criar um usuario para testes.

Acessar rota: http://127.0.0.1:3333/
Fazer login com EMAIL e SENHA que criou

Testar aplicação.

(2)*******************
    DEPOIS da primeira vez, para atualizar o repositório local com as alteraçoes dos demais:

git pull https://github.com/laisriquieri/projeto-integrador-1.git