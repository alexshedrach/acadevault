"use client";

import React from "react";
import { BookOpen, ShoppingCart, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/layout/Grid";
import { GridItem } from "@/components/layout/GridItem";
import Container from "@/components/layout/Container";

// Simulated analytics tracker
const trackFeatureClick = (title) => {
  console.log(`Feature card clicked: ${title}`);
  // Replace with actual analytics tracking logic
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    id: 1,
    icon: BookOpen,
    title: "Vast Library",
    description:
      "Access thousands of academic materials from trusted sources across multiple disciplines.",
  },
  {
    id: 2,
    icon: ShoppingCart,
    title: "Seamless Purchase",
    description:
      "Enjoy secure transactions with multiple payment options, ensuring a hassle-free experience.",
  },
  {
    id: 3,
    icon: Users,
    title: "Community Support",
    description:
      "Engage with educators and peers in a vibrant community that fosters collaborative learning.",
  },
  {
    id: 4,
    icon: Award,
    title: "Quality Assurance",
    description:
      "Every resource is carefully curated and reviewed to guarantee academic excellence.",
  },
];

export default function FeaturesSection() {
  return (
    <Container
      background="gray-50 transition-colors"
      section
      className="py-16 px-0 sm:px-8"
      role="region"
      aria-labelledby="features-heading"
    >
      {/* Section Title & Description */}
      <SectionHeader
        title="Why Choose AcadeVault?"
        description="Our platform empowers both learners and educators by offering a comprehensive, secure, and community-driven experience. Explore our features and see why thousands trust AcadeVault for their academic needs."
        align="center"
        size="lg"
        headingLevel="h2"
      />

      {/* Features Grid */}
      <Grid
        as="ul"
        role="list"
        cols={1}
        colsSm={2}
        colsLg={4}
        gap="gap-6"
        className="mt-8"
      >
        {features.map((feature) => {
          const { id, icon: Icon, title, description } = feature;
          return (
            <GridItem
              as={motion.li}
              key={id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                variant="shadowed"
                theme="light"
                clickable
                className="flex flex-col items-center text-center h-full p-5"
                onClick={() => trackFeatureClick(title)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") trackFeatureClick(title);
                }}
                aria-label={`Feature: ${title}`}
              >
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon
                    size={48}
                    className="text-blue-600 mb-4"
                    aria-hidden="true"
                  />
                </motion.div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">
                  {title}
                </h3>
                <p className="text-gray-700 text-sm">{description}</p>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    </Container>
  );
}
