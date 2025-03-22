import { ArrowRight, BarChart2, Briefcase, Building, Database, DollarSign, Edit, FileText, Globe, MapPin, PhoneCall, Target, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
    },
    profileSummary: {
        backgroundColor: '#F0F4F5',
        border: '1px solid #B6C2CE',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px'
    },
    profileSection: {
        marginBottom: '16px'
    },
    profileSectionTitle: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#4D766E',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileDetail: {
        display: 'flex',
        marginBottom: '4px'
    },
    profileLabel: {
        width: '140px',
        fontSize: '14px',
        color: '#688990',
        fontWeight: '500'
    },
    profileValue: {
        flex: '1',
        fontSize: '14px',
        color: '#323232'
    },
    editButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#4D766E',
        cursor: 'pointer',
        padding: '4px',
        borderRadius: '4px',
        fontSize: '14px'
    },
    editIcon: {
        width: '16px',
        height: '16px',
        marginRight: '4px'
    },
    tabContainer: {
        display: 'flex',
        borderBottom: '1px solid #B6C2CE',
        marginBottom: '24px'
    },
    tab: {
        padding: '12px 24px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        color: '#688990',
        borderBottom: '2px solid transparent'
    },
    activeTab: {
        color: '#4D766E',
        borderBottom: '2px solid #4D766E'
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
    const [completed, setCompleted] = useState(false);
    const [editMode, setEditMode] = useState({
        startup: false,
        additional: false,
        preferences: false,
        checkSize: false
    });
    const [activeTab, setActiveTab] = useState('profile');

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('startupSignupData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
            // Check if form was previously completed
            const wasCompleted = localStorage.getItem('startupSignupCompleted');
            if (wasCompleted === 'true') {
                setCompleted(true);
            }
        }
    }, []);

    // Save data to localStorage whenever formData changes
    useEffect(() => {
        localStorage.setItem('startupSignupData', JSON.stringify(formData));
        if (completed) {
            localStorage.setItem('startupSignupCompleted', 'true');
        }
    }, [formData, completed]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMultiSelect = (e) => {
        const { name } = e.target;
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({ ...prev, [name]: values }));
    };

// Update the nextStep function to handle edit mode
    const nextStep = () => {
        if (step === 5) {
            setCompleted(true);
        } else {
            // Check if we're in edit mode and moving from one section to another
            if (Object.values(editMode).some(val => val)) {
                // Save the current section based on step
                switch(step) {
                    case 1:
                        setEditMode(prev => ({ ...prev, startup: false }));
                        break;
                    case 2:
                        setEditMode(prev => ({ ...prev, additional: false }));
                        break;
                    case 3:
                        setEditMode(prev => ({ ...prev, preferences: false }));
                        break;
                    case 4:
                        setEditMode(prev => ({ ...prev, checkSize: false }));
                        break;
                    default:
                        break;
                }
            }
            setStep(step + 1);
        }
    };

