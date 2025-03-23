import { ArrowRight, BarChart2, Briefcase, Building, Database, DollarSign, Edit, FileText, Globe, Lock, Mail, MapPin, PhoneCall, Target, User, Users } from 'lucide-react';
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
    errorText: {
        fontSize: '12px',
        color: '#E53E3E',
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
    },
    checkbox: {
        marginRight: '8px'
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px'
    },
    checkboxLabel: {
        fontSize: '14px',
        color: '#323232'
    },
    linkText: {
        color: '#4D766E',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    passwordRequirements: {
        marginTop: '12px',
        padding: '12px',
        backgroundColor: '#F0F4F5',
        borderRadius: '8px'
    },
    passwordRequirementItem: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px',
        color: '#688990',
        marginBottom: '4px'
    },
    requirementMet: {
        color: '#4D766E'
    }
};

const SignupFlow = () => {
    const [step, setStep] = useState(0); // Start with credentials step (0)
    const [formData, setFormData] = useState({
        // Credentials
        fullName: '',
        email: '',
        password: '',
        companyName: '',
        // Other fields
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
    const [errors, setErrors] = useState({});
    const [completed, setCompleted] = useState(false);
    const [editMode, setEditMode] = useState({
        credentials: false,
        startup: false,
        additional: false,
        preferences: false,
        checkSize: false
    });
    const [activeTab, setActiveTab] = useState('profile');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Password requirements check
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });

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

    // Check password requirements
    useEffect(() => {
        const password = formData.password;
        setPasswordRequirements({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        });
    }, [formData.password]);

// At the top of your component, add:
    const [focusedInput, setFocusedInput] = useState(null);
    const inputRefs = {};

// Add a function to handle focus events
    const handleFocus = (e) => {
        setFocusedInput(e.target.name);
    };

// Modify your handleChange function:
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for the field being edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

// After your state update, restore focus
    useEffect(() => {
        if (focusedInput && inputRefs[focusedInput]) {
            inputRefs[focusedInput].focus();
        }
    }, [formData, errors, focusedInput]);
    const handleMultiSelect = (e) => {
        const { name } = e.target;
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({ ...prev, [name]: values }));
    };

    const validateCredentials = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (
            !passwordRequirements.length || 
            !passwordRequirements.uppercase || 
            !passwordRequirements.lowercase || 
            !passwordRequirements.number || 
            !passwordRequirements.special
        ) {
            newErrors.password = 'Password does not meet all requirements';
        }
        
        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }
        
        if (!agreedToTerms) {
            newErrors.terms = 'You must agree to the terms and conditions';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Update the nextStep function to handle edit mode
    const nextStep = () => {
        // If we're at the credentials step, validate first
        if (step === 0) {
            if (!validateCredentials()) {
                return;
            }
        }
        
        if (step === 5) {
            setCompleted(true);
        } else {
            // Check if we're in edit mode and moving from one section to another
            if (Object.values(editMode).some(val => val)) {
                // Save the current section based on step
                switch(step) {
                    case 0:
                        setEditMode(prev => ({ ...prev, credentials: false }));
                        break;
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
        if (Object.values(editMode).some(val => val) && step === 0) {
            // If in edit mode and at credentials step, cancel edit and return to profile
            setEditMode({
                credentials: false,
                startup: false,
                additional: false,
                preferences: false,
                checkSize: false
            });
            setStep(5);
        } else if (step > 0) {
            setStep(step - 1);
        }
    };
    
    const startEditing = (section) => {
        setEditMode(prev => ({ ...prev, [section]: true }));
        // Set step based on section
        switch(section) {
            case 'credentials':
                setStep(0);
                break;
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
    const InputWithIcon = ({ icon, label, name, type = "text", value, onChange, placeholder, options, multiple, required = false, error }) => {
        const Icon = icon;

        // Initialize ref if needed
        useEffect(() => {
            if (!inputRefs[name]) {
                inputRefs[name] = React.createRef();
            }
        }, [name]);

        return (
            <div style={styles.formRow}>
                <label style={styles.label} htmlFor={name}>
                    <div style={styles.labelWithIcon}>
                        <Icon style={styles.icon} />
                        <span>{label}{required && <span style={{ color: '#E53E3E' }}> *</span>}</span>
                    </div>
                </label>

                {options ? (
                    <select
                        ref={(el) => inputRefs[name] = el}
                        onFocus={handleFocus}
                        style={{...styles.select, ...(error ? { borderColor: '#E53E3E' } : {})}}
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
                ) : type === "password" ? (
                    <div style={{ position: 'relative' }}>
          <textarea
              ref={(el) => inputRefs[name] = el}
              onFocus={handleFocus}
              style={{...styles.input2, ...(error ? { borderColor: '#E53E3E' } : {})}}
              id={name}
              name={name}
              type={passwordVisible ? "text" : "password"}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
          />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#688990'
                            }}
                        >
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                ) : (
                    <input
                        ref={(el) => inputRefs[name] = el}
                        onFocus={handleFocus}
                        style={{...styles.input, ...(error ? { borderColor: '#E53E3E' } : {})}}
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                )}

                {error && <p style={styles.errorText}>{error}</p>}
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
        const totalSteps = 6; // Include credentials step
        const progress = ((step + 1) / totalSteps) * 100;

        return (
            <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                    <div
                        style={{...styles.progressIndicator, width: `${progress}%`}}
                    ></div>
                </div>
                <div style={styles.progressLabels}>
                    <span>Credentials</span>
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
                </div>

                {activeTab === 'profile' ? (
                    <>
                        <div style={styles.profileSummary}>
                            <div style={styles.profileSection}>
                                <h3 style={styles.profileSectionTitle}>
                                    Account Information
                                    <button
                                        style={styles.editButton}
                                        onClick={() => startEditing('credentials')}
                                    >
                                        <Edit style={styles.editIcon} />
                                        Edit
                                    </button>
                                </h3>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Full Name</div>
                                    <div style={styles.profileValue}>{formData.fullName}</div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Email</div>
                                    <div style={styles.profileValue}>{formData.email}</div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Company</div>
                                    <div style={styles.profileValue}>{formData.companyName}</div>
                                </div>
                            </div>
                            
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
                                    Browse Investors
                                    <ArrowRight style={styles.buttonIcon} />
                                </button>
                            </a>
                        </div>
                    </>
                ) : (
                    // VC Matches tab content
                    <div>
                        <div style={styles.infoCard}>
                            <div style={styles.infoCardHeader}>
                                <div>
                                    <h3 style={styles.infoCardTitle}>Investor Matches</h3>
                                    <p style={styles.infoCardText}>
                                        Based on your profile, we've identified these investors who might be a good fit for your startup.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Example VC match cards - in a real app, these would be dynamically generated */}
                        <div style={{...styles.profileSummary, marginBottom: '16px'}}>
                            <div style={{...styles.flexRow, justifyContent: 'space-between'}}>
                                <div>
                                    <h3 style={{...styles.profileSectionTitle, marginBottom: '4px'}}>Sequoia Capital</h3>
                                    <p style={{...styles.infoCardText, marginBottom: '12px'}}>Early to growth stage venture capital firm</p>
                                </div>
                                <div>
                                    <span style={{...styles.infoCardText, backgroundColor: '#F0F4F5', padding: '4px 8px', borderRadius: '4px'}}>
                                        95% Match
                                    </span>
                                </div>
                            </div>
                            
                            <div style={styles.flexRow}>
                                <div style={{...styles.profileDetail, marginRight: '24px'}}>
                                    <div style={{...styles.profileLabel, width: 'auto', marginRight: '8px'}}><MapPin size={16} style={{marginRight: '4px'}} /> Location:</div>
                                    <div style={styles.profileValue}>Menlo Park, CA</div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={{...styles.profileLabel, width: 'auto', marginRight: '8px'}}><Target size={16} style={{marginRight: '4px'}} /> Focus:</div>
                                    <div style={styles.profileValue}>Tech, AI, SaaS</div>
                                </div>
                            </div>
                            
                            <div style={styles.flexRow}>
                                <div style={{...styles.profileDetail, marginRight: '24px'}}>
                                    <div style={{...styles.profileLabel, width: 'auto', marginRight: '8px'}}><DollarSign size={16} style={{marginRight: '4px'}} /> Check Size:</div>
                                    <div style={styles.profileValue}>$1M - $10M</div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={{...styles.profileLabel, width: 'auto', marginRight: '8px'}}><BarChart2 size={16} style={{marginRight: '4px'}} /> Stage:</div>
                                    <div style={styles.profileValue}>Seed, Series A, Series B</div>
                                </div>
                            </div>
                            
                            <div style={{...styles.buttonContainer, justifyContent: 'flex-start', marginTop: '16px'}}>
                                <button style={{...styles.button, ...styles.primaryButton, padding: '8px 16px'}}>
                                    View Profile
                                </button>
                            </div>
                        </div>
                        
                        <div style={{...styles.profileSummary, marginBottom: '16px'}}>
                            <div style={{...styles.flexRow, justifyContent: 'space-between'}}>
                                <div>
                                    <h3 style={{...styles.profileSectionTitle, marginBottom: '4px'}}>Andreessen Horowitz</h3>
                                    <p style={{...styles.infoCardText, marginBottom: '12px'}}>Stage-agnostic venture capital firm</p>
                                </div>
                                <div>
                                    <span style={{...styles.infoCardText, backgroundColor: '#F0F4F5', padding: '4px 8px', borderRadius: '4px'}}>
                                        88% Match
                                    </span>
                                </div>
                            </div>
                            
                            <div style={styles.flexRow}>
                                <div style={{...styles.profileDetail, marginRight: '24px'}}>
                                    <div style={{...styles.profileLabel, width: 'auto', marginRight: '8px'}}><MapPin size={16} style={{marginRight: '4px'}} /> Location:</div>
                                    <div style={styles.profileValue}>Menlo Park, CA</div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={{...styles.profileLabel, width: 'auto', marginRight: '8px'}}><Target size={16} style={{marginRight: '4px'}} /> Focus:</div>
                                    <div style={styles.profileValue}>Fintech, Crypto, Enterprise</div>
                                </div>
                            </div>
                            
                            <div style={styles.flexRow}>
                                <div style={{...styles.profileDetail, marginRight: '24px'}}>
                                    <div style={{...styles.profileLabel, width: 'auto', marginRight: '8px'}}><DollarSign size={16} style={{marginRight: '4px'}} /> Check Size:</div>
                                    <div style={styles.profileValue}>$500K - $15M</div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={{...styles.profileLabel, width: 'auto', marginRight: '8px'}}><BarChart2 size={16} style={{marginRight: '4px'}} /> Stage:</div>
                                    <div style={styles.profileValue}>Seed through Series C</div>
                                </div>
                            </div>
                            
                            <div style={{...styles.buttonContainer, justifyContent: 'flex-start', marginTop: '16px'}}>
                                <button style={{...styles.button, ...styles.primaryButton, padding: '8px 16px'}}>
                                    View Profile
                                </button>
                            </div>
                        </div>
                        
                        <div style={{...styles.buttonContainer, marginTop: '32px'}}>
                            <button
                                style={{...styles.button, ...styles.secondaryButton}}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                            >
                                Filter Results
                            </button>
                            <button
                                style={{...styles.button, ...styles.primaryButton}}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                            >
                                Browse All Investors
                                <ArrowRight style={styles.buttonIcon} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Completion view component
    const CompletionView = () => {
        return (
            <div>
                <div style={styles.header}>
                    <div style={styles.successIcon}>
                        <Target style={styles.successIconInner} />
                    </div>
                    <h1 style={styles.title}>Your profile is complete!</h1>
                    <p style={styles.subtitle}>You're all set to start connecting with investors</p>
                </div>

                <div style={styles.nextStepsCard}>
                    <h3 style={{...styles.infoCardTitle, textAlign: 'center', marginBottom: '16px'}}>
                        Next Steps
                    </h3>
                    <ol style={styles.nextStepsList}>
                        <li style={styles.nextStepsItem}>
                            <span style={styles.nextStepsNumber}>1.</span>
                            <span>Browse matching investors and view their profiles</span>
                        </li>
                        <li style={styles.nextStepsItem}>
                            <span style={styles.nextStepsNumber}>2.</span>
                            <span>Request introductions to investors you're interested in</span>
                        </li>
                        <li style={styles.nextStepsItem}>
                            <span style={styles.nextStepsNumber}>3.</span>
                            <span>Upload your pitch deck and other materials</span>
                        </li>
                        <li style={styles.nextStepsItem}>
                            <span style={styles.nextStepsNumber}>4.</span>
                            <span>Complete your company profile for better matching</span>
                        </li>
                    </ol>
                </div>

                <div style={styles.buttonContainer}>
                    <button
                        style={{...styles.button, ...styles.secondaryButton}}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                        onClick={() => setStep(5)}
                    >
                        View Profile
                    </button>
                    <a href='/investors'>
                        <button
                            style={{...styles.button, ...styles.primaryButton}}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                        >
                            Browse Investors
                            <ArrowRight style={styles.buttonIcon} />
                        </button>
                    </a>
                </div>
            </div>
        );
    };

    // Form rendering based on current step
    const renderStep = () => {
        if (completed) {
            return <CompletionView />;
        }

        if (step === 5) {
            return <ProfileView />;
        }

        switch (step) {
            case 0: // Credentials
                return (
                    <div style={styles.formSection}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Create your account</h1>
                            <p style={styles.subtitle}>Let's get started connecting your startup with the right investors</p>
                        </div>

                        <InputWithIcon
                            icon={User}
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required={true}
                            error={errors.fullName}
                        />

                        <InputWithIcon
                            icon={Mail}
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            required={true}
                            error={errors.email}
                        />

                        <InputWithIcon
                            icon={Lock}
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a secure password"
                            required={true}
                            error={errors.password}
                        />

                        <div style={styles.passwordRequirements}>
                            <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Password Requirements:</p>
                            <div style={{
                                ...styles.passwordRequirementItem,
                                ...(passwordRequirements.length ? styles.requirementMet : {})
                            }}>
                                {passwordRequirements.length ? '✓' : '○'} At least 8 characters
                            </div>
                            <div style={{
                                ...styles.passwordRequirementItem,
                                ...(passwordRequirements.uppercase ? styles.requirementMet : {})
                            }}>
                                {passwordRequirements.uppercase ? '✓' : '○'} At least one uppercase letter
                            </div>
                            <div style={{
                                ...styles.passwordRequirementItem,
                                ...(passwordRequirements.lowercase ? styles.requirementMet : {})
                            }}>
                                {passwordRequirements.lowercase ? '✓' : '○'} At least one lowercase letter
                            </div>
                            <div style={{
                                ...styles.passwordRequirementItem,
                                ...(passwordRequirements.number ? styles.requirementMet : {})
                            }}>
                                {passwordRequirements.number ? '✓' : '○'} At least one number
                            </div>
                            <div style={{
                                ...styles.passwordRequirementItem,
                                ...(passwordRequirements.special ? styles.requirementMet : {})
                            }}>
                                {passwordRequirements.special ? '✓' : '○'} At least one special character
                            </div>
                        </div>

                        <InputWithIcon
                            icon={Building}
                            label="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Enter your company name"
                            required={true}
                            error={errors.companyName}
                        />

                        <div style={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreedToTerms}
                                onChange={() => setAgreedToTerms(!agreedToTerms)}
                                style={styles.checkbox}
                            />
                            <label htmlFor="terms" style={styles.checkboxLabel}>
                                I agree to the <span style={styles.linkText}>Terms of Service</span> and <span style={styles.linkText}>Privacy Policy</span>
                            </label>
                        </div>
                        {errors.terms && <p style={styles.errorText}>{errors.terms}</p>}

                        <div style={styles.buttonContainer}>
                            {!editMode.credentials ? (
                                <div></div>
                            ) : (
                                <button
                                    style={{...styles.button, ...styles.secondaryButton}}
                                    onClick={prevStep}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                                >
                                    Cancel
                                </button>
                            )}
                            
                            <button
                                style={{...styles.button, ...styles.primaryButton}}
                                onClick={editMode.credentials ? () => saveChanges('credentials') : nextStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                            >
                                {editMode.credentials ? 'Save Changes' : 'Continue'}
                                <ArrowRight style={styles.buttonIcon} />
                            </button>
                        </div>
                    </div>
                );
            
            case 1: // Startup Details
                return (
                    <div style={styles.formSection}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Tell us about your startup</h1>
                            <p style={styles.subtitle}>Help investors understand your business</p>
                        </div>

                        <InputWithIcon
                            icon={BarChart2}
                            label="Industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            options={industryOptions}
                        />

                        <InputWithIcon
                            icon={Target}
                            label="Current Stage"
                            name="stage"
                            value={formData.stage}
                            onChange={handleChange}
                            options={stageOptions}
                        />

                        <InputWithIcon
                            icon={Briefcase}
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
                            placeholder="e.g. San Francisco, CA"
                        />

                        <div style={styles.buttonContainer}>
                            <button
                                style={{...styles.button, ...styles.secondaryButton}}
                                onClick={prevStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                            >
                                Back
                            </button>
                            
                            <button
                                style={{...styles.button, ...styles.primaryButton}}
                                onClick={editMode.startup ? () => saveChanges('startup') : nextStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                            >
                                {editMode.startup ? 'Save Changes' : 'Continue'}
                                <ArrowRight style={styles.buttonIcon} />
                            </button>
                        </div>
                    </div>
                );
            
            case 2: // Additional Info
                return (
                    <div style={styles.formSection}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Additional Information</h1>
                            <p style={styles.subtitle}>Tell investors more about your progress and team</p>
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label} htmlFor="traction">
                                <div style={styles.labelWithIcon}>
                                    <BarChart2 style={styles.icon} />
                                    <span>Traction & Metrics</span>
                                </div>
                            </label>
                            <textarea
                                style={styles.textarea}
                                id="traction"
                                name="traction"
                                value={formData.traction}
                                onChange={handleChange}
                                placeholder="Describe your current traction and key metrics (e.g., users, revenue, growth rate)"
                            />
                            <p style={styles.helpText}>Be specific with numbers where possible</p>
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label} htmlFor="teamExperience">
                                <div style={styles.labelWithIcon}>
                                    <Users style={styles.icon} />
                                    <span>Team Experience</span>
                                </div>
                            </label>
                            <textarea
                                style={styles.textarea}
                                id="teamExperience"
                                name="teamExperience"
                                value={formData.teamExperience}
                                onChange={handleChange}
                                placeholder="Briefly describe your founding team's relevant experience and background"
                            />
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label} htmlFor="pitchSummary">
                                <div style={styles.labelWithIcon}>
                                    <FileText style={styles.icon} />
                                    <span>Elevator Pitch</span>
                                </div>
                            </label>
                            <textarea
                                style={styles.textarea}
                                id="pitchSummary"
                                name="pitchSummary"
                                value={formData.pitchSummary}
                                onChange={handleChange}
                                placeholder="Summarize your business in 1-2 sentences (e.g., 'We help [target customers] solve [problem] with [solution]')"
                            />
                            <p style={styles.helpText}>Keep this concise - you'll have opportunities to share more details later</p>
                        </div>

                        <div style={styles.buttonContainer}>
                            <button
                                style={{...styles.button, ...styles.secondaryButton}}
                                onClick={prevStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                            >
                                Back
                            </button>
                            
                            <button
                                style={{...styles.button, ...styles.primaryButton}}
                                onClick={editMode.additional ? () => saveChanges('additional') : nextStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                            >
                                {editMode.additional ? 'Save Changes' : 'Continue'}
                                <ArrowRight style={styles.buttonIcon} />
                            </button>
                        </div>
                    </div>
                );
            
            case 3: // VC Preferences
                return (
                    <div style={styles.formSection}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Investor Preferences</h1>
                            <p style={styles.subtitle}>Help us match you with the right investors</p>
                        </div>
                        
                        <div style={styles.infoCard}>
                            <div style={styles.infoCardHeader}>
                                <div>
                                    <h3 style={styles.infoCardTitle}>What are you looking for in an investor?</h3>
                                    <p style={styles.infoCardText}>
                                        These preferences will help us match you with investors who are the best fit for your startup.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <InputWithIcon
                            icon={Target}
                            label="Investment Stage Focus"
                            name="investmentStage"
                            value={formData.investmentStage}
                            onChange={handleMultiSelect}
                            options={stageOptions}
                            multiple={true}
                        />
                        <p style={styles.helpText}>Select all stages that apply (ctrl/cmd+click for multiple)</p>

                        <InputWithIcon
                            icon={BarChart2}
                            label="Industry Focus"
                            name="industryFocus"
                            value={formData.industryFocus}
                            onChange={handleMultiSelect}
                            options={industryOptions}
                            multiple={true}
                        />
                        <p style={styles.helpText}>Select all industries that apply (ctrl/cmd+click for multiple)</p>

                        <InputWithIcon
                            icon={Globe}
                            label="Geography Preference"
                            name="geographyPreference"
                            value={formData.geographyPreference}
                            onChange={handleChange}
                            placeholder="e.g. US, Europe, Global"
                        />

                        <div style={styles.buttonContainer}>
                            <button
                                style={{...styles.button, ...styles.secondaryButton}}
                                onClick={prevStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                            >
                                Back
                            </button>
                            
                            <button
                                style={{...styles.button, ...styles.primaryButton}}
                                onClick={editMode.preferences ? () => saveChanges('preferences') : nextStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                            >
                                {editMode.preferences ? 'Save Changes' : 'Continue'}
                                <ArrowRight style={styles.buttonIcon} />
                            </button>
                        </div>
                    </div>
                );
            
            case 4: // Check Size
                return (
                    <div style={styles.formSection}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Investment Size</h1>
                            <p style={styles.subtitle}>What investment size are you looking for?</p>
                        </div>

                        <div style={styles.infoCard}>
                            <div style={styles.infoCardHeader}>
                                <div>
                                    <h3 style={styles.infoCardTitle}>Target Check Size</h3>
                                    <p style={styles.infoCardText}>
                                        The typical investment amount you're seeking from a single investor.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={styles.flexRow}>
                            <InputWithIcon
                                icon={DollarSign}
                                label="Minimum ($)"
                                name="checkSizeMin"
                                type="number"
                                value={formData.checkSizeMin}
                                onChange={handleChange}
                                placeholder="e.g. 250000"
                            />
                            
                            <InputWithIcon
                                icon={DollarSign}
                                label="Maximum ($)"
                                name="checkSizeMax"
                                type="number"
                                value={formData.checkSizeMax}
                                onChange={handleChange}
                                placeholder="e.g. 1000000"
                            />
                        </div>

                        <div style={styles.buttonContainer}>
                            <button
                                style={{...styles.button, ...styles.secondaryButton}}
                                onClick={prevStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                            >
                                Back
                            </button>
                            
                            <button
                                style={{...styles.button, ...styles.primaryButton}}
                                onClick={editMode.checkSize ? () => saveChanges('checkSize') : nextStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                            >
                                {editMode.checkSize ? 'Save Changes' : 'Complete Profile'}
                                <ArrowRight style={styles.buttonIcon} />
                            </button>
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
                {!completed && step < 5 && <ProgressIndicator />}
                {renderStep()}
            </div>
        </div>
    );
};

export default SignupFlow;
