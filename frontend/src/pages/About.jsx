import React from "react";
import aboutAnimation from "../animation/aboutUsAnimation.gif"; // Ensure correct path

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4">
      {/* Animation - On top for mobile, left for larger screens */}
      <div className="w-full md:w-1/2 flex justify-center mb-1 md:mb-0">
        <img src={aboutAnimation} alt="About Us Animation" className="w-3/4 md:w-full max-w-md" />
      </div>

      {/* Text Content - Below animation for mobile, right for larger screens */}
      <div className="w-full md:w-1/2 text-center md:text-left p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-700 text-lg">
          I am <strong>Dharmik Prajapati</strong>, a student of <strong>Ganpat University</strong>.  
          This project aims to revolutionize campus commuting with innovative solutions.
        </p>
      </div>
    </div>
  );
};

export default About;
