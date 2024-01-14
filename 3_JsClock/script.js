function showTime(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var d = date.getDate();
    var mn = date.getMonth() + 1;
    var y = date.getFullYear();
    var tt = "AM";
    if(h ==0) h = 12;

    if(h > 12){
        h = h-12;
        tt ="PM"
    }
    h =(h<10) ? '0' + h:h;
    m = (m<10)? '0' + m:m;
    s = (s<10)?'0'+s:s;
    var time = h + ":" +m + ":" +s + " " + tt;
    var date = d + "/" + mn + "/" + y;
    // document.getElementById("clock").innerText =time;
    document.getElementById("clock").textContent =time;
    document.getElementById("date").textContent =date;

    setInterval(() => {
        showTime();
    }, 1000);
}

showTime();