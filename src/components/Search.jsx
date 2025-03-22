import React, { useEffect, useState } from 'react';
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
    const [apiLoading, setApiLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState(null);
    const [sortAlphabetically, setSortAlphabetically] = useState(false);

    const loadingMessages = [
        "Analyzing your startup profile...",
        "Searching for perfect investor matches...",
        "Evaluating investment thesis alignment...",
        "Filtering by check size preferences...",
        "Assessing regional compatibility...",
        "Matching investors to your growth stage...",
        "Finding your ideal funding partners...",
        "Discovering hidden investment opportunities...",
        "Analyzing investor track records..."
    ];

    function formatCheckSize(min, max) {
        if (min && max) return `$${min} to $${max}`;
        if (min && !max) return `$${min}+`;
        return "";
    }

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("startupSignupData"));
        const hasCalledApi = localStorage.getItem("hasCalledVcMatcherApi") === "true";
        const cachedResults = localStorage.getItem("vcMatcherResults");

        if (savedData) {
            // If we have cached results, use them
            if (hasCalledApi && cachedResults) {
                try {
                    const parsedResults = JSON.parse(cachedResults);
                    console.log("Using cached VC matches:", parsedResults);
                    // Set your investors state here if needed
                    setIsLoading(false);
                    return;
                } catch (err) {
                    console.error("Error parsing cached results:", err);
                    // Continue with API call if cache parsing fails
                }
            }

            // Call API if we haven't before
            if (!hasCalledApi) {
                setApiLoading(true);
                startLoadingAnimation();

                const payload = {
                    industry: savedData.industry || "",
                    stage: savedData.stage || "",
                    business_model: savedData.businessModel || "",
                    location: savedData.location || "",
                    traction: savedData.traction || "",
                    team: savedData.teamExperience || "",
                    pitch: savedData.pitchSummary || "",
                    preferred_check_size: formatCheckSize(savedData.checkSizeMin, savedData.checkSizeMax),
                };

                console.log("Sending payload:", payload);

                fetch("https://vc-matcher-script-1096385495920.us-central1.run.app/rank-vcs", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("VC Matches:", data);
                        // Save results to localStorage to avoid future API calls
                        localStorage.setItem("vcMatcherResults", JSON.stringify(data));
                        localStorage.setItem("hasCalledVcMatcherApi", "true");
                        // You can save it to state here if needed
                        setInvestors(data);
                        setApiLoading(false);
                        setIsLoading(false);
                    })
                    .catch(err => {
                        console.error("Error fetching VC matches:", err);
                        setError("Failed to fetch investor matches. Please try again later.");
                        setApiLoading(false);
                        setIsLoading(false);
                    });
            } else {
                // We've called the API before but don't have valid cached results
                setIsLoading(false);
            }
        } else {
            // No saved data, so we're done loading
            setIsLoading(false);
        }
    }, []);

    // Function to animate the loading progress
    const startLoadingAnimation = () => {
        // Reset progress
        setLoadingProgress(0);
        
        // Set first message
        setLoadingMessage(loadingMessages[0]);
        
        let messageIndex = 0;
        
        // First phase: animated progress for 30 seconds (0-92%)
        const progressInterval = setInterval(() => {
            setLoadingProgress(prev => {
                // Change message every ~4 seconds
                if (prev % 12 === 0 && prev > 0) {
                    messageIndex = (messageIndex + 1) % loadingMessages.length;
                    setLoadingMessage(loadingMessages[messageIndex]);
                }
                
                // Increase progress until 92% over 30 seconds
                const newProgress = prev + 1;
                if (newProgress >= 92) {
                    clearInterval(progressInterval);
                    
                    // Set final message
                    setLoadingMessage("Almost there! Finalizing your matches...");
                }
                return newProgress >= 92 ? 92 : newProgress;
            });
        }, 326); // ~30 seconds to reach 92%
        
        // Return cleanup function
        return () => clearInterval(progressInterval);
    };

    // Parse CSV function with special handling for the specific format
    const parseCSV = (csvText) => {
        // Split the CSV text into lines
        const lines = csvText.trim().split('\n');

        // Extract headers from the first line
        const headers = ["Investor Name", "Geography", "Check Size", "Stages", "Investment Thesis"];

        // Parse each data line
        return lines.slice(1).map(line => {
            const result = {};
            let currentPosition = 0;
            let currentField = "";
            let inQuotes = false;
            let fieldIndex = 0;

            // Parse the investor name (first field)
            let nameEndIndex = line.indexOf(',', currentPosition);
            result[headers[0]] = line.substring(currentPosition, nameEndIndex);
            currentPosition = nameEndIndex + 1;
            fieldIndex++;

            // Parse the geography (second field)
            let geoEndIndex = findNextFieldEnd(line, currentPosition);
            result[headers[1]] = line.substring(currentPosition, geoEndIndex);
            currentPosition = geoEndIndex + 1;
            fieldIndex++;

            // Combine the check size fields which are split across columns
            let checkSizeStart = findNextFieldEnd(line, currentPosition);
            let checkSizeEnd = findNextFieldEnd(line, checkSizeStart + 1);
            result[headers[2]] = line.substring(currentPosition, checkSizeStart) +
                line.substring(checkSizeStart + 1, checkSizeEnd);
            currentPosition = checkSizeEnd + 1;
            fieldIndex++;

            // Parse the stages field
            let stagesEndIndex = findNextNonQuotedComma(line, currentPosition);
            if (stagesEndIndex === -1) {
                // Handle the case where there's no investment thesis (last line)
                result[headers[3]] = line.substring(currentPosition);
                result[headers[4]] = "";
            } else {
                result[headers[3]] = line.substring(currentPosition, stagesEndIndex);
                currentPosition = stagesEndIndex + 1;

                // The rest is the investment thesis
                let thesis = line.substring(currentPosition).trim();
                // Remove quotes if they exist
                if (thesis.startsWith('"') && thesis.endsWith('"')) {
                    thesis = thesis.substring(1, thesis.length - 1);
                }
                result[headers[4]] = thesis;
            }

            return result;
        });
    };

    // Helper function to find the next comma that's not inside quotes
    const findNextNonQuotedComma = (str, startPos) => {
        let inQuotes = false;

        for (let i = startPos; i < str.length; i++) {
            if (str[i] === '"' && (i === 0 || str[i - 1] !== '\\')) {
                inQuotes = !inQuotes;
            } else if (str[i] === ',' && !inQuotes) {
                return i;
            }
        }

        return -1;  // No unquoted comma found
    };

    // Helper function to find the end of the current field
    const findNextFieldEnd = (str, startPos) => {
        for (let i = startPos; i < str.length; i++) {
            if (str[i] === ',') {
                return i;
            }
        }
        return str.length;
    };

    // Normalize check size for filtering
    const normalizeCheckSize = (checkSize) => {
        // Remove spaces and convert to lowercase for consistent comparison
        return checkSize.replace(/\s+/g, '').toLowerCase();
    };

    // Extract unique values for filters
    const getInvestorTypes = () => {
        const types = new Set();
        investors.forEach(investor => {
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
        investors.forEach(investor => {
            const geographies = investor.Geography.split(' ');
            geographies.forEach(geo => {
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
            '4': 'Scaling'
        };

        const stages = new Set();
        investors.forEach(investor => {
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

    // Filter and sort function
    useEffect(() => {
        if (investors.length === 0) return;

        setIsLoading(true);

        const timer = setTimeout(() => {
            let results = [...investors];

            if (searchTerm) {
                results = results.filter(investor =>
                    Object.values(investor).some(value =>
                        value.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
            }

            if (typeFilter !== 'All') {
                results = results.filter(investor => {
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
                results = results.filter(investor =>
                    investor.Geography.includes(regionFilter)
                );
            }

            if (stageFilter !== 'All') {
                results = results.filter(investor => {
                    const stageMap = {
                        'Idea/Patent': '1.',
                        'Prototype': '2.',
                        'Early Revenue': '3.',
                        'Scaling': '4.'
                    };
                    return investor.Stages.includes(stageMap[stageFilter]);
                });
            }

            if (checkSizeFilter !== 'All') {
                results = results.filter(investor => {
                    const checkSize = normalizeCheckSize(investor['Check Size']);
                    if (checkSizeFilter === 'Under $100k') {
                        return checkSize.includes('$1k') || checkSize.includes('$5k') || checkSize.includes('$10k') ||
                            checkSize.includes('$25k') || checkSize.includes('$50k');
                    } else if (checkSizeFilter === '$100k-$1M') {
                        return checkSize.includes('$100k') || checkSize.includes('$150k') || checkSize.includes('$200k') ||
                            checkSize.includes('$500k') || (checkSize.includes('$1m') && !checkSize.includes('$10m'));
                    } else if (checkSizeFilter === '$1M-$5M') {
                        return (checkSize.includes('$1m') || checkSize.includes('$2m') ||
                            checkSize.includes('$3m') || checkSize.includes('$4m') || checkSize.includes('$5m')) &&
                            !checkSize.includes('$10m');
                    } else if (checkSizeFilter === '$5M+') {
                        return checkSize.includes('$5m') || checkSize.includes('$10m') || checkSize.includes('$20m');
                    }
                    return false;
                });
            }

            // Sort alphabetically if the toggle is on
            if (sortAlphabetically) {
                // Get the full alphabetical ordering of all investors (for ranking)
                const allInvestorsSorted = sortInvestorsByName([...investors]);
                const rankMap = new Map();

                // Create a map of investor name to rank
                allInvestorsSorted.forEach((investor, index) => {
                    const cleanName = cleanInvestorName(investor['Investor Name']);
                    rankMap.set(cleanName, index + 1);
                });

                // Sort the filtered results and add rank info
                results = sortInvestorsByName(results).map(investor => {
                    const cleanName = cleanInvestorName(investor['Investor Name']);
                    return {
                        ...investor,
                        rank: rankMap.get(cleanName),
                        totalCount: investors.length
                    };
                });
            }

            setFilteredInvestors(results);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, typeFilter, regionFilter, stageFilter, checkSizeFilter, investors, sortAlphabetically]);

    // Function to sort investors alphabetically by name
    const sortInvestorsByName = (investors) => {
        return [...investors].sort((a, b) => {
            const nameA = cleanInvestorName(a['Investor Name']).toLowerCase();
            const nameB = cleanInvestorName(b['Investor Name']).toLowerCase();
            return nameA.localeCompare(nameB);
        });
    };

    // Toggle sort function
    const toggleSortOrder = () => {
        setSortAlphabetically(!sortAlphabetically);
    };

    // Reset filters
    const resetFilters = () => {
        setSearchTerm('');
        setTypeFilter('All');
        setRegionFilter('All');
        setStageFilter('All');
        setCheckSizeFilter('All');
        setSortAlphabetically(false);
    };

    // Extract investor type from name
    const getInvestorType = (name) => {
        if (name.includes('VC firm')) return 'VC Firm';
        if (name.includes('Angel network')) return 'Angel Network';
        if (name.includes('Family office')) return 'Family Office';
        if (name.includes('Solo angel')) return 'Solo Angel';
        if (name.includes('Startup studio')) return 'Startup Studio';
        return 'Investor';
    };

    // Clean investor name
    const cleanInvestorName = (name) => {
        return name.replace(' VC firm', '')
            .replace(' Angel network', '')
            .replace(' Family office', '')
            .replace(' Solo angel', '')
            .replace(' Startup studio', '')
            .replace('...', '');
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

    if (apiLoading) {
        return (
            <div className="loading-container">
                <h2>Finding Your Perfect Investors</h2>
                <div className="loading-message">{loadingMessage}</div>
                <div className="progress-container">
                    <div 
                        className="progress-bar" 
                        style={{ width: `${loadingProgress}%` }}
                    >
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

    return (
        <div className="app-container">
            {/* Header */}
            <header className="header">
                <h1>Investor Explorer</h1>
                <p>Find the perfect investors for your startup</p>
            </header>

            {/* Search and filters */}
            <div className="filter-container">
                <div className="filter-row">
                    {/* Search input */}
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

                    {/* Investor Type filter */}
                    <div className="filter-select">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="" disabled>Investor Type</option>
                            {getInvestorTypes().map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Region filter */}
                    <div className="filter-select">
                        <select
                            value={regionFilter}
                            onChange={(e) => setRegionFilter(e.target.value)}
                        >
                            <option value="" disabled>Region</option>
                            {getRegions().map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>

                    {/* Stage filter */}
                    <div className="filter-select">
                        <select
                            value={stageFilter}
                            onChange={(e) => setStageFilter(e.target.value)}
                        >
                            <option value="" disabled>Stage</option>
                            {getStages().map(stage => (
                                <option key={stage} value={stage}>{stage}</option>
                            ))}
                        </select>
                    </div>

                    {/* Check size filter */}
                    <div className="filter-select">
                        <select
                            value={checkSizeFilter}
                            onChange={(e) => setCheckSizeFilter(e.target.value)}
                        >
                            <option value="" disabled>Check Size</option>
                            {getCheckSizes().map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Toggle for alphabetical sorting */}
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

                {/* Filter info and reset */}
                <div className="filter-footer">
                    <p className="result-count">
                        Showing {filteredInvestors.length} of {investors.length} investors
                    </p>
                    <button
                        onClick={resetFilters}
                        className="reset-button"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="card-grid">
                {isLoading ? (
                    // Loading skeleton cards
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
                                {/* Rank badge (only shown when sorting alphabetically) */}


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
                                        {investor.Geography.split(' ').filter(g => !g.includes('+')).map((region, i) => (
                                            <span key={i} className="region-tag">{region}</span>
                                        ))}
                                        {investor.Geography.split(' ').find(g => g.includes('+')) && (
                                            <span className="region-tag">+more</span>
                                        )}
                                    </div>

                                    <div className="check-size">
                                        <p className="field-label">Check Size</p>
                                        <p className="field-value">{investor['Check Size']}</p>
                                    </div>

                                    <div className="thesis">
                                        <p className="field-label">Investment Thesis</p>
                                        <p className="thesis-text">{investor['Investment Thesis']}</p>
                                    </div>

                                    <div className="stage-tags">
                                        {investor.Stages.split(' ').filter(s => s.match(/\d\./)).map((stage, i) => {
                                            const stageMap = {
                                                '1.': 'Idea/Patent',
                                                '2.': 'Prototype',
                                                '3.': 'Early Revenue',
                                                '4.': 'Scaling'
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

                                <div className="card-footer">
                                    <button className="contact-button">Contact</button>
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
                        <button
                            onClick={resetFilters}
                            className="reset-button large"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvestorDatabase;