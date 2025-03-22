import React, { useState } from 'react';
import { ArrowRight, Briefcase, DollarSign, MapPin, BarChart2, Users, FileText, Building, Globe, Target, Database, PhoneCall } from 'lucide-react';

const SignupFlow = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Startup info
        industry: '',
        stage: '',
        businessModel: '',
        location: '',
        traction: '',
        teamExperience: '',
        pitchSummary: '',
        // VC preferences for matching
        investmentStage: [],
        industryFocus: [],
        geographyPreference: [],
        checkSizeMin: '',
        checkSizeMax: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMultiSelect = (e) => {
        const { name, value } = e.target;
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({ ...prev, [name]: values }));
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // Component for form input with icon
    const InputWithIcon = ({ icon, label, name, type = "text", value, onChange, placeholder, options, multiple }) => {
        const Icon = icon;

        return (
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={name}>
                    <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-2 text-blue-500" />
                        <span>{label}</span>
                    </div>
                </label>

                {options ? (
                    <select
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        id={name}
                        name={name}
                        value={value}
                        onChange={multiple ? handleMultiSelect : onChange}
                        multiple={multiple}
                        size={multiple ? 5 : 1}
                    >
                        {!multiple && <option value="">Select an option</option>}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                )}
            </div>
        );
    };

    // Input options
    const industryOptions = [
        { value: 'fintech', label: 'Fintech' },
        { value: 'healthtech', label: 'Healthtech' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'saas', label: 'SaaS' },
        { value: 'ai', label: 'AI / Machine Learning' },
        { value: 'edtech', label: 'Edtech' },
        { value: 'cleantech', label: 'Cleantech' },
        { value: 'other', label: 'Other' }
    ];

    const stageOptions = [
        { value: 'idea', label: 'Idea Stage' },
        { value: 'pre-seed', label: 'Pre-Seed' },
        { value: 'seed', label: 'Seed' },
        { value: 'series-a', label: 'Series A' },
        { value: 'series-b', label: 'Series B' },
        { value: 'series-c', label: 'Series C+' },
        { value: 'growth', label: 'Growth' }
    ];

    const businessModelOptions = [
        { value: 'b2b', label: 'B2B' },
        { value: 'b2c', label: 'B2C' },
        { value: 'b2b2c', label: 'B2B2C' },
        { value: 'saas', label: 'SaaS' },
        { value: 'marketplace', label: 'Marketplace' },
        { value: 'hardware', label: 'Hardware' },
        { value: 'subscription', label: 'Subscription' }
    ];

    // Content based on step
    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Tell us about your startup</h1>
                            <p className="text-gray-600 mt-2">Help us match you with the right investors</p>
                        </div>

                        <InputWithIcon
                            icon={Briefcase}
                            label="Industry / Sector"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            options={industryOptions}
                        />

                        <InputWithIcon
                            icon={Target}
                            label="Startup Stage"
                            name="stage"
                            value={formData.stage}
                            onChange={handleChange}
                            options={stageOptions}
                        />

                        <InputWithIcon
                            icon={Building}
                            label="Business Model"
                            name="businessModel"
                            value={formData.businessModel}
                            onChange={handleChange}
                            options={businessModelOptions}
                        />

                        <InputWithIcon
                            icon={MapPin}
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="City, Country"
                        />

                        <div className="flex justify-end mt-8">
                            <button
                                onClick={nextStep}
                                className="flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Continue <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Additional Startup Details</h1>
                            <p className="text-gray-600 mt-2">These details help us find your perfect investor match</p>
                        </div>

                        <InputWithIcon
                            icon={BarChart2}
                            label="Traction (revenue, users, etc.)"
                            name="traction"
                            value={formData.traction}
                            onChange={handleChange}
                            placeholder="e.g. $10K MRR, 5,000 active users"
                        />

                        <InputWithIcon
                            icon={Users}
                            label="Team Experience (optional)"
                            name="teamExperience"
                            value={formData.teamExperience}
                            onChange={handleChange}
                            placeholder="Brief overview of your team's background"
                        />

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="pitchSummary">
                                <div className="flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-blue-500" />
                                    <span>Pitch Summary (optional)</span>
                                </div>
                            </label>
                            <textarea
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                id="pitchSummary"
                                name="pitchSummary"
                                rows="4"
                                value={formData.pitchSummary}
                                onChange={handleChange}
                                placeholder="Brief description of your startup and what makes it unique..."
                            ></textarea>
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={prevStep}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Continue <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Investor Preferences</h1>
                            <p className="text-gray-600 mt-2">Customize your VC matches from our database of 6,000+ investors</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="investmentStage">
                                <div className="flex items-center">
                                    <Target className="w-5 h-5 mr-2 text-blue-500" />
                                    <span>Investment Stage Preference (select multiple)</span>
                                </div>
                            </label>
                            <select
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                id="investmentStage"
                                name="investmentStage"
                                multiple
                                size="4"
                                value={formData.investmentStage}
                                onChange={handleMultiSelect}
                            >
                                {stageOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple options</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="industryFocus">
                                <div className="flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
                                    <span>Industry Focus (select multiple)</span>
                                </div>
                            </label>
                            <select
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                id="industryFocus"
                                name="industryFocus"
                                multiple
                                size="4"
                                value={formData.industryFocus}
                                onChange={handleMultiSelect}
                            >
                                {industryOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple options</p>
                        </div>

                        <InputWithIcon
                            icon={Globe}
                            label="Geography Preference"
                            name="geographyPreference"
                            value={formData.geographyPreference}
                            onChange={handleChange}
                            placeholder="e.g. North America, Europe, Global"
                        />

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={prevStep}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Continue <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Almost Done!</h1>
                            <p className="text-gray-600 mt-2">Just a few more details to optimize your matches</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                <div className="flex items-center">
                                    <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
                                    <span>Investment Check Size Range</span>
                                </div>
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <label className="text-xs text-gray-500 mb-1 block">Minimum ($)</label>
                                    <input
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        type="number"
                                        name="checkSizeMin"
                                        placeholder="e.g. 100000"
                                        value={formData.checkSizeMin}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs text-gray-500 mb-1 block">Maximum ($)</label>
                                    <input
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        type="number"
                                        name="checkSizeMax"
                                        placeholder="e.g. 500000"
                                        value={formData.checkSizeMax}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <div className="flex items-start">
                                <Database className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                                <div>
                                    <h3 className="font-medium text-blue-800">VC Database Insights</h3>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Our database includes 6,000+ VCs with detailed profiles including:
                                    </p>
                                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                            Past portfolio companies
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                            Investment thesis details
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                            Contact information
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                            Current fund size and focus
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={prevStep}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Find My Matches <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-3">Profile Complete!</h1>
                        <p className="text-gray-600 max-w-md mx-auto mb-8">
                            We're analyzing your startup profile against our database of 6,000+ VCs to find your perfect matches.
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto mb-8">
                            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                                <PhoneCall className="w-5 h-5 mr-2 text-blue-500" />
                                Next Steps
                            </h3>
                            <ol className="text-left text-gray-600 space-y-3">
                                <li className="flex">
                                    <span className="font-medium text-blue-500 mr-2">1.</span>
                                    <span>We'll email you your personalized VC matches within 24 hours</span>
                                </li>
                                <li className="flex">
                                    <span className="font-medium text-blue-500 mr-2">2.</span>
                                    <span>Review your matches and their investment criteria</span>
                                </li>
                                <li className="flex">
                                    <span className="font-medium text-blue-500 mr-2">3.</span>
                                    <span>Request introductions to VCs that align with your startup</span>
                                </li>
                            </ol>
                        </div>

                        <button
                            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={() => alert("Dashboard would open here in the complete application")}
                        >
                            Go to Dashboard
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    // Progress indicator
    const ProgressIndicator = () => {
        const totalSteps = 5;
        const progress = (step / totalSteps) * 100;

        return (
            <div className="mb-8">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Startup Details</span>
                    <span>Additional Info</span>
                    <span>VC Preferences</span>
                    <span>Check Size</span>
                    <span>Complete</span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
                {step < 5 && <ProgressIndicator />}
                {renderStep()}
            </div>
        </div>
    );
};

export default SignupFlow;