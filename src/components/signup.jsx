import React, { useState, useEffect } from 'react';
import { ArrowRight, Briefcase, DollarSign, MapPin, BarChart2, Users, FileText, Building, Globe, Target, Database, PhoneCall } from 'lucide-react';

// CSS styles without Tailwind
const styles = {
    container: {
        backgroundColor: '#FAFBFD',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    },
    formContainer: {
        width: '100%',
        maxWidth: '640px',
        backgroundColor: '#FAFBFD',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(50, 50, 50, 0.1)',
        padding: '32px'
    },
    progressContainer: {
        marginBottom: '32px'
    },
    progressBar: {
        height: '8px',
        width: '100%',
        backgroundColor: '#B6C2CE',
        borderRadius: '9999px',
        overflow: 'hidden'
    },
    progressIndicator: {
        height: '100%',
        backgroundColor: '#4D766E',
        transition: 'width 0.3s ease-in-out'
    },
    progressLabels: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px',
        fontSize: '12px',
        color: '#688990'
    },
    formSection: {
        marginBottom: '24px'
    },
    header: {
        textAlign: 'center',
        marginBottom: '32px'
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#323232',
        marginBottom: '8px'
    },
    subtitle: {
        fontSize: '16px',
        color: '#688990',
        marginTop: '8px'
    },
    formRow: {
        marginBottom: '24px'
    },
    label: {
        display: 'block',
        color: '#323232',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '8px'
    },
    labelWithIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        width: '20px',
        height: '20px',
        marginRight: '8px',
        color: '#4D766E'
    },
    input: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#FAFBFD',
        border: '1px solid #B6C2CE',
        borderRadius: '8px',
        fontSize: '16px',
        outline: 'none',
        transition: 'all 0.2s ease'
    },
    inputFocus: {
        borderColor: '#4D766E',
        boxShadow: '0 0 0 2px rgba(77, 118, 110, 0.25)'
    },
    select: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#FAFBFD',
        border: '1px solid #B6C2CE',
        borderRadius: '8px',
        fontSize: '16px',
        outline: 'none',
        transition: 'all 0.2s ease'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#FAFBFD',
        border: '1px solid #B6C2CE',
        borderRadius: '8px',
        fontSize: '16px',
        minHeight: '120px',
        outline: 'none',
        transition: 'all 0.2s ease',
        resize: 'vertical'
    },
    helpText: {
        fontSize: '12px',
        color: '#688990',
        marginTop: '4px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '32px'
    },
    button: {
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: '500',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    primaryButton: {
        backgroundColor: '#4D766E',
        color: '#FAFBFD',
        border: 'none',
        display: 'flex',
        alignItems: 'center'
    },
    primaryButtonHover: {
        backgroundColor: '#323232'
    },
    secondaryButton: {
        backgroundColor: '#FAFBFD',
        color: '#323232',
        border: '1px solid #B6C2CE'
    },
    secondaryButtonHover: {
        backgroundColor: '#B6C2CE'
    },
    buttonIcon: {
        marginLeft: '8px',
        width: '16px',
        height: '16px'
    },
    infoCard: {
        padding: '16px',
        backgroundColor: '#F0F4F5',
        border: '1px solid #B6C2CE',
        borderRadius: '8px',
        marginBottom: '24px'
    },
    infoCardHeader: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    infoCardTitle: {
        fontWeight: '500',
        color: '#4D766E',
        marginBottom: '4px'
    },
    infoCardText: {
        fontSize: '14px',
        color: '#688990'
    },
    listContainer: {
        marginTop: '8px',
        marginLeft: '24px'
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '4px',
        fontSize: '14px',
        color: '#688990'
    },
    listDot: {
        width: '6px',
        height: '6px',
        backgroundColor: '#4D766E',
        borderRadius: '50%',
        marginRight: '8px'
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    flexGrow: {
        flexGrow: 1
    },
    successIcon: {
        width: '64px',
        height: '64px',
        backgroundColor: '#F0F4F5',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        marginBottom: '24px'
    },
    successIconInner: {
        width: '32px',
        height: '32px',
        color: '#4D766E'
    },
    nextStepsCard: {
        backgroundColor: '#FAFBFD',
        border: '1px solid #B6C2CE',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '480px',
        margin: '0 auto',
        marginBottom: '32px'
    },
    nextStepsList: {
        textAlign: 'left',
        color: '#323232',
        margin: '0',
        padding: '0',
        listStyleType: 'none'
    },
    nextStepsItem: {
        display: 'flex',
        marginBottom: '12px'
    },
    nextStepsNumber: {
        fontWeight: '500',
        color: '#4D766E',
        marginRight: '8px'
    }
};

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
        geographyPreference: '',
        checkSizeMin: '',
        checkSizeMax: '',
    });

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('startupSignupData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // Save data to localStorage whenever formData changes
    useEffect(() => {
        localStorage.setItem('startupSignupData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMultiSelect = (e) => {
        const { name } = e.target;
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({ ...prev, [name]: values }));
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // Component for form input with icon
    const InputWithIcon = ({ icon, label, name, type = "text", value, onChange, placeholder, options, multiple }) => {
        const Icon = icon;

        return (
            <div style={styles.formRow}>
                <label style={styles.label} htmlFor={name}>
                    <div style={styles.labelWithIcon}>
                        <Icon style={styles.icon} />
                        <span>{label}</span>
                    </div>
                </label>

                {options ? (
                    <select
                        style={styles.select}
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
                        style={styles.input}
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

    // Progress indicator
    const ProgressIndicator = () => {
        const totalSteps = 5;
        const progress = (step / totalSteps) * 100;

        return (
            <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                    <div
                        style={{...styles.progressIndicator, width: `${progress}%`}}
                    ></div>
                </div>
                <div style={styles.progressLabels}>
                    <span>Startup Details</span>
                    <span>Additional Info</span>
                    <span>VC Preferences</span>
                    <span>Check Size</span>
                    <span>Complete</span>
                </div>
            </div>
        );
    };

    // Content based on step
    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Tell us about your startup</h1>
                            <p style={styles.subtitle}>Help us match you with the right investors</p>
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

                        <div style={styles.buttonContainer}>
                            <div></div> {/* Empty div for spacing */}
                            <button
                                onClick={nextStep}
                                style={{...styles.button, ...styles.primaryButton}}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                            >
                                Continue <ArrowRight style={styles.buttonIcon} />
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Additional Startup Details</h1>
                            <p style={styles.subtitle}>These details help us find your perfect investor match</p>
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

                        <div style={styles.formRow}>
                            <label style={styles.label} htmlFor="pitchSummary">
                                <div style={styles.labelWithIcon}>
                                    <FileText style={styles.icon} />
                                    <span>Pitch Summary (optional)</span>
                                </div>
                            </label>
                            <textarea
                                style={styles.textarea}
                                id="pitchSummary"
                                name="pitchSummary"
                                rows="4"
                                value={formData.pitchSummary}
                                onChange={handleChange}
                                placeholder="Brief description of your startup and what makes it unique..."
                            ></textarea>
                        </div>

                        <div style={styles.buttonContainer}>
                            <button
                                onClick={prevStep}
                                style={{...styles.button, ...styles.secondaryButton}}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                style={{...styles.button, ...styles.primaryButton}}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                            >
                                Continue <ArrowRight style={styles.buttonIcon} />
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Investor Preferences</h1>
                            <p style={styles.subtitle}>Customize your VC matches from our database of 6,000+ investors</p>
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label} htmlFor="investmentStage">
                                <div style={styles.labelWithIcon}>
                                    <Target style={styles.icon} />
                                    <span>Investment Stage Preference (select multiple)</span>
                                </div>
                            </label>
                            <select
                                style={styles.select}
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
                            <p style={styles.helpText}>Hold Ctrl/Cmd to select multiple options</p>
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label} htmlFor="industryFocus">
                                <div style={styles.labelWithIcon}>
                                    <Briefcase style={styles.icon} />
                                    <span>Industry Focus (select multiple)</span>
                                </div>
                            </label>
                            <select
                                style={styles.select}
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
                            <p style={styles.helpText}>Hold Ctrl/Cmd to select multiple options</p>
                        </div>

                        <InputWithIcon
                            icon={Globe}
                            label="Geography Preference"
                            name="geographyPreference"
                            value={formData.geographyPreference}
                            onChange={handleChange}
                            placeholder="e.g. North America, Europe, Global"
                        />

                        <div style={styles.buttonContainer}>
                            <button
                                onClick={prevStep}
                                style={{...styles.button, ...styles.secondaryButton}}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                style={{...styles.button, ...styles.primaryButton}}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                            >
                                Continue <ArrowRight style={styles.buttonIcon} />
                            </button>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Almost Done!</h1>
                            <p style={styles.subtitle}>Just a few more details to optimize your matches</p>
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label}>
                                <div style={styles.labelWithIcon}>
                                    <DollarSign style={styles.icon} />
                                    <span>Investment Check Size Range</span>
                                </div>
                            </label>
                            <div style={styles.flexRow}>
                                <div style={styles.flexGrow}>
                                    <label style={styles.helpText}>Minimum ($)</label>
                                    <input
                                        style={styles.input}
                                        type="number"
                                        name="checkSizeMin"
                                        placeholder="e.g. 100000"
                                        value={formData.checkSizeMin}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={styles.flexGrow}>
                                    <label style={styles.helpText}>Maximum ($)</label>
                                    <input
                                        style={styles.input}
                                        type="number"
                                        name="checkSizeMax"
                                        placeholder="e.g. 500000"
                                        value={formData.checkSizeMax}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={styles.infoCard}>
                            <div style={styles.infoCardHeader}>
                                <Database style={{...styles.icon, marginTop: '4px'}} />
                                <div>
                                    <h3 style={styles.infoCardTitle}>VC Database Insights</h3>
                                    <p style={styles.infoCardText}>
                                        Our database includes 6,000+ VCs with detailed profiles including:
                                    </p>
                                    <div style={styles.listContainer}>
                                        <div style={styles.listItem}>
                                            <div style={styles.listDot}></div>
                                            Past portfolio companies
                                        </div>
                                        <div style={styles.listItem}>
                                            <div style={styles.listDot}></div>
                                            Investment thesis details
                                        </div>
                                        <div style={styles.listItem}>
                                            <div style={styles.listDot}></div>
                                            Contact information
                                        </div>
                                        <div style={styles.listItem}>
                                            <div style={styles.listDot}></div>
                                            Current fund size and focus
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={styles.buttonContainer}>
                            <button
                                onClick={prevStep}
                                style={{...styles.button, ...styles.secondaryButton}}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                style={{...styles.button, ...styles.primaryButton}}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                            >
                                Find My Matches <ArrowRight style={styles.buttonIcon} />
                            </button>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div style={{textAlign: 'center', padding: '32px 0'}}>
                        <div style={styles.successIcon}>
                            <svg style={styles.successIconInner} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>

                        <h1 style={styles.title}>Profile Complete!</h1>
                        <p style={{...styles.subtitle, maxWidth: '480px', margin: '0 auto', marginBottom: '32px'}}>
                            We're analyzing your startup profile against our database of 6,000+ VCs to find your perfect matches.
                        </p>

                        <div style={styles.nextStepsCard}>
                            <h3 style={{...styles.label, display: 'flex', alignItems: 'center', marginBottom: '12px'}}>
                                <PhoneCall style={styles.icon} />
                                Next Steps
                            </h3>
                            <ol style={styles.nextStepsList}>
                                <li style={styles.nextStepsItem}>
                                    <span style={styles.nextStepsNumber}>1.</span>
                                    <span>We'll email you your personalized VC matches within 24 hours</span>
                                </li>
                                <li style={styles.nextStepsItem}>
                                    <span style={styles.nextStepsNumber}>2.</span>
                                    <span>Review your matches and their investment criteria</span>
                                </li>
                                <li style={styles.nextStepsItem}>
                                    <span style={styles.nextStepsNumber}>3.</span>
                                    <span>Request introductions to VCs that align with your startup</span>
                                </li>
                            </ol>
                        </div>

                        <button
                            style={{...styles.button, ...styles.primaryButton, margin: '0 auto'}}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
                            onClick={() => {
                                alert("Form data has been saved to local storage!");
                                console.log("Saved data:", JSON.parse(localStorage.getItem('startupSignupData')));
                            }}
                        >
                            Go to Dashboard
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                {step < 5 && <ProgressIndicator />}
                {renderStep()}
            </div>
        </div>
    );
};

export default SignupFlow;
