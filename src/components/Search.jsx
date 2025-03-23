import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './InvestorDatabase.css'; // Your combined styles

// Helper functions to generate filter values from the final, API-based investor list
function getInvestorTypes(investors) {
  const types = new Set();
  investors.forEach((investor) => {
    const name = investor['Investor Name'] || '';
    if (name.includes('VC firm')) types.add('VC Firm');
    else if (name.includes('Angel network')) types.add('Angel Network');
    else if (name.includes('Family office')) types.add('Family Office');
    else if (name.includes('Solo angel')) types.add('Solo Angel');
    else if (name.includes('Startup studio')) types.add('Startup Studio');
  });
  return ['All', ...Array.from(types)];
}

function getRegions(investors) {
  const regions = new Set();
  investors.forEach((investor) => {
    const geos = (investor.Geography || '').split(' ');
    geos.forEach((geo) => {
      if (!geo.includes('+')) {
        regions.add(geo);
      }
    });
  });
  return ['All', ...Array.from(regions).sort()];
}

function getStages(investors) {
  const stageMap = {
    '1': 'Idea/Patent',
    '2': 'Prototype',
    '3': 'Early Revenue',
    '4': 'Scaling',
  };
  const stages = new Set();
  investors.forEach((investor) => {
    const stageText = investor.Stages || '';
    Object.entries(stageMap).forEach(([key, value]) => {
      if (stageText.includes(`${key}.`)) {
        stages.add(value);
      }
    });
  });
  return ['All', ...Array.from(stages)];
}

function getCheckSizes() {
  return ['All', 'Under $100k', '$100k-$1M', '$1M-$5M', '$5M+'];
}

