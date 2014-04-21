/*global DownloadBuilder*/

(function(){

	var $toggler = $('.toggle-all'),
		$jsDownload = $("#javascript-download");


	$("a[href='#']").click(function(event) {
        event.preventDefault();
    });

	$toggler.click(function(){
		var on = $toggler.data('on');
		$toggler.closest('section').find('input[type=checkbox]').not(":disabled").prop('checked', on ? 'checked' : false);
		$toggler.data('on',!on);
	});

    var builder = new DownloadBuilder({ 
      "location": "github", 
      "author": "atomantic", 
      "repo": "undermore",
      "branch": "master",
      "onError": function(error){
          $('#errorMessage').html(error).show();
      }
    });

    $("#javascript-generate").on("click", function() {
        builder.buildURL(
        	$("#javascript-downloads input[type='checkbox']:checked"), "undermore.js", "javascript", function(data) {
            $("#generated-javascript-source").text(data.content);
            if(!data.content) {
                $jsDownload.fadeOut("slow");
            }
            if(data.url) {
                $jsDownload.attr("href", data.url).fadeIn("slow");

            }
        });
    });
})();