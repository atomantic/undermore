/*global DownloadBuilder*/

(function() {

    var $toggler = $('.toggle-all'),
        $jsDownload = $("#javascript-download"),
        $section = $toggler.closest('section'),
        $checkboxes = $section.find('input[type=checkbox]').not(":disabled"),
        $es6 = $('.es6-shim'),
        $inES6 = $checkboxes.filter('.in-es6-shim');

    $("a[href='#']").click(function(event) {
        event.preventDefault();
    });

    $es6.click(function() {
        $inES6.prop('checked', $(this).is(':checked') ? false : 'checked');
    });

    $toggler.click(function() {
        var on = $toggler.data('on');
        $checkboxes.prop('checked', on ? 'checked' : false);
        if (on) {
            $inES6.prop('checked', false);
        }
        $toggler.data('on', !on);
    });

    var builder = new DownloadBuilder({
        "location": "github",
        "author": "atomantic",
        "repo": "undermore",
        "branch": "dev",
        "onError": function(error) {
            $('#errorMessage').html(error).show();
        }
    });

    $("#javascript-generate").on("click", function() {
        builder.buildURL(
            $("#javascript-downloads input[type='checkbox']:checked"), "undermore.js", "javascript", function(data) {
                $("#generated-javascript-source").text(data.content);
                if (!data.content) {
                    $jsDownload.fadeOut("slow");
                }
                if (data.url) {
                    $jsDownload.attr("href", data.url).fadeIn("slow");

                }
            }
        );
    });
})();