const InvestorDatabase = () => {
  // -----------------------------
  // States
  // -----------------------------
  const [investors, setInvestors] = useState([]);
  const [filteredInvestors, setFilteredInvestors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');
  const [checkSizeFilter, setCheckSizeFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  // Additional states for loading animation & sign-in logic
  const [apiLoading, setApiLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');

  // This set of rotating messages shows in the progress animation
  const loadingMessages = [
    'Analyzing your startup profile...',
    'Searching for perfect investor matches...',
    'Evaluating investment thesis alignment...',
    'Filtering by check size preferences...',
    'Assessing regional compatibility...',
    'Matching investors to your growth stage...',
    'Finding your ideal funding partners...',
    'Discovering hidden investment opportunities...',
    'Analyzing investor track records...',
  ];

  // -----------------------------
  // Helper: Start the loading animation for ~30s
  // -----------------------------
  const startLoadingAnimation = () => {
    setLoadingProgress(0);
    setLoadingMessage(loadingMessages[0]);

    let messageIndex = 0;

    // Animate progress from 0% up to ~92% over ~30s
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        // Switch the message every ~12 steps
        if (prev % 12 === 0 && prev > 0) {
          messageIndex = (messageIndex + 1) % loadingMessages.length;
          setLoadingMessage(loadingMessages[messageIndex]);
        }
        const newProgress = prev + 1;
        if (newProgress >= 92) {
          clearInterval(progressInterval);
          setLoadingMessage('Almost there! Finalizing your matches...');
        }
        return newProgress >= 92 ? 92 : newProgress;
      });
    }, 326); // ~30s to reach 92%

    return () => clearInterval(progressInterval);
  };

  // -----------------------------
  // useEffect: must have valid sign-in data => load from API or cache
  // -----------------------------
  useEffect(() => {
    const savedData = localStorage.getItem('startupSignupData');
    if (!savedData) {
      // No sign-in data => show error & stop
      setError('You must sign in before viewing investor data.');
      setIsLoading(false);
      return;
    }

    // Attempt to parse sign-in data
    const parsedData = JSON.parse(savedData);

    const hasCalledApi = localStorage.getItem('hasCalledVcMatcherApi') === 'true';
    const cachedResults = localStorage.getItem('vcMatcherResults');

    // If we already have cached results => use them
    if (hasCalledApi && cachedResults) {
      try {
        const parsedResults = JSON.parse(cachedResults);
        setInvestors(parsedResults);
        setFilteredInvestors(parsedResults);
        setIsLoading(false);
      } catch (err) {
        console.error('Error parsing cached results:', err);
        handleApiFetch(parsedData);
      }
    } else {
      // First time => call API
      handleApiFetch(parsedData);
    }
  }, []);

  // -----------------------------
  // Function: call the external VC Matching API
  // -----------------------------
  const handleApiFetch = (signupData) => {
    setApiLoading(true);
    startLoadingAnimation();

    const payload = {
      industry: signupData.industry || '',
      stage: signupData.stage || '',
      business_model: signupData.businessModel || '',
      location: signupData.location || '',
      traction: signupData.traction || '',
      team: signupData.teamExperience || '',
      pitch: signupData.pitchSummary || '',
      preferred_check_size: formatCheckSize(signupData.checkSizeMin, signupData.checkSizeMax),
    };

    fetch('https://vc-matcher-script-1096385495920.us-central1.run.app/rank-vcs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoadingProgress(100);
        setLoadingMessage('Done!');
        localStorage.setItem('vcMatcherResults', JSON.stringify(data));
        localStorage.setItem('hasCalledVcMatcherApi', 'true');
        setInvestors(data);
        setFilteredInvestors(data);
        setApiLoading(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching VC matches:', err);
        setError('Failed to fetch investor matches. Please try again later.');
        setApiLoading(false);
        setIsLoading(false);
      });
  };

  // Helper: format the check size for the payload
  function formatCheckSize(min, max) {
    if (min && max) return `$${min} to $${max}`;
    if (min && !max) return `$${min}+`;
    return '';
  }

  // -----------------------------
  // Reanalyze => clear old results, call API again
  // -----------------------------
  const handleRefresh = () => {
    const savedData = localStorage.getItem('startupSignupData');
    if (!savedData) {
      // If no sign in data => can't reanalyze, show error
      setError('No sign-in data found. Please sign in again to reanalyze.');
      return;
    }
    localStorage.removeItem('vcMatcherResults');
    localStorage.setItem('hasCalledVcMatcherApi', 'false');
    setFilteredInvestors([]);
    setInvestors([]);

    // call the API again
    handleApiFetch(JSON.parse(savedData));
  };

  // -----------------------------
  // Filter & sort logic
  // -----------------------------
  useEffect(() => {
    if (investors.length === 0) return;
    if (apiLoading) return;

    setIsLoading(true);
    const timer = setTimeout(() => {
      let results = [...investors];

      // Search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        results = results.filter((inv) =>
          Object.values(inv).some((val) => String(val).toLowerCase().includes(term))
        );
      }

      // Type
      if (typeFilter !== 'All') {
        results = results.filter((inv) => {
          const name = inv['Investor Name'] || '';
          if (typeFilter === 'VC Firm' && name.includes('VC firm')) return true;
          if (typeFilter === 'Angel Network' && name.includes('Angel network')) return true;
          if (typeFilter === 'Family Office' && name.includes('Family office')) return true;
          if (typeFilter === 'Solo Angel' && name.includes('Solo angel')) return true;
          if (typeFilter === 'Startup Studio' && name.includes('Startup studio')) return true;
          return false;
        });
      }

      // Region
      if (regionFilter !== 'All') {
        results = results.filter((inv) => inv.Geography.includes(regionFilter));
      }

      // Stage
      if (stageFilter !== 'All') {
        const stageMap = {
          'Idea/Patent': '1.',
          'Prototype': '2.',
          'Early Revenue': '3.',
          'Scaling': '4.',
        };
        results = results.filter((inv) => inv.Stages.includes(stageMap[stageFilter]));
      }

      // Check size
      if (checkSizeFilter !== 'All') {
        results = results.filter((inv) => {
          const checkVal = (inv['Check Size'] || '').replace(/\s+/g, '').toLowerCase();
          switch (checkSizeFilter) {
            case 'Under $100k':
              return (
                checkVal.includes('$1k') ||
                checkVal.includes('$5k') ||
                checkVal.includes('$10k') ||
                checkVal.includes('$25k') ||
                checkVal.includes('$50k')
              );
            case '$100k-$1M':
              return (
                checkVal.includes('$100k') ||
                checkVal.includes('$150k') ||
                checkVal.includes('$200k') ||
                checkVal.includes('$500k') ||
                (checkVal.includes('$1m') && !checkVal.includes('$10m'))
              );
            case '$1M-$5M':
              return (
                (checkVal.includes('$1m') ||
                  checkVal.includes('$2m') ||
                  checkVal.includes('$3m') ||
                  checkVal.includes('$4m') ||
                  checkVal.includes('$5m')) &&
                !checkVal.includes('$10m')
              );
            case '$5M+':
              return (
                checkVal.includes('$5m') ||
                checkVal.includes('$10m') ||
                checkVal.includes('$20m')
              );
            default:
              return false;
          }
        });
      }

      // Sort alphabetically?
      if (sortAlphabetically) {
        const sortedAll = sortInvestorsByName(investors);
        const rankMap = new Map();
        sortedAll.forEach((inv, idx) => {
          const cName = cleanInvestorName(inv['Investor Name'] || '');
          rankMap.set(cName, idx + 1);
        });
        results = sortInvestorsByName(results).map((inv) => {
          const cName = cleanInvestorName(inv['Investor Name'] || '');
          return {
            ...inv,
            rank: rankMap.get(cName),
            totalCount: investors.length,
          };
        });
      }

      setFilteredInvestors(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    typeFilter,
    regionFilter,
    stageFilter,
    checkSizeFilter,
    investors,
    sortAlphabetically,
    apiLoading,
  ]);

  // Sort by name
  const sortInvestorsByName = (list) => {
    return [...list].sort((a, b) => {
      const nameA = cleanInvestorName(a['Investor Name'] || '').toLowerCase();
      const nameB = cleanInvestorName(b['Investor Name'] || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
  };

  // Clean up name
  const cleanInvestorName = (name) => {
    return name
      .replace(' VC firm', '')
      .replace(' Angel network', '')
      .replace(' Family office', '')
      .replace(' Solo angel', '')
      .replace(' Startup studio', '')
      .replace('...', '');
  };

  // Basic investor type
  const getInvestorType = (name) => {
    if (name.includes('VC firm')) return 'VC Firm';
    if (name.includes('Angel network')) return 'Angel Network';
    if (name.includes('Family office')) return 'Family Office';
    if (name.includes('Solo angel')) return 'Solo Angel';
    if (name.includes('Startup studio')) return 'Startup Studio';
    return 'Investor';
  };

  // Format comp score as a percentage
  const formatCompatibilityScore = (score) => {
    if (typeof score !== 'number' || isNaN(score)) {
      return '0% Compatibility';
    }
    return `${Math.round(score * 100, 2) - Math.random(0.1 , 0.7)}% Compatibility`;
  };

  const toggleSortOrder = () => setSortAlphabetically(!sortAlphabetically);

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('All');
    setRegionFilter('All');
    setStageFilter('All');
    setCheckSizeFilter('All');
    setSortAlphabetically(false);
  };

  // -----------------------------
  // Render
  // -----------------------------

  // 1) If there's an error
  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  // 2) If we are calling the external API => show loading animation
  if (apiLoading) {
    return (
      <div className="loading-container">
        <h2>Finding Your Perfect Investors</h2>
        <div className="loading-message">{loadingMessage}</div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${loadingProgress}%` }}>
            <div className="progress-glow"></div>
          </div>
        </div>
        <div className="loading-details">
          <span>Analyzing startup profile</span>
          <span>{loadingProgress}%</span>
        </div>
        <div className="loading-animation">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div key={dot} className={`loading-dot dot-${dot}`}></div>
          ))}
        </div>
      </div>
    );
  }

  // 3) Normal UI (filters + row-based results)
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content centered">
          <h1>Discover the Top VCs Ready to Back Your Vision</h1>
          <p>Find the perfect investors for your startup</p>
        </div>
      </header>

      {/* Filters */}
      <div className="filter-container">
        <div className="filter-row">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search investors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="filter-select">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="" disabled>
                Investor Type
              </option>
              {getInvestorTypes(investors).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select">
            <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
              <option value="" disabled>
                Region
              </option>
              {getRegions(investors).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select">
            <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
              <option value="" disabled>
                Stage
              </option>
              {getStages(investors).map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select">
            <select value={checkSizeFilter} onChange={(e) => setCheckSizeFilter(e.target.value)}>
              <option value="" disabled>
                Check Size
              </option>
              {getCheckSizes().map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleRefresh} className="reanalyze-button">
            <svg
              className="refresh-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
              <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
            </svg>
            Reanalyze matches
          </button>
        </div>

        <div className="sort-toggle">
          <label className="toggle-switch">
            <input type="checkbox" checked={sortAlphabetically} onChange={toggleSortOrder} />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">Sort alphabetically</span>
        </div>

        <div className="filter-footer">
          <p className="result-count">
            Showing {filteredInvestors.length} of {investors.length} investors
          </p>
          <button onClick={resetFilters} className="reset-button">
            Reset Filters
          </button>
        </div>
      </div>

      {/* If still isLoading => skeleton */}
      {isLoading ? (
        <div className="investor-list">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card skeleton-row">
              <div className="skeleton-title"></div>
              <div className="skeleton-subtitle"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text-large"></div>
              <div className="skeleton-tags">
                <div className="skeleton-tag"></div>
                <div className="skeleton-tag"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredInvestors.length > 0 ? (
        <div className="investor-list">
          {filteredInvestors.map((investor, index) => {
            const investorType = getInvestorType(investor['Investor Name'] || '');
            const cleanName = cleanInvestorName(investor['Investor Name'] || '');
            const totalCount = investor.totalCount || investors.length;

            // Prepare data for “Summarize with Gemini”
            const encodedName = encodeURIComponent(cleanName);
            const encodedType = encodeURIComponent(investorType);
            const encodedThesis = encodeURIComponent(investor['Investment Thesis'] || '');
            const encodedCheckSize = encodeURIComponent(investor['Check Size'] || '');
            const encodedGeography = encodeURIComponent(investor.Geography || '');
            const encodedStages = encodeURIComponent(investor.Stages || '');

            return (
              <div key={index} className="investor-row">
                <div className="row-content">
                  <div className="row-left">
                    <div className="rank-display">
                      <span className="rank-numerator">
                        {investor.rank ? investor.rank : index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="row-main">
                    <div className="row-header">
                      <h2>{cleanName}</h2>
                      <span className="investor-type">{investorType}</span>
                      <span className="compatibility-tag">
                        {formatCompatibilityScore(investor.compatibility_score)}
                      </span>
                    </div>

                    <div className="region-tags">
                      {(investor.Geography || '')
                        .split(' ')
                        .filter((g) => !g.includes('+'))
                        .map((regionItem, i2) => (
                          <span key={i2} className="region-tag">
                            {regionItem}
                          </span>
                        ))}
                      {(investor.Geography || '').split(' ').find((g) => g.includes('+')) && (
                        <span className="region-tag">+more</span>
                      )}
                    </div>

                    <div className="thesis">
                      <p className="field-label">Investment Thesis</p>
                      <p className="thesis-text">{investor['Investment Thesis']}</p>
                    </div>

                    <div className="row-details">
                      <div className="check-size">
                        <p className="field-label">Check Size</p>
                        <p className="field-value">{investor['Check Size']}</p>
                      </div>
                    </div>

                    <div className="stage-container">
                      <div className="stage-tags-wrapper">
                        {(investor.Stages || '')
                          .split(' ')
                          .filter((s) => s.match(/\d\./))
                          .map((stage, i3) => {
                            const stageMap = {
                              '1.': 'Idea/Patent',
                              '2.': 'Prototype',
                              '3.': 'Early Revenue',
                              '4.': 'Scaling',
                            };
                            const stageNum = stage.trim().replace(',', '');
                            return (
                              <span key={i3} className="stage-tag">
                                {stageMap[stageNum] || stageNum}
                              </span>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  <div className="row-actions">
                    {/* Contact button if we have an email */}
                    {investor['Fake Email'] && (
                      <a href={`mailto:${investor['Fake Email']}`} className="contact-button">
                        Contact
                      </a>
                    )}
                    <Link
                      to={`/chat?name=${encodedName}&type=${encodedType}&thesis=${encodedThesis}&checkSize=${encodedCheckSize}&geography=${encodedGeography}&stages=${encodedStages}`}
                      className="gemini-summarize-button"
                    >
                      Summarize with Gemini
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-results">
          <svg className="no-results-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3>No investors found</h3>
          <p>Try adjusting your search or filter criteria.</p>
          <button onClick={resetFilters} className="reset-button large">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default InvestorDatabase;
