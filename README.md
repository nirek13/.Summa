🚀 **Inspiration**

Summa was born out of our personal experiences and frustrations with the startup ecosystem. As aspiring founders and tech enthusiasts, we realized that one of the most daunting parts of building a company isn’t just the product—it’s finding the right investors to believe in your vision. While platforms exist to list investors, none felt tailored, intelligent, or efficient in helping founders find their true matches. We wanted to fix that.

Our idea went through several pivots. We first explored generating CFO-style financial summaries for startups. Then we experimented with a “Tinder for VCs” prototype—a swipe-based matching tool for investors. But after speaking with real founders, we discovered that what they really needed was a data-driven, intelligent investor matchmaking tool—and that’s how Summa was born.

---

🧠 **What We Learned**

- **Startup-Investor Fit is Nuanced:** It’s not just about industry or stage—things like geography, traction, founder background, and check size all matter.  
- **NLP Has Real-World Utility:** By embedding founder pitch descriptions and investor theses into vector space, we could model complex compatibility beyond just filtering tags.  
- **Founders Want Actionable Insights:** Not everyone wants to read a 10-page investor report. Clean summaries and direct contact info save precious time.  

---

🛠️ **How We Built It**

- **Frontend:** Built with React and TailwindCSS, our UI guides founders through a simple intake form and shows ranked investor results with clarity and focus.  
- **Backend:** A Python Flask server, hosted on Google Cloud Run, powers our matching engine. It performs:  
  - Tag-based static scoring  
  - NLP vectorization of startup and investor descriptions  
  - Cosine similarity to assess semantic overlap  
  - A weighted combination of scores, fine-tuned through A/B testing  
- **Data:** We scraped and cleaned a dataset of 2,000+ VCs and angel investors, including fields like name, thesis, check size, stage, geography, and contact info.  
- **Summarization Engine:** We integrated Genesis AI to create concise, founder-friendly investor summaries that strip away jargon and give instant clarity.  

---

⚠️ **Challenges We Faced**

- **Data Cleaning & Structure:** Investor data is messy and unstandardized. Harmonizing it into a usable format took more time than expected.  
- **Score Weighting:** It took experimentation and iteration to figure out the right balance between static tagging and semantic NLP similarity.  
- **UX Flow:** We initially overcomplicated the interface. Simplifying the process to just a few inputs made a huge difference for usability.  
- **Multiple Pivots:** From CFO report generator → Tinder swipe MVP → Summa match engine, we iterated quickly, testing with users and refining the problem space.  

---

💡 **The Future**

We’re excited about where Summa can go. With more user feedback, we aim to:  
- Incorporate real-time founder-investor messaging  
- Add filters for diversity-focused or ESG investors  
- Create investor dashboards for reverse discovery  
- Expand our database to include international investors and syndicates  

Summa is our attempt to cut through the noise and make startup fundraising smarter, faster, and more founder-friendly. Thanks for reading!

---
Summa is still in Beta and as such many features are not in the public domain at this time.
