/*global DownloadBuilder*/

(function() {

    var $toggler = $('.toggle-all'),
        $jsDownload = $("#javascript-download"),
        $section = $toggler.closest('section'),
        $checkboxes_all = $section.find('input[type=checkbox]'),
        $checkboxes = $checkboxes_all.not(":disabled"),
        $docs = $('#docsframe');

    $("a[href='#']").click(function(event) {
        event.preventDefault();
    });

    $('.complete').click(function() {
        var $t = $(this),
            $myPartials = $t.closest('.set').find('.partial');
        $myPartials.prop('checked', !$t.is(':checked'));
    });
    $('.partial').click(function() {
        var $t = $(this),
            $set = $t.closest('.set'),
            $wraps = $set.find('.wrap'),
            $active_partials = $set.find('.partial').not('.join,.wrap').filter(':checked'),
            num_active = $active_partials.length,
            hasWrapper = $wraps.length;

        if ($t.is(':checked')) {
            // remove complete set from being checked
            $set.find('.complete').prop('checked', false);
        }
        if (hasWrapper) {
            // if we have any currently active partials, include the wrapper
            // else uncheck it
            $wraps.prop('checked', $active_partials.length);
            // reset all joiners to unchecked
            $set.find('.join').prop('checked', false);
            // make sure only the joiners that belong to partials are checked
            // and make sure the last partial has no joiner checked
            $active_partials.each(function(i) {
                // check all but the last:
                $(this).parent().find('.join').prop('checked', (i + 1) !== num_active);
            });
        }
    });

    $toggler.click(function() {
        var on = $toggler.data('on');
        $checkboxes.prop('checked', on);
        if (on) {
            $checkboxes_all.filter('.partial').prop('checked', false);
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

    $docs.css({height:$docs.contents().height()+'px'});

})();