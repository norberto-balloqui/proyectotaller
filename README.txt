Instalación manual servidor

Ya estando logueado y en modo root hacer siguientes pasos.

Dirigirte Ir a la raíz donde se clonara el proyecto.

Actualizar sistema
Apt-get update

Instalar packetes curl
apt-get install -y curl

apt-get -y autoclean

Instalar git
apt-get install git

Instalar nano
apt-get install nano

Instalar nvm de Nodejs
curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

reiniciar bash
exec bash

Instalar nodejs 16.15
nvm install 16.15.0

Cambiar nombre alias de Nodejs
nvm alias default 16.15.0


Usar por default la versión de js
nvm use default

Instalar yarn y pm2
npm install -g yarn
npm install -g pm2

Clonar repositorio 
Git clone https://github.com/norberto-balloqui/proyectotaller.git











Configuración extras 

-Dirigirse dentro de la carpeta proyectotaller
-Entrar a backend y configurar siguiente archivo

-Ocupando Nano env
Aparecerá lo siguiente

PORT=3000
SERVIDOR = http://localhost:3000/api

DB = usuario:pasword código ejemplo

-Cambiar puerto 3000 que sería el puerto apache 80 del servidor que posea y cambiarlo por este.

- Mientras tanto en la parte SERVIDOR = http://localhost:3000/api
Cambiar localhost por su ip y el 3000 por el puerto apache 80 que posea del servidor.

Ejemplo 
PORT=1455
SERVIDOR = http:// 155.83.198.23:1455/api

-Mientras tanto DB dentro de env de este,  no cambiar nada ya que esta sería la bd de mongodb actual para este proyecto, en el caso de poseer la suya debe cambiar usuario:pasword mas código credenciales ssh que le den su bd de mongodb.

-importante guardar y cambiar el nombre de env a .env así empezara a tomar los datos.

Despues dentro de esta misma carpeta hacer:
yarn install

Luego el proceso para ejecutar iniciar servicio que desea ocupar puede ser 
npm start 
o
pm2 start index.js --name backend

Si fuera necesario abrir nueva terminal en caso de npm start, si esta ocupando pm2 no será necesario.
Luego regresar a proyectotaller e ir a la carpeta frontend el cual se hará el mismo paso 
Nano env
Cambiar lo siguiente 
SERVIDOR = http://localhost:3000/api

Localhost por la ip y el 3000 por el puerto apache 80 que posea

Ejemplo 
SERVIDOR = http:// 155.83.198.23:1455/api





-Guardar y cambiar el nombre de env a .env
- Luego en el mismo frontend entrar al archivo package.json

Cambiando la sección de script al siguiente 

"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 443",
    "lint": "next lint"

-Guardar y en la misma carpeta frontend hacer siguientes instalaciones

-npm install
-npm run build

-Luego iniciar proceso
npm start
o
pm2 start npm --name frontend – start

Con eso debería funcionar
Con el siguiente dirección en navegador

http://ip:puertohtml443/
ejemplo:
http:// 155.83.198.23:1458
