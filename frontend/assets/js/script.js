const fallbackProfile = {
  name: "TÌM PHÒNG HỘ",
  initials: "TPH",
  pageTitle: "TÌM PHÒNG HỘ · Cho thuê phòng",
  coverText: "Cho thuê phòng · Hà Nội",
  coverImage: "",
  avatarImage: "",
  stats: {
    rooms: "12",
    satisfaction: "98%",
  },
  links: [],
  about: [],
};

const icons = {
  camera:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  facebook:
    '<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  youtube:
    '<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>',
  chat:
    '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  phone:
    '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l1.19-1.19a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>',
};

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

const renderLinks = (links) => {
  const list = document.querySelector("[data-contact-links]");
  if (!list) return;

  list.innerHTML = links
    .map(
      (link) => `
        <a class="link-card" href="${link.url}" target="_blank" rel="noreferrer">
          <span class="link-icon tone-${link.tone || "green"}">${icons[link.icon] || icons.chat}</span>
          <span class="link-body">
            <strong>${link.name}</strong>
            <small>${link.description}</small>
          </span>
          <span class="arrow" aria-hidden="true">›</span>
        </a>
      `,
    )
    .join("");
};

const renderAbout = (items) => {
  const block = document.querySelector("[data-about]");
  if (!block) return;
  block.innerHTML = items.join("<br><br>");
};

const bindTabs = () => {
  document.querySelectorAll("[data-tab-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tabButton;

      document.querySelectorAll("[data-tab-button]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
        panel.classList.toggle("show", panel.dataset.tabPanel === tab);
      });
    });
  });
};

const renderProfile = (profile) => {
  const merged = { ...fallbackProfile, ...profile };

  document.title = merged.pageTitle || `${merged.name} · Cho thuê phòng`;
  setText("[data-name]", merged.name);
  setText("[data-initials]", merged.initials);
  setText("[data-cover-text]", merged.coverText);
  setText("[data-room-count]", merged.stats?.rooms || "0");
  setText("[data-satisfaction]", merged.stats?.satisfaction || "0%");

  const cameraIcon = document.querySelector("[data-camera-icon]");
  const checkIcon = document.querySelector("[data-check-icon]");
  const cover = document.querySelector("[data-cover]");
  const avatar = document.querySelector("[data-avatar]");
  if (cameraIcon) cameraIcon.innerHTML = icons.camera;
  if (checkIcon) checkIcon.innerHTML = icons.check;
  if (cover && merged.coverImage) {
    cover.style.backgroundImage = `linear-gradient(rgba(15, 110, 86, 0.14), rgba(15, 110, 86, 0.14)), url("${merged.coverImage}")`;
    cover.classList.add("has-image");
  }
  if (avatar && merged.avatarImage) {
    avatar.innerHTML = `<img src="${merged.avatarImage}" alt="${merged.name}" />`;
  }

  renderLinks(merged.links || []);
  renderAbout(merged.about || []);
};

fetch("./data/profile.json")
  .then((response) => {
    if (!response.ok) throw new Error("Cannot load profile.json");
    return response.json();
  })
  .then(renderProfile)
  .catch(() => renderProfile(fallbackProfile));

bindTabs();
