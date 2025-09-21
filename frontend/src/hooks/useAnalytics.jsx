import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

const MEASUREMENT_ID = "G-XXXXXXXXXX";

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    if (MEASUREMENT_ID && MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      ReactGA.initialize(MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    // Track page views
    if (MEASUREMENT_ID && MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
    }
  }, [location]);

  const trackEvent = (eventName, parameters) => {
    if (MEASUREMENT_ID && MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      ReactGA.event(eventName, parameters);
    }
    // Also log to console for development
    console.log("Analytics Event:", eventName, parameters);
  };

  const trackCustomEvent = (action, category, label, value) => {
    trackEvent("custom_event", {
      event_category: category,
      event_label: label,
      value: value,
    });
  };

  const trackBlogView = (blogId, blogTitle) => {
    trackEvent("blog_view", {
      blog_id: blogId,
      blog_title: blogTitle,
    });
  };

  const trackSubscription = (planType) => {
    trackEvent("subscription", {
      plan_type: planType,
      event_category: "monetization",
    });
  };

  const trackUserEngagement = (action, contentId) => {
    trackEvent("user_engagement", {
      engagement_type: action,
      content_id: contentId,
    });
  };

  return {
    trackEvent,
    trackCustomEvent,
    trackBlogView,
    trackSubscription,
    trackUserEngagement,
  };
};

export default useAnalytics;
