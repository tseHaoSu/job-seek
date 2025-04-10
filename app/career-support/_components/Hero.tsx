import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import React from 'react'
import Image from "next/image";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-8">
        <h1 className="text-4xl font-extrabold lg:text-5xl text-red-900 leading-tight">
          Job Platforms Guidance 
        </h1>
        <h3 className="text-xl md:text-2xl text-gray-700 leading-relaxed">
        Our dedicated AI can help you quickly generate resumes, giving you more help and reference when writing your resume.
        </h3>
      </div>
      <div className="md:mt-0">
        <Image
          src="/man2.jpg"
          width={500}
          height={500}
          alt="Picture of the author"
          className="rounded-2xl shadow-2xl w-full object-cover hover:shadow-red-200 duration-300"
        />
      </div>
    </div>
  );
}

export default Hero