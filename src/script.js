
$(document).ready(function(){

  $(".headphone").bind('click', function() {
    /*.... (OR)
     * Load a player, without displaying it. The player is hidden
     */

    var trackId = $(this).attr("data-track");

    DZ.init({
      appId  : '123703',
      channelUrl : 'http://localhost/moke/channel.html',
      player : {
        onload : function(){
          DZ.player.playTracks([trackId])
        }
      }
    });
  });
  $("#sendMoke").bind('click', function() {
    var id, i = 0;
    $("#toMoke li input").each(function() {
      if($(this).prop('checked')) {

        if(i == 0) {
          id = $(this).attr("name");
          i++;
        }
        else
          id += ","+$(this).attr("name");

      }
    })

    window.location = "?sendmoke=true&friend="+id+"#mokesent";
  })
  /*
  jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
      return function( elem ) {
          return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
      };
  });*/
var accent_map = {
      'á':'a',
      'à':'a',
      'â':'a',
      'å':'a',
      'ä':'a',
      'a':'a',
      'ã':'a',
      'ç':'c',
      'é':'e',
      'è':'e',
      'ê':'e',
      'ë':'e',
      'í':'i',
      'ì':'i',
      'î':'i',
      'ï':'i',
      'ñ':'n',
      'ó':'o',
      'ò':'o',
      'ô':'o',
      'ö':'o',
      'õ':'o',
      'ú':'u',
      'ù':'u',
      'û':'u',
      'ü':'u',};
 
 
      String.prototype.replaceEspecialChars = function() {
        var ret = '', s = this.toString();
        if (!s) { return ''; }
        for (var i=0; i<s.length; i++) {
          ret += accent_map[s.charAt(i)] || s.charAt(i);
        }
        return ret;
      };
 
      String.prototype.contains = function(otherString) {
        return this.toString().indexOf(otherString) !== -1;
      };
 
 
      $.extend($.expr[':'], {
 
        'contains-IgnoreAccents' : function(elemt, idx, math) {
          
          var expression1 = math[3].toLowerCase(),
            semAcent1 = expression1.replaceEspecialChars(),
            expression2 = elemt.innerHTML.toLowerCase(),
            semAcent2 = expression2.replaceEspecialChars();
 
          return semAcent2.contains(semAcent1);       
        }
    });
  $("#filter").bind('keyup', function(e){
    var filter = $(this).val();

    $("#toMoke").find("li:contains-IgnoreAccents(" + filter + ")").show();
    $("#toMoke").find("li:not(li:contains-IgnoreAccents(" + filter + "))").hide();
  })
  if(window.location.href.indexOf("mokesent") > -1){

    var title = new Array();
    var artist = new Array();
    var cover = new Array();
    $(".random").each(function(){
      title.push($(this).attr("data-title"));
      artist.push($(this).attr("data-artist"));
      cover.push($(this).attr("data-cover"));
    });

    var target = $("#random");
    var target_cover = $("#random_cover");
    var selected = $(".random.selected").attr("data-i");
    var i = 0;
    var j = 0;
    var size = title.length;
    var content;

    target.fadeOut();
    target_cover.fadeOut();

    var loop = setInterval(function(){
    
      j = Math.round(Math.random()*1000)
      j = j % (size-1);

      console.log(j);

      content = artist[j] + "<br/>" + title[j];
      content_cover = "<img class='cover' src='"+cover[j]+"'/>";

      target.html(content);
      target_cover.html(content_cover);

      target.fadeIn(500).fadeOut(500);
      target_cover.fadeIn(500).fadeOut(500);

      i++;

      if(i >= size || i >= 8){
        clearInterval(loop);

        content = "<span style='color:#e67e22'>"+artist[selected] + "<br/>" + title[selected]+"</span>";
        content_cover = "<img class='cover' src='"+cover[selected]+"'/>";
        target.html(content);
        target_cover.html(content_cover);

        target.fadeIn();
        target_cover.fadeIn();

        setTimeout(function(){
          window.location = "index.php";
        },5000);
      }

    }, 1000);

  }
})