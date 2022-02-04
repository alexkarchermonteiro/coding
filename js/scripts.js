
function searchItems(trending)
{

  var ul = document.getElementById("gifsUL");
  ul.innerHTML = "";

  var httpReq = new XMLHttpRequest();

  if(trending == null)
  {
    var searchWord = document.getElementById('searchBar').value;
    httpReq.open("GET", "https://api.gfycat.com/v1/gfycats/search?search_text=" + searchWord, false);
  }
  else
  {
    trendingTags();
    httpReq.open("GET", "https://api.gfycat.com/v1/gfycats/trending", false);
  }

  httpReq.onreadystatechange = callbackFunction(httpReq);

  httpReq.send();


  var jsonData = JSON.parse(httpReq.responseText);

  for (var i = 0; i < jsonData.gfycats.length; i++) {
      var gif = jsonData.gfycats[i];
      var li = document.createElement("li");
      li.className = "images";
      var img = document.createElement("img");
      img.className = "imageClass";
      img.src = gif.max2mbGif;
      li.appendChild(img);
      ul.appendChild(li);
  }
}

function trendingTags()
{
  if(token == null)
    var token = getToken();
  

  var ul = document.getElementById("gifsUL");
  var httpReq = new XMLHttpRequest();

  httpReq.open("GET", "https://api.gfycat.com/v1/tags/trending", false);

  httpReq.setRequestHeader("Authorization", "Bearer " + token); 

  httpReq.onreadystatechange = callbackFunction(httpReq);
  httpReq.send();

  var trendTags = httpReq.responseText.replace('\[', '').replace('\]');
  
  var li = document.createElement("li");
  li.appendChild(document.createTextNode("Trending tags: " + trendTags));
  ul.appendChild(li);
  
}

    function getToken()
    {
      
        var xmlhttp = new XMLHttpRequest();
        var username = "2_0XhGWw";
        var secret = "M5-fDKzr9iR8-T4PD8n9v_bsaRrGCbjOpR5xXs896WCQyk-0cfmgEjxqQZJDqzXD";

        xmlhttp.open("POST", "https://api.gfycat.com/v1/oauth/token", false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        var payload = '\{\n\"grant_type\"\:\"client_credentials\"\,\n\"client_id\"\:\"'+ username + '\"\,\n\"client_secret\"\:\"'+ secret + '\"\n\}';

        xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
        xmlhttp.send(payload);

        var token = JSON.parse(xmlhttp.responseText)["access_token"];

        document.getElementById("login").innerHTML = token;
        return token;
      }

    function callbackFunction(xmlhttp) 
    {
        //alert(xmlhttp.responseXML);
    }
