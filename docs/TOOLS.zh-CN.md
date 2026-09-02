# Dataify SDK 工具清单

本清单只对应 npm 包 `dataify-sdk` 当前发布范围：API Key 认证的采集运行接口。


## 发布范围

当前 SDK 只保留以下能力：

- Scraper 采集工具：统一提交到 `https://scraperapi.dataify.com/builder?platform=1`
- SERP 搜索工具：统一提交到 `https://scraperapi.dataify.com/request`
- Web Unlocker：提交到 `https://webunlocker.dataify.com/request`
- Scraper 任务结果下载：`https://scraperapi.dataify.com/download`

这些接口使用 Dataify API Key。`/builder`、`/request` 和 Web Unlocker 使用 Bearer Header；任务结果下载和任务状态查询使用接口规定的 `api_key` 查询参数。

```text
Authorization: Bearer <api_key>
```

## 统计

| 项目 | 数量 |
|---|---:|
| Scraper 工具 | 88 |
| SERP 工具 | 25 |
| SDK 工具方法合计 | 113 |

## 固定运行方法

| SDK 方法 | 运行入口 | 认证 | 说明 |
|---|---|---|---|
| `client.scraper.runScraperTool(options)` | `POST https://scraperapi.dataify.com/builder?platform=1` | Bearer API Key | 通用 Scraper 提交入口 |
| `client.serp.run(options)` | `POST https://scraperapi.dataify.com/request` | Bearer API Key | 通用 SERP 提交入口 |
| `client.webUnlocker.request(params)` | `POST https://webunlocker.dataify.com/request` | Bearer API Key | Web Unlocker 入口 |
| `client.scraper.downloadTaskResult(taskId)` | `GET https://scraperapi.dataify.com/download?type=json` | API Key query | 下载 JSON 结果 |
| `client.scraper.downloadTaskFile(taskId, type)` | `GET https://scraperapi.dataify.com/download` | API Key query | 下载 json/csv/xlsx 文件响应 |
| `client.scraper.buildDownloadUrl(taskId, type)` | 本地生成 URL | API Key query | 只生成下载链接，不发起请求 |
| `client.scraper.getTaskStatus(taskId)` | `GET https://scraperapi.dataify.com/task_status` | API Key query | 查询任务状态：处理中、成功、失败；HTTP 400 表示任务不存在或无权限，HTTP 403 表示缺参数或 API Key 无效 |

## Scraper 工具

所有 Scraper 便捷方法都通过 `client.tools.<methodName>(params)` 调用，底层共用 `/builder?platform=1`。

