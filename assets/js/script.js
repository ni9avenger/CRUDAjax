/**
 * all application script
 */

$(document).ready( function() {

    getData();

    $("#pForm").on('submit',function(e){
        e.preventDefault();
        edit = $("#pId").val();
        if( edit == ""){
            $.ajax({
                type: "POST",
                url: "/CRUDApi/products",
                data: $("#pForm").serialize(), 
                success: function(res){
                    $(".alert").removeClass().addClass("alert alert-"+res.type)
                    $("#msg").text(res.message);
                    $(".alert").show();
                    $("#btnReset").trigger("click");
                    hideAlert();
                    getData();
                }
            });
        }else{
            $.ajax({
                type: "PUT",
                url: "/CRUDApi/products",
                data: $("#pForm").serialize(), 
                success: function(res){
                    $(".alert").removeClass().addClass("alert alert-"+res.type)
                    $("#msg").text(res.message);
                    $(".alert").show();
                    $("#btnReset").trigger("click");
                    hideAlert();
                    getData();
                }
            });
        }
    });

    $("#btnReset").on('click',function(){
        $("#btnSubmit").text("Add");
        $("#pId").val("");
    });

});

function getData(){
    $.ajax({
        type: "GET",
        cache: false,
        url: "/CRUDApi/products",
        success: function(data){
            $("#pData").html("");

            if(data.length == 0){
                tr = $('<tr/>');
                $('<td/>', {
                    colspan: 4,
                    class: "text-center h4",
                    html: "No Records Preset"
                }).appendTo(tr);
                tr.appendTo("#pData");                
            }

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
                    html: 'Edit'
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
    if( typeof edit !== typeof undefined && edit !== false){
        $.ajax({
            type: "GET",
            url: "/CRUDApi/products/"+edit,
            success: function(data){
                single = data[0];
                $("#pForm").attr("data-edit",single.id);
                $("#pId").val($.trim(single.id));
                $("#pName").val($.trim(single.name));
                $("#pPrice").val(single.price);
                $("#pDescription").val($.trim(single.description));
                $("#btnSubmit").text("Update");
            }
        }); 
    }
}