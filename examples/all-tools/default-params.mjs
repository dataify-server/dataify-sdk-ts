const today = new Date();

function dateOffset(days) {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function mmddyyyyOffset(days) {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

const COMMON = {
  q: "Dataify",
  json: "1",
  keyword: "coffee",
  keywords: "coffee",
  keyword_search: "popular music",
  query: "Dataify",
  text: "Dataify",
  domain: "https://www.amazon.com",
  country: "US",
  cc: "us",
  gl: "us",
  hl: "en",
  mkt: "en-US",
  setlang: "en",
  location: "New York",
  count: "5",
  maximum: "5",
  page_turning: "1",
  max_num: "5",
  max_search_results: "5",
  num_of_posts: "3",
  num_of_comments: "5",
  num_of_reviews: "10",
  load_replies: "1",
  comment_limit: "3",
  limit_records: "3",
  days_back: "10",
  days_limit: "20",
  sort_by: "Rising",
  sort_by_time: "Today",
  date: "All Time",
  highest_price: "50",
  lowest_price: "20",
  zip_code: "94107",
  all_variations: "false",
  get_sponsored: "true",
  collect_child_categories: "false",
  collect_subcategories: "false",
  brands: "Adidas",
  asin: "B0BZYCJK89",
  sku: "439179861",
  CID: "2476046430038551731",
  place_id: "ChIJ3S-JXmauEmsRUcIaWtf4MzE",
  lat: "38",
  long: "77",
  zoom_level: "20",
  "keywords-location": "South Bend",
  listingCategory: "For Rent",
  HomeType: "Houses",
  days_on_zillow: "Any",
  "Job title": "Data",
  industries: "Information Technology",
  company_name: "Tesla",
  state: "Alabama - 60 companies",
  industry: "Accounting & Tax",
  remote: "false",
  job_type: "Full-time",
  experience_level: "Entry level",
  time_range: "Past Month",
  selective_search: "false",
  jobs_to_not_include: "",
  location_radius: "25",
  comments_sort: "所有评论",
  get_all_replies: "True",
  load_all_replies: "false",
  upcoming_events_only: "false",
  profileurl: "https://www.instagram.com/cats_of_world_",
  username: "zoobarcelona",
  user_name: "elonmusk",
  posturl: "https://www.instagram.com/cats_of_instagram/reel/C4GLo_eLO2e/",
  start_date: mmddyyyyOffset(-30),
  end_date: mmddyyyyOffset(30),
  "start date": mmddyyyyOffset(-30),
  "end date": mmddyyyyOffset(0),
  posts_to_not_include: "DP861NijuwE",
  audio_format: "opus",
  bitrate: "<=320",
  kilohertz: "<=48000",
  resolution: "<=360p",
  video_codec: "vp9",
  subtitles_language: "en",
  subtitles_type: "auto_generated",
  selected_only: "false",
  is_subtitles: "false",
  video_id: "8RePenzQH80",
  hashtag: "shopping",
  order_by: "Latest",
  start_index: "1",
  upload_date: "上一小时",
  duration: "Under 3 minutes",
  type: "Video",
  features: "All",
  all_tabs: "true",
};

const URL_BY_METHOD = {
  airbnbProductBySearchurl: "https://www.airbnb.com/s/Greece/homes?query=Greece&refinement_paths%5B%5D=%2Fhomes",
  bookingHotellistByUrl: "https://www.booking.com/hotel/gb/westlands-of-pitlochry.en-gb.html#tab-main",
  crunchbaseCompanyByUrl: "https://www.crunchbase.com/organization/aisci",
  ebayEbayByCategoryUrl: "https://www.ebay.com/b/Collectible-Japanese-Bells-1900-Now/165467/bn_3104829",
  ebayEbayByListurl: "https://www.ebay.com/str/kptradingdeals",
  ebayEbayByUrl: "https://www.ebay.com/itm/296197468977",
  facebookProfileByProfilesUrl: "https://www.facebook.com/MayeMusk",
  facebookCommentByCommentsUrl: "https://www.facebook.com/share/p/1K6xfHFkrK/",
  facebookEventByEventlistUrl: "https://www.facebook.com/nohoclub/events",
  facebookEventBySearchUrl: "https://www.facebook.com/events/explore/us-atlanta/107991659233606",
  facebookPostByPostsUrl: "https://www.facebook.com/share/p/1K6xfHFkrK/",
  githubRepositoryByUrl: "https://github.com/TheAlgorithms/Python/blob/master/divide_and_conquer/power.py",
  glassdoorCompanyByListurl: "https://www.glassdoor.com/Explore/browse-companies.htm?filterType=RATING_OVERALL&locId=1347&locType=S&locName=Texas%252C%2520US&occ=Manager&page=1&overall_rating_low=1",
  glassdoorCompanyByUrl: "https://www.glassdoor.co.uk/Overview/Working-at-Apple-EI_IE1138.11,16.htm",
  glassdoorJoblistingsByListurl: "https://www.glassdoor.com/Job/new-york-data-analyst-jobs-SRCH_IL.0,8_IC1132348_KO9,21.htm",
  glassdoorJoblistingsByUrl: "https://www.glassdoor.com/Job/new-york-data-analyst-jobs-SRCH_IL.0,8_IC1132348_KO9,21.htm",
  googleCommentByUrl: "https://www.google.com/maps/place/Waterfront+Botanical+Gardens/@38.2630366,-85.7288454,15z/data=!4m8!3m7!1s0x8869731e16a7bdbd:0x2f5d238fefed7ca1!8m2!3d38.2632837!4d-85.7239738!9m1!1b1!16s%2Fg%2F11c709xzzx?hl=en&entry=ttu",
  googleMapDetailsByUrl: "https://www.google.com/maps/place/Pizza+Inn+Magdeburg/data=!4m7!3m6!1s0x47a5f50c083530a3:0xfdba8746b538141!8m2!3d52.1263086!4d11.6094743!16s%2Fg%2F11kqmtk3dt!19sChIJozA1CAz1pUcRQYFTa3So2w8?authuser=0&hl=en&rclk=1",
  indeedJobListingsByJobUrl: "https://fr.indeed.com/viewjob?jk=55b3e5dfa0c2ff66",
  insAllreelByUrl: "https://www.instagram.com/billieeilish",
  insReelByListurl: "https://www.instagram.com/espn",
  insReelByUrl: "https://www.instagram.com/reel/C5Rdyj_q7YN/",
  redditCommentByUrl: "https://www.reddit.com/r/datascience/comments/1cmnf0m/comment/l32204i/",
  redditPostsBySubredditurl: "https://www.reddit.com/r/datascience",
  redditPostsByUrl: "https://www.reddit.com/r/battlefield2042/comments/1cmqs1d/official_update_on_the_next_battlefield_game/",
  tiktokProfilesByUrl: "https://www.tiktok.com/@fofimdmell",
  tiktokCommentByUrl: "https://www.tiktok.com/@heymrcat/video/7216019547806092550",
  tiktokShopByUrl: "https://www.tiktok.com/shop/pdp/long-sleeve-crew-neck-tee-3-pack-by-galaxy-by-harvic-cotton-blend/1729461570693075200",
  tiktokPostsByListurl: "https://www.tiktok.com/discover/dog",
  twitterProfileByProfileurl: "https://x.com/elonmusk",
  twitterPostByProfileurl: "https://x.com/elonmusk",
  walmartProductByCategoryUrl: "https://www.walmart.com/shop/deals/food/",
  walmartProductByUrl: "https://www.walmart.com/ip/HI-CHEW-Stand-Up-Pouch-Getaway-Mix-11-65oz/12284762931",
  youtubeProfilesByUrl: "https://www.youtube.com/@mrbeast",
  youtubeVideoByUrl: "https://www.youtube.com/watch?v=_SdpvpvVrLY",
  youtubeAudioByUrl: "https://www.youtube.com/watch?v=_SdpvpvVrLY",
  youtubeVideoPostByExplore: "https://www.youtube.com/feed/storefront?bp=ogUCKAU%3D",
  youtubeVideoPostByPodcastUrl: "https://www.youtube.com/playlist?list=RDCLAK5uy_lS3E3PgpboCkZ_PfLPCkLLNPI1uH6kfc0",
  youtubeVideoPostByUrl: "https://www.youtube.com/@stephcurry/videos",
  linkedinCompanyInformationByUrl: "https://www.linkedin.com/company/dynamo-software",
  linkedinJobListingsInformationByJobListingUrl: "https://www.linkedin.com/jobs/reddit-inc.-jobs-worldwide?f_C=150573",
  linkedinJobListingsInformationByJobUrl: "https://www.linkedin.com/jobs/view/3900000000",
  amazonCommentByUrl: "https://www.amazon.com/dp/B0BZYCJK89",
  amazonProductByBestSellers: "https://www.amazon.com/Best-Sellers/zgbs",
  amazonProductByCategoryUrl: "https://www.amazon.com/s?i=electronics",
  amazonProductByUrl: "https://www.amazon.com/dp/B0BZYCJK89",
  amazonSellerByUrl: "https://www.amazon.com/sp?seller=A3ODHND3J0WMC8",
  amazonGlobalProductByCategoryUrl: "https://www.amazon.com/s?i=electronics",
  amazonGlobalProductByUrl: "https://www.amazon.com/dp/B0BZYCJK89",
};

const SPECIAL_BY_METHOD = {
  googleFlights: {
    departure_id: "JFK",
    arrival_id: "LAX",
    outbound_date: dateOffset(30),
    return_date: dateOffset(37),
    type: "1",
    currency: "USD",
  },
  googleHotels: {
    q: "New York hotels",
    check_in_date: dateOffset(30),
    check_out_date: dateOffset(32),
    adults: "1",
    currency: "USD",
  },
  googleLens: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Example.jpg/320px-Example.jpg",
    type: "all",
    country: "us",
    hl: "en",
  },
  googleFinance: { q: "NASDAQ:GOOG", window: "1D" },
  googleTrends: { q: "Dataify", data_type: "TIMESERIES", date: "today 1-m" },
  googleMaps: { q: "coffee near New York" },
  googleLocal: { q: "coffee", location: "New York" },
  googleJobs: { q: "software engineer", location: "New York" },
  googleScholar: { q: "machine learning" },
  googlePatents: { q: "coffee" },
  googleAiMode: { q: "what is Dataify" },
  googlePlay: { q: "LinkedIn" },
  bingMaps: { q: "coffee near New York" },
  yandex: { text: "Dataify", json: "1" },

  githubRepositoryByRepoUrl: { repo_url: "https://github.com/TheAlgorithms/Python" },
  githubRepositoryBySearchUrl: { search_url: "https://github.com/search?q=ML&type=repositories", max_num: "5", page_turning: "1" },
  glassdoorCompanyByKeywords: { search_url: "https://www.glassdoor.com/Search/results.htm?keyword=Apple", max_search_results: "5" },
  indeedCompaniesInfoByCompanyListUrl: { company_list_url: "https://www.indeed.com/companies/browse-companies" },
  indeedCompaniesInfoByCompanyUrl: { company_url: "https://www.indeed.com/cmp/Allstate-Insurance" },
  tiktokProfilesByListurl: { search_url: "https://www.tiktok.com/explore?lang=en", country: "us", page_turning: "1" },
  youtubeVideoPostBySearchFilters: { keyword_search: "popular music", features: "All", type: "Video", duration: "Under 3 minutes", upload_date: "上一小时", num_of_posts: "10" },
  zillowProductByFilter: { "keywords-location": "South Bend", listingCategory: "For Rent", HomeType: "Houses", days_on_zillow: "Any", maximum: "10" },
  linkedinJobListingsInformationByKeyword: { keyword: "product manager", location: "New York", page_turning: "1", remote: "false" },
  amazonProductListByKeywordsDomain: { domain: "https://www.amazon.com", keyword: "coffee", page_turning: "1" },
  amazonProductByAsin: { asin: "B0BZYCJK89" },
  chatgptAnswerByKeywords: { search_terms: "What is Dataify?" },
  chatgptAnswerByUrl: { chatgpt_url: "https://chatgpt.com/?q=What%20is%20Dataify" },
};

function urlFor(spec, param) {
  if (URL_BY_METHOD[spec.methodName]) return URL_BY_METHOD[spec.methodName];
  if (param === "category_url") return URL_BY_METHOD[spec.methodName] ?? "https://www.amazon.com/s?i=electronics";
  if (param === "app_url") return "https://play.google.com/store/apps/details?id=com.linkedin.android";
  if (param === "job_listing_url") return "https://www.linkedin.com/jobs/reddit-inc.-jobs-worldwide?f_C=150573";
  if (param === "job_url") return "https://www.linkedin.com/jobs/view/3900000000";
  if (param === "company_url") return "https://www.indeed.com/cmp/Allstate-Insurance";
  if (param === "company_list_url") return "https://www.indeed.com/companies/browse-companies";
  if (param === "repo_url") return "https://github.com/TheAlgorithms/Python";
  if (param === "search_url") return "https://github.com/search?q=ML&type=repositories";
  if (param === "profileurl") return COMMON.profileurl;
  if (param === "posturl") return COMMON.posturl;
  if (param === "searchurl") return URL_BY_METHOD.airbnbProductBySearchurl;
  return "https://example.com";
}

function defaultForParam(spec, param) {
  if (param === "url" || param.endsWith("_url") || param.endsWith("url")) return urlFor(spec, param);
  if (Object.prototype.hasOwnProperty.call(COMMON, param)) return COMMON[param];
  return "test";
}

export function buildDefaultParams(spec) {
  const params = {};
  for (const param of spec.params ?? []) {
    params[param] = defaultForParam(spec, param);
  }
  Object.assign(params, SPECIAL_BY_METHOD[spec.methodName] ?? {});

  if (spec.kind === "serp") {
    params.json ??= "1";
    if (!params.q && !params.text && !params.url && !params.departure_id && !params.check_in_date) {
      params.q = "Dataify";
    }
  }

  return params;
}