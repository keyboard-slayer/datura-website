document.addEventListener("DOMContentLoaded", () => {
    fetch("https://daturastramoine.tumblr.com/api/read")
        .then(r => r.blob())
        .then(b => b.text())
        .then(function(rss) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(rss, "text/xml");

            const post = xmlDoc.getElementsByTagName("post")[0];
            const body = post?.querySelector("regular-body")?.textContent ?? "";

            const htmlDoc = parser.parseFromString(body, "text/html");
            const img = htmlDoc.querySelector("img");

            const title = htmlDoc.querySelector("h1")?.textContent.trim() ?? "";
            document.querySelector("#update-window").querySelector(".title-bar-text").innerText = title;

            const text = [...htmlDoc.querySelectorAll("p")]
                .map(p => p.textContent.trim())
                .filter(Boolean)
                .join("\n\n");


            const imageUrl = img?.getAttribute("src");
            document.getElementById("img-update").setAttribute("src", imageUrl);
            document.getElementById("text-update").innerText = text;
        });
});

