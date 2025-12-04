"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface TimelineItemProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  isLast?: boolean;
  index?: number;
}

export const TimelineItem = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  isLast = false,
  index = 0,
}: TimelineItemProps) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      x: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.1,
      },
    },
  };

  const avatarVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: {
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.1 + 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative flex gap-6"
    >
      {/* Timeline column */}
      <div className="relative flex flex-col items-center pt-1">
        {/* Animated Avatar with ring effect */}
        <motion.div
          variants={avatarVariants}
          className="relative z-10 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm"></div>
          <Avatar className="relative border-4 border-background size-14 bg-background shadow-lg ring-2 ring-primary/10 hover:scale-105 transition-transform duration-300">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain p-1 bg-white"
            />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {altText[0]}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        
        {/* Animated Timeline line */}
        {!isLast && (
          <motion.div
            variants={lineVariants}
            className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-full origin-top"
          >
            <div className="w-full h-full bg-gradient-to-b from-primary/40 via-primary/20 to-primary/5"></div>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <motion.div variants={cardVariants}>
          <Card className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary/40 p-2 border-t border-b border-r">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {title}
                  </h3>
                  {subtitle && (
                    <div className="font-medium text-sm text-muted-foreground">
                      {subtitle}
                    </div>
                  )}
                </div>
                <div className="text-sm font-medium tabular-nums text-muted-foreground whitespace-nowrap bg-muted/50 px-3 py-1 rounded-md border">
                  {period}
                </div>
              </div>

              {badges && badges.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {badges.map((badge, badgeIndex) => (
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium hover:scale-105 transition-transform duration-200"
                      key={badgeIndex}
                    >
                      {badge}
                    </Badge>
                  ))}
                </motion.div>
              )}

              {description && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                  className="text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/50"
                >
                  {description}
                </motion.div>
              )}
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Updated usage in your work section:
/*
<section id="work">
  <div className="flex min-h-0 flex-col gap-y-3">
    <BlurFade delay={BLUR_FADE_DELAY * 5}>
      <h2 className="text-xl font-bold">Work Experience</h2>
    </BlurFade>
    <div className="mt-6">
      {DATA.work.map((work, id) => (
        <TimelineItem
          key={work.company}
          logoUrl={work.logoUrl}
          altText={work.company}
          title={work.company}
          subtitle={work.title}
          href={work.href}
          badges={work.badges}
          period={`${work.start} - ${work.end ?? "Present"}`}
          description={work.description}
          isLast={id === DATA.work.length - 1}
          index={id}
        />
      ))}
    </div>
  </div>
</section>
*/