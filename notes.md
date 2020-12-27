# Cleaning process

This is the process I'm using to clean up the saved pages from Volo.
This seems to be a decent way to create a static site that is easy to host not
that the Volo service is sadly going offline.

## Remove interactive elements, just leave the content

```
document.querySelector(".sub-view-header-after")?.remove()
document.querySelector(".content-menu")?.remove()
document.querySelector(".sub-view-top-btn-container")?.remove()
document.querySelector(".more-travel")?.remove()
document.querySelector(".sub-view-guide-banner")?.remove()
document.querySelector(".sub-view-writer-info")?.remove()
document.querySelectorAll(".sub-view-comment-area").forEach(el => el?.remove())
document.querySelector(".sub-view-comment-header")?.remove()
document.querySelector(".sub-view-bottom-line")?.remove()
document.querySelector(".sub-view-bottom-action-area")?.remove()
```

## Delete all javascript

```
document.querySelector("#fb-root").remove()
document.querySelectorAll("script").forEach(el => el?.remove())
document.querySelectorAll("link").forEach(el => {
  el.getAttribute("href").includes(".js") && el.remove()
})
```

## The hero image is still hosted on Volo

This needs to be downloaded and the link replaced:

```
document.querySelector(".sub-view-bg").style.backgroundImage.slice(5, -2)
```

This url this returns can be downloaded in to the root like this:

```
wget http://....
mv .... background.jpg
```

Then the image in the pages can be replaced with this:

```
document.querySelector(".sub-view-bg").setAttribute("style", "background-image: url('background.jpg');")
```
