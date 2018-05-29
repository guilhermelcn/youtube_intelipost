function concatenar(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // preparando o request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 5,
            order: "viewCount",
       }); 
       // executando o request
       request.execute(function(response) {
        var resultados = response.result;
          $("#resultados").html("");
          $.each(resultados.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#resultados").append(concatenar(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]
            ));
            
            });
          });;
       });
       
    });

});

// iniciando a api do youtube
function init() {
    gapi.client.setApiKey("AIzaSyB4ViA3iUFqn3PUsIHKxbptwym9gn1KBX8");
    gapi.client.load("youtube", "v3", function() {
        
    });
}
