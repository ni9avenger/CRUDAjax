/**
 * all application script
 */

$(document).ready( function() {

    getData();


});

function getData(){
    $.ajax({
        type: "GET",
        url: "/CRUDApi/products",
        success: function(data){
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
