import Cookies from 'js-cookie';
import { ArrowRight, BarChart2, Briefcase, Building, DollarSign, Edit, FileText, Lock, Mail, MapPin, Target, User, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function SearchableLocationDropdown({ label, name, value, onChange, error, options }) {
    // We store typed text locally, so we don't overwrite it every time 
    // the parent formData updates.
    const [searchTerm, setSearchTerm] = React.useState(value || '');
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    // If the parent changes its "value" externally (e.g., reset form),
    // make sure we update our local text too:
    React.useEffect(() => {
        setSearchTerm(value || '');
    }, [value]);

    // Filter the options as the user types:
    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleChangeSearchTerm(e) {
        setSearchTerm(e.target.value);
        setDropdownOpen(true);
    }

    function handleSelect(option) {
        // Notify parent of this final choice:
        onChange({ target: { name, value: option } });
        // Also put that choice in our local input:
        setSearchTerm(option);
        setDropdownOpen(false);
    }

    return (
        <div style={styles.formRow}>
            <label style={styles.label}>
                <div style={styles.labelWithIcon}>
                    <MapPin style={styles.icon} />
                    <span>{label}</span>
                </div>
            </label>

            <input
                type="text"
                style={{
                    ...styles.input,
                    ...(error ? { borderColor: '#E53E3E' } : {})
                }}
                placeholder="Search your location..."
                value={searchTerm}
                onChange={handleChangeSearchTerm}
                onFocus={() => setDropdownOpen(true)}
            />

            {dropdownOpen && (
                <div
                    style={{
                        border: '1px solid #B6C2CE',
                        backgroundColor: 'white',
                        maxHeight: '150px',
                        overflowY: 'auto',
                        marginTop: '2px',
                        borderRadius: '4px',
                        position: 'relative'
                    }}
                >
                    {filteredOptions.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => handleSelect(opt)}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #EEE'
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                    {filteredOptions.length === 0 && (
                        <div style={{ padding: '8px', color: '#688990' }}>
                            No match found
                        </div>
                    )}
                </div>
            )}

            {error && <p style={styles.errorText}>{error}</p>}
        </div>
    );
}

// CSS styles
const styles = {
    container: {
        backgroundColor: '#FAFBFD',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontSize: '14px'
    },
    formContainer: {
        width: '100%',
        maxWidth: '540px',
        backgroundColor: '#FAFBFD',
        borderRadius: '10px',
        boxShadow: '0 3px 10px rgba(50, 50, 50, 0.1)',
        padding: '28px',
        position: 'relative',
        zIndex: 10
    },
    progressContainer: {
        marginBottom: '24px'
    },
    progressBar: {
        height: '6px',
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
        marginTop: '6px',
        fontSize: '11px',
        color: '#688990'
    },
    formSection: {
        marginBottom: '20px'
    },
    header: {
        textAlign: 'center',
        marginBottom: '28px'
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#323232',
        marginBottom: '6px'
    },
    subtitle: {
        fontSize: '14px',
        color: '#688990',
        marginTop: '6px'
    },
    formRow: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        color: '#323232',
        fontSize: '13px',
        fontWeight: '500',
        marginBottom: '6px'
    },
    labelWithIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        width: '18px',
        height: '18px',
        marginRight: '6px',
        color: '#4D766E'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#FAFBFD',
        border: '1px solid #B6C2CE',
        borderRadius: '6px',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#FAFBFD',
        border: '1px solid #B6C2CE',
        borderRadius: '6px',
        fontSize: '14px',
        minHeight: '80px',
        outline: 'none',
        transition: 'all 0.2s ease',
        resize: 'vertical'
    },
    helpText: {
        fontSize: '11px',
        color: '#688990',
        marginTop: '3px'
    },
    errorText: {
        fontSize: '11px',
        color: '#E53E3E',
        marginTop: '3px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '24px'
    },
    button: {
        padding: '10px 20px',
        borderRadius: '6px',
        fontWeight: '500',
        fontSize: '14px',
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
    secondaryButton: {
        backgroundColor: '#FAFBFD',
        color: '#323232',
        border: '1px solid #B6C2CE'
    },
    buttonIcon: {
        marginLeft: '6px',
        width: '14px',
        height: '14px'
    },
    infoCard: {
        padding: '12px',
        backgroundColor: '#F0F4F5',
        border: '1px solid #B6C2CE',
        borderRadius: '6px',
        marginBottom: '20px'
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
        fontSize: '13px',
        color: '#688990'
    },
    profileSummary: {
        backgroundColor: '#F0F4F5',
        border: '1px solid #B6C2CE',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '20px'
    },
    profileSection: {
        marginBottom: '14px'
    },
    profileSectionTitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#4D766E',
        marginBottom: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileDetail: {
        display: 'flex',
        marginBottom: '4px'
    },
    profileLabel: {
        width: '120px',
        fontSize: '13px',
        color: '#688990',
        fontWeight: '500'
    },
    profileValue: {
        flex: '1',
        fontSize: '13px',
        color: '#323232'
    },
    editButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#4D766E',
        cursor: 'pointer',
        padding: '3px',
        borderRadius: '4px',
        fontSize: '13px'
    },
    editIcon: {
        width: '14px',
        height: '14px',
        marginRight: '3px'
    },
    tabContainer: {
        display: 'flex',
        borderBottom: '1px solid #B6C2CE',
        marginBottom: '16px'
    },
    tab: {
        padding: '10px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        color: '#688990',
        borderBottom: '2px solid transparent'
    },
    activeTab: {
        color: '#4D766E',
        borderBottom: '2px solid #4D766E'
    },
    checkbox: {
        marginRight: '6px'
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '14px'
    },
    checkboxLabel: {
        fontSize: '13px',
        color: '#323232'
    },
    linkText: {
        color: '#4D766E',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    requirementMet: {
        color: '#4D766E'
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    }
};

