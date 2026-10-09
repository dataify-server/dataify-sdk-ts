import type { DataifyClient } from "../client.js";
import type { ParamRecord, ScraperRunOptions } from "../types.js";
import { TOOL_SPECS } from "./specs.js";

export class GeneratedToolsService {
  readonly specs = TOOL_SPECS;

  constructor(private readonly client: DataifyClient) {}

  airbnbProductBySearchurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "airbnb.com", ...options, spiderId: "airbnb_product_by-searchurl", parameters: params });
  }

  bookingHotellistByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "booking.com", ...options, spiderId: "booking_hotellist_by-url", parameters: params });
  }

  crunchbaseCompanyByKeywords<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "crunchbase.com", ...options, spiderId: "crunchbase_company_by-keywords", parameters: params });
  }

  crunchbaseCompanyByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "crunchbase.com", ...options, spiderId: "crunchbase_company_by-url", parameters: params });
  }

  ebayEbayByCategoryUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "ebay.com", ...options, spiderId: "ebay_ebay_by-category-url", parameters: params });
  }

  ebayEbayByKeywords<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "ebay.com", ...options, spiderId: "ebay_ebay_by-keywords", parameters: params });
  }

  ebayEbayByListurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "ebay.com", ...options, spiderId: "ebay_ebay_by-listurl", parameters: params });
  }

  ebayEbayByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "ebay.com", ...options, spiderId: "ebay_ebay_by-url", parameters: params });
  }

  facebookProfileByProfilesUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "facebook.com", ...options, spiderId: "facebook_profile_by-profiles-url", parameters: params });
  }

  facebookCommentByCommentsUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "facebook.com", ...options, spiderId: "facebook_comment_by-comments-url", parameters: params });
  }

  facebookEventByEventlistUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "facebook.com", ...options, spiderId: "facebook_event_by-eventlist-url", parameters: params });
  }

  facebookEventBySearchUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "facebook.com", ...options, spiderId: "facebook_event_by-search-url", parameters: params });
  }

  facebookPostByPostsUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "facebook.com", ...options, spiderId: "facebook_post_by-posts-url", parameters: params });
  }

  githubRepositoryByRepoUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "github.com", ...options, spiderId: "github_repository_by-repo-url", parameters: params });
  }

  githubRepositoryBySearchUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "github.com", ...options, spiderId: "github_repository_by-search-url", parameters: params });
  }

  githubRepositoryByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "github.com", ...options, spiderId: "github_repository_by-url", parameters: params });
  }

  glassdoorCompanyByInputfilter<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "glassdoor.com", ...options, spiderId: "glassdoor_company_by-inputfilter", parameters: params });
  }

  glassdoorCompanyByKeywords<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "glassdoor.com", ...options, spiderId: "glassdoor_company_by-keywords", parameters: params });
  }

  glassdoorCompanyByListurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "glassdoor.com", ...options, spiderId: "glassdoor_company_by-listurl", parameters: params });
  }

  glassdoorCompanyByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "glassdoor.com", ...options, spiderId: "glassdoor_company_by-url", parameters: params });
  }

  glassdoorJoblistingsByKeywords<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "glassdoor.com", ...options, spiderId: "glassdoor_joblistings_by-keywords", parameters: params });
  }

  glassdoorJoblistingsByListurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "glassdoor.com", ...options, spiderId: "glassdoor_joblistings_by-listurl", parameters: params });
  }

  glassdoorJoblistingsByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "glassdoor.com", ...options, spiderId: "glassdoor_joblistings_by-url", parameters: params });
  }

  googleCommentByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "google.com", ...options, spiderId: "google_comment_by-url", parameters: params });
  }

  googleMapDetailsByCid<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "google.com", ...options, spiderId: "google_map-details_by-cid", parameters: params });
  }

  googleMapDetailsByLocation<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "google.com", ...options, spiderId: "google_map-details_by-location", parameters: params });
  }

  googleMapDetailsByPlaceid<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "google.com", ...options, spiderId: "google_map-details_by-placeid", parameters: params });
  }

  googleMapDetailsByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "google.com", ...options, spiderId: "google_map-details_by-url", parameters: params });
  }

  googleShoppingByKeywords<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "google.com", ...options, spiderId: "google_shopping_by-keywords", parameters: params });
  }

  googlePlayStoreReviewsByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "play.google.com", ...options, spiderId: "google-play-store_reviews_by-url", parameters: params });
  }

  googlePlayStoreInformationByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "play.google.com", ...options, spiderId: "google-play-store_information_by-url", parameters: params });
  }

  indeedCompaniesInfoByCompanyListUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "indeed.com", ...options, spiderId: "indeed_companies-info_by-company-list-url", parameters: params });
  }

  indeedCompaniesInfoByCompanyUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "indeed.com", ...options, spiderId: "indeed_companies-info_by-company-url", parameters: params });
  }

  indeedCompaniesInfoByIndustryAndState<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "indeed.com", ...options, spiderId: "indeed_companies-info_by-industry-and-state", parameters: params });
  }

  indeedCompaniesInfoByKeyword<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "indeed.com", ...options, spiderId: "indeed_companies-info_by-keyword", parameters: params });
  }

  indeedJobListingsByJobUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "indeed.com", ...options, spiderId: "indeed_job-listings_by-job-url", parameters: params });
  }

  insAllreelByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "instagram.com", ...options, spiderId: "ins_allreel_by-url", parameters: params });
  }

  insReelByListurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "instagram.com", ...options, spiderId: "ins_reel_by-listurl", parameters: params });
  }

  insReelByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "instagram.com", ...options, spiderId: "ins_reel_by-url", parameters: params });
  }

  insProfilesByProfileurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "instagram.com", ...options, spiderId: "ins_profiles_by-profileurl", parameters: params });
  }

  insProfilesByUsername<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "instagram.com", ...options, spiderId: "ins_profiles_by-username", parameters: params });
  }

  insCommentByPosturl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "instagram.com", ...options, spiderId: "ins_comment_by-posturl", parameters: params });
  }

  redditCommentByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "reddit.com", ...options, spiderId: "reddit_comment_by-url", parameters: params });
  }

  redditPostsByKeywords<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "reddit.com", ...options, spiderId: "reddit_posts_by-keywords", parameters: params });
  }

  redditPostsBySubredditurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "reddit.com", ...options, spiderId: "reddit_posts_by-subredditurl", parameters: params });
  }

  redditPostsByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "reddit.com", ...options, spiderId: "reddit_posts_by-url", parameters: params });
  }

  tiktokProfilesByListurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "tiktok.com", ...options, spiderId: "tiktok_profiles_by-listurl", parameters: params });
  }

  tiktokProfilesByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "tiktok.com", ...options, spiderId: "tiktok_profiles_by-url", parameters: params });
  }

  tiktokCommentByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "tiktok.com", ...options, spiderId: "tiktok_comment_by-url", parameters: params });
  }

  tiktokShopByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "tiktok.com", ...options, spiderId: "tiktok_shop_by-url", parameters: params });
  }

  tiktokPostsByListurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "tiktok.com", ...options, spiderId: "tiktok_posts_by-listurl", parameters: params });
  }

  twitterProfileByProfileurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "x.com", ...options, spiderId: "twitter_profile_by-profileurl", parameters: params });
  }

  twitterProfileByUsername<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "x.com", ...options, spiderId: "twitter_profile_by-username", parameters: params });
  }

  twitterPostByProfileurl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "x.com", ...options, spiderId: "twitter_post_by-profileurl", parameters: params });
  }

  walmartProductByCategoryUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "walmart.com", ...options, spiderId: "walmart_product_by-category-url", parameters: params });
  }

  walmartProductByKeywords<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "walmart.com", ...options, spiderId: "walmart_product_by-keywords", parameters: params });
  }

  walmartProductBySku<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "walmart.com", ...options, spiderId: "walmart_product_by-sku", parameters: params });
  }

  walmartProductByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "walmart.com", ...options, spiderId: "walmart_product_by-url", parameters: params });
  }

  youtubeProfilesByKeyword<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_profiles_by-keyword", parameters: params });
  }

  youtubeProfilesByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_profiles_by-url", parameters: params });
  }

  youtubeCommentById<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_comment_by-id", parameters: params });
  }

  youtubeProductById<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_product_by-id", parameters: params });
  }

  youtubeVideoByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_video_by-url", parameters: params });
  }

  youtubeAudioByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_audio_by-url", parameters: params });
  }

  youtubeTranscriptById<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_transcript_by-id", parameters: params });
  }

  youtubeVideoPostByExplore<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_video-post_by-explore", parameters: params });
  }

  youtubeVideoPostByHashtag<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_video-post_by-hashtag", parameters: params });
  }

  youtubeVideoPostByKeyword<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_video-post_by-keyword", parameters: params });
  }

  youtubeVideoPostByPodcastUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_video-post_by-podcast-url", parameters: params });
  }

  youtubeVideoPostBySearchFilters<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_video-post_by-search-filters", parameters: params });
  }

  youtubeVideoPostByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "youtube.com", ...options, spiderId: "youtube_video-post_by-url", parameters: params });
  }

  zillowProductByFilter<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "zillow.com", ...options, spiderId: "zillow_product_by-filter", parameters: params });
  }

  linkedinCompanyInformationByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "linkedin.com", ...options, spiderId: "linkedin_company_information_by-url", parameters: params });
  }

  linkedinJobListingsInformationByJobListingUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "linkedin.com", ...options, spiderId: "linkedin_job_listings_information_by-job-listing-url", parameters: params });
  }

  linkedinJobListingsInformationByJobUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "linkedin.com", ...options, spiderId: "linkedin_job_listings_information_by-job-url", parameters: params });
  }

  linkedinJobListingsInformationByKeyword<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "linkedin.com", ...options, spiderId: "linkedin_job_listings_information_by-keyword", parameters: params });
  }

  amazonProductListByKeywordsDomain<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_product-list_by-keywords-domain", parameters: params });
  }

  amazonCommentByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_comment_by-url", parameters: params });
  }

  amazonProductByAsin<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_product_by-asin", parameters: params });
  }

  amazonProductByBestSellers<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_product_by-best-sellers", parameters: params });
  }

  amazonProductByCategoryUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_product_by-category-url", parameters: params });
  }

  amazonProductByKeywords<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_product_by-keywords", parameters: params });
  }

  amazonProductByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_product_by-url", parameters: params });
  }

  amazonSellerByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_seller_by-url", parameters: params });
  }

  amazonGlobalProductByCategoryUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_global-product_by-category-url", parameters: params });
  }

  amazonGlobalProductByKeywords<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_global-product_by-keywords", parameters: params });
  }

  amazonGlobalProductByKeywordsBrand<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_global-product_by-keywords-brand", parameters: params });
  }

  amazonGlobalProductByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "amazon.com", ...options, spiderId: "amazon_global-product_by-url", parameters: params });
  }

  chatgptAnswerByKeywords<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "chatgpt.com", ...options, spiderId: "chatgpt_answer_by-keywords", parameters: params });
  }

  chatgptAnswerByUrl<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ spiderName: "chatgpt.com", ...options, spiderId: "chatgpt_answer_by-url", parameters: params });
  }


  bing<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("bing", params);
  }


  bingImages<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("bing_images", params);
  }


  bingMaps<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("bing_maps", params);
  }


  bingNews<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("bing_news", params);
  }


  bingShopping<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("bing_shopping", params);
  }


  bingVideos<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("bing_videos", params);
  }


  duckduckgo<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("duckduckgo", params);
  }


  google<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google", params);
  }


  googleAiMode<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_ai_mode", params);
  }


  googleFinance<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_finance", params);
  }


  googleFlights<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_flights", params);
  }


  googleHotels<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_hotels", params);
  }


  googleImages<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_images", params);
  }


  googleJobs<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_jobs", params);
  }


  googleLens<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_lens", params);
  }


  googleLocal<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_local", params);
  }


  googleMaps<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_maps", params);
  }


  googleNews<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_news", params);
  }


  googlePatents<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_patents", params);
  }


  googlePlay<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_play", params);
  }


  googleScholar<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_scholar", params);
  }


  googleShopping<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_shopping", params);
  }


  googleTrends<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_trends", params);
  }


  googleVideos<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("google_videos", params);
  }


  /** 官网 getScraperList 返回 Yandex 产品，但 getSerpDetail 当前返回空；SDK 暂按 engine=yandex 生成便捷方法，调用前需后端确认该 engine 可用。 */
  yandex<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>("yandex", params);
  }
}
