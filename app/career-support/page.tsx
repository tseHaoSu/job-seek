"use client";

import React, { useState } from "react";
import Hero from "./_components/Hero";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, Trash2, ChevronDown } from "lucide-react";

const DEGREE_TYPES = ["Certificates I-V", "Diploma", "Bachelor", "Master", "PhD"];

const Page = () => {
  const [userName, setUserName] = useState("");

  const [educationGroups, setEducationGroups] = useState([
    { institution: "", degree: "", studyArea: "", startYear: "", endYear: "" },
  ]);
  const [eduErrors, setEduErrors] = useState<string[][]>([[]]);

  const [workGroups, setWorkGroups] = useState([
    { company: "", position: "", startYear: "", endYear: "" },
  ]);
  const [workErrors, setWorkErrors] = useState<string[][]>([[]]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedJson, setGeneratedJson] = useState<object | null>(null);

  // Only allow numeric 4-digit year input
  const handleYearInput = (value: string) => value.replace(/\D/g, "").slice(0, 4);

  // Clean text inputs: allow alphanumeric + selected punctuation
  const cleanTextInput = (value: string) => {
    return value.replace(/[^a-zA-Z0-9\s,.()&'-]/g, "").trimStart();
  };

  // General update handler for education and work groups
  const updateGroup = (
    setGroups: Function,
    groups: any[],
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...groups];
    updated[index][field] = value;
    setGroups(updated);
  };

  // Add or delete education group
  const addEdu = () => {
    setEducationGroups([...educationGroups, { institution: "", degree: "", studyArea: "", startYear: "", endYear: "" }]);
    setEduErrors([...eduErrors, []]);
  };
  const deleteEdu = (index: number) => {
    if (index === 0) return;
    setEducationGroups(educationGroups.filter((_, i) => i !== index));
    setEduErrors(eduErrors.filter((_, i) => i !== index));
  };

  // Add or delete work group
  const addWork = () => {
    setWorkGroups([...workGroups, { company: "", position: "", startYear: "", endYear: "" }]);
    setWorkErrors([...workErrors, []]);
  };
  const deleteWork = (index: number) => {
    if (index === 0) return;
    setWorkGroups(workGroups.filter((_, i) => i !== index));
    setWorkErrors(workErrors.filter((_, i) => i !== index));
  };

  // Validate form entries
  const validateForm = () => {
    let valid = true;

    const newEduErrors: string[][] = educationGroups.map((group, index) => {
      const errors: string[] = [];
      if (index > 0) {
        if (!group.institution) errors.push("Institution is required.");
        if (!group.degree) errors.push("Degree type is required.");
        if (!group.studyArea) errors.push("Study area is required.");
        if (!group.startYear || group.startYear.length < 4) errors.push("Start year must be 4 digits.");
        if (!group.endYear || group.endYear.length < 4) errors.push("End year must be 4 digits.");
      }
      return errors;
    });

    const newWorkErrors: string[][] = workGroups.map((group) => {
      const errors: string[] = [];
      if (!group.company) errors.push("Company is required.");
      if (!group.position) errors.push("Position is required.");
      if (!group.startYear || group.startYear.length < 4) errors.push("Start year must be 4 digits.");
      if (!group.endYear || group.endYear.length < 4) errors.push("End year must be 4 digits.");
      return errors;
    });

    setEduErrors(newEduErrors);
    setWorkErrors(newWorkErrors);

    if (newEduErrors.some((e) => e.length > 0) || newWorkErrors.some((e) => e.length > 0)) {
      valid = false;
    }

    return valid;
  };

  // Format user input into final payload JSON for API (or display)
  const handleSubmit = () => {
    setError(null);
    setGeneratedJson(null);
    setLoading(true);

    setTimeout(() => {
      try {
        if (!validateForm()) {
          setLoading(false);
          return;
        }

        const payload = {
          name: userName,
          education: educationGroups
            .filter((group, index) =>
              index === 0
                ? group.institution || group.degree || group.studyArea || group.startYear || group.endYear
                : true
            )
            .map((group) => ({
              institution: group.institution,
              degree_type: group.degree,
              degree_name: group.studyArea,
              year_start: parseInt(group.startYear),
              year_end: parseInt(group.endYear),
            })),
          work_experience: workGroups.map((group) => ({
            organization: group.company,
            job_title: group.position,
            year_start: parseInt(group.startYear),
            year_end: parseInt(group.endYear),
          })),
        };

        setGeneratedJson(payload);
        setLoading(false);
      } catch (err) {
        console.error("Error generating JSON:", err);
        setError("An unexpected error occurred while generating the result.");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="space-y-10 p-4 sm:px-6 lg:px-8">
      <Hero />

      {/* User name field */}
      <div>
        <label className="block text-lg font-medium mb-1">What is your name?</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(cleanTextInput(e.target.value))}
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      {/* Education input groups */}
      {educationGroups.map((group, index) => (
        <div key={index} className="space-y-4 border rounded-lg p-6 bg-gray-50 relative">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Education Group {index + 1}</h3>
            {index > 0 && (
              <button onClick={() => deleteEdu(index)} className="text-red-600 hover:text-red-800 flex items-center gap-1">
                <Trash2 size={18} /> Delete
              </button>
            )}
          </div>

          {/* Institution input */}
          <div>
            <label className="block text-lg font-medium">Institution</label>
            <input
              type="text"
              value={group.institution}
              onChange={(e) => updateGroup(setEducationGroups, educationGroups, index, "institution", cleanTextInput(e.target.value))}
              placeholder="Enter the institution name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            {eduErrors[index].includes("Institution is required.") && (
              <p className="text-red-600 text-sm mt-1">Institution is required.</p>
            )}
          </div>

          {/* Degree dropdown */}
          <div>
            <label className="block text-lg font-medium">Degree Type</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {group.degree || "Select Degree Type"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[250px]">
                {DEGREE_TYPES.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onSelect={() => updateGroup(setEducationGroups, educationGroups, index, "degree", type)}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {eduErrors[index].includes("Degree type is required.") && (
              <p className="text-red-600 text-sm mt-1">Degree type is required.</p>
            )}
          </div>

          {/* Study area */}
          <div>
            <label className="block text-lg font-medium">Study Area</label>
            <input
              type="text"
              value={group.studyArea}
              onChange={(e) => updateGroup(setEducationGroups, educationGroups, index, "studyArea", cleanTextInput(e.target.value))}
              placeholder="Enter your field of study"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            {eduErrors[index].includes("Study area is required.") && (
              <p className="text-red-600 text-sm mt-1">Study area is required.</p>
            )}
          </div>

          {/* Start and end year */}
          <div>
            <label className="block text-lg font-medium">Start Year</label>
            <input
              type="text"
              inputMode="numeric"
              value={group.startYear}
              onChange={(e) => updateGroup(setEducationGroups, educationGroups, index, "startYear", handleYearInput(e.target.value))}
              placeholder="e.g. 2020"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            {eduErrors[index].includes("Start year must be 4 digits.") && (
              <p className="text-red-600 text-sm mt-1">Start year must be 4 digits.</p>
            )}
          </div>
          <div>
            <label className="block text-lg font-medium">End Year</label>
            <input
              type="text"
              inputMode="numeric"
              value={group.endYear}
              onChange={(e) => updateGroup(setEducationGroups, educationGroups, index, "endYear", handleYearInput(e.target.value))}
              placeholder="e.g. 2024"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            {eduErrors[index].includes("End year must be 4 digits.") && (
              <p className="text-red-600 text-sm mt-1">End year must be 4 digits.</p>
            )}
          </div>
        </div>
      ))}

      {/* Add education button */}
      <div className="flex justify-center">
        <Button onClick={addEdu} className="bg-red-800 hover:bg-red-900 text-white w-44 h-12 rounded-xl shadow-lg">
          + Add Education
        </Button>
      </div>

            {/* Work experience input groups */}
            {workGroups.map((group, index) => (
        <div key={index} className="space-y-4 border rounded-lg p-6 bg-gray-50 relative">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Work Experience Group {index + 1}</h3>
            {index > 0 && (
              <button onClick={() => deleteWork(index)} className="text-red-600 hover:text-red-800 flex items-center gap-1">
                <Trash2 size={18} /> Delete
              </button>
            )}
          </div>

          {/* Company input */}
          <div>
            <label className="block text-lg font-medium">Company or Organization</label>
            <input
              type="text"
              value={group.company}
              onChange={(e) => updateGroup(setWorkGroups, workGroups, index, "company", cleanTextInput(e.target.value))}
              placeholder="Enter the company or organization name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            {workErrors[index].includes("Company is required.") && (
              <p className="text-red-600 text-sm mt-1">Company is required.</p>
            )}
          </div>

          {/* Position input */}
          <div>
            <label className="block text-lg font-medium">Position</label>
            <input
              type="text"
              value={group.position}
              onChange={(e) => updateGroup(setWorkGroups, workGroups, index, "position", cleanTextInput(e.target.value))}
              placeholder="Enter your job title"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            {workErrors[index].includes("Position is required.") && (
              <p className="text-red-600 text-sm mt-1">Position is required.</p>
            )}
          </div>

          {/* Start year */}
          <div>
            <label className="block text-lg font-medium">Start Year</label>
            <input
              type="text"
              inputMode="numeric"
              value={group.startYear}
              onChange={(e) => updateGroup(setWorkGroups, workGroups, index, "startYear", handleYearInput(e.target.value))}
              placeholder="e.g. 2015"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            {workErrors[index].includes("Start year must be 4 digits.") && (
              <p className="text-red-600 text-sm mt-1">Start year must be 4 digits.</p>
            )}
          </div>

          {/* End year */}
          <div>
            <label className="block text-lg font-medium">End Year</label>
            <input
              type="text"
              inputMode="numeric"
              value={group.endYear}
              onChange={(e) => updateGroup(setWorkGroups, workGroups, index, "endYear", handleYearInput(e.target.value))}
              placeholder="e.g. 2020"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            {workErrors[index].includes("End year must be 4 digits.") && (
              <p className="text-red-600 text-sm mt-1">End year must be 4 digits.</p>
            )}
          </div>
        </div>
      ))}

      {/* Add work experience button */}
      <div className="flex justify-center">
        <Button onClick={addWork} className="bg-red-800 hover:bg-red-900 text-white w-44 h-12 rounded-xl shadow-lg">
          + Add Work Experience
        </Button>
      </div>

      {/* Submit button and JSON result display */}
      <div className="flex justify-center mt-10">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="outline"
          className={`bg-red-800 hover:bg-red-900 text-white w-44 h-12 rounded-xl shadow-lg ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Loading..." : (
            <>
              <Sparkles className="mr-2" /> Submit
            </>
          )}
        </Button>
      </div>

      {error && (
        <p className="text-red-600 text-center mt-4">{error}</p>
      )}

      {generatedJson && (
        <div className="mt-8 bg-gray-100 border border-gray-300 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Generated JSON:</h3>
          <pre className="whitespace-pre-wrap break-words text-sm bg-white p-4 rounded-md overflow-auto max-h-[400px]">
            {JSON.stringify(generatedJson, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Page;