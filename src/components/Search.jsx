import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
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

  // Fetch CSV from public/data/investors_cleaned.csv on mount
  useEffect(() => {
    fetch('/data/investors_cleaned.csv')
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });
        setInvestors(parsedData.data);
        setFilteredInvestors(parsedData.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching CSV:', err);
        setError('Failed to load investor data. Please try again later.');
        setIsLoading(false);
      });
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
            value.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      if (typeFilter !== 'All') {
        results = results.filter((investor) => {
          const name = investor['Investor Name'];
          if (typeFilter === 'VC Firm' && name.includes('VC firm')) return true;
          if (typeFilter === 'Angel Network' && name.includes('Angel network'))
            return true;
          if (typeFilter === 'Family Office' && name.includes('Family office'))
            return true;
          if (typeFilter === 'Solo Angel' && name.includes('Solo angel'))
            return true;
          if (typeFilter === 'Startup Studio' && name.includes('Startup studio'))
            return true;
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
          const checkSize = normalizeCheckSize(investor['Check Size']);
          if (checkSizeFilter === 'Under $100k') {
            return (
              checkSize.includes('$1k') ||
              checkSize.includes('$5k') ||
              checkSize.includes('$10k') ||
              checkSize.includes('$25k') ||
              checkSize.includes('$50k')
            );
          } else if (checkSizeFilter === '$100k-$1M') {
            return (
              checkSize.includes('$100k') ||
              checkSize.includes('$150k') ||
              checkSize.includes('$200k') ||
              checkSize.includes('$500k') ||
              (checkSize.includes('$1m') && !checkSize.includes('$10m'))
            );
          } else if (checkSizeFilter === '$1M-$5M') {
            return (
              (checkSize.includes('$1m') ||
                checkSize.includes('$2m') ||
                checkSize.includes('$3m') ||
                checkSize.includes('$4m') ||
                checkSize.includes('$5m')) &&
              !checkSize.includes('$10m')
            );
          } else if (checkSizeFilter === '$5M+') {
            return (
              checkSize.includes('$5m') ||
              checkSize.includes('$10m') ||
              checkSize.includes('$20m')
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
          const cleanName = cleanInvestorName(investor['Investor Name']);
          rankMap.set(cleanName, index + 1);
        });
        results = sortInvestorsByName(results).map((investor) => {
          const cleanName = cleanInvestorName(investor['Investor Name']);
          return {
            ...investor,
            rank: rankMap.get(cleanName),
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
        <h1>Investor Explorer</h1>
        <p>Find the perfect investors for your startup</p>
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

      {/* Results */}
      <div className="card-grid">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card">
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
            return (
              <div key={index} className="investor-card">
                <div className="card-content">
                  <div className="card-header">
                    <h2>{cleanName}</h2>
                    <span className="investor-type">{investorType}</span>
                    {sortAlphabetically && investor.rank && (
                      <div className="rank-badge">
                        #{investor.rank}/{investor.totalCount}
                      </div>
                    )}
                  </div>

                  <div className="region-tags">
                    {investor.Geography.split(' ')
                      .filter((g) => !g.includes('+'))
                      .map((region, i) => (
                        <span key={i} className="region-tag">
                          {region}
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

                  <div className="check-size">
                    <p className="field-label">Check Size</p>
                    <p className="field-value">{investor['Check Size']}</p>
                  </div>

                  <div className="stage-tags">
                    {investor.Stages.split(' ')
                      .filter((s) => s.match(/\d\./))
                      .map((stage, i) => {
                        const stageMap = {
                          '1.': 'Idea/Patent',
                          '2.': 'Prototype',
                          '3.': 'Early Revenue',
                          '4.': 'Scaling',
                        };
                        const stageNum = stage.trim().replace(',', '');
                        return (
                          <span key={i} className="stage-tag">
                            {stageMap[stageNum] || stageNum}
                          </span>
                        );
                      })}
                  </div>
                </div>

                {/* Card footer pinned at the bottom */}
                <div className="card-footer">
                  <a
                    href={`mailto:${investor['Fake Email']}`}
                    className="contact-button"
                  >
                    Contact
                  </a>
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
    </div>
  );
};

export default InvestorDatabase;
