const fs = require("fs")
const { JSDOM } = require("jsdom")

const nav = `
<style>
  nav {
    display: flex;
    justify-content: center;
    font-size: large;
    border-bottom: 1px solid #e6e6e6;
    padding: 1rem;
    background-color: #fafafa;
  }
  nav > ul {
    list-style: none;
    display: flex;
    overflow-x: auto;
    padding: 0;
  }
  nav > ul > li {
    padding: 0.25rem 1rem;
  }
  nav > ul > li:not(:last-child) {
    border-right: 1px solid #e6e6e6;
  }
  nav > ul > li > a {
    color: inherit;
  }
  nav > ul > li > a:hover {
    text-decoration: underline;
  }
</style>
<nav>
  <ul class="nav-list">
    <li><a href="./day-01.htm">01</a></li>
    <li><a href="./day-02.htm">02</a></li>
    <li><a href="./day-03.htm">03</a></li>
    <li><a href="./day-04.htm">04</a></li>
    <li><a href="./day-05.htm">05</a></li>
    <li><a href="./day-06.htm">06</a></li>
    <li><a href="./day-07.htm">07</a></li>
    <li><a href="./day-08.htm">08</a></li>
    <li><a href="./day-09.htm">09</a></li>
    <li><a href="./day-10.htm">10</a></li>
  </ul>
</nav>
`

const trips = ["Adelaide", "Europe", "Japan", "Taiwan-Vietnam"]

const trip = "Japan"
const files = fs
  .readdirSync(trip)
  .filter(f => f.includes("htm"))
  .map(f => `${trip}/${f}`)

files.forEach(file => {
  const html = fs.readFileSync(file)
  const dom = new JSDOM(html)
  const { window } = dom
  const { document } = window

  // Add the nav
  document
    .querySelector(".sub-view-content")
    .insertAdjacentHTML("afterbegin", nav)

  fs.writeFileSync(file, dom.serialize())
})
