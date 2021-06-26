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

let coordenada = new Array();

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
     
    //si no hay movimientos, ya no hay más que hacer. 
     return false;

    
}

function getReversePoints(matrizt,turnot, i,j){

    let allReversePoints = new Array();

    let  mi , mj , c;

    //move up
    let mupts = new Array();
    mi = i - 1;
    mj = j;
    while(mi>0 && matrizt[mi][mj] == oponente){
       // mupts.add(new Point(mi,mj));
        mupts.push([mi,mj]); 
        mi--;
    }
    if(mi>=0 && matrizt[mi][mj] == turnot && mupts.length>0){
        mupts.forEach(element => {
            allReversePoints.push(element);
        });
    }


    //move down
    let mdpts = new Array();
    mi = i + 1;
    mj = j;
    while(mi<7 && matrizt[mi][mj] == oponente){
       // mdpts.add(new Point(mi,mj));
        mdpts.push([mi,mj]); 
        mi++;
    }
    if(mi<=7 && matrizt[mi][mj] == turnot && mdpts.length>0){
       // allReversePoints.addAll(mdpts);
        mdpts.forEach(element => {
        allReversePoints.push(element);
    });
    }

    //move left
    let mlpts = new Array();
    mi = i;
    mj = j - 1;
    while(mj>0 && matrizt[mi][mj] == oponente){
      //  mlpts.add(new Point(mi,mj));
        mlpts.push([mi,mj]); 
        mj--;
    }
    if(mj>=0 && matrizt[mi][mj] == turnot && mlpts.size()>0){
      //  allReversePoints.addAll(mlpts);
        mlpts.forEach(element => {
        allReversePoints.push(element);
    });
    }

    //move right
    let mrpts = new Array();
    mi = i;
    mj = j + 1;
    while(mj<7 && matrizt[mi][mj] == oponente){
        mrpts.push(new Point(mi,mj));
        mj++;
    }
    if(mj<=7 && matrizt[mi][mj] == turnot && mrpts.length>0){
       // allReversePoints.addAll(mrpts);
        mrpts.forEach(element => {
        allReversePoints.push(element);
    });
    }

    //move up left
    let mulpts = new Array();
    mi = i - 1;
    mj = j - 1;
    while(mi>0 && mj>0 && matrizt[mi][mj] == oponente){
       // mulpts.add(new Point(mi,mj));
       mulpts.push([mi,mj]); 
        mi--;
        mj--;
    }
    if(mi>=0 && mj>=0 && matrizt[mi][mj] == turnot && mulpts.length>0){
        //allReversePoints.addAll(mulpts);
        mulpts.forEach(element => {
            allReversePoints.push(element);
        });
    }

    //move up right
    let murpts = new Array();
    mi = i - 1;
    mj = j + 1;
    while(mi>0 && mj<7 && matrizt[mi][mj] == oponente){
      //  murpts.add(new Point(mi,mj));
      murpts.push([mi,mj]); 
        mi--;
        mj++;
    }
    if(mi>=0 && mj<=7 && matrizt[mi][mj] == turnot && murpts.length>0){
        //allReversePoints.addAll(murpts);
        murpts.forEach(element => {
            allReversePoints.push(element);
        });
    }

    //move down left
    let mdlpts = new Array();
    mi = i + 1;
    mj = j - 1;
    while(mi<7 && mj>0 && matrizt[mi][mj] == oponente){
      // mdlpts.add(new Point(mi,mj));
        mdlpts.push([mi,mj]); 
        mi++;
        mj--;
    }
    if(mi<=7 && mj>=0 && matrizt[mi][mj] == turnot && mdlpts.length>0){
       // allReversePoints.addAll(mdlpts);
        mdlpts.forEach(element => {
        allReversePoints.push(element);
    });

    }

    //move down right
    let mdrpts = new Array();
    mi = i + 1;
    mj = j + 1;
    while(mi<7 && mj<7 && matrizt[mi][mj] == oponente){
        //mdrpts.add(new Point(mi,mj));
        mdrpts.push([mi,mj]); 
        mi++;
        mj++;
    }
    if(mi<=7 && mj<=7 && matrizt[mi][mj] == turnot && mdrpts.length>0){
       // allReversePoints.addAll(mdrpts);
        mdrpts.forEach(element => {
        allReversePoints.push(element);
    });
    }

    return allReversePoints;
}
//matrizt es la matriz del tablero, la misma de posibles movimientos, point move, es la posicion del vector de posibles movimientos, y el turno 
function getNewmatriztAfterMove( matrizt, posiblesmov , turnot){
    //get clone of old matrizt
    let newmatrizt = new Array();
    for (let k = 0; k < 8; k++) {
        for (let l = 0; l < 8; l++) {
            newmatrizt[k][l] = matrizt[k][l];
        }
    }

    //place piece
    newmatrizt[posiblesmov[0]][posiblesmov[1]] = turnot;
    //reverse pieces
    let rev = getReversePoints(newmatrizt,turnot,posiblesmov[0],posiblesmov[1]);
    
    rev.forEach(element => {
        newmatrizt[element[0]][element[1]]=turnot;
    });

    return newmatrizt;
}

  //returns minimax value for a given node (without A/B pruning)
    function MM(node,turnot, depth, max){
        //if terminal reached or depth limit reached evaluate
        if(depth == 0 || matriztHelper.isGameFinished(node)){
            //matriztPrinter bpe = new matriztPrinter(node,"Depth : " + depth);
            return Evaluator.eval(node,turnot);
        }
       
        //if no moves available then forfeit turn
        if((max && !matriztHelper.hasAnyMoves(node,turnot)) || (!max && !matriztHelper.hasAnyMoves(node,oturnot))){
            System.out.println("Forfeit State Reached !");
            return MM(node,turnot,depth-1,!max);
        }
        let score;
        if(max){
            //maximizing
            score = Integer.MIN_VALUE;
            for(let a of matriztHelper.getAllPossibleMoves(node,turnot)){ //my turn
                //create new node
                newNode = matriztHelper.getNewmatriztAfterMove(node,move,turnot);
                //recursive call
                int childScore = MM(newNode,turnot,depth-1,false);
                if(childScore > score) score = childScore;
            }
        }else{
            //minimizing
            score = Integer.MAX_VALUE;
            for(let move of matriztHelper.getAllPossibleMoves(node,oturnot)){ //opponent turn
                //create new node
                newNode = matriztHelper.getNewmatriztAfterMove(node,move,oturnot);
                //recursive call
                int childScore = MM(newNode,turnot,depth-1,true);
                if(childScore < score) score = childScore;
            }
        }
        return score;
    }
