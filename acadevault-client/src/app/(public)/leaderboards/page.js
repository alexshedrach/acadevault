"use client";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Trophy,
  HelpCircle,
  Share2,
  Briefcase,
  Users,
  Star,
} from "lucide-react";
import Navbar from "@/components/header/Navbar";
import Loader from "@/components/ui/Loader";
import Container from "@/components/layout/Container";
import { AlertBox } from "@/components/ui/AlertBox";
import LeaderboardCard from "./components/LeaderboardCard";

// export const metadata = generatePageMetadata({
//   title: "Leaderboards - Acadavault",
//   description:
//     "Discover Acadavault’s top affiliates, referrers, and vendors. Join our programs to earn rewards and climb the ranks!",
//   slug: "leaderboards",
//   image: "https://acadevault.com/images/leaderboards-og.jpg",
// });

export default function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState("affiliate");
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Placeholder data for demo
  const fallbackData = {
    affiliate: [
      {
        id: "aff1",
        name: "Emeka Okafor",
        avatar: "/avatars/emeka.jpg",
        earnings: 3000,
        sales: 150,
      },
      {
        id: "aff2",
        name: "Lisa Chen",
        avatar: "/avatars/lisa.jpg",
        earnings: 2400,
        sales: 120,
      },
      {
        id: "aff3",
        name: "Tolu Adeyemi",
        avatar: "/avatars/tolu.jpg",
        earnings: 2000,
        sales: 100,
      },
      {
        id: "aff4",
        name: "James Carter",
        avatar: "/avatars/james.jpg",
        earnings: 1600,
        sales: 80,
      },
      {
        id: "aff5",
        name: "Ngozi Adebayo",
        avatar: "/avatars/ngozi.jpg",
        earnings: 1400,
        sales: 70,
      },
    ],
    referrer: [
      {
        id: "ref1",
        name: "Alice Johnson",
        avatar: "/avatars/alice.jpg",
        earnings: 8234,
        referrals: 210,
      },
      {
        id: "ref2",
        name: "Michael Smith",
        avatar: "/avatars/michael.jpg",
        earnings: 7210,
        referrals: 198,
      },
      {
        id: "ref3",
        name: "Linda Wang",
        avatar: "/avatars/linda.jpg",
        earnings: 6885,
        referrals: 176,
      },
      {
        id: "ref4",
        name: "Carlos Rivera",
        avatar: "/avatars/carlos.jpg",
        earnings: 6021,
        referrals: 150,
      },
      {
        id: "ref5",
        name: "Fatima Ali",
        avatar: "/avatars/fatima.jpg",
        earnings: 5780,
        referrals: 145,
      },
    ],
    vendor: [
      {
        id: "ven1",
        name: "Dr. Ngozi Adebayo",
        avatar: "/avatars/ngozi.jpg",
        earnings: 4500,
        materialsSold: 200,
      },
      {
        id: "ven2",
        name: "Prof. James Okeke",
        avatar: "/avatars/james.jpg",
        earnings: 3800,
        materialsSold: 180,
      },
      {
        id: "ven3",
        name: "Sarah Patel",
        avatar: "/avatars/sarah.jpg",
        earnings: 3200,
        materialsSold: 150,
      },
      {
        id: "ven4",
        name: "David Lee",
        avatars: "/avatars/david.jpg",
        earnings: 2800,
        materialsSold: 130,
      },
      {
        id: "ven5",
        name: "Chloe Kim",
        avatar: "/avatars/chloe.jpg",
        earnings: 2500,
        materialsSold: 120,
      },
    ],
  };

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(`/api/leaderboard?type=${activeTab}`);
        if (!res.ok) throw new Error(`Failed to load ${activeTab} leaderboard`);
        const data = await res.json();
        setLeaders(data);
      } catch (err) {
        console.warn(`API failed for ${activeTab}, using fallback data.`);
        setError(`Showing demo ${activeTab} leaderboard data.`);
        setLeaders(fallbackData[activeTab] || []);
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    fetchLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <>
      <Navbar showSearch showCategories />
      <LeaderboardsHeroSection />
      <LeaderboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <LeaderboardSection
        leaders={leaders}
        activeTab={activeTab}
        loading={loading}
        error={error}
      />
      <RewardsSection activeTab={activeTab} />
      <HowToRankSection activeTab={activeTab} />
      <JoinProgramSection activeTab={activeTab} />
      <SupportSection />
    </>
  );
}

const LeaderboardsHeroSection = () => (
  <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-5xl font-bold mb-4 flex justify-center items-center gap-2">
        <Trophy className="w-10 h-10" />
        Acadavault Leaderboards
      </h1>
      <p className="text-xl max-w-2xl mx-auto mb-8">
        Celebrate our top affiliates, referrers, and vendors. Join a program and
        climb the ranks to earn rewards!
      </p>
      <Link
        href="/signup"
        className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-500 transition duration-300"
        aria-label="Join Acadavault programs"
      >
        Get Started
      </Link>
    </div>
  </section>
);

const LeaderboardTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "affiliate",
      label: "Affiliates",
      icon: <Share2 className="w-5 h-5" />,
    },
    { id: "referrer", label: "Referrers", icon: <Users className="w-5 h-5" /> },
    { id: "vendor", label: "Vendors", icon: <Briefcase className="w-5 h-5" /> },
  ];

  return (
    <section className="py-8 bg-gray-100">
      <Container>
        <div className="flex justify-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition duration-300 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
              aria-label={`View ${tab.label} leaderboard`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};

const LeaderboardSection = ({ leaders, activeTab, loading, error }) => {
  const getMetricLabel = (tab) => {
    switch (tab) {
      case "affiliate":
        return "Sales";
      case "referrer":
        return "Referrals";
      case "vendor":
        return "Materials Sold";
      default:
        return "Metric";
    }
  };

  return (
    <section className="py-16">
      <Container className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Top {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s
        </h2>
        {loading && (
          <Loader
            type="spinner"
            size="md"
            color="blue-600"
            text="Loading..."
            className="mx-auto mt-20"
          />
        )}
        {error && <AlertBox variant="error">{error}</AlertBox>}
        {!loading && leaders.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader, index) => (
              <LeaderboardCard
                key={leader.id}
                rank={index + 1}
                leader={{
                  ...leader,
                  metric:
                    activeTab === "affiliate"
                      ? leader.sales
                      : activeTab === "referrer"
                      ? leader.referrals
                      : leader.materialsSold,
                  metricLabel: getMetricLabel(activeTab),
                }}
              />
            ))}
          </div>
        )}
        {!loading && leaders.length === 0 && !error && (
          <p className="text-gray-600 text-center">
            No leaderboard data available.
          </p>
        )}
      </Container>
    </section>
  );
};

const RewardsSection = ({ activeTab }) => {
  const rewards = {
    affiliate: [
      {
        title: "Top Performer",
        description: "$500 cash bonus for #1 affiliate monthly.",
      },
      {
        title: "Top 5 Bonus",
        description: "Free 1-year premium subscription for top 5.",
      },
      {
        title: "Recognition",
        description: "Featured on our website and social media.",
      },
    ],
    referrer: [
      {
        title: "Top Referrer",
        description: "$300 credit for #1 referrer monthly.",
      },
      { title: "Top 5 Bonus", description: "50% off subscriptions for top 5." },
      {
        title: "Community Spotlight",
        description: "Highlighted in our community forums.",
      },
    ],
    vendor: [
      { title: "Top Vendor", description: "$400 bonus for #1 vendor monthly." },
      {
        title: "Top 5 Bonus",
        description: "Priority listing for top 5 vendors.",
      },
      { title: "Featured Seller", description: "Showcased in our newsletter." },
    ],
  };

  return (
    <section className="py-16 bg-gray-100">
      <Container className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
          <Star className="w-8 h-8 text-yellow-500" />
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Rewards
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {rewards[activeTab].map((reward, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{reward.title}</h3>
              <p className="text-gray-600">{reward.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

const HowToRankSection = ({ activeTab }) => {
  const tips = {
    affiliate: [
      "Write blogs or create videos about Acadavault’s resources.",
      "Share links on academic-focused platforms like LinkedIn or Twitter.",
      "Use targeted campaigns for materials, writers, or subscriptions.",
    ],
    referrer: [
      "Invite peers via email or social media with your referral link.",
      "Share your link in academic communities or forums.",
      "Highlight Acadavault’s benefits to students and researchers.",
    ],
    vendor: [
      "Upload high-quality, in-demand academic materials.",
      "Optimize material titles and descriptions for search.",
      "Promote your listings on social media or academic networks.",
    ],
  };

  return (
    <section className="py-16">
      <Container className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-blue-600" />
          How to Climb the{" "}
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Leaderboard
        </h2>
        <ul className="grid md:grid-cols-2 gap-6 text-gray-700 text-base max-w-4xl mx-auto">
          {tips[activeTab].map((tip, index) => (
            <li key={index} className="flex gap-2">
              <span className="font-semibold">•</span> {tip}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

const JoinProgramSection = ({ activeTab }) => {
  const links = {
    affiliate: "/affiliate/signup",
    referrer: "/refer-and-earn",
    vendor: "/vendors/register",
  };

  const programName = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  return (
    <section className="py-16 bg-gray-100">
      <Container className="text-center space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2">
          <Share2 className="w-8 h-8 text-blue-600" />
          Join the {programName} Program
        </h2>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Start earning rewards by joining our {programName.toLowerCase()}{" "}
          program today.
        </p>
        <Link
          href={links[activeTab]}
          className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-500 transition duration-300"
        >
          Join Now
        </Link>
      </Container>
    </section>
  );
};

const SupportSection = () => (
  <section className="py-16">
    <Container className="text-center space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2">
        <HelpCircle className="w-8 h-8 text-blue-600" />
        Need Help?
      </h2>
      <p className="text-base text-gray-600 max-w-2xl mx-auto">
        Our support team is available 24/7 to assist with affiliate, referrer,
        or vendor queries.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/contact"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          Contact Support
        </Link>
        <a
          href="mailto:support@acadevault.com"
          className="bg-green-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition duration-300"
        >
          Email Us
        </a>
      </div>
    </Container>
  </section>
);
