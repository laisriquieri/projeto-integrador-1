README.

Configurar para testes:

(1)*******************
    Primeira vez que for usar...

Clonar projeto com o comando no cmd: git clone https://github.com/laisriquieri/projeto-integrador-1.git

Entrar na pasta do projeto clonado.

Renomear o arquivo .env.example para .env

Dentro da pasta do projeto clonado usar o comando no cmd: npm i --global @adonisjs/cli

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



(3)*******************
Configurar MySql localmente:

Alterar .env para ficar com as informaçoes:
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=     <------ *** Sua senha de root ***
DB_DATABASE=projeto-integrador-dev <------ *** Precisar criar previamente no MySql ***

Ao trocar para o MySQL, rodar as migrations: adonis migration:run

Se der erro 1251:
code: 'ER_NOT_SUPPORTED_AUTH_MODE',
  errno: 1251,
  sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',  sqlState: '08004',
  fatal: true

Fazer comando no MySQL configurando uma senha para root:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'



(4)*******************