| # | SDK 方法 | spider_id | 产品 | spider_name | 参数 |
|---:|---|---|---|---|---|
| 1 | `airbnbProductBySearchurl` | `airbnb_product_by-searchurl` | Airbnb | `airbnb.com` | country, searchurl |
| 2 | `bookingHotellistByUrl` | `booking_hotellist_by-url` | Booking | `booking.com` | url |
| 3 | `crunchbaseCompanyByKeywords` | `crunchbase_company_by-keywords` | Crunchbase | `crunchbase.com` | keyword |
| 4 | `crunchbaseCompanyByUrl` | `crunchbase_company_by-url` | Crunchbase | `crunchbase.com` | url |
| 5 | `ebayEbayByCategoryUrl` | `ebay_ebay_by-category-url` | eBay | `ebay.com` | count, url |
| 6 | `ebayEbayByKeywords` | `ebay_ebay_by-keywords` | eBay | `ebay.com` | count, keywords |
| 7 | `ebayEbayByListurl` | `ebay_ebay_by-listurl` | eBay | `ebay.com` | count, url |
| 8 | `ebayEbayByUrl` | `ebay_ebay_by-url` | eBay | `ebay.com` | url |
| 9 | `facebookProfileByProfilesUrl` | `facebook_profile_by-profiles-url` | Facebook | `facebook.com` | url |
| 10 | `facebookCommentByCommentsUrl` | `facebook_comment_by-comments-url` | Facebook | `facebook.com` | comments_sort, limit_records, get_all_replies, url |
| 11 | `facebookEventByEventlistUrl` | `facebook_event_by-eventlist-url` | Facebook | `facebook.com` | upcoming_events_only, url |
| 12 | `facebookEventBySearchUrl` | `facebook_event_by-search-url` | Facebook | `facebook.com` | url |
| 13 | `facebookPostByPostsUrl` | `facebook_post_by-posts-url` | Facebook | `facebook.com` | url |
| 14 | `githubRepositoryByRepoUrl` | `github_repository_by-repo-url` | Github | `github.com` | repo_url |
| 15 | `githubRepositoryBySearchUrl` | `github_repository_by-search-url` | Github | `github.com` | max_num, page_turning, search_url |
| 16 | `githubRepositoryByUrl` | `github_repository_by-url` | Github | `github.com` | url |
| 17 | `glassdoorCompanyByInputfilter` | `glassdoor_company_by-inputfilter` | Glassdoor | `glassdoor.com` | Job title, industries, location, company_name |
| 18 | `glassdoorCompanyByKeywords` | `glassdoor_company_by-keywords` | Glassdoor | `glassdoor.com` | max_search_results, search_url |
| 19 | `glassdoorCompanyByListurl` | `glassdoor_company_by-listurl` | Glassdoor | `glassdoor.com` | url |
| 20 | `glassdoorCompanyByUrl` | `glassdoor_company_by-url` | Glassdoor | `glassdoor.com` | url |
| 21 | `glassdoorJoblistingsByKeywords` | `glassdoor_joblistings_by-keywords` | Glassdoor | `glassdoor.com` | country, location, keyword |
| 22 | `glassdoorJoblistingsByListurl` | `glassdoor_joblistings_by-listurl` | Glassdoor | `glassdoor.com` | url |
| 23 | `glassdoorJoblistingsByUrl` | `glassdoor_joblistings_by-url` | Glassdoor | `glassdoor.com` | url |
| 24 | `googleCommentByUrl` | `google_comment_by-url` | Google | `google.com` | days_limit, url |
| 25 | `googleMapDetailsByCid` | `google_map-details_by-cid` | Google | `google.com` | CID |
| 26 | `googleMapDetailsByLocation` | `google_map-details_by-location` | Google | `google.com` | zoom_level, long, lat, maximum, keyword, country |
| 27 | `googleMapDetailsByPlaceid` | `google_map-details_by-placeid` | Google | `google.com` | place_id |
| 28 | `googleMapDetailsByUrl` | `google_map-details_by-url` | Google | `google.com` | url |
| 29 | `googleShoppingByKeywords` | `google_shopping_by-keywords` | Google | `google.com` | country, keyword |
| 30 | `googlePlayStoreReviewsByUrl` | `google-play-store_reviews_by-url` | Google Play Store | `play.google.com` | country, end date, start date, num_of_reviews, app_url |
| 31 | `googlePlayStoreInformationByUrl` | `google-play-store_information_by-url` | Google Play Store | `play.google.com` | country, app_url |
| 32 | `indeedCompaniesInfoByCompanyListUrl` | `indeed_companies-info_by-company-list-url` | Indeed | `indeed.com` | company_list_url |
| 33 | `indeedCompaniesInfoByCompanyUrl` | `indeed_companies-info_by-company-url` | Indeed | `indeed.com` | company_url |
| 34 | `indeedCompaniesInfoByIndustryAndState` | `indeed_companies-info_by-industry-and-state` | Indeed | `indeed.com` | state, industry |
| 35 | `indeedCompaniesInfoByKeyword` | `indeed_companies-info_by-keyword` | Indeed | `indeed.com` | keyword |
| 36 | `indeedJobListingsByJobUrl` | `indeed_job-listings_by-job-url` | Indeed | `indeed.com` | job_url |
| 37 | `insAllreelByUrl` | `ins_allreel_by-url` | Instagram | `instagram.com` | end_date, start_date, posts_to_not_include, num_of_posts, url |
| 38 | `insReelByListurl` | `ins_reel_by-listurl` | Instagram | `instagram.com` | end_date, start_date, posts_to_not_include, num_of_posts, url |
| 39 | `insReelByUrl` | `ins_reel_by-url` | Instagram | `instagram.com` | url |
| 40 | `insProfilesByProfileurl` | `ins_profiles_by-profileurl` | Instagram | `instagram.com` | profileurl |
| 41 | `insProfilesByUsername` | `ins_profiles_by-username` | Instagram | `instagram.com` | username |
| 42 | `insCommentByPosturl` | `ins_comment_by-posturl` | Instagram | `instagram.com` | posturl |
| 43 | `redditCommentByUrl` | `reddit_comment_by-url` | Reddit | `reddit.com` | comment_limit, load_all_replies, days_back, url |
| 44 | `redditPostsByKeywords` | `reddit_posts_by-keywords` | Reddit | `reddit.com` | sort_by, num_of_posts, date, keyword |
| 45 | `redditPostsBySubredditurl` | `reddit_posts_by-subredditurl` | Reddit | `reddit.com` | sort_by_time, num_of_posts, sort_by, url |
| 46 | `redditPostsByUrl` | `reddit_posts_by-url` | Reddit | `reddit.com` | url |
| 47 | `tiktokProfilesByListurl` | `tiktok_profiles_by-listurl` | Tiktok | `tiktok.com` | page_turning, country, search_url |
| 48 | `tiktokProfilesByUrl` | `tiktok_profiles_by-url` | Tiktok | `tiktok.com` | country, url |
| 49 | `tiktokCommentByUrl` | `tiktok_comment_by-url` | Tiktok | `tiktok.com` | page_turning, url |
| 50 | `tiktokShopByUrl` | `tiktok_shop_by-url` | Tiktok | `tiktok.com` | url |
| 51 | `tiktokPostsByListurl` | `tiktok_posts_by-listurl` | Tiktok | `tiktok.com` | num_of_posts, url |
| 52 | `twitterProfileByProfileurl` | `twitter_profile_by-profileurl` | Twitter | `x.com` | url |
| 53 | `twitterProfileByUsername` | `twitter_profile_by-username` | Twitter | `x.com` | user_name |
| 54 | `twitterPostByProfileurl` | `twitter_post_by-profileurl` | Twitter | `x.com` | max_number_of_posts, url |
| 55 | `walmartProductByCategoryUrl` | `walmart_product_by-category-url` | Walmart | `walmart.com` | page_turning, all_variations, category_url |
| 56 | `walmartProductByKeywords` | `walmart_product_by-keywords` | Walmart | `walmart.com` | page_turning, keyword, all_variations, domain |
| 57 | `walmartProductBySku` | `walmart_product_by-sku` | Walmart | `walmart.com` | all_variations, sku |
| 58 | `walmartProductByUrl` | `walmart_product_by-url` | Walmart | `walmart.com` | all_variations, url |
| 59 | `youtubeProfilesByKeyword` | `youtube_profiles_by-keyword` | YouTube | `youtube.com` | page_turning, keyword |
| 60 | `youtubeProfilesByUrl` | `youtube_profiles_by-url` | YouTube | `youtube.com` | url |
| 61 | `youtubeCommentById` | `youtube_comment_by-id` | YouTube | `youtube.com` | num_of_comments, sort_by, load_replies, video_id |
| 62 | `youtubeProductById` | `youtube_product_by-id` | YouTube | `youtube.com` | video_id, subtitles_language, subtitles_type, selected_only |
| 63 | `youtubeVideoByUrl` | `youtube_video_by-url` | YouTube | `youtube.com` | url, resolution, video_codec, audio_format, bitrate, subtitles_language, selected_only |
| 64 | `youtubeAudioByUrl` | `youtube_audio_by-url` | YouTube | `youtube.com` | url, bitrate, audio_format, subtitles_language, kilohertz, is_subtitles, selected_only |
| 65 | `youtubeTranscriptById` | `youtube_transcript_by-id` | YouTube | `youtube.com` | video_id, subtitles_language, subtitles_type, selected_only |
| 66 | `youtubeVideoPostByExplore` | `youtube_video-post_by-explore` | YouTube | `youtube.com` | all_tabs, url |
| 67 | `youtubeVideoPostByHashtag` | `youtube_video-post_by-hashtag` | YouTube | `youtube.com` | num_of_posts, hashtag |
| 68 | `youtubeVideoPostByKeyword` | `youtube_video-post_by-keyword` | YouTube | `youtube.com` | keyword, num_of_posts |
| 69 | `youtubeVideoPostByPodcastUrl` | `youtube_video-post_by-podcast-url` | YouTube | `youtube.com` | num_of_posts, url |
| 70 | `youtubeVideoPostBySearchFilters` | `youtube_video-post_by-search-filters` | YouTube | `youtube.com` | num_of_posts, upload_date, duration, type, features, keyword_search |
| 71 | `youtubeVideoPostByUrl` | `youtube_video-post_by-url` | YouTube | `youtube.com` | num_of_posts, start_index, order_by, url |
| 72 | `zillowProductByFilter` | `zillow_product_by-filter` | Zillow | `zillow.com` | maximum, days_on_zillow, HomeType, listingCategory, keywords-location |
| 73 | `linkedinCompanyInformationByUrl` | `linkedin_company_information_by-url` | 领英 | `linkedin.com` | url |
| 74 | `linkedinJobListingsInformationByJobListingUrl` | `linkedin_job_listings_information_by-job-listing-url` | 领英 | `linkedin.com` | page_turning, job_listing_url |
| 75 | `linkedinJobListingsInformationByJobUrl` | `linkedin_job_listings_information_by-job-url` | 领英 | `linkedin.com` | job_url |
| 76 | `linkedinJobListingsInformationByKeyword` | `linkedin_job_listings_information_by-keyword` | 领英 | `linkedin.com` | page_turning, location_radius, jobs_to_not_include, selective_search, company, remote, job_type, experience_level, time_range, keyword, location |
| 77 | `amazonProductListByKeywordsDomain` | `amazon_product-list_by-keywords-domain` | 亚马逊 | `amazon.com` | page_turning, domain, keyword |
| 78 | `amazonCommentByUrl` | `amazon_comment_by-url` | 亚马逊 | `amazon.com` | url |
| 79 | `amazonProductByAsin` | `amazon_product_by-asin` | 亚马逊 | `amazon.com` | asin |
| 80 | `amazonProductByBestSellers` | `amazon_product_by-best-sellers` | 亚马逊 | `amazon.com` | page_turning, collect_child_categories, url |
| 81 | `amazonProductByCategoryUrl` | `amazon_product_by-category-url` | 亚马逊 | `amazon.com` | page_turning, sort_by, url |
| 82 | `amazonProductByKeywords` | `amazon_product_by-keywords` | 亚马逊 | `amazon.com` | highest_price, lowest_price, page_turning, keyword |
| 83 | `amazonProductByUrl` | `amazon_product_by-url` | 亚马逊 | `amazon.com` | zip_code, url |
| 84 | `amazonSellerByUrl` | `amazon_seller_by-url` | 亚马逊 | `amazon.com` | url |
| 85 | `amazonGlobalProductByCategoryUrl` | `amazon_global-product_by-category-url` | 亚马逊 | `amazon.com` | maximum, get_sponsored, sort_by, url |
| 86 | `amazonGlobalProductByKeywords` | `amazon_global-product_by-keywords` | 亚马逊 | `amazon.com` | page_turning, highest_price, lowest_price, domain, keyword |
| 87 | `amazonGlobalProductByKeywordsBrand` | `amazon_global-product_by-keywords-brand` | 亚马逊 | `amazon.com` | page_turning, brands, keyword |
| 88 | `amazonGlobalProductByUrl` | `amazon_global-product_by-url` | 亚马逊 | `amazon.com` | url |

