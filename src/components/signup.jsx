import { ArrowRight, BarChart2, Briefcase, Building, DollarSign, Edit, FileText, Lock, Mail, MapPin, Target, User, Users } from 'lucide-react';
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
        padding: '32px',
        position: 'relative',
        zIndex: 10
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
        minHeight: '80px', // shortened default height
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
    // Steps:
    // 0 => Credentials
    // 1 => Startup Details
    // 2 => Additional Info
    // 3 => Check Size
    // 4 => Profile
    // "completed" => show CompletionView

    const [step, setStep] = useState(0); // start with credentials
    const [formData, setFormData] = useState({
        // Credentials
        fullName: '',
        email: '',
        password: '',
        companyName: '',
        // Startup
        industry: '',
        stage: '',
        businessModel: '',
        location: '',
        // Additional Info
        traction: '',
        teamExperience: '',
        pitchSummary: '',
        // Check Size
        checkSizeMin: '',
        checkSizeMax: '',
    });
    const [errors, setErrors] = useState({});
    const [completed, setCompleted] = useState(false);
    const [editMode, setEditMode] = useState({
        credentials: false,
        startup: false,
        additional: false,
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

    // For focusing inputs on re-renders
    const [focusedInput, setFocusedInput] = useState(null);
    const inputRefs = {};

    // If user is already logged in, you could do a check here:
    // const isLoggedIn = Cookies.get('isSignedIn') === 'true';

    // Check for ?step=4 in the URL => user clicked "Profile"
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const possibleStep = parseInt(params.get('step'), 10);
        // If it's a valid step, jump there
        if (!isNaN(possibleStep)) {
            setStep(possibleStep);
        }
    }, []);

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

    // Restore focus after changes
    useEffect(() => {
        if (focusedInput && inputRefs[focusedInput]) {
            inputRefs[focusedInput].focus();
        }
    }, [formData, errors, focusedInput]);

    const handleFocus = (e) => {
        setFocusedInput(e.target.name);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
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

    // Steps are now 5 total: 0..4 => last is "Profile"  
    const nextStep = () => {
        if (step === 0) {
            if (!validateCredentials()) return;
        }
        // If user is at "Check Size" step (step=3) => next means go to "Profile" (step=4)
        if (step === 3) {
            setCompleted(true);
            setStep(4);
        } else if (step < 4) {
            // If in edit mode, mark that section as done
            if (Object.values(editMode).some(val => val)) {
                switch(step) {
                    case 0: setEditMode(prev => ({ ...prev, credentials: false })); break;
                    case 1: setEditMode(prev => ({ ...prev, startup: false })); break;
                    case 2: setEditMode(prev => ({ ...prev, additional: false })); break;
                    case 3: setEditMode(prev => ({ ...prev, checkSize: false })); break;
                    default: break;
                }
            }
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (Object.values(editMode).some(val => val) && step === 0) {
            // If in edit mode and at credentials step, cancel edit and go to profile
            setEditMode({ credentials: false, startup: false, additional: false, checkSize: false });
            setStep(4);
        } else if (step > 0) {
            setStep(step - 1);
        }
    };

    const startEditing = (section) => {
        setEditMode(prev => ({ ...prev, [section]: true }));
        switch(section) {
            case 'credentials': setStep(0); break;
            case 'startup': setStep(1); break;
            case 'additional': setStep(2); break;
            case 'checkSize': setStep(3); break;
            default: break;
        }
    };

    const saveChanges = (section) => {
        setEditMode(prev => ({ ...prev, [section]: false }));
        // Return to profile step
        setStep(4);
    };

    // InputWithIcon component
    const InputWithIcon = ({ icon, label, name, type = "text", value, onChange, placeholder, options, required = false, error }) => {
        const Icon = icon;

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
                        ref={el => inputRefs[name] = el}
                        onFocus={handleFocus}
                        style={{...styles.select, ...(error ? { borderColor: '#E53E3E' } : {})}}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                    >
                        <option value="">Select an option</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : type === "password" ? (
                    <div style={{ position: 'relative' }}>
                        <input
                            ref={el => inputRefs[name] = el}
                            onFocus={handleFocus}
                            style={{...styles.input, ...(error ? { borderColor: '#E53E3E' } : {})}}
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
                        ref={el => inputRefs[name] = el}
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

    // Options
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

    const getLabelFromValue = (options, value) => {
        const option = options.find(opt => opt.value === value);
        return option ? option.label : value;
    };

    // Progress bar: 5 steps total now
    const ProgressIndicator = () => {
        const totalSteps = 5; // 0..4 => last is profile
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
                    <span>Check Size</span>
                    <span>Profile</span>
                </div>
            </div>
        );
    };

    // Profile
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

                {activeTab === 'profile' && (
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
                                        {formData.checkSizeMin 
                                            ? `$${parseInt(formData.checkSizeMin).toLocaleString()}`
                                            : 'Not specified'}
                                    </div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Maximum ($)</div>
                                    <div style={styles.profileValue}>
                                        {formData.checkSizeMax
                                            ? `$${parseInt(formData.checkSizeMax).toLocaleString()}`
                                            : 'Not specified'}
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
                )}
            </div>
        );
    };

    // Completion view
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
                        onClick={() => setStep(4)}
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

    // Render the correct step
    const renderStep = () => {
        if (completed && step < 4) {
            // If "completed" but user step is <4, jump to step=4
            setStep(4);
        }
        if (step === 4) {
            // Show final "Profile" screen
            return <ProfileView />;
        }
        if (completed) {
            // Show "CompletionView" if entire flow done
            return <CompletionView />;
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
                                onFocus={handleFocus}
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
                                onFocus={handleFocus}
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
                                placeholder="Summarize your business in 1-2 sentences"
                                onFocus={handleFocus}
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

            case 3: // Check Size
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
                {/* Show progress bar only if user not fully at "Profile" or "Complete" */}
                {!completed && step < 4 && <ProgressIndicator />}
                {renderStep()}
            </div>
        </div>
    );
};

export default SignupFlow;