const SignupFlow = () => {
    // Steps: 0..3 => final step => 4 => Profile
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        companyName: '',
        industry: '',
        stage: '',
        businessModel: '',
        location: '',
        traction: '',
        teamExperience: '',
        pitchSummary: '',
        checkSizeMin: '',
        checkSizeMax: '',
    });
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState({
        credentials: false,
        startup: false,
        additional: false,
        checkSize: false
    });
    const [activeTab, setActiveTab] = useState('profile');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    // input focusing
    const [focusedInput, setFocusedInput] = useState(null);
    const inputRefs = {};

    // -----------------------------------------
    //  useEffect: check ?step= param
    // -----------------------------------------
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const possibleStep = parseInt(params.get('step'), 10);
        if (!isNaN(possibleStep)) {
            setStep(possibleStep);
        }
    }, []);

    // -----------------------------------------
    //  useEffect: load from localStorage on mount
    // -----------------------------------------
    useEffect(() => {
        const savedData = localStorage.getItem('startupSignupData');
        if (savedData) {
            console.log("load from localstore (on mount): ", JSON.parse(savedData));
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // -----------------------------------------
    //  Reload data from localStorage if user hits step=4 => profile
    // -----------------------------------------
    useEffect(() => {
        if (step === 4) {
            const savedData = localStorage.getItem('startupSignupData');
            if (savedData) {
                console.log("load from localstore (step=4): ", JSON.parse(savedData));
                setFormData(JSON.parse(savedData));
            }
        }
    }, [step]);

    // restore focus
    useEffect(() => {
        if (focusedInput && inputRefs[focusedInput]) {
            inputRefs[focusedInput].focus();
        }
    }, [formData, errors, focusedInput]);

    // handleFocus
    const handleFocus = (e) => {
        setFocusedInput(e.target.name);
    };

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // function to Save data to localStorage => call once final step is clicked
    const saveFormDataToLocalStorage = () => {
        console.log("Saving final form data => localStorage: ", formData);
        localStorage.setItem('startupSignupData', JSON.stringify(formData));
    };

    // validate step=0
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

    // nextStep
    const nextStep = () => {
        if (step === 0) {
            // validate credentials
            if (!validateCredentials()) return;
        }

        // if step=3 => final step => set isSignedIn => step=4 => only then save to localStorage
        if (step === 3) {
            Cookies.set('isSignedIn', 'true');
            // Save form data to localStorage once user completes
            saveFormDataToLocalStorage();
            setStep(4);
            return;
        }

        // if in edit mode => mark that section as done
        if (Object.values(editMode).some(val => val)) {
            switch (step) {
                case 0: setEditMode(prev => ({ ...prev, credentials: false })); break;
                case 1: setEditMode(prev => ({ ...prev, startup: false })); break;
                case 2: setEditMode(prev => ({ ...prev, additional: false })); break;
                case 3: setEditMode(prev => ({ ...prev, checkSize: false })); break;
                default: break;
            }
        }
        setStep(step + 1);
    };

    // prevStep
    const prevStep = () => {
        // if user is editing credentials & is at step=0 => go back to step=4
        if (Object.values(editMode).some(val => val) && step === 0) {
            setEditMode({ credentials: false, startup: false, additional: false, checkSize: false });
            setStep(4);
        } else if (step > 0) {
            setStep(step - 1);
        }
    };

    // startEditing => sets the step accordingly
    const startEditing = (section) => {
        setEditMode(prev => ({ ...prev, [section]: true }));
        switch (section) {
            case 'credentials': setStep(0); break;
            case 'startup': setStep(1); break;
            case 'additional': setStep(2); break;
            case 'checkSize': setStep(3); break;
            default: break;
        }
    };

    // saveChanges => user done editing => go back to step=4
    const saveChanges = (section) => {
        setEditMode(prev => ({ ...prev, [section]: false }));
        saveFormDataToLocalStorage()
        setStep(4);
    };

    // Reusable input with icon
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
                        <span>
                            {label}
                            {required && <span style={{ color: '#E53E3E' }}> *</span>}
                        </span>
                    </div>
                </label>

                {options ? (
                    <select
                        ref={el => inputRefs[name] = el}
                        onFocus={handleFocus}
                        style={{ ...styles.input, ...(error ? { borderColor: '#E53E3E' } : {}) }}
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
                            style={{ ...styles.input, ...(error ? { borderColor: '#E53E3E' } : {}) }}
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
                        style={{ ...styles.input, ...(error ? { borderColor: '#E53E3E' } : {}) }}
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

    // the industry, stage, businessModel arrays
    const industryOptions = [
        { value: 'fintech', label: 'Fintech' },
        { value: 'healthtech', label: 'Healthtech' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'saas', label: 'SaaS' },
        { value: 'ai', label: 'AI / Machine Learning' },
        { value: 'edtech', label: 'Edtech' },
        { value: 'cleantech', label: 'Cleantech' },
    ];

    const stageOptions = [
        { value: 'early revenue', label: 'Early Revenue' },
        { value: 'growth', label: 'Growth' },
        { value: 'idea or patent', label: 'Idea or Patent' },
        { value: 'pre-ipo', label: 'Pre-IPO' },
        { value: 'prototype', label: 'Prototype' },
        { value: 'scaling', label: 'Scaling' }
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

    const locations = [
        "Global",
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua And Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia And Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo (Brazzaville)",
        "Congo (Kinshasa)",
        "Costa Rica",
        "CÃ´te D'Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts And Nevis",
        "Saint Lucia",
        "Saint Vincent And The Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome And Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad And Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];

    // helper to map value => label
    const getLabelFromValue = (options, value) => {
        const option = options.find(opt => opt.value === value);
        return option ? option.label : value;
    };

    // progress indicator for steps
    const ProgressIndicator = () => {
        const totalSteps = 5; // steps 0..4
        const progress = ((step + 1) / totalSteps) * 100;
        return (
            <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                    <div style={{ ...styles.progressIndicator, width: `${progress}%` }} />
                </div>
                <div style={styles.progressLabels}>
                    <span>Credentials</span>
                    <span>Startup</span>
                    <span>Additional</span>
                    <span>Check Size</span>
                    <span>Profile</span>
                </div>
            </div>
        );
    };

    // The ProfileView code
    const ProfileView = () => {
        return (
            <div>
                <div style={styles.header}>
                    <h1 style={styles.title}>Startup Profile</h1>
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
                                    <div style={styles.profileValue}>
                                        {getLabelFromValue(locations, formData.location)}
                                    </div>
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
                                    <div style={styles.profileLabel}>Team Exp.</div>
                                    <div style={styles.profileValue}>{formData.teamExperience || 'Not specified'}</div>
                                </div>
                                <div style={styles.profileDetail}>
                                    <div style={styles.profileLabel}>Pitch</div>
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
                                    style={{ ...styles.button, ...styles.primaryButton }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#688990'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4D766E'}
                                >
                                    Confirm
                                    <ArrowRight style={styles.buttonIcon} />
                                </button>
                            </a>
                        </div>
                    </>
                )}
            </div>
        );
    };

    // Renders whichever step user is on
    const renderStep = () => {
        if (step === 4) {
            // Show Profile
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
                                    style={{ ...styles.button, ...styles.secondaryButton }}
                                    onClick={prevStep}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                                >
                                    Cancel
                                </button>
                            )}

                            <button
                                style={{ ...styles.button, ...styles.primaryButton }}
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

            case 1: // Startup
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

                        <SearchableLocationDropdown
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            error={errors.location}
                            options={locations}
                        />

                        <div style={styles.buttonContainer}>
                            <button
                                style={{ ...styles.button, ...styles.secondaryButton }}
                                onClick={prevStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                            >
                                Back
                            </button>

                            <button
                                style={{ ...styles.button, ...styles.primaryButton }}
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

            case 2: // Additional
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
                                placeholder="Describe your current traction and key metrics"
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
                                placeholder="Briefly describe your founding team's relevant experience"
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
                                style={{ ...styles.button, ...styles.secondaryButton }}
                                onClick={prevStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                            >
                                Back
                            </button>

                            <button
                                style={{ ...styles.button, ...styles.primaryButton }}
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
                                style={{ ...styles.button, ...styles.secondaryButton }}
                                onClick={prevStep}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F4F5'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFBFD'}
                            >
                                Back
                            </button>

                            <button
                                style={{ ...styles.button, ...styles.primaryButton }}
                                // On final step => nextStep calls => sets isSignedIn => saves to localStorage => step=4
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
                {step < 4 && <ProgressIndicator />}
                {renderStep()}
            </div>
        </div>
    );
};

export default SignupFlow;