## SERP 工具

所有 SERP 便捷方法都通过 `client.tools.<methodName>(params)` 调用，底层共用 `/request`。

| # | SDK 方法 | engine | 产品 | 参数 | 备注 |
|---:|---|---|---|---|---|
| 1 | `bing` | `bing` | Bing搜索引擎API | - | - |
| 2 | `bingImages` | `bing_images` | Bing搜索引擎API | - | - |
| 3 | `bingMaps` | `bing_maps` | Bing搜索引擎API | - | - |
| 4 | `bingNews` | `bing_news` | Bing搜索引擎API | - | - |
| 5 | `bingShopping` | `bing_shopping` | Bing搜索引擎API | - | - |
| 6 | `bingVideos` | `bing_videos` | Bing搜索引擎API | - | - |
| 7 | `duckduckgo` | `duckduckgo` | DuckDuckGo搜索引擎API | - | - |
| 8 | `google` | `google` | 谷歌搜索引擎API | - | - |
| 9 | `googleAiMode` | `google_ai_mode` | 谷歌搜索引擎API | - | - |
| 10 | `googleFinance` | `google_finance` | 谷歌搜索引擎API | - | - |
| 11 | `googleFlights` | `google_flights` | 谷歌搜索引擎API | - | - |
| 12 | `googleHotels` | `google_hotels` | 谷歌搜索引擎API | - | - |
| 13 | `googleImages` | `google_images` | 谷歌搜索引擎API | - | - |
| 14 | `googleJobs` | `google_jobs` | 谷歌搜索引擎API | - | - |
| 15 | `googleLens` | `google_lens` | 谷歌搜索引擎API | - | - |
| 16 | `googleLocal` | `google_local` | 谷歌搜索引擎API | - | - |
| 17 | `googleMaps` | `google_maps` | 谷歌搜索引擎API | - | - |
| 18 | `googleNews` | `google_news` | 谷歌搜索引擎API | - | - |
| 19 | `googlePatents` | `google_patents` | 谷歌搜索引擎API | - | - |
| 20 | `googlePlay` | `google_play` | 谷歌搜索引擎API | - | - |
| 21 | `googleScholar` | `google_scholar` | 谷歌搜索引擎API | - | - |
| 22 | `googleShopping` | `google_shopping` | 谷歌搜索引擎API | - | - |
| 23 | `googleTrends` | `google_trends` | 谷歌搜索引擎API | - | - |
| 24 | `googleVideos` | `google_videos` | 谷歌搜索引擎API | - | - |
| 25 | `yandex` | `yandex` | Yandex搜索引擎API | - | 官网 getScraperList 返回 Yandex 产品，但 getSerpDetail 当前返回空；SDK 暂按 engine=yandex 生成便捷方法，调用前需后端确认该 engine 可用。 |

## 使用示例

```ts
import { DataifyClient } from "dataify-sdk";

const client = new DataifyClient({
  apiKey: process.env.DATAIFY_API_TOKEN,
});

const result = await client.tools.google({
  q: "Dataify",
  json: "1",
});
```
