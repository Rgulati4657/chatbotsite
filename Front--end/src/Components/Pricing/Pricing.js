import React from "react";
import styles from "./Pricing.module.css";

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "2 seats included",
      "Unlimited chat history",
      "Livechat",
      "Mobile apps",
      "Basic integrations",
    ],
    buttonText: "Get Started",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$25",
    period: "/ month",
    features: [
      "4 seats included",
      "Unlimited chat history",
      "Livechat + Email",
      "Advanced integrations",
      "Shared inbox",
    ],
    buttonText: "Try for 14 days",
    isPopular: true,
  },
  {
    name: "Unlimited",
    price: "$95",
    period: "/ month",
    features: [
      "Unlimited seats",
      "Unlimited chat history",
      "Livechat + Email + More",
      "Premium integrations",
      "Advanced analytics",
    ],
    buttonText: "Try for 14 days",
    isPopular: false,
  },
];

const Pricing = () => {
  return (
    <section className={styles.pricingSection}>
      <div className={styles.pricingHeader}>
        <h1>Pricing Plans</h1>
        <p>
          Each new account gets access to all Mediator features. Try it free for 14
          days and see if it fits your needs!
        </p>
      </div>
      <div className={styles.pricingContainer}>
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={styles.pricingCard} 
          >
            <h2>{plan.name}</h2>
            <div className={styles.price}>
              <span className={styles.amount}>{plan.price}</span>
              <span className={styles.period}>{plan.period}</span>
             
            </div>
            <ul className={styles.features}>
              {plan.features.map((feature, id) => (
                <li key={id}>{feature}</li>
              ))}
            </ul>
            <button className={styles.priceButton}>{plan.buttonText}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;