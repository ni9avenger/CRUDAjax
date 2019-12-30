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
                    notifyUser("Success",res.message,res.type)
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
                    notifyUser("Success",res.message,res.type)
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
                    html: "No Records Present"
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
                $('<span/>',{class: 'glyphicon glyphicon-pencil'}).appendTo(
                $('<button/>', {
                    'type' : 'button',
                    'class' : 'btn btn-sm btn-primary',
                    'data-edit': elm.id,
                    'onClick': 'performAction(this)'
                }).appendTo(td));

                
                $('<span/>',{class: 'glyphicon glyphicon-trash'}).appendTo(
                $('<button/>', {
                    'type' : 'button',
                    'class' : 'btn btn-sm btn-danger',
                    'data-del': elm.id,
                    'onClick': 'performAction(this)'
                }).appendTo(td));

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
                notifyUser("Success",res.message,res.type)
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


function notifyUser(title,msg,type){
    $.notify({
        // options
        icon: 'glyphicon glyphicon-check',
        title: title,
        message: msg,
    },{
        // settings
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: true,
        showProgressbar: false,  
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 2000,
        timer: 1000,
        mouse_over: null,
        animate: {
            enter: 'animated fadeInUp',
            exit: 'animated fadeOutUp'
        },
        onShow: null,
	    onShown: null,
	    onClose: null,
	    onClosed: null,
        icon_type: 'class',
        template: 
        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> <br>' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
        '</div>' 
    });
}