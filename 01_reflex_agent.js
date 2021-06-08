//201504399
//IA1
var copciones=0;
var Alimpio=false;
var Blimpio=false;
function reflex_agent(location, state){
   	if (state=="DIRTY") return "CLEAN";
   	else if (location=="A") return "RIGHT";
   	else if (location=="B") return "LEFT";
}

function test(states){
      	var location = states[0];		
      	var state = states[0] == "A" ? states[1] : states[2];
      	var action_result = reflex_agent(location, state);
		
      	document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
      	
		  if (action_result == "CLEAN"){
        	if (location == "A"){ 
				states[1] = "CLEAN";
		  	}
         	else if (location == "B"){
				states[2] = "CLEAN";
			 }

      	}
      	else if (action_result == "RIGHT") states[0] = "B";
      	else if (action_result == "LEFT") states[0] = "A";		
		
		
		if(states[1] =="CLEAN"&&states[2] =="CLEAN"){
			copciones++;
			if(copciones==8){
				document.getElementById("log").innerHTML+="<br> ======= Estado No. "+(1).toString()+" ======== ";
			}else {
				document.getElementById("log").innerHTML+="<br> ======= Estado No. "+(copciones+1).toString()+" ======== ";
			}
			
			switch (copciones) {
				case 0:
					states = ["A","DIRTY","DIRTY"];
					break;
				case 1:
					states = ["B","DIRTY","DIRTY"]
					break;
				case 2:
					states = ["A","DIRTY","CLEAN"]
					break;	
				case 3:
					states = ["B","DIRTY","CLEAN"]
					break;
				case 4:
					states = ["A","CLEAN","DIRTY"]
					break;
				case 5:
					states = ["B","CLEAN","DIRTY"]
					break;	
				case 6:
					states = ["A","CLEAN","CLEAN"]
					break;
				case 7:
					states = ["B","CLEAN","CLEAN"]
					break;	
				default:
					copciones=0;
					return;
	
				}
		}
	setTimeout(function(){test(states); }, 2000);
}

var states = ["A","DIRTY","DIRTY"];
document.getElementById("log").innerHTML+="<br> ======= Estado No. "+(copciones+1).toString()+" ======== ";
test(states);
