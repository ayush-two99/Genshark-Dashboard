# Possible Scope: Genshark AI Visibility Dashboard vs Semrush API Capabilities

## **Problem Statement**

We're talking about an AI Visibility Dashboard that needs to track:

- **LLM Platform Mentions** (think ChatGPT, Claude, Perplexity, Gemini, Copilot)
- **AI Query Performance** - how well our content performs in AI searches
- **Generative Engine Optimization (GEO)** metrics - the new SEO for AI
- **AI Content Visibility** scoring - how visible our content is to AI systems
- **LLM Platform Share of Voice** - which AI platforms mention us most
- **AI Prompt Performance** tracking - how effective our prompts are
- **Generative Search Traffic** attribution - traffic coming from AI searches

## **The Bottom Line**

| Category | What We Need | Semrush API Has It | Kinda Has It | Doesn't Have It |
|-----------|--------------|-------------------|---------------|-----------------|
| **AI/GEO Core Metrics** | 12 things | 0 | 0 | 12 |
| **LLM Platform Analytics** | 8 things | 0 | 0 | 8 |
| **AI Content Performance** | 6 things | 0 | 0 | 6 |
| **Generative Search Traffic** | 5 things | 0 | 0 | 5 |
| **AI Prompt Analytics** | 4 things | 0 | 0 | 4 |
| **Traditional SEO (Nice to Have)** | 15 things | 12 | 2 | 1 |
| **TOTAL** | **50 things** | **12** | **2** | **36** |

---

## **AI/GEO Core Metrics - The Stuff We Actually Need**

| What We Want | Semrush API Endpoint | Can We Get It? | Reality Check |
|--------------|---------------------|----------------|---------------|
| **LLM Mentions Count** | — | No | The Semrush API doesn't track AI platform mentions at all |
| **AI Visibility Score** | — | No | No AI-specific visibility metrics here |
| **Share of Voice (AI)** | — | No | They don't track AI platform share of voice |
| **AI Traffic Impact** | — | No | Can't attribute traffic to AI platforms |
| **Generative Search Queries** | — | No | They don't track AI-generated search queries |
| **AI Content Performance** | — | No | No analysis of AI-optimized content |
| **LLM Platform Distribution** | — | No | No tracking of ChatGPT, Claude, Perplexity, etc. |
| **AI Query Success Rate** | — | No | No AI query performance tracking |
| **Generative Engine Rankings** | — | No | No AI platform rankings |
| **AI Prompt Effectiveness** | — | No | No prompt performance analysis |
| **AI Content Optimization Score** | — | No | No AI content scoring |
| **Generative Search Trends** | — | No | No AI search trends |

---

## **LLM Platform Analytics - The Heart of Our Dashboard**

| What We Want | Semrush API Endpoint | Can We Get It? | Reality Check |
|--------------|---------------------|----------------|---------------|
| **ChatGPT Mentions** | — | No | The Semrush API doesn't track ChatGPT-specific data |
| **Claude Mentions** | — | No | No Claude-specific data either |
| **Perplexity Mentions** | — | No | Perplexity? Not a chance |
| **Gemini Mentions** | — | No | Gemini mentions? Nope |
| **Copilot Mentions** | — | No | Copilot mentions? Forget it |
| **LLM Platform Engagement** | — | No | No AI platform engagement tracking |
| **AI Platform Traffic** | — | No | Can't attribute traffic to AI platforms |
| **LLM Query Performance** | — | No | No AI query performance tracking |

---

## **AI Content Performance - How Our Content Does in AI**

| What We Want | Semrush API Endpoint | Can We Get It? | Reality Check |
|--------------|---------------------|----------------|---------------|
| **AI-Optimized Content Score** | — | No | The Semrush API doesn't provide AI content scoring |
| **AI Content Visibility** | — | No | No AI content visibility tracking |
| **Generative Content Performance** | — | No | No analysis of AI-generated content |
| **AI Content Engagement** | — | No | No AI content engagement tracking |
| **Prompt-Based Content Analysis** | — | No | No prompt-driven content analysis |
| **AI Content Optimization** | — | No | No AI content optimization |

---

## **Generative Search Traffic - Traffic from AI**

| What We Want | Semrush API Endpoint | Can We Get It? | Reality Check |
|--------------|---------------------|----------------|---------------|
| **AI-Generated Traffic** | — | No | The Semrush API doesn't track AI-generated traffic |
| **Generative Search Attribution** | — | No | Can't attribute traffic to AI platforms |
| **AI Query Traffic** | — | No | No AI query traffic tracking |
| **Generative Engine Traffic** | — | No | No AI engine traffic tracking |
| **AI Platform Traffic Sources** | — | No | No AI platform traffic sources |

---

## **AI Prompt Analytics - How Good Are Our Prompts?**

| What We Want | Semrush API Endpoint | Can We Get It? | Reality Check |
|--------------|---------------------|----------------|---------------|
| **Prompt Performance Tracking** | — | No | The Semrush API doesn't track prompt performance |
| **AI Query Effectiveness** | — | No | No AI query effectiveness analysis |
| **Prompt Optimization Metrics** | — | No | No prompt optimization |
| **AI Query Success Rate** | — | No | No AI query success rates |

