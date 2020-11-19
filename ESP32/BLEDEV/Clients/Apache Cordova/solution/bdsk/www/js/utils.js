showMessage = function(msg_text)
{
    showMessage(msg_text,0);
};

showMessage = function(msg_text,level)
{
    console.log("showMessage: "+msg_text);
    var message = document.getElementById('message');
  	message.innerHTML = msg_text;
    switch (level) {
        // OK - green
        case 0: message.style.color = "#00FF00";
        break;
        // Warning - amber
        case 1: message.style.color = "#ffbf00";
        break;
        // Error - red
        case 2: message.style.color = "#ff0000";
        break;
    }
};

showInfo = function(msg_text)
{
    showInfo(msg_text,0);
};

showInfo = function(msg_text,level)
{
    console.log("showInfo: "+msg_text);
    var info = document.getElementById('info');
  	info.innerHTML = msg_text;
    switch (level) {
        // OK - green
        case 0: info.style.color = "#00FF00";
        break;
        // Warning - amber
        case 1: info.style.color = "#ffbf00";
        break;
        // Error - red
        case 2: info.style.color = "#ff0000";
        break;
    }
    if (info_hidden == true) {
        info_hidden = false;
        document.getElementById('info').hidden = info_hidden;
    }
};

displayConnectionStatus = function() {
    if (connected) {
        showInfo("connected",0);
    } else {
        showInfo("disconnected",2);
    }
}

