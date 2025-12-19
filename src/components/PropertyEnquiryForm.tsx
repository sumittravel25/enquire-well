import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  timeline: string;
  financing: string;
  purpose: string;
  decision_maker: string;
  activity: string;
  budget: string;
  site_visit: string;
}

const PropertyEnquiryForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    timeline: '',
    financing: '',
    purpose: '',
    decision_maker: '',
    activity: '',
    budget: '',
    site_visit: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // Basic mobile validation (at least 10 digits)
    const mobileRegex = /^\d{10,}$/;
    if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
      toast.error('Please enter a valid mobile number (at least 10 digits).');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('property_enquiries')
        .insert([formData]);

      if (error) {
        console.error('Error submitting enquiry:', error);
        toast.error('Failed to submit enquiry. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Enquiry submitted successfully!');
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      mobile: '',
      timeline: '',
      financing: '',
      purpose: '',
      decision_maker: '',
      activity: '',
      budget: '',
      site_visit: ''
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card p-10 rounded-4xl shadow-elegant max-w-md w-full text-center space-y-6 border border-border animate-scale-in">
          <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-foreground">Thank You!</h2>
            <p className="text-muted-foreground leading-relaxed">Your enquiry has been received. Our property specialist will review your requirements and contact you shortly.</p>
          </div>
          <button 
            onClick={handleReset}
            className="w-full py-3 px-6 bg-secondary text-secondary-foreground font-semibold rounded-2xl hover:bg-secondary/80 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 text-foreground">
      <div className="max-w-2xl mx-auto bg-card rounded-4xl shadow-elegant overflow-hidden border border-border animate-fade-in">
        {/* Header Section */}
        <div className="bg-primary p-10 text-primary-foreground relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight">Property Enquiry</h1>
            <p className="opacity-90 mt-2 text-lg">Please provide your details to help us find your future home.</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {/* Contact Information Section */}
          <div className="space-y-6 pb-6 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Contact Information</h2>
            
            {/* Name */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground uppercase tracking-wider">Full Name</label>
              <input 
                type="text"
                name="name" 
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-4 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground uppercase tracking-wider">Email Address</label>
              <input 
                type="email"
                name="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full p-4 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Mobile */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground uppercase tracking-wider">Mobile Number</label>
              <input 
                type="tel"
                name="mobile" 
                required 
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full p-4 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* 1. Timeline */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">1. Purchase Timeline</label>
            <select 
              name="timeline" 
              required 
              value={formData.timeline}
              onChange={handleChange}
              className="w-full p-4 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-foreground"
            >
              <option value="">When are you looking to buy?</option>
              <option value="Immediate">Immediately / Within 3 months</option>
              <option value="Short">3 to 6 months</option>
              <option value="Medium">6 to 12 months</option>
              <option value="Long">Just browsing / 12+ months</option>
            </select>
          </div>

          {/* 2. Financing */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">2. Financing Situation</label>
            <select 
              name="financing" 
              required 
              value={formData.financing}
              onChange={handleChange}
              className="w-full p-4 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-foreground"
            >
              <option value="">Select financing status</option>
              <option value="Ready">Cash buyer / Pre-approved</option>
              <option value="In Progress">In talks with a lender</option>
              <option value="Contingent">Need to sell current property</option>
              <option value="Early">Haven't started financing yet</option>
            </select>
          </div>

          {/* 3. Purpose */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">3. Property Goal</label>
            <select 
              name="purpose" 
              required 
              value={formData.purpose}
              onChange={handleChange}
              className="w-full p-4 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-foreground"
            >
              <option value="">Primary goal for this purchase</option>
              <option value="Residence">Primary Residence (End-user)</option>
              <option value="Investment">Investment (Rental/Resale)</option>
              <option value="Research">General market research</option>
            </select>
          </div>

          {/* 4. Decision Maker */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">4. Decision Power</label>
            <select 
              name="decision_maker" 
              required 
              value={formData.decision_maker}
              onChange={handleChange}
              className="w-full p-4 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-foreground"
            >
              <option value="">Are you the primary decision-maker?</option>
              <option value="Sole">Yes, I am the sole decision-maker</option>
              <option value="Partner">Yes, deciding with a partner</option>
              <option value="Other">No, researching for someone else</option>
            </select>
          </div>

          {/* 5. Activity */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">5. Market Activity</label>
            <select 
              name="activity" 
              required 
              value={formData.activity}
              onChange={handleChange}
              className="w-full p-4 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-foreground"
            >
              <option value="">Your recent activity level</option>
              <option value="Active">Actively visiting properties</option>
              <option value="Online">Searching online for 1 month+</option>
              <option value="New">Just started looking</option>
            </select>
          </div>

          {/* 6. Budget (INR) */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">6. Budget Range (INR)</label>
            <select 
              name="budget" 
              required 
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-4 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-foreground"
            >
              <option value="">Select estimated budget</option>
              <option value="Premium">Above ₹1.5 Crore</option>
              <option value="High">₹1 Crore - ₹1.5 Crore</option>
              <option value="Mid">₹60 Lakhs - ₹1 Crore</option>
              <option value="Entry">Below ₹60 Lakhs</option>
            </select>
          </div>

          {/* 7. Site Visit */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">7. Consultation Readiness</label>
            <select 
              name="site_visit" 
              required 
              value={formData.site_visit}
              onChange={handleChange}
              className="w-full p-4 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-foreground"
            >
              <option value="">When can you visit a site?</option>
              <option value="Immediate">Ready this week</option>
              <option value="Near">Within next 2 weeks</option>
              <option value="Not ready">Not ready for a visit yet</option>
            </select>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 rounded-2xl shadow-glow transition-all transform active:scale-[0.98] flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <span>Submit Enquiry</span>
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground mt-6 px-4 leading-relaxed">
              Your privacy is important. Information shared here is used strictly for qualifying your requirements.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyEnquiryForm;