---

## **Traditional SEO - The Bonus Stuff**

| What We Want | Semrush API Endpoint | Can We Get It? | Reality Check |
|--------------|---------------------|----------------|---------------|
| **Organic Keywords Count** | `domain_ranks` | Yes | Yeah, we can get this as `Organic Keywords` |
| **Organic Traffic Volume** | `domain_ranks` | Yes | Available as `Organic Traffic` |
| **Paid Keywords Count** | `domain_ranks` | Yes | Available as `Adwords Keywords` |
| **Paid Traffic Volume** | `domain_ranks` | Yes | Available as `Adwords Traffic` |
| **Backlinks Count** | `backlinks_overview` | Yes | Available as `total` |
| **Referring Domains** | `backlinks_overview` | Yes | Available as `domains_num` |
| **Authority Score** | `backlinks_overview` | Yes | Available as `ascore` |
| **Keyword Search Volume** | `phrase_this` | Yes | Available as `Search Volume` |
| **Keyword CPC Data** | `phrase_this` | Yes | Available as `CPC` |
| **Keyword Competition** | `phrase_this` | Yes | Available as `Competition` |
| **Competitor Analysis** | `domain_organic_organic` | Yes | We can get competitor domains |
| **Top Pages** | `domain_organic_unique` | Yes | We can get top organic pages |
| **Historical Data** | Various endpoints | Partial | Limited to monthly granularity |
| **Real-time Data** | — | No | They only provide historical data |


## **What This All Means**

### **Semrush API Can't Help Us With (36 things - 72%)**
- **AI/GEO Core Metrics**: Zero support for AI visibility, LLM mentions, or generative search
- **LLM Platform Analytics**: No tracking of ChatGPT, Claude, Perplexity, Gemini, Copilot
- **AI Content Performance**: No AI content scoring or optimization
- **Generative Search Traffic**: No AI traffic attribution

### **Semrush API Can Help Us With (12 things - 24%)**
- **Traditional SEO**: Domain analytics, keyword research, backlink analysis
- **Competitor Analysis**: Traditional competitor intelligence
- **Historical SEO Data**: Limited to monthly granularity

### **Semrush API Kinda Helps With (2 things - 4%)**
- **Historical Data**: Limited granularity (monthly vs daily/hourly)
- **Real-time Data**: They provide historical data, not real-time

---

## **My Honest Recommendation**

### **Don't use the Semrush API as your main data source for Genshark.**

**Here's why:**
1. **No AI Platform Tracking**: The Semrush API doesn't track ChatGPT, Claude, Perplexity, Gemini, Copilot
2. **No LLM Mentions**: They don't monitor AI platform mentions
3. **No Generative Search**: They don't track AI-generated search queries
4. **No AI Content Scoring**: They don't provide AI content optimization
5. **No GEO Metrics**: They don't support Generative Engine Optimization

### **What You Should Do Instead:**

#### **For AI/GEO Data:**
- **Custom AI Monitoring**: Build your own scrapers for LLM platforms
- **AI Platform APIs**: Go directly to ChatGPT, Claude, Perplexity APIs
- **Social Media APIs**: Track AI mentions on Twitter, LinkedIn, Reddit
- **News APIs**: Monitor AI mentions in news articles
- **Custom Analytics**: Build AI-specific analytics from scratch

#### **For Traditional SEO (Bonus):**
- **Semrush API**: Use it for traditional SEO data as a bonus feature
- **Google Search Console**: For search performance data
- **Google Analytics**: For traffic and user behavior data

#### **For Platform Features:**
- **User Management**: Auth0, Firebase Auth, or build your own
- **Billing**: Stripe, PayPal, or similar payment processors
- **A/B Testing**: Google Optimize, Optimizely, or build your own
- **System Monitoring**: New Relic, DataDog, or similar APM tools

---

## **The Real Numbers**

- **Data Coverage**: 24% of what we need is supported by the Semrush API (only traditional SEO)
- **AI/GEO Coverage**: 0% - The Semrush API provides no AI/GEO data
- **Integration Complexity**: Very High (requires building AI monitoring from scratch)
- **Time to Market**: 12+ months for core AI features, 18+ months for full platform
- **Cost Efficiency**: Low (Semrush API only provides bonus traditional SEO data)

---

## **Bottom Line**

**Don't use the Semrush API as the primary data source for Genshark.**

**Instead:**
1. **Build custom AI monitoring** for LLM platforms and mentions
2. **Integrate directly with AI platform APIs** where available
3. **Use the Semrush API only as a bonus feature** for traditional SEO data
4. **Focus on AI/GEO-specific data sources** and custom development

**Genshark needs to be built as a specialized AI visibility platform, not a traditional SEO tool.**

---

*This analysis shows that the Semrush API is fundamentally incompatible with Genshark's core AI/GEO requirements and would require a complete pivot away from the AI visibility focus.*