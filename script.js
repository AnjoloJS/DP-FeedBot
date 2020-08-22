// ==UserScript==
// @name         Digimon Pets - Feed Bot
// @namespace    https://github.com/AnjoloJS/DP-FeedBot
// @version      0.1
// @description  Simple WebHook discord bot for Digimon Pets Online world's feed
// @author       AnjoloJS
// @match        https://digimonpets.com.br/sobre
// @match        https://digimonpets.com.br/usuario_cadastro
// @match        https://digimonpets.com.br/usuario_entrar
// @match        https://digimonpets.com.br/inicio
// @grant        none
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/AnjoloJS/DP-FeedBot/master/script.js
// @updateURL    https://raw.githubusercontent.com/AnjoloJS/DP-FeedBot/master/script.js
// ==/UserScript==

(function() {
    'use strict';
    document.title = "#DP - Feed Bot"

    function sendToDiscord(content) {
        if (content != null) {
            var whurl = "WEBHOOK URL HERE" //webhook url from the specific channel

            var message = {
                "username": "ReporterMon", //discord bot's name
                "avatar_url": "https://pbs.twimg.com/media/EA7GdaVUwAEXVF3.jpg", //discord bot avatar's url
                "content": content
            }

            fetch(whurl + "?wait=true", {
                "method":"POST",
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify(message)
            })
        }
    }

    setTimeout(function(){
        var lastDigiFeed = sessionStorage.getItem('lastDigiFeed'); //get last stored feed
        var feed = document.querySelector("#newsbar > div > marquee > b").innerText
        if(lastDigiFeed != feed) { //ignore repeated feeds
            sessionStorage.setItem('lastDigiFeed', feed) //also store last feed, and keep after refresh page
            if (feed.includes('Black Trader')) feed = `@here - **[TRADER]** ` + feed //feed about Trader, use mention @here
            sendToDiscord(feed)
        }
    }, 5000);

    setTimeout(function(){ location.reload(); }, 6000);
})();
