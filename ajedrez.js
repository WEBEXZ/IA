var Ajedrez = (function() {

	var _crearTablero = function() {
		var tabla = document.getElementById('tablero');
		var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		var contador = 0;
		var origen;
		var destino;

		for(var i = letras.length; i > 0 ; i--) {
			var tr = document.createElement("tr");
			for(var j = 0; j < letras.length; j++) {
				var td = document.createElement("td");
				td.textContent = letras[j] + i;
				td.id = letras[j] + i;
				td.addEventListener("click", function(e) {
					contador ++;
					if(contador === 1) {
						origen = e.target.id;
					}else if(contador == 2) {
						destino = e.target.id;
						Caballo.moverCaballo(origen, destino);
						contador = 0;
					}
				});
				tr.appendChild(td);
			}
			tabla.appendChild(tr);
		}
	};

	var _pintaTablero = function() {
		var tabla = document.getElementById('tablero');
		for(var i = 1; i < tabla.children.length; i+= 2) {
			for(var j = 0; j < tabla.children.length; j+= 2) {
				tabla.children[i].children[j].bgColor = "#BB6F58";
			}
		}
		for(var i = 0; i < tabla.children.length; i+= 2) {
			for(var j = 1; j < tabla.children.length; j+= 2) {
				tabla.children[i].children[j].bgColor = "#BB6F58";
			}
		}
	};

	var _registraPosicion = function(elemento) {
		alert(elemento.id);
	}

	var _iniciarJuego = function() {
		_crearTablero();
		_pintaTablero();
		Caballo.colocarCaballo('b1');
		Caballo.colocarCaballo('g1');
	};

	var _limpiarCasilla = function(casilla) {
		var celda = document.getElementById(casilla);
		celda.textContent = celda.id;
	};

	return {
		iniciarJuego: _iniciarJuego,
		limpiarCasilla: _limpiarCasilla,
	};
})();


var Caballo = (function() {
	var _colocarCaballo = function(casilla) {
		var celda = document.getElementById(casilla);
		celda.textContent = '';
		celda.innerHTML = '\u265E';
	};

	var _buscar = function(casilla) {
		var salida = new Array(2);
		var tabla = document.getElementById('tablero');
		for(var i = 0; i < tabla.children.length; i++) {
			for(var j = 0; j < tabla.children.length; j++) {
				if((tabla.children[i].children[j].id === casilla)) {
					salida[0] = i;
					salida[1] = j;
				}
			}
		}
		return salida;
	};

	var _moverCaballo = function(origen, destino) {
		var x = _buscar(origen);
		var y = _buscar(destino);
		var tabla = document.getElementById('tablero');
		if((Math.abs(x[0] - y[0]) === 2) && (Math.abs(x[1] - y[1]) === 1) || (Math.abs(x[0] - y[0]) === 1) && (Math.abs(x[1] - y[1]) === 2)) {
			if((tabla.children[x[0]].children[x[1]].textContent === '\u265E')) {
				Ajedrez.limpiarCasilla(origen);
				_colocarCaballo(destino);
			}
		}else{
			alert('Movimiento no válido');
		}
	};

	return {
		colocarCaballo: _colocarCaballo,
		buscar: _buscar,
		moverCaballo: _moverCaballo
	};
})();




//crearTablero();

//pintaTablero();

//

/*moverCaballo('c4', 'b6');

moverCaballo('c4', 'a5');
moverCaballo('c4', 'a3');
moverCaballo('c4', 'b6');
moverCaballo('c4', 'b2');
moverCaballo('c4', 'd2'); //
moverCaballo('c4', 'd6'); //
moverCaballo('c4', 'e5'); //
moverCaballo('c4', 'e3'); //


moverCaballo('c4', 'a6');
moverCaballo('c4', 'c6');
moverCaballo('c4', 'e6');
moverCaballo('c4', 'b5');
moverCaballo('c4', 'd5');
moverCaballo('c4', 'a4');*/
