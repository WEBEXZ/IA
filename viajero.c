#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#define CIUDADES 8
#define CLS system("clear");

typedef struct {
	int G[20][20];
}Puntos;
 
int Iniciar(void); 								//Función para iniciar el programa.
void Definicion(Puntos *); 						//Función para ingresar p de las ciudades.
void BuscarRutaOptima(Puntos *,int [20][2]);
int BuscarEnFila(Puntos *,int, int[20][2]);
void GuardarCiudad(int [20][2], int);
void GuardarValor(int [20][2], int);
void QuitarCiudadesVisitadas(Puntos *, int [20][2], int, bool);
int ImprimirRutaOptima(int [20][2], int);
int  SumarTrayectorias(int [20][2], int);
 
 
int main(){
	Iniciar();
	return 0;
}
 
int Iniciar(void){
	//INICIALIZAMOS RUTAS
	int ruta[20][2] = {0};
	int ruta2[20][2] = {0};
	int ruta3[20][2] = {0};
	int ruta4[20][2] = {0};
	int ruta5[20][2] = {0};
	int ruta6[20][2] = {0};
	int ruta7[20][2] = {0};
	int ruta8[20][2] = {0};

	Puntos p = {0,0};
	Puntos p2 = {0,0};
	Puntos p3 = {0,0};
	Puntos p4 = {0,0};
	Puntos p5 = {0,0};
	Puntos p6 = {0,0};
	Puntos p7 = {0,0};
	Puntos p8 = {0,0};

	Definicion(&p);
	Definicion(&p2);
	Definicion(&p3);
	Definicion(&p4);
	Definicion(&p5);
	Definicion(&p6);
	Definicion(&p7);
	Definicion(&p8);


	BuscarRutaOptima(&p, ruta);
	BuscarRutaOptima(&p2, ruta2);
	BuscarRutaOptima(&p3, ruta3);
	BuscarRutaOptima(&p4, ruta4);
	BuscarRutaOptima(&p5, ruta5);
	BuscarRutaOptima(&p6, ruta6);
	BuscarRutaOptima(&p7, ruta7);
	BuscarRutaOptima(&p8, ruta8);

	int a = ImprimirRutaOptima(ruta, CIUDADES);
	int b = ImprimirRutaOptima(ruta2, CIUDADES);
	int c = ImprimirRutaOptima(ruta3, CIUDADES);
	int d = ImprimirRutaOptima(ruta4, CIUDADES);
	int e = ImprimirRutaOptima(ruta5, CIUDADES);
	int f = ImprimirRutaOptima(ruta6, CIUDADES);
	int g = ImprimirRutaOptima(ruta7, CIUDADES);
	int h = ImprimirRutaOptima(ruta8, CIUDADES);

	int menor[CIUDADES] = {a,b,c,d,e,f,g,h};
	int m = 0;
	for(int i = 0; i < CIUDADES; i++){
		if(menor[m] > menor[i]){
			m = i;
		}
	}

	int mayor[CIUDADES] = {a,b,c,d,e,f,g,h};
	int ma = 0;
	for(int i = 0; i < CIUDADES; i++){
		if(mayor[ma] < mayor[i]){
			ma = i;
		}
	}

	printf("La ruta menor es: %d\n", menor[m]);
	printf("La ruta mayor es: %d\n", mayor[ma]);
	return 0;
}
 
void Definicion(Puntos *p){
	//Puntos iguales
	p -> G[0][0]=0;
	p -> G[1][1]=0;
	p -> G[2][2]=0;
	p -> G[3][3]=0;
	p -> G[4][4]=0;
	p -> G[5][5]=0;
	p -> G[6][6]=0;
	p -> G[7][7]=0;
	//Puntos simétricos
	p -> G[0][1]=20;
	p -> G[1][0]=20;
	p -> G[0][2]=22;
	p -> G[2][0]=22;
	p -> G[0][3]=70;
	p -> G[3][0]=70;
	p -> G[0][4]=30;
	p -> G[4][0]=30;
	p -> G[0][5]=25;
	p -> G[5][0]=25;
	p -> G[0][6]=2;
	p -> G[6][0]=2;
	p -> G[0][7]=15;
	p -> G[7][0]=15;

	p -> G[1][2]=32;
	p -> G[2][1]=32;
	p -> G[1][3]=28;
	p -> G[3][1]=28;
	p -> G[1][4]=44;
	p -> G[4][1]=44;
	p -> G[1][5]=76;
	p -> G[5][1]=76;
	p -> G[1][6]=8;
	p -> G[6][1]=8;
	p -> G[1][7]=54;
	p -> G[7][1]=54;

	p -> G[2][3]=32;
	p -> G[3][2]=32;
	p -> G[2][4]=9;
	p -> G[4][2]=9;
	p -> G[2][5]=15;
	p -> G[5][2]=15;
	p -> G[2][6]=61;
	p -> G[6][2]=61;
	p -> G[2][7]=99;
	p -> G[7][2]=99;

	p -> G[3][4]=100;
	p -> G[4][3]=100;
	p -> G[3][5]=20;
	p -> G[5][3]=20;
	p -> G[3][6]=1;
	p -> G[6][3]=1;
	p -> G[3][7]=55;
	p -> G[7][3]=55;

	p -> G[4][5]=90;
	p -> G[5][4]=90;
	p -> G[4][6]=77;
	p -> G[6][4]=77;
	p -> G[4][7]=23;
	p -> G[7][4]=23;

	p -> G[5][6]=37;
	p -> G[6][5]=37;
	p -> G[5][7]=2;
	p -> G[7][5]=2;

	p -> G[6][7]=10;
	p -> G[7][6]=10;
}
 
