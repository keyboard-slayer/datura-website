document.addEventListener("DOMContentLoaded", () => {
    const titleBar = document.querySelector("#update-window .title-bar-text");
    const image = document.getElementById("img-update");
    const text = document.getElementById("text-update");
    const script = document.createElement("script");

    text.innerText = "Loading update…";

    const showError = () => {
        clearTimeout(timeout);
        text.innerText = "Unable to load the update. Please refresh to try again.";
        script.remove();
    };
    const timeout = setTimeout(showError, 10000);

    window.daturaUpdateLoaded = data => {
        clearTimeout(timeout);
        const post = data.posts?.[0];
        if (!post) {
            text.innerText = "No updates yet.";
            return;
        }

        const htmlDoc = new DOMParser().parseFromString(post["regular-body"] ?? "", "text/html");
        titleBar.innerText = htmlDoc.querySelector("h1")?.textContent.trim() ||
            post["regular-title"] || "Updates";
        text.innerText = [...htmlDoc.querySelectorAll("p")]
            .map(p => p.textContent.trim())
            .filter(Boolean)
            .join("\n\n");

        const imageUrl = htmlDoc.querySelector("img")?.getAttribute("src");
        if (imageUrl) image.src = imageUrl;
    };

    script.src = "https://daturastramoine.tumblr.com/api/read/json?num=1&callback=daturaUpdateLoaded";
    script.async = true;
    script.onerror = showError;
    script.onload = () => script.remove();
    document.head.append(script);
});
