const listings = [
  {
    id: 1,
    title: "海まで徒歩7分の平屋",
    region: "九州",
    location: "長崎県平戸市",
    purpose: "二拠点",
    priceManYen: 1280,
    area: 92,
    renovation: "light",
    stationMinutes: 18,
    image:
      "https://images.unsplash.com/photo-1600585154356-596af9009e82?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "雪景色に映える古民家",
    region: "東北",
    location: "秋田県仙北市",
    purpose: "古民家再生",
    priceManYen: 790,
    area: 146,
    renovation: "heavy",
    stationMinutes: 32,
    image:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "商店街沿いの町家",
    region: "近畿",
    location: "京都府福知山市",
    purpose: "事業",
    priceManYen: 1850,
    area: 118,
    renovation: "medium",
    stationMinutes: 9,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "温泉地近くの庭付き住宅",
    region: "中部",
    location: "長野県下高井郡",
    purpose: "移住",
    priceManYen: 1640,
    area: 104,
    renovation: "light",
    stationMinutes: 25,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "利回り重視の戸建て",
    region: "関東",
    location: "茨城県日立市",
    purpose: "投資",
    priceManYen: 950,
    area: 84,
    renovation: "medium",
    stationMinutes: 13,
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "瀬戸内ビューのリトリート",
    region: "四国",
    location: "香川県小豆郡",
    purpose: "二拠点",
    priceManYen: 2100,
    area: 128,
    renovation: "light",
    stationMinutes: 28,
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 7,
    title: "港町の小さな古家",
    region: "中国",
    location: "広島県呉市",
    purpose: "移住",
    priceManYen: 620,
    area: 68,
    renovation: "heavy",
    stationMinutes: 16,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 8,
    title: "牧草地に囲まれた住宅",
    region: "北海道",
    location: "北海道上川郡",
    purpose: "移住",
    priceManYen: 1380,
    area: 136,
    renovation: "medium",
    stationMinutes: 35,
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80"
  }
];

const listingGrid = document.querySelector("#listing-grid");
const cardTemplate = document.querySelector("#listing-card-template");
const resultCount = document.querySelector("#result-count");
const searchForm = document.querySelector("#search-form");
const purposeFilter = document.querySelector("#purpose-filter");
const matcherForm = document.querySelector("#matcher-form");
const matchResults = document.querySelector("#match-results");

let activePurpose = "all";
let activeKeyword = "";
let activeRegion = "all";

const renovationScale = {
  light: 1,
  medium: 2,
  heavy: 3
};

function renderListings(data) {
  listingGrid.innerHTML = "";

  if (!data.length) {
    listingGrid.innerHTML = "<p>条件に合う空き家は見つかりませんでした。</p>";
    resultCount.textContent = "0件";
    return;
  }

  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const clone = cardTemplate.content.cloneNode(true);
    const image = clone.querySelector("img");
    const title = clone.querySelector("h3");
    const badge = clone.querySelector(".badge");
    const location = clone.querySelector(".location");
    const meta = clone.querySelector(".meta");
    const price = clone.querySelector(".price");

    image.src = item.image;
    image.alt = `${item.location}の空き家「${item.title}」`;
    title.textContent = item.title;
    badge.textContent = item.purpose;
    location.textContent = item.location;
    meta.textContent = `${item.area}㎡ | 駅まで徒歩${item.stationMinutes}分 | リノベ: ${toRenovationLabel(
      item.renovation
    )}`;
    price.textContent = `${item.priceManYen.toLocaleString("ja-JP")}万円`;

    fragment.appendChild(clone);
  });

  listingGrid.appendChild(fragment);
  resultCount.textContent = `${data.length}件を表示中`;
}

function toRenovationLabel(level) {
  if (level === "heavy") return "大規模";
  if (level === "medium") return "中規模";
  return "軽微";
}

function applyFilter() {
  const keyword = activeKeyword.trim().toLowerCase();

  const filtered = listings.filter((item) => {
    const byPurpose = activePurpose === "all" || item.purpose === activePurpose;
    const byRegion = activeRegion === "all" || item.region === activeRegion;
    const byKeyword =
      keyword.length === 0 ||
      `${item.title} ${item.location} ${item.purpose}`.toLowerCase().includes(keyword);

    return byPurpose && byRegion && byKeyword;
  });

  renderListings(filtered);
}

function setActivePurpose(button) {
  purposeFilter.querySelectorAll(".pill").forEach((pill) => {
    const active = pill === button;
    pill.classList.toggle("is-active", active);
    pill.setAttribute("aria-selected", String(active));
  });
}

function calculateScore(item, preferences) {
  let score = 0;

  if (preferences.region === "all" || item.region === preferences.region) {
    score += 35;
  }

  if (item.priceManYen <= preferences.maxBudget) {
    score += 30;
  } else {
    score -= Math.min(20, Math.floor((item.priceManYen - preferences.maxBudget) / 100));
  }

  if (item.area >= preferences.minArea) {
    score += 20;
  }

  if (renovationScale[item.renovation] <= renovationScale[preferences.renovation]) {
    score += 10;
  }

  if (item.purpose === preferences.purpose) {
    score += 15;
  }

  return score;
}

function renderMatchSuggestions(preferences) {
  const scored = listings
    .map((item) => ({
      item,
      score: calculateScore(item, preferences)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  matchResults.innerHTML = "";

  scored.forEach(({ item, score }) => {
    const row = document.createElement("article");
    row.className = "match-item";

    const title = document.createElement("strong");
    title.textContent = `${item.title} (${score}点)`;

    const meta = document.createElement("span");
    meta.textContent = `${item.location} | ${item.priceManYen.toLocaleString("ja-JP")}万円 | ${item.area}㎡`;

    row.append(title, meta);
    matchResults.appendChild(row);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(searchForm);
  activeKeyword = String(formData.get("keyword") || "");
  activeRegion = String(formData.get("region") || "all");
  applyFilter();
});

purposeFilter.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const purpose = target.dataset.purpose;
  if (!purpose) {
    return;
  }

  activePurpose = purpose;
  setActivePurpose(target);
  applyFilter();
});

matcherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(matcherForm);

  const preferences = {
    region: String(formData.get("pref-region") || "all"),
    maxBudget: Number(formData.get("max-budget") || 2500),
    minArea: Number(formData.get("min-area") || 80),
    renovation: String(formData.get("renovation") || "light"),
    purpose: String(formData.get("purpose") || "移住")
  };

  renderMatchSuggestions(preferences);
});

renderListings(listings);
renderMatchSuggestions({
  region: "all",
  maxBudget: 2500,
  minArea: 80,
  renovation: "medium",
  purpose: "移住"
});
