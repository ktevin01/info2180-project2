window.onload = function(){
  var dist=400;
  var grid=4;
  var puzzlearea = document.getElementById("puzzlearea");
  var divs = document.getElementById("puzzlearea").getElementsByTagName("div");
  var shuffle = document.getElementById("shufflebutton");

  function start(){
    for (i = 0;i<grid*grid-1;i++){
    divs[i].setAttribute("class","puzzlearea puzzlepiece");
      }
    var tile = document.createElement("div");
    tile.className = "puzzlearea puzzlepiece";
    //tile.innerHTML = "16";
    puzzlearea.appendChild(tile);
    var piece = document.createElement("div");

    for(row=1;row<=grid;row++){
      for(col=0;col<grid;col++){
        id=row+grid*col;
        divs[id-1].style.left= ((row-1)*dist/grid) + "px";
        divs[id-1].style.top= + col*(dist/grid) + "px";
        divs[id-1].style.backgroundPosition= ((row-1)*-100)+"px "+((col*-100))+"px";
        }
      }
    divs[15].style.backgroundImage="none";
    divs[15].id="free";

  }
  start();

  var freespace=divs[15];//document.getElementById("free");
  var check=false;
  function valid(){
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
         divs[i].addEventListener("mouseleave",function(j){
           j.target.setAttribute("class","puzzlepiece");
         });

 }
}
  function shift(){
    for(var i=0; i< grid*grid-1; i++) {
     divs[i].addEventListener("click", bindClick(i));
    }
    valid();
     function bindClick(i) {
        return function(){
                // console.log((this));
                 var tempTop;
                 var tempLeft;
                 if (check){
                   tempTop=freespace.offsetTop+"px";
                   tempLeft=freespace.offsetLeft+"px";
                   freespace.style.left=(this).offsetLeft+"px";
                   freespace.style.top=(this).offsetTop+"px";
                   (this).style.left=tempLeft;
                   (this).style.top=tempTop;
                  }
            }
          }
    }
   shift();


   shuffle.onclick=function(){
     for (count=0;count<250;count++){
       num=Math.floor((Math.random() * 15));
       //console.log(num);
       divs[num].click();
     }
   }
}
