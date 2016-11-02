window.onload = function(){
  var dist=400;
  var grid=4;
  var puzzlearea = document.getElementById("puzzlearea");
  var divs = document.getElementById("puzzlearea").getElementsByTagName("div");
  var shuffle = document.getElementById("shufflebutton");


  function align(x){
    var t = document.getElementById("puzzlearea");
    for (var i = 0; i <x;i++){
      var row=document.createElement("div");
      row.puzzlepiece="row";
      for(var y =1; y<=x;y++){
        var cell = document.createElement("div");
        cell.className = "puzzlepiece";
        cell.innerText = (i*x)+y;
        row.appendChild(cell);
      }
      t.appendChild(row)
    }
    document.getElementById("puzzlearea").innerElement = t.innerHTML;
  }
  //align(4);

  function setup(grid){

    var row=0;
    var col=0;
    var i=0;
    for (;row<grid*grid;row++){
      divs[row+col*i].style.left=(row*dist/grid).toString() + "px";
      console.log(row+col*i+" div num");
      console.log(row*dist/grid+" leftoffset")
      if (row+col*i%grid==0){
        divs[row+col*i].style.top=(col*dist/grid).toString() + "px";
        console.log(row+col*i+" div num iff");
        console.log(row*dist/grid+" leftoffset iff")
        col++
        i++;

      }
    }
  }
  //setup(grid);

  function start(){
    for (i = 0;i<grid*grid-1;i++){
    divs[i].setAttribute("class","puzzlearea puzzlepiece");
      }
    var tile = document.createElement("div");
    tile.className = "puzzlearea puzzlepiece";
    tile.innerHTML = "16";
    puzzlearea.appendChild(tile);

    for(row=1;row<=grid;row++){
      for(col=0;col<grid;col++){
        id=row+grid*col;
        divs[id-1].style.left= ((row-1)*dist/grid) + "px";
        divs[id-1].style.top= + col*(dist/grid) + "px";
        //console.log(((row-1)*dist/grid) + "px "+ col*(dist/grid) + "px");
        //divs[id-1].style.backgroundPosition = ((row-1)*dist/grid)-(row*dist/grid) + "px "+ (col*(dist/grid)) + "px";
        //divs[id-1].style.backgroundPosition = 100*((row-1)*dist/grid)/dist+"% " +100*col*(dist/grid)/dist+"%";
        // console.log(100*((row-1)*dist/grid)/dist+"% " +100*col*(dist/grid)/dist+"% "+id);

        }
      }
    divs[15].style.backgroundImage="none";
    divs[15].id="free";

  }
  start();
  var freespace=divs[15];//document.getElementById("free");
  var check=false;
  function valid(){
    //  console.log((this).offsetTop+" this "+(this).offsetLeft);
    //  console.log(freespace.offsetTop+" free "+freespace.offsetLeft);
    // console.log(freespace.offsetTop==(this).offsetTop || freespace.offsetLeft==(this).offsetLeft);
    // console.log(freespace.offsetTop==(this).offsetTop+100 || freespace.offsetLeft==(this).offsetLeft+100 ||freespace.offsetTop==(this).offsetTop-100 || freespace.offsetLeft==(this).offsetLeft-100);

      for(var i=0; i< grid*grid-1; i++) {

       divs[i].onmouseover=function(j){
         check=false;
         if (freespace.offsetTop==j.target.offsetTop || freespace.offsetLeft==j.target.offsetLeft){
           if(freespace.offsetTop==j.target.offsetTop+100 || freespace.offsetLeft==j.target.offsetLeft+100 ||freespace.offsetTop==j.target.offsetTop-100 || freespace.offsetLeft==j.target.offsetLeft-100){
         j.target.setAttribute("class","movablepiece puzzlepiece");
         check=true;
             };
           }
         }
         divs[i].onmouseleave=function(j){
           j.target.setAttribute("class","puzzlepiece");
         };
 }
}
  function shift(){
    for(var i=0; i< grid*grid-1; i++) {
     divs[i].addEventListener("click", bindClick(i));
    }
    valid();
     function bindClick(i) {
        return function(){
                 //console.log("Div index number " + (i));
                 //console.log(freespace);
                 //divs[15]=(this);
                 //divs[i].style.top="100px";
                 //divs[i].style.left="100px";
                 for(row=1;row<=grid;row++){
                   for(col=0;col<grid;col++){
                     //console.log("Column: "+row+" Row: "+col);
                     //console.log(row+grid*col);
                   }
                 }
                 //document.getElementById('free').style.top;
                 var tempTop;
                 var tempLeft;
                 if (check){
                   tempTop=freespace.offsetTop+"px";
                   tempLeft=freespace.offsetLeft+"px";
                   freespace.style.left=(this).offsetLeft+"px";
                   freespace.style.top=(this).offsetTop+"px";
                   (this).style.left=tempLeft;
                   (this).style.top=tempTop;
                   //(this).style.left=(this).offsetLeft+100+"px";
                  }
            }
          }
    }
   shift();
   function movable(bool){
     if (bool){
       for(var i=0; i< grid*grid-1; i++) {
        divs[i].onmouseover=function(j){
          j.target.setAttribute("class","movablepiece puzzlepiece");
        };
        divs[i].onmouseleave=function(j){
          j.target.setAttribute("class","puzzlepiece");
        };
       }
     }
   }
   //movable(true);


   shuffle.onclick=function(i){
     for (count=0;count<1000;count++){
         divs[Math.floor((Math.random() * 15) + 0)].click();
     }
   }

}
