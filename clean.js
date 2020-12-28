const fs = require("fs")
const { JSDOM } = require("jsdom")

const trips = ["Adelaide", "Europe", "Japan", "Taiwan-Vietnam"]

const files = trips.flatMap(trip =>
  fs
    .readdirSync(trip)
    .filter(f => f.includes("htm"))
    .map(f => `${trip}/${f}`)
)

files.forEach(file => {
  const html = fs.readFileSync(file)
  const dom = new JSDOM(html)
  const { window } = dom
  const { document } = window

  // Hack UI
  document.querySelector(".sub-view-header-after")?.remove()
  document.querySelector(".content-menu")?.remove()
  document.querySelector(".content-menu-fixed")?.remove()
  document.querySelector(".sub-view-top-btn-container")?.remove()
  document.querySelector(".more-travel")?.remove()
  document.querySelector(".sub-view-guide-banner")?.remove()
  document.querySelector(".sub-view-writer-info")?.remove()
  document.querySelector(".sub-view-comment-header")?.remove()
  document.querySelector(".sub-view-bottom-line")?.remove()
  document.querySelector(".sub-view-bottom-action-area")?.remove()
  document
    .querySelectorAll(".sub-view-comment-area")
    .forEach(el => el?.remove())

  // Remove JS and Volo stuff that will likely disappear
  document.querySelector("#fb-root")?.remove()
  document.querySelectorAll("script").forEach(el => el?.remove())
  document.querySelectorAll("link").forEach(el => {
    const href = el.getAttribute("href")
    if (
      href.includes(".js") ||
      href.includes("withvolo") ||
      href.includes("jienem")
    )
      el.remove()
  })

  // Set the background image to the manually downloaded one
  document
    .querySelector(".sub-view-bg")
    .setAttribute("style", "background-image: url('background.jpg');")

  fs.writeFileSync(file, dom.serialize())
})
