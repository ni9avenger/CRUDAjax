/**
 * all application script
 */

$(document).ready( function() {

    getData();


    $("#pForm").on('submit',function(e){
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/CRUDApi/products",
            data: $("#pForm").serialize(), 
            success: function(res){
                $(".alert").addClass("alert-"+res.type)
                $("#msg").text(res.message);
                $(".alert").show();
                $("#pForm").trigger("reset");
                hideAlert();
            }
          });

          getData();
    });



});

function getData(){
    $.ajax({
        type: "GET",
        url: "/CRUDApi/products",
        success: function(data){
            $("#pData").html("");
            data.forEach(elm => {
                tr = $('<tr/>');
    
                $('<td/>', {
                    html: elm.name
                }).appendTo(tr);
    
                $('<td/>', {
                    html: elm.price
                }).appendTo(tr);
    
                $('<td/>', {
                    html: elm.description
                }).appendTo(tr);
                
                td = $('<td/>');
                $('<button/>', {
                    'type' : 'button',
                    'class' : 'btn btn-sm btn-primary',
                    html: 'Update'
                }).appendTo(td);
    
                $('<button/>', {
                    'type' : 'button',
                    'class' : 'btn btn-sm btn-danger',
                    html: 'Delete'
                }).appendTo(td);

                td.appendTo(tr);
    
                tr.appendTo("#pData");
            });

        }
      });
}

function hideAlert(){
    $(".alert").fadeTo(2000, 500).slideUp(500, function(){
        $(".alert").slideUp(500);
    });
}