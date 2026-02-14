class AbbExtension {
  public main() {
    console.log("abb: starting...");
    const torrentInfo = this.getTorrentInfo();
    console.log("abb:", torrentInfo);
    if (torrentInfo) {
      this.addCustomButton(torrentInfo.magnetLink);
    }
  }

  private getTorrentInfo() {
    const torrentTable = document.querySelector("table.torrent_infos");
    if (!torrentTable) {
      console.warn("abb: Could not find torrent table");
      return null;
    }

    const title = document.querySelector("div.postTitle")?.textContent;
    if (!title) {
      console.warn("abb: Could not find title");
      return null;
    }

    const tdElements = torrentTable.querySelectorAll("td");
    const links: string[] = [];
    let infoHash = "";

    for (let i = 0; i < tdElements.length; i++) {
      const td = tdElements[i];
      if (td.textContent?.trim() === "Info Hash:") {
        infoHash = tdElements[i + 1]?.textContent?.trim() || "";
        continue;
      }

      const textNodes = Array.from(td.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE,
      );

      textNodes.forEach((node) => {
        const text = node.textContent || "";
        const matches = text.match(/(https?:\/\/|udp:\/\/)[^\s]+/g);
        if (matches) {
          links.push(...matches);
        }
      });
    }

    if (!links.length) {
      console.warn("abb: Could not find any links");
      return null;
    }

    if (!infoHash) {
      console.warn("abb: Could not find info hash");
      return null;
    }

    const magnetLink = this.createMagnetLink(infoHash, links, title);

    console.log(magnetLink, infoHash, links, title);

    return {
      title,
      magnetLink,
    };
  }

  private createMagnetLink(
    infoHash: string,
    trackers: string[],
    title: string,
  ) {
    let magnetLink = `magnet:?xt=urn:btih:${infoHash}`;
    trackers.forEach((tracker) => {
      magnetLink += `&tr=${encodeURIComponent(tracker)}`;
    });

    if (title) {
      magnetLink += `&dn=${encodeURIComponent(title)}`;
    }

    return magnetLink;
  }

  private addCustomButton(magnetLink: string) {
    const postTitle = document.querySelector("div.postTitle");
    if (postTitle) {
      const existingButton = document.getElementById("abb-custom-button");
      if (existingButton) {
        existingButton.remove();
      }

      const button = document.createElement("button");

      button.id = "abb-custom-button";

      // Add shadcn-like styling
      button.style.display = "inline-flex";
      button.style.alignItems = "center";
      button.style.justifyContent = "center";
      button.style.borderRadius = "6px";
      button.style.fontSize = "14px";
      button.style.fontWeight = "500";
      button.style.padding = "8px 16px";
      button.style.backgroundColor = "hsl(0 0% 9%)";
      button.style.color = "hsl(0 0% 98%)";
      button.style.border = "1px solid hsl(0 0% 14.5%)";
      button.style.cursor = "pointer";
      button.style.transition = "background-color 0.2s, border-color 0.2s";

      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "hsl(0 0% 14.5%)";
        button.style.borderColor = "hsl(0 0% 18.5%)";
      });
      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "hsl(0 0% 9%)";
        button.style.borderColor = "hsl(0 0% 14.5%)";
      });

      const icon = document.createElement("img");
      icon.src =
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hZ25ldCI+PHBhdGggZD0ibTYgMTUtNC00IDYuNzUtNi43N2E3Ljc5IDcuNzkgMCAwIDEgMTEgMTFMMTMgMjJsLTQtNCA2LjM5LTYuMzZhMi4xNCAyLjE0IDAgMCAwLTMtM0w2IDE1Ii8+PHBhdGggZD0ibTUgOCA0IDQiLz48cGF0aCBkPSJtMTIgMTUgNCA0Ii8+PC9zdmc+";
      icon.style.marginRight = "8px";
      icon.style.verticalAlign = "middle";
      icon.style.filter = "invert(1)";
      icon.width = 16;
      icon.height = 16;

      button.appendChild(icon);
      button.appendChild(document.createTextNode("Copy Magnet Link"));

      postTitle.insertAdjacentElement("afterend", button);

      button.addEventListener("click", () => {
        navigator.clipboard.writeText(magnetLink);
        button.textContent = "Copied!";
      });
    }
  }
}

const app = new AbbExtension();
app.main();