// Update the prevStep function to handle edit mode
    const prevStep = () => {
        if (Object.values(editMode).some(val => val) && step === 1) {
            // If in edit mode and at first step, cancel edit and return to profile
            setEditMode({
                startup: false,
                additional: false,
                preferences: false,
                checkSize: false
            });
            setStep(5);
        } else {
            setStep(step - 1);
        }
    };
    const startEditing = (section) => {
        setEditMode(prev => ({ ...prev, [section]: true }));
        // Set step based on section
        switch(section) {
            case 'startup':
                setStep(1);
                break;
            case 'additional':
                setStep(2);
                break;
            case 'preferences':
                setStep(3);
                break;
            case 'checkSize':
                setStep(4);
                break;
            default:
                break;
        }
    };

    const saveChanges = (section) => {
        setEditMode(prev => ({ ...prev, [section]: false }));
        // Return to profile view
        setStep(5);
    };

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

    // Helper function to get label from value for selects
    const getLabelFromValue = (options, value) => {
        const option = options.find(opt => opt.value === value);
        return option ? option.label : value;
    };

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

    // Profile view component
    const ProfileView = () => {
        return (
            <div>
                <div style={styles.header}>
                    <h1 style={styles.title}>Your Startup Profile</h1>
                    <p style={styles.subtitle}>Review and edit your profile information</p>
                </div>

                <div style={styles.tabContainer}>
                    <div
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'profile' ? styles.activeTab : {})
                        }}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </div>
                    <div
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'matches' ? styles.activeTab : {})
                        }}
                        onClick={() => setActiveTab('matches')}
                    >
                        VC Matches
                    </div>
                </div>

                {activeTab === 'profile' ? (
                    <>
                        <div style={styles.profileSummary}>
                            <div style={styles.profileSection}>
                                <h3 style={styles.profileSectionTitle}>
                                    Startup Information
                                    <button
                                        style={styles.editButton}
                                        onClick={() => startEditing('startup')}
                                    >
                                        <Edit style={styles.editIcon} />
                                        Edit
                                    </button>
                                </h3>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Industry</div>
                                    <div style={styles.profileValue}>
                                        {getLabelFromValue(industryOptions, formData.industry)}
                                    </div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Stage</div>
                                    <div style={styles.profileValue}>
                                        {getLabelFromValue(stageOptions, formData.stage)}
                                    </div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Business Model</div>
                                    <div style={styles.profileValue}>
                                        {getLabelFromValue(businessModelOptions, formData.businessModel)}
                                    </div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Location</div>
                                    <div style={styles.profileValue}>{formData.location}</div>
                                </div>
                            </div>

                            <div style={styles.profileSection}>
                                <h3 style={styles.profileSectionTitle}>
                                    Additional Information
                                    <button
                                        style={styles.editButton}
                                        onClick={() => startEditing('additional')}
                                    >
                                        <Edit style={styles.editIcon} />
                                        Edit
                                    </button>
                                </h3>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Traction</div>
                                    <div style={styles.profileValue}>{formData.traction || 'Not specified'}</div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Team Experience</div>
                                    <div style={styles.profileValue}>{formData.teamExperience || 'Not specified'}</div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Pitch Summary</div>
                                    <div style={styles.profileValue}>{formData.pitchSummary || 'Not specified'}</div>
                                </div>
                            </div>

                            <div style={styles.profileSection}>
                                <h3 style={styles.profileSectionTitle}>
                                    Investor Preferences
                                    <button
                                        style={styles.editButton}
                                        onClick={() => startEditing('preferences')}
                                    >
                                        <Edit style={styles.editIcon} />
                                        Edit
                                    </button>
                                </h3>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Investment Stage</div>
                                    <div style={styles.profileValue}>
                                        {formData.investmentStage && formData.investmentStage.length > 0
                                            ? formData.investmentStage.map(stage => getLabelFromValue(stageOptions, stage)).join(', ')
                                            : 'Not specified'}
                                    </div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Industry Focus</div>
                                    <div style={styles.profileValue}>
                                        {formData.industryFocus && formData.industryFocus.length > 0
                                            ? formData.industryFocus.map(ind => getLabelFromValue(industryOptions, ind)).join(', ')
                                            : 'Not specified'}
                                    </div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Geography</div>
                                    <div style={styles.profileValue}>{formData.geographyPreference || 'Not specified'}</div>
                                </div>
                            </div>

                            <div style={styles.profileSection}>
                                <h3 style={styles.profileSectionTitle}>
                                    Check Size
                                    <button
                                        style={styles.editButton}
                                        onClick={() => startEditing('checkSize')}
                                    >
                                        <Edit style={styles.editIcon} />
                                        Edit
                                    </button>
                                </h3>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Minimum ($)</div>
                                    <div style={styles.profileValue}>
                                        {formData.checkSizeMin ? `$${parseInt(formData.checkSizeMin).toLocaleString()}` : 'Not specified'}
                                    </div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Maximum ($)</div>
                                    <div style={styles.profileValue}>
                                        {formData.checkSizeMax ? `$${parseInt(formData.checkSizeMax).toLocaleString()}` : 'Not specified'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={styles.buttonContainer}>
                            <div></div>
                            <a href='/investors'>
                                <button
                                    style={{...styles.button, ...styles.primaryButton}}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                                >
                                    View VC Matches <ArrowRight style={styles.buttonIcon} />
                                </button>
                            </a>
                        </div>
                    </>
                ) : (
                    <div style={styles.infoCard}>
                        <div style={styles.infoCardHeader}>
                            <Database style={{...styles.icon, marginTop: '4px'}} />
                            <div>
                                <h3 style={styles.infoCardTitle}>Your VC Matches</h3>
                                <p style={styles.infoCardText}>
                                    Based on your profile, we've identified the following investors that match your criteria:
                                </p>
                                <div style={styles.listContainer}>
                                    <div style={styles.listItem}>
                                        <div style={styles.listDot}></div>
                                        Acme Ventures - Series A, Fintech, $1-5M
                                    </div>
                                    <div style={styles.listItem}>
                                        <div style={styles.listDot}></div>
                                        BlueSky Capital - Seed, SaaS, $250K-$1M
                                    </div>
                                    <div style={styles.listItem}>
                                        <div style={styles.listDot}></div>
                                        Highland Investors - Series A, B2B, $2-7M
                                    </div>
                                    <div style={styles.listItem}>
                                        <div style={styles.listDot}></div>
                                        Tech Founders Fund - Pre-Seed/Seed, Various, $100-500K
                                    </div>
                                </div>
                                <div style={styles.buttonContainer}>
                                    <div></div>
                                    <a href='/investors/all'>
                                        <button
                                            style={{...styles.button, ...styles.primaryButton}}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                                        >
                                            View All Matches <ArrowRight style={styles.buttonIcon} />
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Content based on step
    const renderStep = () => {
        // If signup is completed and we're not in edit mode, show profile view
        if (completed && !Object.values(editMode).some(val => val)) {
            return <ProfileView />;
        }

        switch(step) {
            case 1:
                return (
                    <div>
                        <div style={styles.header}>
                            <h1 style={styles.title}>
                                {editMode.startup ? 'Edit Startup Details' : 'Tell us about your startup'}
                            </h1>
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
                            {editMode.startup ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditMode(prev => ({ ...prev, startup: false }));
                                            setStep(5);
                                        }}
                                        style={{...styles.button, ...styles.secondaryButton}}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => saveChanges('startup')}
                                        style={{...styles.button, ...styles.primaryButton}}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                                    >
                                        Save Changes <ArrowRight style={styles.buttonIcon} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div></div> {/* Empty div for spacing */}
                                    <button
                                        onClick={nextStep}
                                        style={{...styles.button, ...styles.primaryButton}}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                                    >
                                        Continue <ArrowRight style={styles.buttonIcon} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <div style={styles.header}>
                            <h1 style={styles.title}>
                                {editMode.additional ? 'Edit Additional Details' : 'Additional Startup Details'}
                            </h1>
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
                            {editMode.additional ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditMode(prev => ({ ...prev, additional: false }));
                                            setStep(5);
                                        }}
                                        style={{...styles.button, ...styles.secondaryButton}}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => saveChanges('additional')}
                                        style={{...styles.button, ...styles.primaryButton}}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                                    >
                                        Save Changes <ArrowRight style={styles.buttonIcon} />
                                    </button>
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div>
                        <div style={styles.header}>
                            <h1 style={styles.title}>
                                {editMode.preferences ? 'Edit Investor Preferences' : 'Investor Preferences'}
                            </h1>
                            <p style={styles.subtitle}>Tell us what you're looking for in an investor</p>
                        </div>

                        <div style={styles.infoCard}>
                            <div style={styles.infoCardHeader}>
                                <Database style={{...styles.icon, marginTop: '4px'}} />
                                <div>
                                    <h3 style={styles.infoCardTitle}>Why This Matters</h3>
                                    <p style={styles.infoCardText}>
                                        Investors often specialize in specific stages, industries, and locations.
                                        Matching these preferences increases your chances of successful funding.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <InputWithIcon
                            icon={Target}
                            label="Investment Stage Focus (select multiple)"
                            name="investmentStage"
                            value={formData.investmentStage}
                            onChange={handleMultiSelect}
                            options={stageOptions}
                            multiple={true}
                        />

                        <InputWithIcon
                            icon={Briefcase}
                            label="Industry Focus (select multiple)"
                            name="industryFocus"
                            value={formData.industryFocus}
                            onChange={handleMultiSelect}
                            options={industryOptions}
                            multiple={true}
                        />

                        <InputWithIcon
                            icon={Globe}
                            label="Geography Preference"
                            name="geographyPreference"
                            value={formData.geographyPreference}
                            onChange={handleChange}
                            placeholder="e.g. Global, North America, Europe, etc."
                        />

                        <div style={styles.buttonContainer}>
                            {editMode.preferences ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditMode(prev => ({ ...prev, preferences: false }));
                                            setStep(5);
                                        }}
                                        style={{...styles.button, ...styles.secondaryButton}}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => saveChanges('preferences')}
                                        style={{...styles.button, ...styles.primaryButton}}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                                    >
                                        Save Changes <ArrowRight style={styles.buttonIcon} />
                                    </button>
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div>
                        <div style={styles.header}>
                            <h1 style={styles.title}>
                                {editMode.checkSize ? 'Edit Check Size' : 'Define Ideal Check Size'}
                            </h1>
                            <p style={styles.subtitle}>What investment range are you seeking?</p>
                        </div>

                        <div style={styles.infoCard}>
                            <div style={styles.infoCardHeader}>
                                <DollarSign style={{...styles.icon, marginTop: '4px'}} />
                                <div>
                                    <h3 style={styles.infoCardTitle}>Check Size Expectations</h3>
                                    <p style={styles.infoCardText}>
                                        Different investors have minimum and maximum check sizes they typically invest.
                                        Providing your expected range helps us match you with appropriate investors.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={styles.flexRow}>
                            <InputWithIcon
                                icon={DollarSign}
                                label="Minimum Investment"
                                name="checkSizeMin"
                                type="number"
                                value={formData.checkSizeMin}
                                onChange={handleChange}
                                placeholder="e.g. 50000"
                            />

                            <InputWithIcon
                                icon={DollarSign}
                                label="Maximum Investment"
                                name="checkSizeMax"
                                type="number"
                                value={formData.checkSizeMax}
                                onChange={handleChange}
                                placeholder="e.g. 500000"
                            />
                        </div>
                        <p style={styles.helpText}>Enter amounts in USD without commas or dollar signs</p>

                        <div style={styles.buttonContainer}>
                            {editMode.checkSize ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditMode(prev => ({ ...prev, checkSize: false }));
                                            setStep(5);
                                        }}
                                        style={{...styles.button, ...styles.secondaryButton}}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => saveChanges('checkSize')}
                                        style={{...styles.button, ...styles.primaryButton}}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                                    >
                                        Save Changes <ArrowRight style={styles.buttonIcon} />
                                    </button>
                                </>
                            ) : (
                                <>
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
                                        Complete Profile <ArrowRight style={styles.buttonIcon} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div>
                        <div style={styles.header}>
                            <div style={styles.successIcon}>
                                <Target style={styles.successIconInner}/>
                            </div>
                            <h1 style={styles.title}>Profile Completed!</h1>
                            <p style={styles.subtitle}>Your startup profile has been saved and is ready to match with
                                investors</p>
                        </div>

                        <div style={styles.nextStepsCard}>
                            <h3 style={styles.infoCardTitle}>Next Steps</h3>
                            <ol style={styles.nextStepsList}>
                                <li style={styles.nextStepsItem}>
                                    <span style={styles.nextStepsNumber}>1.</span>
                                    <span>Review your profile information to ensure it's accurate</span>
                                </li>
                                <li style={styles.nextStepsItem}>
                                    <span style={styles.nextStepsNumber}>2.</span>
                                    <span>Explore your investor matches based on your profile</span>
                                </li>
                                <li style={styles.nextStepsItem}>
                                    <span style={styles.nextStepsNumber}>3.</span>
                                    <span>Prepare your pitch materials for potential investor meetings</span>
                                </li>
                                <li style={styles.nextStepsItem}>
                                    <span style={styles.nextStepsNumber}>4.</span>
                                    <span>Connect with investors that match your criteria</span>
                                </li>
                            </ol>
                        </div>

                        <div style={styles.buttonContainer}>
                            <button
                                onClick={() => {
                                    // Set edit mode for all sections
                                    setEditMode({
                                        startup: true,
                                        additional: true,
                                        preferences: true,
                                        checkSize: true
                                    });
                                    // Return to first step
                                    setStep(1);
                                }}
                                style={{...styles.button, ...styles.secondaryButton}}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                            >
                                Edit Entire Profile
                            </button>
                            <a href='/investors'>
                                <button
                                    style={{...styles.button, ...styles.primaryButton}}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                                >
                                    View VC Matches <ArrowRight style={styles.buttonIcon}/>
                                </button>
                            </a>
                        </div>
                    </div>
                        );

                        default:
                        return null;
                        }
                        };

                        return (
                        <div style={styles.container}>
                            <div style={styles.formContainer}>
                                {!completed && <ProgressIndicator/>}
                                {renderStep()}
                            </div>
                        </div>
                        );
                        };

                        export default SignupFlow;
