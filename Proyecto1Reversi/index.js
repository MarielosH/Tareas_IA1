const express = require('express');
const app  = express();

let parametros,turno,estado;
var vectorpeticion, oponente;
app.listen(process.env.PORT || 3000, () =>{
    console.log('se levanto');
});

app.get('/', (req, res)=>{
    parametros =new URLSearchParams(req.url.substring(1));
    turno = parametros.get('turno');
    estado = parametros.get('estado');
   
    //aquí se enviará la respuesta como numero
    //Ejemplo [2,4] = 24
    
    let pos = Calculo();
    let mapeo= pos[0]+""+pos[1];
    res.send(mapeo);
});

function Calculo() {
    
if(turno == 0){
    oponente = 1;
}else{
    oponente = 0;
}

vectorpeticion = Array.from(estado).map(Number);
var matrizjuego = DatosMatriz();


let movimientos = posibles_movimientos(matrizjuego,turno);
let numero = ObtenerRandom(0,movimientos.length);
return movimientos[numero];

}

//--> se crea una matriz de 8x8
function DatosMatriz(){
    let pos = 0;
    let matrizmatrizjuego = new Array();
    for(let i = 0; i < 8; i++){
        let aux = new Array();
        for(let j = 0; j < 8; j++){
            aux.push(vectorpeticion[pos]);
            pos++;
        }
        matrizmatrizjuego.push(aux);
    }
    return matrizmatrizjuego;
}

//--> se verifican los posibles movimientos que puede se pueden realizar segun el turno
function posibles_movimientos(matrizjuego, turno){
    let coordenada = new Array();

    for(let i = 0; i < 8; i++){
        for(let j=0; j<8; j++){
            if(libre_movimiento(matrizjuego,turno,i,j)){
                coordenada.push([i,j]); 
            }
        }
    }

    return coordenada;
}

function ObtenerRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function libre_movimiento(matrizjuego, turno, fila, columna){
    //--> verificamos si la posición del tablero  no esta ocupada
    if(matrizjuego[fila][columna] != 2){
        return false;
    }

    let buscafila, buscacolumna, c;
    //busca en las posiciones de arriba de la ficha
    buscafila = fila - 1;
    buscacolumna = columna;
    c = 0;

    while(buscafila>0 && matrizjuego[buscafila][buscacolumna] == oponente){
        buscafila--;
        c++;
    }
    if(buscafila>=0 && matrizjuego[buscafila][buscacolumna] == turno && c>0){
        return true;
    } 

    //busca en las posiciones de abajo de la ficha 
    buscafila = fila + 1;
    buscacolumna = columna;
    c = 0;
    while(buscafila<7 && matrizjuego[buscafila][buscacolumna] == oponente){
         buscafila++;
         c++;
     }
     if(buscafila<=7 && matrizjuego[buscafila][buscacolumna] == turno && c>0){
         return true;
    }

     //busca mocimientos a la izquierda de la ficha
     buscafila= fila;
     buscacolumna = columna - 1;
     c = 0;
     while(buscacolumna>0 && matrizjuego[buscafila][buscacolumna] == oponente){
         buscacolumna--;
         c++;
     }
     if(buscacolumna>=0 && matrizjuego[buscafila][buscacolumna] == turno && c>0){
        return true;
     } 
     //busca movimientos a la derecha de la ficha 
     buscafila= fila;
     buscacolumna = columna + 1;
     c = 0;
     while(buscacolumna<7 && matrizjuego[buscafila][buscacolumna] == oponente){
         buscacolumna++;
         c++;
     }
     if(buscacolumna<=7 && matrizjuego[buscafila][buscacolumna] == turno && c>0){
        return true;
    } 
     //busca movimientos arriba y a la izquierda
     buscafila= fila - 1;
     buscacolumna = columna - 1;
     c = 0;
     while(buscafila>0 && buscacolumna>0 && matrizjuego[buscafila][buscacolumna] == oponente){
         buscafila--;
         buscacolumna--;
         c++;
     }
     if(buscafila>=0 && buscacolumna>=0 && matrizjuego[buscafila][buscacolumna] == turno && c>0){
        return true;
    } 
     //busca movimientos arriba y  a la derecha
     buscafila= fila - 1;
     buscacolumna = columna + 1;
     c = 0;
     while(buscafila>0 && buscacolumna<7 && matrizjuego[buscafila][buscacolumna] == oponente){
         buscafila--;
         buscacolumna++;
         c++;
     }
     if(buscafila>=0 && buscacolumna<=7 && matrizjuego[buscafila][buscacolumna] == turno && c>0){
        return true;
    } 
     //busca movimientos abajo y a la izquierda
     buscafila= fila + 1;
     buscacolumna = columna - 1;
     c = 0;
     while(buscafila<7 && buscacolumna>0 && matrizjuego[buscafila][buscacolumna] == oponente){
         buscafila++;
         buscacolumna--;
         c++;
     }
     if(buscafila<=7 && buscacolumna>=0 && matrizjuego[buscafila][buscacolumna] == turno && c>0){
        return true;
    } 
     //busca movimientos abajo y a la derecha
     buscafila= fila + 1;
     buscacolumna = columna + 1;
     c = 0;
     while(buscafila<7 && buscacolumna<7 && matrizjuego[buscafila][buscacolumna] == oponente){
         buscafila++;
         buscacolumna++;
         c++;
     }
     if(buscafila<=7 && buscacolumna<=7 && matrizjuego[buscafila][buscacolumna] == turno && c>0){
        return true;
    } 
     
    //si no hay movimientos, ya no hay más que hacer. 
     return false;

    
}
/*
function getReversePoints(matrizt,turnot, i,j){

    let allReversePoints = new ArrayList();

    let  mi , mj , c;
    let oturnot = ((turnot == 1) ? 2 : 1);

    //move up
    let mupts = new ArrayList();
    mi = i - 1;
    mj = j;
    while(mi>0 && matrizt[mi][mj] == oturnot){
        mupts.add(new Point(mi,mj));
        coordenada.push([i,j]); 
        mi--;
    }
    if(mi>=0 && matrizt[mi][mj] == turnot && mupts.size()>0){
        allReversePoints.addAll(mupts);
    }


    //move down
    let mdpts = new ArrayList();
    mi = i + 1;
    mj = j;
    while(mi<7 && matrizt[mi][mj] == oturnot){
        mdpts.add(new Point(mi,mj));
        mi++;
    }
    if(mi<=7 && matrizt[mi][mj] == turnot && mdpts.size()>0){
        allReversePoints.addAll(mdpts);
    }

    //move left
    let mlpts = new ArrayList();
    mi = i;
    mj = j - 1;
    while(mj>0 && matrizt[mi][mj] == oturnot){
        mlpts.add(new Point(mi,mj));
        mj--;
    }
    if(mj>=0 && matrizt[mi][mj] == turnot && mlpts.size()>0){
        allReversePoints.addAll(mlpts);
    }

    //move right
    let mrpts = new ArrayList();
    mi = i;
    mj = j + 1;
    while(mj<7 && matrizt[mi][mj] == oturnot){
        mrpts.add(new Point(mi,mj));
        mj++;
    }
    if(mj<=7 && matrizt[mi][mj] == turnot && mrpts.size()>0){
        allReversePoints.addAll(mrpts);
    }

    //move up left
    let mulpts = new ArrayList();
    mi = i - 1;
    mj = j - 1;
    while(mi>0 && mj>0 && matrizt[mi][mj] == oturnot){
        mulpts.add(new Point(mi,mj));
        mi--;
        mj--;
    }
    if(mi>=0 && mj>=0 && matrizt[mi][mj] == turnot && mulpts.size()>0){
        allReversePoints.addAll(mulpts);
    }

    //move up right
    let murpts = new ArrayList();
    mi = i - 1;
    mj = j + 1;
    while(mi>0 && mj<7 && matrizt[mi][mj] == oturnot){
        murpts.add(new Point(mi,mj));
        mi--;
        mj++;
    }
    if(mi>=0 && mj<=7 && matrizt[mi][mj] == turnot && murpts.size()>0){
        allReversePoints.addAll(murpts);
    }

    //move down left
    let mdlpts = new ArrayList();
    mi = i + 1;
    mj = j - 1;
    while(mi<7 && mj>0 && matrizt[mi][mj] == oturnot){
        mdlpts.add(new Point(mi,mj));
        mi++;
        mj--;
    }
    if(mi<=7 && mj>=0 && matrizt[mi][mj] == turnot && mdlpts.size()>0){
        allReversePoints.addAll(mdlpts);
    }

    //move down right
    let mdrpts = new ArrayList();
    mi = i + 1;
    mj = j + 1;
    while(mi<7 && mj<7 && matrizt[mi][mj] == oturnot){
        mdrpts.add(new Point(mi,mj));
        mi++;
        mj++;
    }
    if(mi<=7 && mj<=7 && matrizt[mi][mj] == turnot && mdrpts.size()>0){
        allReversePoints.addAll(mdrpts);
    }

    return allReversePoints;
}*/