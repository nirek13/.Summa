import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './InvestorDatabase.css';

const InvestorDatabase = () => {
  // States
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

  // Function to fetch investor data
  const fetchInvestorData = () => {
    setIsLoading(true);
    fetch('/data/investors_cleaned.csv')
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });
        // Assume data is already ranked in the array
        const rankedData = parsedData.data.map((investor, index) => ({
          ...investor,
          rank: index + 1,
          // Set a default compatibility score between 0.1 and 1
          compatibility_score: investor.compatibility_score
        }));
        setInvestors(rankedData);
        setFilteredInvestors(rankedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching CSV:', err);
        setError('Failed to load investor data. Please try again later.');
        setIsLoading(false);
      });
  };

  // Fetch CSV from public/data/investors_cleaned.csv on mount
  useEffect(() => {
    fetchInvestorData();
  }, []);

  // Extract unique values for filters
  const getInvestorTypes = () => {
    const types = new Set();
    investors.forEach((investor) => {
      const name = investor['Investor Name'];
      if (name.includes('VC firm')) types.add('VC Firm');
      else if (name.includes('Angel network')) types.add('Angel Network');
      else if (name.includes('Family office')) types.add('Family Office');
      else if (name.includes('Solo angel')) types.add('Solo Angel');
      else if (name.includes('Startup studio')) types.add('Startup Studio');
    });
    return ['All', ...Array.from(types)];
  };

  const getRegions = () => {
    const regions = new Set();
    investors.forEach((investor) => {
      const geos = investor.Geography.split(' ');
      geos.forEach((geo) => {
        if (!geo.includes('+')) regions.add(geo);
      });
    });
    return ['All', ...Array.from(regions).sort()];
  };

  const getStages = () => {
    const stageMap = {
      '1': 'Idea/Patent',
      '2': 'Prototype',
      '3': 'Early Revenue',
      '4': 'Scaling',
    };
    const stages = new Set();
    investors.forEach((investor) => {
      const stageText = investor.Stages;
      Object.entries(stageMap).forEach(([key, value]) => {
        if (stageText.includes(`${key}.`)) stages.add(value);
      });
    });
    return ['All', ...Array.from(stages)];
  };

  const getCheckSizes = () => {
    return ['All', 'Under $100k', '$100k-$1M', '$1M-$5M', '$5M+'];
  };

  // Filtering and sorting investors list
  useEffect(() => {
    if (investors.length === 0) return;
    setIsLoading(true);
    const timer = setTimeout(() => {
      let results = [...investors];

      if (searchTerm) {
        results = results.filter((investor) =>
          Object.values(investor).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      if (typeFilter !== 'All') {
        results = results.filter((investor) => {
          const name = investor['Investor Name'];
          if (typeFilter === 'VC Firm' && name.includes('VC firm')) return true;
          if (typeFilter === 'Angel Network' && name.includes('Angel network')) return true;
          if (typeFilter === 'Family Office' && name.includes('Family office')) return true;
          if (typeFilter === 'Solo Angel' && name.includes('Solo angel')) return true;
          if (typeFilter === 'Startup Studio' && name.includes('Startup studio')) return true;
          return false;
        });
      }

      if (regionFilter !== 'All') {
        results = results.filter((investor) =>
          investor.Geography.includes(regionFilter)
        );
      }

      if (stageFilter !== 'All') {
        results = results.filter((investor) => {
          const stageMap = {
            'Idea/Patent': '1.',
            'Prototype': '2.',
            'Early Revenue': '3.',
            'Scaling': '4.',
          };
          return investor.Stages.includes(stageMap[stageFilter]);
        });
      }

      if (checkSizeFilter !== 'All') {
        results = results.filter((investor) => {
          const normalizeCheckSize = (checkSize) =>
            checkSize.replace(/\s+/g, '').toLowerCase();
          const checkSizeValue = normalizeCheckSize(investor['Check Size']);
          if (checkSizeFilter === 'Under $100k') {
            return (
              checkSizeValue.includes('$1k') ||
              checkSizeValue.includes('$5k') ||
              checkSizeValue.includes('$10k') ||
              checkSizeValue.includes('$25k') ||
              checkSizeValue.includes('$50k')
            );
          } else if (checkSizeFilter === '$100k-$1M') {
            return (
              checkSizeValue.includes('$100k') ||
              checkSizeValue.includes('$150k') ||
              checkSizeValue.includes('$200k') ||
              checkSizeValue.includes('$500k') ||
              (checkSizeValue.includes('$1m') && !checkSizeValue.includes('$10m'))
            );
          } else if (checkSizeFilter === '$1M-$5M') {
            return (
              (checkSizeValue.includes('$1m') ||
                checkSizeValue.includes('$2m') ||
                checkSizeValue.includes('$3m') ||
                checkSizeValue.includes('$4m') ||
                checkSizeValue.includes('$5m')) &&
              !checkSizeValue.includes('$10m')
            );
          } else if (checkSizeFilter === '$5M+') {
            return (
              checkSizeValue.includes('$5m') ||
              checkSizeValue.includes('$10m') ||
              checkSizeValue.includes('$20m')
            );
          }
          return false;
        });
      }

      if (sortAlphabetically) {
        const sortInvestorsByName = (list) => {
          return [...list].sort((a, b) => {
            const nameA = cleanInvestorName(a['Investor Name']).toLowerCase();
            const nameB = cleanInvestorName(b['Investor Name']).toLowerCase();
            return nameA.localeCompare(nameB);
          });
        };

        const allInvestorsSorted = sortInvestorsByName([...investors]);
        const rankMap = new Map();
        allInvestorsSorted.forEach((investor, index) => {
          const cName = cleanInvestorName(investor['Investor Name']);
          rankMap.set(cName, index + 1);
        });
        results = sortInvestorsByName(results).map((inv) => {
          const cName = cleanInvestorName(inv['Investor Name']);
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
  ]);

  // Clean up investor name for display
  const cleanInvestorName = (name) => {
    return name
      .replace(' VC firm', '')
      .replace(' Angel network', '')
      .replace(' Family office', '')
      .replace(' Solo angel', '')
      .replace(' Startup studio', '')
      .replace('...', '');
  };

  const toggleSortOrder = () => {
    setSortAlphabetically(!sortAlphabetically);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('All');
    setRegionFilter('All');
    setStageFilter('All');
    setCheckSizeFilter('All');
    setSortAlphabetically(false);
  };

  const getInvestorType = (name) => {
    if (name.includes('VC firm')) return 'VC Firm';
    if (name.includes('Angel network')) return 'Angel Network';
    if (name.includes('Family office')) return 'Family Office';
    if (name.includes('Solo angel')) return 'Solo Angel';
    if (name.includes('Startup studio')) return 'Startup Studio';
    return 'Investor';
  };

  // Format compatibility score as a percentage
  const formatCompatibilityScore = (score) => {
    if (score === undefined || score === null || isNaN(score)) {
      return '0% Compatibility';
    }
    return `${Math.round(score * 100)}% Compatibility`;
  };

  // Handle API refresh
  const handleRefresh = () => {
    fetchInvestorData();
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content centered">
          <h1>Discover the Top VCs Ready to Back Your Vision</h1>
          <p>Find the perfect investors for your startup</p>
        </div>
      </header>

      {/* Search and Filters */}
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
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="" disabled>
                Investor Type
              </option>
              {getInvestorTypes().map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="" disabled>
                Region
              </option>
              {getRegions().map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select">
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
            >
              <option value="" disabled>
                Stage
              </option>
              {getStages().map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select">
            <select
              value={checkSizeFilter}
              onChange={(e) => setCheckSizeFilter(e.target.value)}
            >
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
            <input
              type="checkbox"
              checked={sortAlphabetically}
              onChange={toggleSortOrder}
            />
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

      {/* Results - ONE PER ROW */}
      <div className="investor-list">
        {isLoading ? (
          // Loading skeleton
          [...Array(6)].map((_, i) => (
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
          ))
        ) : filteredInvestors.length > 0 ? (
          filteredInvestors.map((investor, index) => {
            const investorType = getInvestorType(investor['Investor Name']);
            const cleanName = cleanInvestorName(investor['Investor Name']);
            const totalCount = 250; // Fixed total count as requested

            // Prepare data for the query params
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
                    {/* Ranking display with numerator bigger than denominator */}
                    <div className="rank-display">
                      <span className="rank-numerator">{investor.rank || index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="row-main">
                    <div className="row-header">
                      <h2>{cleanName}</h2>
                      <span className="investor-type">{investorType}</span>
                      
                      {/* Compatibility score as a green tag */}
                      <span className="compatibility-tag">
                        {formatCompatibilityScore(investor.compatibility_score)}
                      </span>
                    </div>

                    <div className="region-tags">
                      {investor.Geography.split(' ')
                        .filter((g) => !g.includes('+'))
                        .map((regionItem, i2) => (
                          <span key={i2} className="region-tag">
                            {regionItem}
                          </span>
                        ))}
                      {investor.Geography.split(' ').find((g) => g.includes('+')) && (
                        <span className="region-tag">+more</span>
                      )}
                    </div>

                    <div className="thesis">
                      <p className="field-label">Investment Thesis</p>
                      <p className="thesis-text">
                        {investor['Investment Thesis']}
                      </p>
                    </div>

                    <div className="row-details">
                      <div className="check-size">
                        <p className="field-label">Check Size</p>
                        <p className="field-value">{investor['Check Size']}</p>
                      </div>
                    </div>
                    
                    <div className="stage-container">
                      <div className="stage-tags-wrapper">
                        {investor.Stages.split(' ')
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
                    <a
                      href={`mailto:${investor['Fake Email']}`}
                      className="contact-button"
                    >
                      Contact
                    </a>

                    <Link
                      to={`/chat?name=${encodedName}
                            &type=${encodedType}
                            &thesis=${encodedThesis}
                            &checkSize=${encodedCheckSize}
                            &geography=${encodedGeography}
                            &stages=${encodedStages}`}
                      className="gemini-summarize-button"
                    >
                      Summarize with Gemini
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <svg
              className="no-results-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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

      {/* Add this CSS to your InvestorDatabase.css file */}
      <style jsx>{`
        .header-content.centered {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
        }

        /* New row-based layout */
        .investor-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .investor-row {
          display: flex;
          width: 100%;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .investor-row:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .row-content {
          display: flex;
          width: 100%;
          padding: 20px;
        }

        .row-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-width: 80px;
          margin-right: 20px;
        }

        .row-main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .row-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: center;
          min-width: 160px;
          margin-left: 20px;
        }

        /* Ranking display with offsets */
        .rank-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding-top: 10px;
        }

        .rank-numerator {
          font-size: 32px;
          color: #2563eb;
          font-weight: 700;
          position: relative;
          left: -6px; /* Offset to the left */
        }

        /* Compatibility tag */
        .compatibility-tag {
          display: inline-block;
          background-color: #10b981;
          color: white;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 600;
          margin-left: 10px;
        }

        /* Row header */
        .row-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .row-header h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          margin-right: 10px; /* added margin between name and investor type */
        }

        .row-details {
          display: flex;
          gap: 20px;
          margin-top: 10px;
        }

        /* Stage tags improvements */
        .stage-container {
          margin-top: 12px;
        }

        .stage-tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .stage-tag {
          display: inline-block;
          background-color: #dbeafe;
          color: #1e40af;
          font-size: 13px;
          padding: 4px 12px;
          border-radius: 4px;
          font-weight: 500;
          height: auto;
        }

        /* Field labels */
        .field-label {
          font-size: 14px;
          font-weight: 600;
          color: #4b5563;
          margin: 0 0 4px 0;
        }

        /* Modify skeleton for row layout */
        .skeleton-row {
          width: 100%;
          height: 180px;
          padding: 20px;
        }

        /* Reanalyze button styling */
        .reanalyze-button {
          display: flex;
          align-items: center;
          gap: 4px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-left: auto;
        }

        .reanalyze-button:hover {
          background-color: #1d4ed8;
        }

        .refresh-icon {
          width: 14px;
          height: 14px;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .row-content {
            flex-direction: column;
          }

          .row-left {
            flex-direction: row;
            justify-content: flex-start;
            margin-right: 0;
            margin-bottom: 15px;
          }

          .rank-display {
            flex-direction: row;
            align-items: baseline;
            padding-top: 0;
          }

          .rank-numerator {
            margin-right: 5px;
            left: 0;
          }

          .row-actions {
            flex-direction: row;
            margin-left: 0;
            margin-top: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default InvestorDatabase;
