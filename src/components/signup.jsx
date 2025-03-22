import React, { useState, useEffect } from 'react';
import { ArrowRight, Briefcase, DollarSign, MapPin, BarChart2, Users, FileText, Building, Globe, Target, Database, PhoneCall } from 'lucide-react';

// CSS styles without Tailwind
const styles = {
    container: {
        background: 'linear-gradient(135deg, #F8F9FE 0%, #E8EAFF 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
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
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(89, 64, 169, 0.2), 0 0 0 1px rgba(89, 64, 169, 0.1), 0 0 0 4px rgba(126, 87, 194, 0.05)',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1
    },
    formContainerGlow: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '-1',
        borderRadius: '12px',
        opacity: '0.5',
        background: 'radial-gradient(circle at top right, rgba(142, 36, 170, 0.3), transparent 70%), radial-gradient(circle at bottom left, rgba(108, 99, 255, 0.3), transparent 70%)',
        animation: 'pulseGlow 6s ease-in-out infinite alternate'
    },
    progressContainer: {
        marginBottom: '32px'
    },
    progressBar: {
        height: '8px',
        width: '100%',
        backgroundColor: '#E8EAFF',
        borderRadius: '9999px',
        overflow: 'hidden',
        position: 'relative'
    },
    progressIndicator: {
        height: '100%',
        background: 'linear-gradient(90deg, #8E24AA, #6C63FF, #4E32C8, #8E24AA)',
        backgroundSize: '300% 100%',
        animation: 'gradientMove 3s linear infinite',
        transition: 'width 0.3s ease-in-out',
        borderRadius: '9999px',
        boxShadow: '0 0 10px rgba(142, 36, 170, 0.5)'
    },
    progressLabels: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px',
        fontSize: '12px',
        color: '#6C63FF',
        fontWeight: '500'
    },
    formSection: {
        marginBottom: '24px',
        position: 'relative'
    },
    header: {
        textAlign: 'center',
        marginBottom: '32px',
        position: 'relative'
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        background: 'linear-gradient(90deg, #1A237E, #8E24AA, #6C63FF)',
        backgroundSize: '200% auto',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'gradientText 4s linear infinite',
        marginBottom: '8px',
        textShadow: '0 0 30px rgba(142, 36, 170, 0.15)'
    },
    subtitle: {
        fontSize: '16px',
        color: '#6C63FF',
        marginTop: '8px'
    },
    formRow: {
        marginBottom: '24px'
    },
    label: {
        display: 'block',
        color: '#3F3D56',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '8px',
        position: 'relative'
    },
    labelWithIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        width: '20px',
        height: '20px',
        marginRight: '8px',
        color: '#8E24AA',
        filter: 'drop-shadow(0 0 2px rgba(142, 36, 170, 0.5))'
    },
    input: {
        width: '100%',
        padding: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid #D1C4E9',
        borderRadius: '8px',
        fontSize: '16px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxShadow: 'inset 0 1px 2px rgba(89, 64, 169, 0.05)'
    },
    inputFocus: {
        borderColor: '#7B1FA2',
        boxShadow: '0 0 0 3px rgba(126, 87, 194, 0.2), 0 0 15px rgba(142, 36, 170, 0.1), inset 0 1px 2px rgba(89, 64, 169, 0.05)'
    },
    select: {
        width: '100%',
        padding: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid #D1C4E9',
        borderRadius: '8px',
        fontSize: '16px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxShadow: 'inset 0 1px 2px rgba(89, 64, 169, 0.05)'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid #D1C4E9',
        borderRadius: '8px',
        fontSize: '16px',
        minHeight: '120px',
        outline: 'none',
        transition: 'all 0.2s ease',
        resize: 'vertical',
        boxShadow: 'inset 0 1px 2px rgba(89, 64, 169, 0.05)'
    },
    helpText: {
        fontSize: '12px',
        color: '#6C63FF',
        marginTop: '4px',
        animation: 'pulseText 4s ease-in-out infinite alternate'
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
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
    },
    primaryButton: {
        background: 'linear-gradient(90deg, #8E24AA, #6C63FF)',
        backgroundSize: '200% auto',
        color: '#FFFFFF',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        animation: 'gradientButton 3s ease infinite',
        boxShadow: '0 4px 15px rgba(142, 36, 170, 0.3)'
    },
    primaryButtonGlow: {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        right: '-50%',
        bottom: '-50%',
        background: 'radial-gradient(circle, rgba(142, 36, 170, 0.8) 0%, rgba(108, 99, 255, 0) 70%)',
        mixBlendMode: 'screen',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        animation: 'pulseButtonGlow 2s ease-in-out infinite'
    },
    primaryButtonHover: {
        backgroundPosition: 'right center',
        boxShadow: '0 4px 20px rgba(142, 36, 170, 0.5), 0 0 15px rgba(142, 36, 170, 0.3)'
    },
    secondaryButton: {
        backgroundColor: 'rgba(248, 249, 254, 0.8)',
        color: '#3F3D56',
        border: '1px solid #D1C4E9',
        backdropFilter: 'blur(4px)'
    },
    secondaryButtonHover: {
        backgroundColor: '#E8EAFF',
        boxShadow: '0 2px 10px rgba(108, 99, 255, 0.15)'
    },
    buttonIcon: {
        marginLeft: '8px',
        width: '16px',
        height: '16px',
        filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))'
    },
    infoCard: {
        padding: '16px',
        backgroundColor: 'rgba(243, 229, 245, 0.6)',
        backgroundImage: 'linear-gradient(135deg, rgba(243, 229, 245, 0.8), rgba(232, 234, 255, 0.8))',
        border: '1px solid #D1C4E9',
        borderRadius: '8px',
        marginBottom: '24px',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 4px 15px rgba(126, 87, 194, 0.1), 0 0 0 1px rgba(142, 36, 170, 0.05)',
        position: 'relative',
        overflow: 'hidden'
    },
    infoCardGlow: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '-1',
        background: 'radial-gradient(circle at top right, rgba(108, 99, 255, 0.3), transparent 70%)',
        animation: 'pulseGlow 4s ease-in-out infinite alternate'
    },
    infoCardHeader: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    infoCardTitle: {
        fontWeight: '500',
        background: 'linear-gradient(90deg, #8E24AA, #6C63FF)',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '4px'
    },
    infoCardText: {
        fontSize: '14px',
        color: '#6C63FF'
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
        color: '#6C63FF'
    },
    listDot: {
        width: '6px',
        height: '6px',
        background: 'linear-gradient(90deg, #8E24AA, #6C63FF)',
        borderRadius: '50%',
        marginRight: '8px',
        boxShadow: '0 0 4px rgba(142, 36, 170, 0.5)'
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
        background: 'radial-gradient(circle, rgba(243, 229, 245, 1), rgba(232, 234, 255, 0.5))',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        marginBottom: '24px',
        position: 'relative',
        boxShadow: '0 0 20px rgba(142, 36, 170, 0.3)'
    },
    successIconGlow: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        borderRadius: '50%',
        boxShadow: '0 0 30px rgba(142, 36, 170, 0.5)',
        animation: 'pulseIconGlow 2s ease-in-out infinite'
    },
    successIconInner: {
        width: '32px',
        height: '32px',
        background: 'linear-gradient(135deg, #8E24AA, #6C63FF)',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        position: 'relative',
        zIndex: '2'
    },
    nextStepsCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid #D1C4E9',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '480px',
        margin: '0 auto',
        marginBottom: '32px',
        boxShadow: '0 4px 20px rgba(89, 64, 169, 0.15), 0 0 0 1px rgba(89, 64, 169, 0.1)',
        position: 'relative',
        overflow: 'hidden'
    },
    nextStepsCardGlow: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '-1',
        background: 'radial-gradient(circle at top left, rgba(142, 36, 170, 0.15), transparent 70%), radial-gradient(circle at bottom right, rgba(108, 99, 255, 0.15), transparent 70%)',
        animation: 'pulseGlow 6s ease-in-out infinite alternate'
    },
    nextStepsList: {
        textAlign: 'left',
        color: '#3F3D56',
        margin: '0',
        padding: '0',
        listStyleType: 'none'
    },
    nextStepsItem: {
        display: 'flex',
        marginBottom: '12px',
        position: 'relative'
    },
    nextStepsNumber: {
        fontWeight: '500',
        background: 'linear-gradient(90deg, #8E24AA, #6C63FF)',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginRight: '8px',
        position: 'relative'
    },
    nextStepsNumberGlow: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        filter: 'blur(4px)',
        background: 'linear-gradient(90deg, #8E24AA, #6C63FF)',
        opacity: '0.5',
        zIndex: '-1'
    },
    // Keyframes for animations
    '@keyframes gradientShift': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' }
    },
    '@keyframes gradientMove': {
        '0%': { backgroundPosition: '0% 0%' },
        '100%': { backgroundPosition: '100% 0%' }
    },
    '@keyframes gradientText': {
        '0%': { backgroundPosition: '0% 50%' },
        '100%': { backgroundPosition: '100% 50%' }
    },
    '@keyframes gradientButton': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' }
    },
    '@keyframes pulseGlow': {
        '0%': { opacity: '0.2' },
        '100%': { opacity: '0.5' }
    },
    '@keyframes pulseIconGlow': {
        '0%': { boxShadow: '0 0 15px rgba(142, 36, 170, 0.3)' },
        '50%': { boxShadow: '0 0 30px rgba(142, 36, 170, 0.6)' },
        '100%': { boxShadow: '0 0 15px rgba(142, 36, 170, 0.3)' }
    },
    '@keyframes pulseButtonGlow': {
        '0%': { opacity: '0.3' },
        '50%': { opacity: '0.5' },
        '100%': { opacity: '0.3' }
    },
    '@keyframes pulseText': {
        '0%': { opacity: '0.7' },
        '100%': { opacity: '1' }
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
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
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
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
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
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
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
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
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