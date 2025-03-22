import React, { useState, useEffect } from 'react';
import './InvestorDatabase.css'; // We'll define this CSS file below

const InvestorDatabase = () => {
    // Parse the CSV data
    const rawData = `Investor Name,Geography,Check Size,Stages,Investment Thesis,Contact Info
Rhodium Ventures Family office,Israel USA +1,$50k to $1M,1. Idea or Patent 2. Prototype +3,"We invest in Internet & Impact, globally",rhodium746@investco.org
NGP Capital VC firm,USA China +4,$5M to $10M,3. Early Revenue,"We invest in early-stage B2B companies from Series A onwards in Europe, the US, Israel, and China within enterprise...",ngp899@investco.org
Nahim Bin Moussa Solo angel,Bahrain Kuwait +4,$1k to $25k,2. Prototype 3. Early Revenue +1,"I invest in MENA-based startups with $100k-$1m+ in revenue, and 15%+ MoM growth",nahim710@vcfirm.com
Techmind Angel network,France Spain +1,$50k to $1M,1. Idea or Patent 2. Prototype +2,We invest in early stage startups based in Europe.,techmind551@vcfirm.com
Sentor Investments Family office,Indonesia Singapore +3,$50k to $1M,3. Early Revenue 4. Scaling +2,We invest in many sectors and across numerous regions. We have an open mandate to invest in scale up and growth stage...,sentor209@startuplab.net
Haatch VC firm,UK,$150k to $620k,1. Idea or Patent 2. Prototype +1,We invest in UK-based B2B SaaS pre-seed or seed stage start-ups. Haatch is industry-agnostic with a portfolio across...,haatch256@investco.org
Pario Ventures VC firm,USA UK,$100k to $20M,2. Prototype 3. Early Revenue +3,"We invest in Automotive, Mobility, Fintech, Oil and Gas, and open to other areas if the right deal. Blockchain startups...",pario157@investco.org
OVC Ventures Angel network,UK USA +25,$150k to $1.5M,3. Early Revenue 4. Scaling +1,"We invest in all sectors, move fast (two weeks), have a high preference for startups that can demonstrate initial...",ovc166@vcfirm.com
NVP Norwest Venture Pa... VC firm,Canada USA +2,$500k to $10M,1. Idea or Patent 2. Prototype +4,"We invest in all verticals with a focus on healthcare, consumer, enterprise...",nvp302@vcfirm.com
UVC Partners VC firm,Germany Switzerland +6,$500k to $5M,2. Prototype 3. Early Revenue +1,"We invest in early-stage B2B tech startups in Europe in the fields of Enteprise Software, Industrial Technologies and...",uvc895@vcfirm.com`;

    // Parse CSV into array of objects
    const parseCSV = (csv) => {
        const lines = csv.split('\n');
        const headers = lines[0].split(',');

        return lines.slice(1).map(line => {
            // Handle commas in quoted fields
            const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
            const parts = line.match(regex) || [];

            const obj = {};
            parts.forEach((part, i) => {
                // Remove quotes if present
                const value = part.startsWith('"') && part.endsWith('"')
                    ? part.slice(1, -1)
                    : part;
                obj[headers[i]] = value;
            });

            return obj;
        });
    };

    const investorData = parseCSV(rawData);

    // States
    const [investors, setInvestors] = useState(investorData);
    const [filteredInvestors, setFilteredInvestors] = useState(investorData);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [regionFilter, setRegionFilter] = useState('All');
    const [stageFilter, setStageFilter] = useState('All');
    const [checkSizeFilter, setCheckSizeFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(false);

    // Extract unique values for filters
    const getInvestorTypes = () => {
        const types = new Set();
        investors.forEach(investor => {
            const name = investor['Investor Name'];
            if (name.includes('VC firm')) types.add('VC Firm');
            else if (name.includes('Angel network')) types.add('Angel Network');
            else if (name.includes('Family office')) types.add('Family Office');
            else if (name.includes('Solo angel')) types.add('Solo Angel');
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

    // Filter function
    useEffect(() => {
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
                    const checkSize = investor['Check Size'];
                    if (checkSizeFilter === 'Under $100k') {
                        return checkSize.includes('$1k') || checkSize.includes('$5k') || checkSize.includes('$10k') ||
                            checkSize.includes('$25k') || checkSize.includes('$50k');
                    } else if (checkSizeFilter === '$100k-$1M') {
                        return checkSize.includes('$100k') || checkSize.includes('$150k') || checkSize.includes('$200k') ||
                            checkSize.includes('$500k') || (checkSize.includes('$1M') && !checkSize.includes('$10M'));
                    } else if (checkSizeFilter === '$1M-$5M') {
                        return (checkSize.includes('$1M') || checkSize.includes('$2M') ||
                                checkSize.includes('$3M') || checkSize.includes('$4M') || checkSize.includes('$5M')) &&
                            !checkSize.includes('$10M');
                    } else if (checkSizeFilter === '$5M+') {
                        return checkSize.includes('$5M') || checkSize.includes('$10M') || checkSize.includes('$20M');
                    }
                    return false;
                });
            }

            setFilteredInvestors(results);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, typeFilter, regionFilter, stageFilter, checkSizeFilter, investors]);

    // Reset filters
    const resetFilters = () => {
        setSearchTerm('');
        setTypeFilter('All');
        setRegionFilter('All');
        setStageFilter('All');
        setCheckSizeFilter('All');
    };

    // Extract investor type from name
    const getInvestorType = (name) => {
        if (name.includes('VC firm')) return 'VC Firm';
        if (name.includes('Angel network')) return 'Angel Network';
        if (name.includes('Family office')) return 'Family Office';
        if (name.includes('Solo angel')) return 'Solo Angel';
        return 'Investor';
    };

    // Clean investor name
    const cleanInvestorName = (name) => {
        return name.replace(' VC firm', '')
            .replace(' Angel network', '')
            .replace(' Family office', '')
            .replace(' Solo angel', '')
            .replace('...', '');
    };

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
                                <div className="card-content">
                                    <div className="card-header">
                                        <h2>{cleanName}</h2>
                                        <span className="investor-type">{investorType}</span>
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
                                    <span className="contact-info">{investor['Contact Info']}</span>
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