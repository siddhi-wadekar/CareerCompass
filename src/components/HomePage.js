import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const benefitsData = [
    {
      title: 'Personalized Career Guidance',
      description: 'Tailored insights and advice to help you reach your goals.'
    },
    {
      title: 'Resume Enhancement',
      description: 'Improve your professional profile with expert tips.'
    },
    {
      title: 'Industry Insights & Networking',
      description: 'Stay informed and build valuable connections.'
    },
    {
      title: 'Practical Resources',
      description: 'Access checklists, templates, and tools to accelerate success.'
    },
    {
      title: 'Flexible & Engaging Platform',
      description: 'Learn at your own pace through interactive content.'
    },
    {
      title: 'Roadmap to Success',
      description: 'A clear path from where you are to where you want to be.'
    }
  ];

  const faqData = [
    {
      question: 'How does Career Compass provide career recommendations?',
      answer: 'Our AI-powered platform analyzes your skills, interests, and personality traits to generate personalized career paths tailored to your strengths.'
    },
    {
      question: 'What industries and careers does Career Compass cover?',
      answer: 'We provide insights and recommendations across various industries, including technology, healthcare, finance, creative fields, and more.'
    },
    {
      question: 'Can I get guidance on improving my resume?',
      answer: 'Yes! Our Resume Builder analyzes your resume and provides AI-driven suggestions to improve your profile and increase job prospects.'
    },
    {
      question: 'Does Career Compass offer skill-building resources?',
      answer: 'Absolutely! We provide curated learning resources, courses, and certifications to help you bridge skill gaps and grow in your chosen career.'
    },
    {
      question: 'Is there mentorship available?',
      answer: 'Yes, our optional mentor matching feature connects you with industry professionals for guidance and career advice.'
    },
    {
      question: 'How do I start using Career Compass?',
      answer: 'Simply sign up, take our career assessment, and explore your personalized career recommendations.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const Divider = ({ className }) => <hr className={className || "divider"} />;

  const renderHeroSection = () => (
    <section className="hero-container section-spacing">
      <div className="hero-content">
        <div className="hero-image-container">
          <img
            src={require('../assets/slide2.png')}
            alt="Hero Illustration"
            className="hero-image"
          />
        </div>
        <div className="hero-text-container">
          <p className="hero-welcome">Welcome to Career Compass</p>
          <h1 className="hero-title">
            Where Ambitions <span className="blue-text">Ignite</span> and{' '}
            <span className="blue-text">Careers</span> Take{' '}
            <span className="blue-text">Flight</span>.
          </h1>
          <p className="hero-description">
            We nurture your future and ignite your passion for growth. Our innovative platform provides a supportive and inspiring environment, guiding you on a transformative journey to unlock your potential and shape your career path for a lifetime of success. Join us and take the first step toward an exciting future!
          </p>
          <button 
            className="hero-button"
            onClick={() => navigate('/career-guide')}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );



  const renderBenefitsSection = () => (
    <section className="benefits-container section-spacing centered-section">
      <button className="section-button future-button">
        Choose Your Bright Future
      </button>
      <h2 className="section-heading">Our Benefits</h2>
      <div className="grid-container">
        {benefitsData.map((benefit, index) => (
          <div key={index} className="grid-card benefit-card">
            <h3 className="grid-card-title">{benefit.title}</h3>
            <p className="grid-card-description">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const renderFAQSection = () => (
    <section className="faq-container section-spacing centered-section">
      <button className="section-button">Solutions For The Doubts</button>
      <h2 className="section-heading">Frequently Asked Questions</h2>
      <div className="grid-container">
        {faqData.map((faq, index) => (
          <div key={index} className="grid-card faq-card">
            <button
              className="grid-card-question"
              onClick={() => toggleFAQ(index)}
            >
              <span className="faq-icon">
                {openIndex === index ? '−' : '+'}
              </span>
              <span className="faq-question-text">
                <strong>{faq.question}</strong>
              </span>
            </button>
            {openIndex === index && (
              <div className="grid-card-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="footer section-spacing">
      <p>© 2025 Career Compass. All rights reserved.</p>
      <div className="footer-social">
        <a href="https://facebook.com">Facebook</a> |{' '}
        <a href="https://twitter.com">Twitter</a> |{' '}
        <a href="https://linkedin.com">LinkedIn</a>
      </div>
    </footer>
  );

  return (
    <div className="page-container">
      {renderHeroSection()}
      <Divider />
      {renderBenefitsSection()}
      <Divider />
      {renderFAQSection()}
      <Divider />
      {renderFooter()}
    </div>
  );
};

export default HomePage;
