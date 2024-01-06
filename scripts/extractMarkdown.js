// This script was setup up as a "snippet" in chrome, then run on each page
// to generate the filename and content for a MDX version of this page.
//
// It's not quite complete, but provided me with a bunch of "almost ready"
// markdown files for further processing. The main things missing are:
// * Components for the route cells
// * Relative paths for alternative image hosting
// * A better solution for the map cells

const capitalise = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

const convertDayCell = (cell) => {
  if (!cell.querySelector(".day-text")) return false;
  const title = capitalise(cell.querySelector(".day-text").innerText);
  const order = Number.parseInt(title.replaceAll(/[^\d*]/g, ""));
  const [year, monthNum, day] = cell
    .querySelector(".date-text")
    .innerText.split(".");
  const month =
    monthNum === "05" ? "May" : monthNum === "06" ? "June" : "XXXXXXXXX";

  return `---
title: ${title}
description: ""
featured: false
seriesId: 2018-europe
orderInSeries: ${order}
pubDate: "${month} ${day} 20${year}"
tags: []
---

import Grid from "../../../components/PhotoGrid.astro";
import Img from "../../../components/PhotoGridPhoto.astro";`;
};

const convertRouteCell = (cell) => {
  if (!cell.querySelector(".cell-route")) return false;
  return "```\n" + cell.innerText + "\n```";
};

const convertImageCell = (cell) => {
  if (!cell.querySelector(".cell-image")) return false;
  const imgs = Array.from(cell.querySelectorAll("img"))
    .map((i) => `  <Img src="${i.src}" />`) // TODO: Make this a relative URL
    .join("\n");
  return ["<Grid columns={2}>", imgs, "</Grid>\n", cell.innerText].join("\n");
};

const convertMapCell = (cell) => {
  if (!cell.querySelector(".cell-map")) return false;
  const img = cell.querySelector("img").src;
  const location = cell.innerText.trim().split("\n").join(" - ");
  return `![${location}](${img})`; // TODO: Make this a relative URL
};

const convertTextCell = (cell) => {
  if (!cell.querySelector(".cell-text")) return false;
  return cell.innerText;
};

(() => {
  console.clear();

  const allCells = $$(".travel-cell");

  const slug = window.location.pathname.split("/")[2].split(".")[0];
  const [year, month, day] = $(".travel-cell .day-cell")
    .querySelector(".date-text")
    .innerText.split(".");
  const filename = `20${year}-${month}-${day}-${slug}.mdx`;

  const content = allCells
    .map(
      (cell) =>
        convertDayCell(cell) ||
        convertRouteCell(cell) ||
        convertImageCell(cell) ||
        convertMapCell(cell) ||
        convertTextCell(cell) ||
        console.log(cell, "UNKNOWN CELL"),
    )
    .join("\n\n");

  copy(filename);
  alert("Filename copied! Want to copy the content now?");
  copy(content);
})();
