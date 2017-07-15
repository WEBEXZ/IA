//By: Webexz

  function transformaTablero(t) {
		var tmp = new Array(t.length);
		for(var i = 0; i < t.length; i++) {
			tmp[i] = new Array(t.length);
			for(var j = 0; j < t.length; j++) {
				if(t[i][j] === 0) {
					tmp[i][j] = ' ';
				} else {
					tmp[i][j] = '-';
				}
			}
		}
		return tmp;
	}

	function imprimirTablero(t) {
		var x = "";
		for(var i = 0; i < t.length; i++) {
			for(var j = 0; j < t.length; j++) {
				x += t[i][j] + " | ";
			}
			console.log(" | " + x + "\n");
			x = "";
		}
	}

	/*
		REGLAS
		 Una celda muerta con exactamente 3 vecinas vivas nace en la siguiente generacion.
		 Una celda viva con 2 o 3 vecinas vivas sobrevive
	*/

	function reglas(tablero, x, y, contador) {
		var celda = 0;

		// Si esta muerta y tiene 3 vecinas vivas
		if(tablero[x][y] === 0 && contador === 3) {
			celda = 1;
		}
		//si esta viva y tiene 2 o 3 vecinas vivas sobrevive 
		else if(tablero[x][y] === 1 && (contador <= 3 && contador > 1)) {
			celda = 1;
		}
		return celda;
	}
		
	// Validaciones
	function izquierdaArriba(tablero, i, j) {
		var contador = 0;
		if(tablero[i][j + 1] === 1) {
			contador++;
		} 
		if(tablero[i + 1][j] === 1) {
			contador++;
		} 
		if(tablero[i + 1][j + 1] === 1) {
			contador++;
		}
		return reglas(tablero, i, j, contador);
	}

	function derechaArriba(tablero, i, j) {
		var contador = 0;
		if(tablero[i][j - 1] === 1) {
			contador++;
		} 
		if(tablero[i + 1][j] === 1) {
			contador++;
		} 
		if(tablero[i + 1][j - 1] === 1) {
			contador++;
		}
		return reglas(tablero, i, j, contador);
	}

	function centroArriba(tablero, i, j){
		var contador = 0;
		if(tablero[i][j - 1] === 1) {
			contador++;
		}
		if(tablero[i][j + 1] === 1) {
			contador++;
		} 
		if(tablero[i + 1][j] === 1) {
			contador++;
		} 
		if(tablero[i + 1][j - 1] === 1) {
			contador++;
		}
		if(tablero[i + 1][j + 1] === 1) {
			contador++;
		}
		return reglas(tablero, i, j, contador);
	}

	function izquierdaAbajo(tablero, i, j) {
		var contador = 0;
		if(tablero[i][j + 1] === 1) {
			contador++;
		} 
		if(tablero[i - 1][j] === 1) {
			contador++;
		} 
		if(tablero[i - 1][j + 1] === 1) {
			contador++;
		}
		return reglas(tablero, i, j, contador);
	}

	function derechaAbajo(tablero, i, j) {
		var contador = 0;
		if(tablero[i][j - 1] === 1) {
			contador++;
		} 
		if(tablero[i - 1][j] === 1) {
			contador++;
		} 
		if(tablero[i - 1][j - 1] === 1) {
			contador++;
		}
		return reglas(tablero, i, j, contador);
	}

	function centroAbajo(tablero, i, j) {
		var contador = 0;
		if(tablero[i][j - 1] === 1) {
			contador++;
		}
		if(tablero[i][j + 1] === 1) {
			contador++;
		} 
		if(tablero[i - 1][j] === 1) {
			contador++;
		} 
		if(tablero[i - 1][j - 1] === 1) {
			contador++;
		}
		if(tablero[i - 1][j + 1] === 1) {
			contador++;
		}
		return reglas(tablero, i, j, contador);
	}

	function centro(tablero, i, j) {
		var contador = 0;
		if(tablero[i][j - 1] === 1) {
			contador++;
		}
		if(tablero[i][j + 1] === 1) {
			contador++;
		} 
		if(tablero[i - 1][j] === 1) {
			contador++;
		} 
		if(tablero[i - 1][j - 1] === 1) {
			contador++;
		}
		if(tablero[i - 1][j + 1] === 1) {
			contador++;
		}
		if(tablero[i + 1][j] === 1) {
			contador++;
		} 
		if(tablero[i + 1][j - 1] === 1) {
			contador++;
		}
		if(tablero[i + 1][j + 1] === 1) {
			contador++;
		}
		return reglas(tablero, i, j, contador);
	}

	//Juego
	function juego(tablero) {
		var tmp = new Array(tablero.length);
		for(var i = 0; i < tablero.length; i++) {
			tmp[i] = new Array(tablero.length);
			for(var j = 0; j < tablero.length; j++) {
				switch(i) {
					case 0:
						switch(j) {
							case 0:
								tmp[i][j] = izquierdaArriba(tablero, i, j);
								break;
							case tablero.length - 1:
								tmp[i][j] = derechaArriba(tablero, i, j);
								break;
							default:
								tmp[i][j] = centroArriba(tablero, i, j);
						}
						break;
					case tablero.length - 1:
						switch(j) {
							case 0:
								tmp[i][j] = izquierdaAbajo(tablero, i, j);
								break;
							case tablero.length -1:
								tmp[i][j] = derechaAbajo(tablero, i, j);
								break;
							default:
								tmp[i][j] = centroAbajo(tablero, i, j);
						}
						break;
					default:
						tmp[i][j] = centro(tablero, i, j);
				}		
			}
		}
		return tmp;
	}

	//Definicion del tablero	
	var tablero = [[0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 0], [0, 1, 1, 0]];
	//Imprimir tablero
	console.log('Original');
	//imprimirTablero(transformaTablero(tablero));
	imprimirTablero(transformaTablero(tablero));

	for(var i = 1; i < 6; i++) {
		var siguiente = tablero;
		console.log('------------------');
		console.log('Nueva generacion');
		tablero = juego(siguiente);
		imprimirTablero(transformaTablero(tablero));
		console.log('------------------');
	}
	
	/*console.log('Primer Generación');
	var siguiente = juego(tablero);
	imprimirTablero(siguiente);*/
	

		/*
		  0123
		  ----
		0|0100		1100	1010	
		1|1100		1110	0010
		2|0010		1010	1001
		3|0110		0110	0110
		
	*/
