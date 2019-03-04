"use strict";

var isUserPT = navigator.language.toUpperCase().indexOf("PT") !== -1;

(function () {
    var location = window.location;
    if (location.protocol) {
        location.protocol === "http:" && (location.protocol = "https:");
    } else {
        location.href.replace("http:", "https:");
    }
    window.language = isUserPT ? "pt" : "en";
    document.getElementsByTagName("html")[0].setAttribute("lang", isUserPT ? "pt" : "en");
})();