jQuery('docment').ready(function () {
//jQuery(".lightbox").lightbox();

jQuery('.accord ul li:has(ul)').addClass('expand');
jQuery('.accord ul li:not(:has(ul))').addClass('nocat-img');
jQuery('.accord ul li.expand>.ace-li-inner').before('<i>+</i>');
jQuery('.ace-quick-edit').on('click', function () {
    jQuery('ul.ace-cat li .ace-li-inner').removeClass('showform');
    jQuery(this).closest('.ace-li-inner').addClass('showform');
});




jQuery(document).on('click', '.ace-form-close', function () {
    jQuery('ul.ace-cat li .ace-li-inner').removeClass('showform');
    jQuery('ul.ace-cat li .ace-li-inner .quick_edit_form').empty();
});

jQuery('#ace_expand').on('click', function () {
    jQuery('#Accord ul').show();
    jQuery('.accord ul li:has(ul)').addClass('expand');
    jQuery('.accord ul li').addClass('collapse');

    jQuery('.accord ul li').removeClass('expand');
    jQuery('li.expand i').text('-');
});

jQuery('#ace_collapse').on('click', function () {
    jQuery('#Accord ul.sub').hide();
        // jQuery('.accord ul li:has(ul)').addClass('collapse');
        jQuery('.accord ul li').addClass('expand');
        jQuery('.accord ul li').removeClass('collapse');
        //jQuery('li.expand i').text('+');   
    });

jQuery('ul.ace-cat  li:even').addClass('even');
jQuery('ul.ace-cat  li:odd').addClass('odd');
    // jQuery('ul.ace-cat ul li:even').addClass('even');
    //  jQuery ('ul.ace-cat ul li:odd').addClass('odd');

    // Add 'expand' class to 'li' tags having 'ul' tag inside them and initially hiding content 
    jQuery('.accord ul li:has(ul)').addClass('expand').find('ul').hide();
    // Add '<span>[ + ]</span>' after anchor inside 'li' tags those have 'expand' class
    //jQuery('.accord ul li.expand>.ace-links-parent').before('<i>+</i>');

    // Change [ - ] with [ + ] and  'collapse' class with 'expand' and sliding content upward
    jQuery('.accord ul').on('click', 'li.collapse i ', function (e) {
        jQuery(this).text('+').parent().addClass('expand').removeClass('collapse').find('>.ace-li-inner>ul').slideUp();
        e.stopImmediatePropagation();
    });

    // Change [ + ] with [ - ] and 'expand' class with 'collapse' class and sliding content downward
    jQuery('.accord ul').on('click', 'li.expand i', function (e) {
        jQuery(this).text('-').parent().addClass('collapse').removeClass('expand').find('>.ace-li-inner>ul').slideDown();
        e.stopImmediatePropagation();
    });

    // Preventing rest of handlers from being execute
    jQuery('.accord ul').on('click', 'li.collapse li:not(.collapse)', function (e) {
        e.stopImmediatePropagation();
    });

//jQuery(function() {
    var startX;
    var startY;
    var stopX;
    var stopY;
    jQuery("#contentLeft ul").sortable({
        opacity: 0.8,
        cursor: 'move',
        appendTo: 'parent',
        placeholder: 'placeholder',
        connectWith: 'ul.ui-sortable',
        forceHelperSize: true,
        forcePlaceholderSize: true,
        start: function( event, ui ) {
         startX = event.clientX;
         startY = event.clientY;
     },
     stop: function( event, ui ) {
       /* stopX = event.clientX;
        stopY = event.clientY;

        if((Math.abs(startX - stopX) > 50  )  && Math.abs(startY - stopY) < 20 ) {
            var paren  =jQuery(this).prev().attr('id');
            console.log(jQuery(this));
            alert(paren);
            var order = jQuery(this).sortable("serialize") + '&action=wcdc_updateCategory&p=' + paren;
            jQuery.post(wcdc_ajaxScript.ajax_url, order, function (theResponse) {
                alert(1);     
            });
        } */ 
    },
    update: function () {
        var paren = jQuery(this).attr('parent');
        var order = jQuery(this).sortable("serialize") + '&action=wcdc_updateCategory&p=' + paren;
        jQuery.post(wcdc_ajaxScript.ajax_url, order, function (theResponse) {
                //jQuery("#contentRight").html(theResponse);			
            });

    }
});
    //});

});
function deleteli(id) {
    if (confirm('Are you sure?')) {
        jQuery('#recordsArray_' + id).addClass('deleteli');
        setTimeout(function () {
            jQuery('.deleteli').hide('slow');
        }, 3000);
        jQuery.ajax({
            type: 'POST',
            data: "delId=" + id + "&action=wcdc_deleteCategory",
            url: wcdc_ajaxScript.ajax_url,
            success: function (d) {
                error();
                jQuery('.notifyjs-corner').css('top',30);
            }
        })
    }

}