void BuscarRutaOptima(Puntos *p, int r[20][2]){
	int inicio, indice_del_menor;
	CLS
	printf("Elige punto de origen (1 - %d): ",CIUDADES);
	scanf("%d", &inicio);
 
	r[0][0] = inicio; //
	inicio--;
 
	for (int i = 0; i < CIUDADES; i++){			
		if(i == 0){
			//								p    0     r
			indice_del_menor = BuscarEnFila(p, inicio, r);
			QuitarCiudadesVisitadas(p, r, indice_del_menor, false);
		}else{
			if (i == CIUDADES - 2){
				indice_del_menor = BuscarEnFila(p, indice_del_menor, r);
				QuitarCiudadesVisitadas(p, r, indice_del_menor, true);
			}else{
				indice_del_menor = BuscarEnFila(p, indice_del_menor, r);
				QuitarCiudadesVisitadas(p, r, indice_del_menor, false);
			}
		}		
	}
}
 
int BuscarEnFila(Puntos *p, int inicio, int r[20][2]){
	int menor = 999999, indice_del_menor;
 	
	for (int j = 0; j < CIUDADES; j++){
		if ( (p -> G[inicio][j]) != 0){
			if ( (p -> G[inicio][j]) < menor){
				menor =	 p -> G[inicio][j];
				indice_del_menor = j;
			}
		}
	}	
 
	GuardarCiudad(r ,indice_del_menor);
	GuardarValor(r, menor);
 
	return indice_del_menor;
}
 
void GuardarCiudad(int r[20][2] , int indice_del_menor){
	int i = 0, num_ciudades_visitadas = 0;
	while(r[i][0] != 0){
		i++;
		num_ciudades_visitadas++;
	}
	r[num_ciudades_visitadas][0] = indice_del_menor + 1;
}
 
void GuardarValor(int r[20][2], int menor){
	int i = 0, num_ciudades_visitadas=0;
	while(r[i][1] != 0){
		i++;
		num_ciudades_visitadas ++;
	}
	r[num_ciudades_visitadas][1] = menor;
}
 
void QuitarCiudadesVisitadas(Puntos *p, int r[20][2], int indice_del_menor, bool penultimo){
	int i = 0, num_ciudades_visitadas = 0, aux;
	while(r[i][1] != 0){
		i++;
		num_ciudades_visitadas++;
	}
 
	if (penultimo == true){
		for (i = num_ciudades_visitadas; i >= 1; i--){
			aux = r[i][0];
			aux = aux - 1;
			p -> G[indice_del_menor][aux] = 0;
		}
	}
	else{
		for (i = num_ciudades_visitadas; i >= 0; i--){
			aux = r[i][0];
			aux = aux - 1;
			p -> G[indice_del_menor][aux] = 0;
		}
	}
}
 
int ImprimirRutaOptima(int ruta[20][2], int n){
	int total = SumarTrayectorias(ruta, n);
 	puts("Una ruta optima seria: ");
 
	for (int i = 0; i < n + 1; i++){
		if (i == n)
			printf(" %d\n", ruta[i][0]);
		else
			printf(" %d ->", ruta[i][0]);		
	}
 
	printf("Total de kilometros recorridos:");
 
	for (int i = 0; i < n; i++){
		if (i == n-1)
			printf(" %d = %d\n\n", ruta[i][1],total);
		else	
			printf(" %d +", ruta[i][1]);	
	}
	return total;
}
 
int SumarTrayectorias(int r[20][2], int n){
	int total=0;
	for (int i = 0; i < n; i++)
		total += r[i][1];
	return total;
}