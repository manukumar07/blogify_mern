import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-enhanced";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";

import useAnalytics from "@/hooks/useAnalytics";
import {
  Star,
  Zap,
  Crown,
  Check,
  BarChart3,
  Shield,
  Users,
  Headphones,
} from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { trackSubscription, trackEvent } = useAnalytics();
  const { isDark } = useTheme();

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track your blog performance with detailed insights and metrics",
    },
    {
      icon: Shield,
      title: "SEO Optimization",
      description:
        "Built-in SEO tools to help your content rank higher in search results",
    },
    {
      icon: Users,
      title: "Community Features",
      description:
        "Build and engage with your audience through comments and social features",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help when you need it with our dedicated support team",
    },
  ];

  const plans = [
    {
      name: "Basic",
      description: "Perfect for personal bloggers",
      price: billingCycle === "monthly" ? 9 : 99,
      originalPrice: billingCycle === "yearly" ? 108 : null,
      icon: Star,
      gradient: "from-[#3366FF] to-[#00CCCC]",
      features: [
        "Up to 5 blog posts per month",
        "Basic analytics",
        "Standard templates",
        "SEO optimization",
        "Social media integration",
      ],
      limitations: ["Limited customization", "Blogify branding"],
    },
    {
      name: "Pro",
      description: "For serious content creators",
      price: billingCycle === "monthly" ? 29 : 299,
      originalPrice: billingCycle === "yearly" ? 348 : null,
      icon: Zap,
      gradient: "from-[#6633CC] to-[#3366FF]",
      popular: true,
      features: [
        "Unlimited blog posts",
        "Advanced analytics & insights",
        "Premium templates",
        "Custom domain",
        "Newsletter integration",
        "Comment moderation",
      ],
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: billingCycle === "monthly" ? 99 : 999,
      originalPrice: billingCycle === "yearly" ? 1188 : null,
      icon: Crown,
      gradient: "from-[#FFCC00] to-[#FF9900]",
      features: [
        "Everything in Pro",
        "Multi-user collaboration",
        "White-label solution",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
      ],
    },
  ];

  const handleSubscribe = (planName, price) => {
    trackSubscription(planName);
    trackEvent("pricing_cta_click", {
      plan: planName,
      price: price,
      billing_cycle: billingCycle,
    });

    alert(
      `Redirecting to checkout for ${planName} plan ($${price}/${
        billingCycle === "monthly" ? "month" : "year"
      })`
    );
  };

  const yearlyDiscount = (originalPrice, yearlyPrice) => {
    return Math.round(((originalPrice - yearlyPrice) / originalPrice) * 100);
  };

  return (
    <div
      className={`min-h-screen font-inter transition-colors duration-500 ${
        isDark ? "bg-[#0B0F19] text-[#F8FAFC]" : "bg-[#FFFFFF] text-[#0B0F19]"
      }`}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
            }`}
          >
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#3366FF] to-[#00CCCC] bg-clip-text text-transparent">
              Blogging Journey
            </span>
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto mb-8 ${
              isDark ? "text-[#94A3B8]" : "text-[#64748B]"
            }`}
          >
            Start free, upgrade as you grow. All plans include our core blogging
            tools with advanced features for serious creators.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-sm ${
                billingCycle === "monthly"
                  ? isDark
                    ? "text-[#F8FAFC]"
                    : "text-[#0B0F19]"
                  : isDark
                  ? "text-[#94A3B8]"
                  : "text-[#64748B]"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly"
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-[#3366FF]" : "bg-[#475569]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-[#FFFFFF] transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm ${
                billingCycle === "yearly"
                  ? isDark
                    ? "text-[#F8FAFC]"
                    : "text-[#0B0F19]"
                  : isDark
                  ? "text-[#94A3B8]"
                  : "text-[#64748B]"
              }`}
            >
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <Badge
                className={`ml-2 border ${
                  isDark
                    ? "bg-[#1E293B] text-[#94A3B8] border-[#334155]"
                    : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
                }`}
              >
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "ring-2 ring-[#3366FF] shadow-lg"
                  : "hover:shadow-md"
              } ${
                isDark
                  ? "bg-[#1E293B] text-[#F8FAFC]"
                  : "bg-[#FFFFFF] text-[#0B0F19]"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div
                    className={`bg-gradient-to-r ${plan.gradient} text-[#FFFFFF] text-center py-2 text-sm font-medium`}
                  >
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader
                className={`text-center ${plan.popular ? "pt-16" : "pt-8"}`}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mx-auto mb-4`}
                >
                  <plan.icon className="h-8 w-8 text-[#FFFFFF]" />
                </div>

                <CardTitle
                  className={`text-2xl font-bold ${
                    isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                  }`}
                >
                  {plan.name}
                </CardTitle>
                <p className={isDark ? "text-[#94A3B8]" : "text-[#64748B]"}>
                  {plan.description}
                </p>

                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span
                      className={`text-4xl font-bold ${
                        isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                      }`}
                    >
                      ${plan.price}
                    </span>
                    <span
                      className={isDark ? "text-[#94A3B8]" : "text-[#64748B]"}
                    >
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  {plan.originalPrice && billingCycle === "yearly" && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span
                        className={`text-sm line-through ${
                          isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                        }`}
                      >
                        ${plan.originalPrice}/year
                      </span>
                      <Badge
                        className={`text-xs border ${
                          isDark
                            ? "bg-[#1E293B] text-[#94A3B8] border-[#334155]"
                            : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
                        }`}
                      >
                        Save {yearlyDiscount(plan.originalPrice, plan.price)}%
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  className={`w-full bg-gradient-to-r ${plan.gradient} text-[#FFFFFF] border-0 hover:opacity-90`}
                  onClick={() => handleSubscribe(plan.name, plan.price)}
                >
                  {plan.name === "Basic"
                    ? "Start Free Trial"
                    : `Choose ${plan.name}`}
                </Button>

                <div className="space-y-3">
                  <h4
                    className={`font-semibold text-sm uppercase tracking-wide ${
                      isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                    }`}
                  >
                    What's included:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-[#1FAA55] mt-0.5 flex-shrink-0" />
                        <span
                          className={`text-sm ${
                            isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && (
                    <div
                      className={`pt-4 border-t ${
                        isDark ? "border-[#334155]" : "border-[#E2E8F0]"
                      }`}
                    >
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div
                              className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                                isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                              }`}
                            >
                              —
                            </div>
                            <span
                              className={`text-sm ${
                                isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                              }`}
                            >
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 font-inter">
          <h2
            className={`text-3xl font-bold text-center mb-12 animate-fade-in ${
              isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
            }`}
          >
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-[#3366FF] to-[#00CCCC] bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`text-center p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 animate-slide-up ${
                  isDark ? "bg-[#1E293B]" : "bg-[#FFFFFF]"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#00CCCC] flex items-center justify-center mx-auto mb-4 animate-scale-in">
                  <feature.icon className="h-6 w-6 text-[#3366FF]" />
                </div>
                <h3
                  className={`font-semibold mb-2 ${
                    isDark ? "text-[#F8FAFC]" : "text-[#0B0F19]"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-[#94A3B8]" : "text-[#64748B]"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
