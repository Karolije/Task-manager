Aby uruchomić projekt należy mieć zainstalowany json-server.

Aby zainstalować json-server należy w terminalu wpisać: npm install -g json-server@0.15

Następnie należy uruchomić webpacka (npm start).

W kolejnym terminalu (wierszu poleceń) powinismy odpalić nasze API tj.

json-server --watch ./db/data.json --port 3005

Od tego momentu można korzystać z API pod adresem:

http://localhost:3005/data

Uwaga! json-server musi zawsze być uruchomiony jeśli API ma działać.
