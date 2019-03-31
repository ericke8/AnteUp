$(document).ready(function() {
    let discription = getQueryVariable('category');
    $('#category').text(discription);
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:3000/get-list?category=" + discription,
        success: function(result) {
            console.log(result);
            result.forEach(function(bet) {
                let redirectParam =  '`' + discription + '`, `' + bet + '`';
                console.log(redirectParam);
                $('#bet-list').append('<div class="border flex"><h2>' + bet + '</h2><button onclick="redirect('+ redirectParam + ');">BET</button> </div><br>');
            });
        }
    });
});


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1].replace("%20", " ");}
    }
    return(false);
}

function redirect(category, event) {
    document.location.href = '/bet?category=' + category + '&event=' + event;
}