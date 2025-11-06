// src/components/AboutUs.jsx

import React from "react";
import { BusFront, Users, Leaf, Clock } from "lucide-react"; // Importing icons for features

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header Section */}
      <header className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {" "}
          {/* Header text remains centered for impact */}
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            About <span className="text-indigo-500">campusCommute</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300">
            Connecting our campus, one ride at a time.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Mission */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            {" "}
            {/* Removed text-center from outer div */}
            <h2 className="text-3xl font-bold mb-6 text-center">
              Our Mission
            </h2>{" "}
            {/* Centered heading */}
            <p className="text-lg text-gray-700 leading-relaxed text-left">
              {" "}
              {/* Left-aligned text for paragraphs */}
              At Campus Commute, our mission is to provide the safest,
              most reliable, and convenient transportation service for our
              university community. We are dedicated to enhancing the daily
              lives of students, faculty, and staff by offering efficient bus
              services that connect every corner of the campus and beyond.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4 text-left">
              {" "}
              {/* Left-aligned text for paragraphs */}
              We believe that seamless transportation is key to a thriving
              campus environment, allowing everyone to focus on their academic
              and personal growth without worrying about their commute.
            </p>
          </div>
        </section>

        {/* Why Choose Us / Our Values */}
        <section className="mb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">
              Why Choose Campus Commute?
            </h2>{" "}
            {/* Heading remains centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1: Convenience */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center text-center border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <BusFront className="w-12 h-12 text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Unmatched Convenience
                </h3>
                <p className="text-gray-600 text-sm">
                  {" "}
                  {/* Paragraph within card is centered */}
                  Easily access schedules, track buses in real-time, and manage
                  your pass from your phone. Your ride, simplified.
                </p>
              </div>

              {/* Feature 2: Safety & Reliability */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center text-center border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <Users className="w-12 h-12 text-teal-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Safety First</h3>
                <p className="text-gray-600 text-sm">
                  {" "}
                  {/* Paragraph within card is centered */}
                  Our commitment to your safety is paramount. Experienced
                  drivers and well-maintained buses ensure a secure journey.
                </p>
              </div>

              {/* Feature 3: Eco-Friendly */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center text-center border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <Leaf className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Sustainable Travel
                </h3>
                <p className="text-gray-600 text-sm">
                  {" "}
                  {/* Paragraph within card is centered */}
                  Reduce your carbon footprint by choosing shared
                  transportation. We're committed to greener commutes.
                </p>
              </div>

              {/* Feature 4: Time-Saving */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center text-center border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <Clock className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Always On Time</h3>
                <p className="text-gray-600 text-sm">
                  {" "}
                  {/* Paragraph within card is centered */}
                  With real-time tracking and optimized routes, we get you to
                  classes and activities punctually.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story / How It Started (Optional) */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            {" "}
            {/* Removed text-center from outer div */}
            <h2 className="text-3xl font-bold mb-6 text-center">
              Our Story
            </h2>{" "}
            {/* Centered heading */}
            <p className="text-lg text-gray-700 leading-relaxed text-left">
              {" "}
              {/* Left-aligned text for paragraphs */}
              Campus Commute was founded by a team of dedicated students and
              university staff who recognized the growing need for a modernized,
              efficient, and user-friendly transportation system. Frustrated by
              outdated schedules and fragmented information, we envisioned a
              platform that would centralize all transportation needs for the
              campus.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4 text-left">
              {" "}
              {/* Left-aligned text for paragraphs */}
              From our initial brainstorming sessions to the launch of our
              digital bus pass system, every step has been driven by the desire
              to make campus life easier and more accessible for everyone. We
              continuously evolve, incorporating feedback and new technologies
              to serve you better.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gray-50 p-10 rounded-lg shadow-inner border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join the Campus Commute!
          </h2>{" "}
          {/* Centered heading */}
          <p className="text-lg text-gray-700 mb-6">
            Ready to experience hassle-free campus transportation? Get your bus
            pass today!
          </p>
          <a
            href="/applypass"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Your Pass Now
          </a>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
