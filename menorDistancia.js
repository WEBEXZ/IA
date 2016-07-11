var fila = 4, suma = 0, v = 0, c = 1;
var m = [[0, 4, 6, 7], [4, 0, 5, 10], [6, 5, 0, 11], [7, 10, 11, 0]]; //Distancias

function menor(f, c) {
  var menor = 1000, indice = 0;
  for(var i = c; i < fila; i++) {
    if(menor > m[f][i]) {
      menor = m[f][i];
      indice = i;
    }
  }
  return indice;
}

for(var i = 0; i < fila - 1; i++){
  var indice = menor(v, c);
  suma += m[i][indice];
  v = indice;
  c = v + 1;
  console.log("Indice: " + v +" valor: " +suma);
}

console.log(suma);
