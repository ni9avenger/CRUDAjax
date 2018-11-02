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
                $(".alert").removeClass().addClass("alert alert-"+res.type)
                $("#msg").text(res.message);
                $(".alert").show();
                $("#pForm").trigger("reset");
                hideAlert();
                getData();
            }
        });
    });

});

function getData(){
    $.ajax({
        type: "GET",
        cache: false,
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
                    'data-edit': elm.id,
                    'onClick': 'performAction(this)',
                    html: 'Update'
                }).appendTo(td);
    
                $('<button/>', {
                    'type' : 'button',
                    'class' : 'btn btn-sm btn-danger',
                    'data-del': elm.id,
                    'onClick': 'performAction(this)',
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

function performAction(el){
    elm = $(el);
    console.log(elm.attr("data-del"));
    del = elm.attr("data-del");
    edit = elm.attr("data-edit");
    if( typeof del !== typeof undefined && del !== false){
        $.ajax({
            type: "DELETE",
            url: "/CRUDApi/products/"+del,
            success: function(res){
                $(".alert").removeClass().addClass("alert alert-"+res.type)
                $("#msg").text(res.message);
                $(".alert").show();
                hideAlert();
                getData();
            }
        }); 
    }
}