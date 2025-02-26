"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {} from "@/components/ui/select";
import {
  Download,
  Plus,
  Trash2,
  MoveVertical,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Globe,
  Pencil,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, Code } from "lucide-react";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  pdf,
  Font,
} from "@react-pdf/renderer";
import Image from "next/image";

Font.register({
  family: "Lucida Grande",
  src: "https://db.onlinewebfonts.com/t/00a15086e32947c6148c0c6fbfae6ce7.ttf",
});

const initialResumeData = {
  personalInfo: {
    name: "John Doe",
    title: "Software Engineer",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "India",
    summary:
      "Experienced software engineer with a passion for creating clean, efficient code and solving complex problems.",
    socials: {
      linkedin: "https://discord.com/invite/kzk6uWey3g",
      github: "https://github.com/ayushmxxn",
      twitter: "https://x.com/ayushmxxn",
      portfolio: "https://discord.com/invite/kzk6uWey3g",
    },
  },
  projects: [
    {
      id: "proj1",
      name: "E-commerce Platform",
      technologies: "React, Node.js, MongoDB",
      startDate: "2021-06",
      endDate: "2021-12",
      description:
        "Built a full-stack e-commerce platform with user authentication, product management, and payment integration.",
      link: "",
    },
  ],
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      position: "Senior Developer",
      startDate: "2020-01",
      endDate: "Present",
      description:
        "Led development team in creating web applications using React. Improved site performance by 40%.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      startDate: "2013-09",
      endDate: "2017-05",
      description: "GPA: 3.8/4.0. Dean's List.",
    },
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "CSS/SCSS",
    "UI/UX Design",
    "Git",
    "Zustand",
  ],
  _rawSkills:
    "JavaScript, React, Node.js, CSS/SCSS, UI/UX Design, Git, Zustand",
};

const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  headerLocation: {
    fontSize: 12,
    color: "#666",
    flexDirection: "row",
    alignItems: "center",
  },
  socialsRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  socialLink: {
    fontSize: 12,
    color: "#0066cc",
    textDecoration: "none",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1.6,
    color: "#444",
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    backgroundColor: "#f0f0f0",
    padding: "4 8",
    borderRadius: 4,
    fontSize: 11,
  },
  experienceItem: {
    marginBottom: 16,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  expTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black", 
  },
  expCompany: {
    fontSize: 13,
    color: "#666",
  },
  expDates: {
    fontSize: 12,
    color: "#666",
  },
  expDescription: {
    fontSize: 11,
    lineHeight: 1.5,
    color: "#444",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  icon: {
    marginRight: 4,
    fontSize: 12,
  },
});

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    socials: {
      linkedin: string;
      github: string;
      twitter: string;
      portfolio: string;
    };
  };
  projects: Array<{
    description: unknown;
    link: unknown;
    id: string;
    name: string;
    technologies: string;
    startDate: string;
    endDate: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  link?: string;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
  _rawSkills: string;
}

const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 4,
          }}
        >
          <View>
            <Text style={pdfStyles.headerName}>{data.personalInfo.name}</Text>
            <Text style={pdfStyles.headerTitle}>{data.personalInfo.title}</Text>
          </View>

          {data.personalInfo.location && (
            <Text style={{ fontSize: 12, color: "#666" }}>
              {data.personalInfo.location}
            </Text>
          )}
        </View>

        <View style={pdfStyles.socialsRow}>
          {data.personalInfo.socials?.linkedin && (
            <Link
              src={`https://${data.personalInfo.socials.linkedin}`}
              style={pdfStyles.socialLink}
            >
              <Text>LinkedIn</Text>
            </Link>
          )}
          {data.personalInfo.socials?.github && (
            <Link
              src={`https://${data.personalInfo.socials.github}`}
              style={pdfStyles.socialLink}
            >
              <Text>GitHub</Text>
            </Link>
          )}
          {data.personalInfo.socials?.twitter && (
            <Link
              src={`https://${data.personalInfo.socials.twitter}`}
              style={pdfStyles.socialLink}
            >
              <Text>Twitter</Text>
            </Link>
          )}
          {data.personalInfo.socials?.portfolio && (
            <Link
              src={`https://${data.personalInfo.socials.portfolio}`}
              style={pdfStyles.socialLink}
            >
              <Text>Portfolio</Text>
            </Link>
          )}
        </View>
      </View>

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>About</Text>
        <Text style={pdfStyles.paragraph}>{data.personalInfo.summary}</Text>
      </View>

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Skills</Text>
        <View style={pdfStyles.skillsContainer}>
          {data.skills.map((skill, index) => (
            <Text key={index} style={pdfStyles.skillItem}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      {data.experience.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={pdfStyles.experienceItem}>
              <View style={pdfStyles.expHeader}>
                <View>
                  <Text style={pdfStyles.expTitle}>{exp.position}</Text>
                  <Text style={pdfStyles.expCompany}>{exp.company}</Text>
                </View>
                <Text style={pdfStyles.expDates}>
                  {exp.startDate} — {exp.endDate}
                </Text>
              </View>
              <Text style={pdfStyles.expDescription}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {data.projects.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Projects</Text>
          {data.projects.map((proj) => (
            <View key={proj.id} style={pdfStyles.experienceItem}>
              <View style={pdfStyles.expHeader}>
                <View>
                  {proj.link ? (
                    <Link
                      src={`https://${proj.link}`}
                      style={pdfStyles.projectTitle}
                    >
                      {proj.name}
                    </Link>
                  ) : (
                    <Text style={pdfStyles.expTitle}>{proj.name}</Text>
                  )}
                  <Text style={pdfStyles.expCompany}>{proj.technologies}</Text>
                </View>
                <Text style={pdfStyles.expDates}>
                  {proj.startDate} — {proj.endDate}
                </Text>
              </View>
              <Text style={pdfStyles.expDescription}>
                {proj.description as string}
              </Text>
            </View>
          ))}
        </View>
      )}

      {data.education.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={pdfStyles.experienceItem}>
              <View style={pdfStyles.expHeader}>
                <View>
                  <Text style={pdfStyles.expTitle}>{edu.degree}</Text>
                  <Text style={pdfStyles.expCompany}>{edu.institution}</Text>
                </View>
                <Text style={pdfStyles.expDates}>
                  {edu.startDate} — {edu.endDate}
                </Text>
              </View>
              <Text style={pdfStyles.expDescription}>{edu.description}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Contact</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.personalInfo.email && (
            <View style={pdfStyles.contactItem}>
              <Text style={pdfStyles.icon}>✉</Text>
              <Link
                src={`mailto:${data.personalInfo.email}`}
                style={pdfStyles.socialLink}
              >
                {data.personalInfo.email}
              </Link>
            </View>
          )}
          {data.personalInfo.phone && (
            <View style={pdfStyles.contactItem}>
              <Text style={pdfStyles.icon}>☏</Text>
              <Link
                src={`tel:${data.personalInfo.phone.replace(/[^\d+]/g, "")}`}
                style={pdfStyles.socialLink}
              >
                {data.personalInfo.phone}
              </Link>
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
);

const ResumeBuilder = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [, setLastSaved] = useState<Date | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);

  const [resumeData, setResumeData] = useState({
    ...initialResumeData,
    projects: initialResumeData.projects || [],
    experience: initialResumeData.experience || [],
    education: initialResumeData.education || [],
    skills: initialResumeData.skills || [],
    _rawSkills: initialResumeData._rawSkills || "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; 

    const saveData = () => {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
      setLastSaved(new Date());
    };

    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [resumeData, isClient]);

  useEffect(() => {
    if (!isClient) return; 

    const savedData = localStorage.getItem("resumeData");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (!parsedData._rawSkills) {
          parsedData._rawSkills = parsedData.skills.join(", ");
        }
        setResumeData(parsedData);
      } catch {
        console.error("Failed to parse saved resume data");
      }
    }
  }, [isClient]);

  interface Socials {
    linkedin: string;
    github: string;
    twitter: string;
    portfolio: string;
  }

  interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    socials: Socials;
  }

  const updatePersonalInfo = (
    field: keyof PersonalInfo | "socials",
    value: string | Socials
  ) => {
    setResumeData((prev) => {
      if (field === "socials") {
        return {
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            socials: value as Socials,
          },
        };
      }
      return {
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: value,
        },
      };
    });
  };

  const addExperience = () => {
    const newExperience = {
      id: `exp${Date.now()}`,
      company: "New Company",
      position: "Position",
      startDate: "",
      endDate: "",
      description: "Describe your responsibilities and achievements",
    };

    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    });
  };

  interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const deleteExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEducation = {
      id: `edu${Date.now()}`,
      institution: "Institution Name",
      degree: "Degree",
      startDate: "",
      endDate: "",
      description: "Describe your studies and achievements",
    };

    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
  };

  interface Education {
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const deleteEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const updateSkills = (skillsString: string) => {

    setResumeData((prev) => ({
      ...prev,
      _rawSkills: skillsString, 
      skills: skillsString
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill), 
    }));
  };

  // Add new download functions
  const downloadAsPDF = async () => {
    try {
      const blob = await pdf(
        <ResumePDF data={resumeData} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsDownloadDialogOpen(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const downloadAsReactCode = () => {
    try {
      const resumeDataString = JSON.stringify(resumeData, null, 2);

      const reactCode = `import React, { useState } from 'react';
import {
  Linkedin,
  Github,
  Twitter,
  Globe,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

// Resume Data
const resumeData = ${resumeDataString};

const Resume = () => {
  const [isDarkMode, setIsDarkMode] = useState(${isDarkMode});

  return (
    <div className={\`min-h-screen \${isDarkMode ? 'dark bg-black text-white' : 'bg-white text-black'}\`}>
      {/* Navigation */}
      <nav className={\`sticky top-0 z-50 \${
        isDarkMode 
          ? 'bg-black border-b border-white/10' 
          : 'bg-white border-b'
      }\`}>
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className={\`text-xl font-bold \${isDarkMode ? 'text-white' : 'text-black'}\`}>Resume</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={\`
                  relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 transition-colors
                  \${isDarkMode ? 'bg-white/20 border-white/10' : 'bg-gray-200 border-gray-200'}
                \`}
              >
                <span
                  className={\`
                    pointer-events-none inline-block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform
                    \${isDarkMode ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white'}
                  \`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Resume */}
      <div className="container mx-auto py-6 px-4">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-6 relative">
          <div className="w-full mb-4 md:mb-0">
            <div className="flex items-start justify-between w-full">
              <div>
                <h1 className={\`\${window.innerWidth <= 768 ? 'text-2xl' : 'text-4xl'} font-bold tracking-tight mb-1\`}>
                  {resumeData.personalInfo.name}
                </h1>
                <h2 className={\`\${window.innerWidth <= 768 ? 'text-base' : 'text-lg md:text-xl'} font-medium \${isDarkMode ? 'text-white/70' : 'text-black/70'} mb-4\`}>
                  {resumeData.personalInfo.title}
                </h2>
                
                {/* Socials */}
                <div className="flex items-center gap-2 pl-0">
                  {resumeData.personalInfo.socials?.linkedin && (
                    <a 
                      href={\`https://\${resumeData.personalInfo.socials.linkedin}\`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={\`p-2 -ml-2 rounded-full transition-colors duration-200 \${
                        isDarkMode 
                          ? 'hover:bg-white/10 text-white/70 hover:text-white' 
                          : 'hover:bg-black/5 text-black/70 hover:text-black'
                      }\`}
                    >
                      <Linkedin className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  )}
                  {resumeData.personalInfo.socials?.github && (
                    <a 
                      href={\`https://\${resumeData.personalInfo.socials.github}\`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={\`p-2 -ml-2 rounded-full transition-colors duration-200 \${
                        isDarkMode 
                          ? 'hover:bg-white/10 text-white/70 hover:text-white' 
                          : 'hover:bg-black/5 text-black/70 hover:text-black'
                      }\`}
                    >
                      <Github className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  )}
                  {resumeData.personalInfo.socials?.twitter && (
                    <a 
                      href={\`https://\${resumeData.personalInfo.socials.twitter}\`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={\`p-2 -ml-2 rounded-full transition-colors duration-200 \${
                        isDarkMode 
                          ? 'hover:bg-white/10 text-white/70 hover:text-white' 
                          : 'hover:bg-black/5 text-black/70 hover:text-black'
                      }\`}
                    >
                      <Twitter className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  )}
                  {resumeData.personalInfo.socials?.portfolio && (
                    <a 
                      href={\`https://\${resumeData.personalInfo.socials.portfolio}\`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={\`p-2 -ml-2 rounded-full transition-colors duration-200 \${
                        isDarkMode 
                          ? 'hover:bg-white/10 text-white/70 hover:text-white' 
                          : 'hover:bg-black/5 text-black/70 hover:text-black'
                      }\`}
                    >
                      <Globe className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" strokeWidth={2} />
                <span className={\`text-sm \${isDarkMode ? 'text-white/70' : 'text-black/70'}\`}>
                  {resumeData.personalInfo.location}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* About */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">About</h2>
          <p className={\`leading-relaxed \${isDarkMode ? 'text-white/70' : 'text-black/70'}\`}>
            {resumeData.personalInfo.summary}
          </p>
        </section>

        {/* Skills*/}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span 
                key={index} 
                className={\`px-3 py-1.5 rounded-full text-sm font-medium \${
                  isDarkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
                }\`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">Experience</h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className={\`p-4 relative \${isDarkMode ? 'bg-black/40' : 'border rounded-lg'}\`}>
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-lg font-medium">{exp.position}</h3>
                      <h4 className={\`\${isDarkMode ? 'text-white/70' : 'text-black/70'}\`}>{exp.company}</h4>
                    </div>
                    <div className={\`text-sm \${isDarkMode ? 'text-white/50' : 'text-black/50'}\`}>
                      {exp.startDate} — {exp.endDate}
                    </div>
                  </div>
                  <p className={\`text-sm leading-relaxed \${isDarkMode ? 'text-white/70' : 'text-black/70'}\`}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">Projects</h2>
            <div className="space-y-6">
              {resumeData.projects.map((proj) => (
                <div key={proj.id} className={\`p-4 relative \${isDarkMode ? 'bg-black/40' : 'border rounded-lg'}\`}>
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <a 
                        href={\`https://\${proj.link || '#'}\`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={\`text-lg font-medium hover:underline \${
                          isDarkMode 
                            ? 'text-primary-400 hover:text-primary-300' 
                            : 'text-primary-600 hover:text-primary-700'
                        }\`}
                        onClick={(e) => {
                          if (!proj.link) e.preventDefault();
                        }}
                      >
                        {proj.name}
                      </a>
                      <h4 className={\`\${isDarkMode ? 'text-white/70' : 'text-black/70'}\`}>
                        {proj.technologies}
                      </h4>
                    </div>
                    <div className={\`text-sm \${isDarkMode ? 'text-white/50' : 'text-black/50'}\`}>
                      {proj.startDate} — {proj.endDate}
                    </div>
                  </div>
                  <p className={\`text-sm leading-relaxed \${isDarkMode ? 'text-white/70' : 'text-black/70'}\`}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">Education</h2>
            <div className="space-y-6">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className={\`p-4 relative \${isDarkMode ? 'bg-black/40' : 'border rounded-lg'}\`}>
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-lg font-medium">{edu.degree}</h3>
                      <h4 className={\`\${isDarkMode ? 'text-white/70' : 'text-black/70'}\`}>{edu.institution}</h4>
                    </div>
                    <div className={\`text-sm \${isDarkMode ? 'text-white/50' : 'text-black/50'}\`}>
                      {edu.startDate} — {edu.endDate}
                    </div>
                  </div>
                  <p className={\`text-sm leading-relaxed \${isDarkMode ? 'text-white/70' : 'text-black/70'}\`}>
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">Contact</h2>
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-start sm:space-x-12">
            {resumeData.personalInfo.email && (
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" strokeWidth={1.5} />
                <a
                  href={\`mailto:\${resumeData.personalInfo.email}\`}
                  className={\`text-base hover:underline \${
                    isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'
                  }\`}
                >
                  {resumeData.personalInfo.email}
                </a>
              </div>
            )}
            
            {resumeData.personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" strokeWidth={1.5} />
                <a
                  href={\`tel:\${resumeData.personalInfo.phone.replace(/[^\d+]/g, '')}\`}
                  className={\`text-base hover:underline \${
                    isDarkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'
                  }\`}
                >
                  {resumeData.personalInfo.phone}
                </a>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;`;

      const blob = new Blob([reactCode], { type: "text/javascript" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Resume.jsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setIsDownloadDialogOpen(false);
    } catch (error) {
      console.error("Error generating React code:", error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const moveExperienceItem = (id: string, direction: string) => {
    const currentIndex = resumeData.experience.findIndex(
      (exp) => exp.id === id
    );
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" &&
        currentIndex === resumeData.experience.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newExperience = [...resumeData.experience];
    const temp = newExperience[currentIndex];
    newExperience[currentIndex] = newExperience[newIndex];
    newExperience[newIndex] = temp;

    setResumeData({
      ...resumeData,
      experience: newExperience,
    });
  };

  const moveEducationItem = (id: string, direction: string) => {
    const currentIndex = resumeData.education.findIndex((edu) => edu.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === resumeData.education.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newEducation = [...resumeData.education];
    const temp = newEducation[currentIndex];
    newEducation[currentIndex] = newEducation[newIndex];
    newEducation[newIndex] = temp;

    setResumeData({
      ...resumeData,
      education: newEducation,
    });
  };

  const addProject = () => {
    const newProject = {
      id: `proj${Date.now()}`,
      name: "Project Name",
      technologies: "Technologies Used",
      startDate: "",
      endDate: "",
      description: "Describe your project and its impact",
      link: "",
    };

    setResumeData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProject],
    }));
  };

  const updateProject = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const deleteProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const moveProjectItem = (id: string, direction: string) => {
    setResumeData((prev) => {
      const currentIndex = prev.projects.findIndex((proj) => proj.id === id);
      if (
        (direction === "up" && currentIndex === 0) ||
        (direction === "down" && currentIndex === prev.projects.length - 1)
      ) {
        return prev;
      }

      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      const newProjects = [...prev.projects];
      const temp = newProjects[currentIndex];
      newProjects[currentIndex] = newProjects[newIndex];
      newProjects[newIndex] = temp;

      return {
        ...prev,
        projects: newProjects,
      };
    });
  };

  const renderResumePreview = () => {
    if (!resumeData) return null;

    const {
      personalInfo,
      experience = [],
      education = [],
      skills = [],
      projects = [],
    } = resumeData;

    return (
      <div
        id="resume-preview"
        className={`
          ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}
          p-4 md:p-6 max-w-4xl mx-auto
        `}
      >
        <header className="flex flex-col md:flex-row justify-between items-start mb-6 relative">
          <div className="w-full mb-4 md:mb-0">
            <div className="flex items-start justify-between w-full">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-1">
                  {personalInfo.name}
                </h1>
                <h2 className="text-base md:text-xl font-medium mb-4 ${isDarkMode ? 'text-white/70' : 'text-black/70'}">
                  {personalInfo.title}
                </h2>

                <div className="flex items-center gap-2 pl-0">
                  {personalInfo.socials?.linkedin && (
                    <a
                      href={`https://${personalInfo.socials.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 -ml-2 rounded-full transition-colors duration-200 ${
                        isDarkMode
                          ? "hover:bg-white/10 text-white/70 hover:text-white"
                          : "hover:bg-black/5 text-black/70 hover:text-black"
                      }`}
                      title="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  )}
                  {personalInfo.socials?.github && (
                    <a
                      href={`https://${personalInfo.socials.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 -ml-2 rounded-full transition-colors duration-200 ${
                        isDarkMode
                          ? "hover:bg-white/10 text-white/70 hover:text-white"
                          : "hover:bg-black/5 text-black/70 hover:text-black"
                      }`}
                      title="GitHub"
                    >
                      <Github className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  )}
                  {personalInfo.socials?.twitter && (
                    <a
                      href={`https://${personalInfo.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 -ml-2 rounded-full transition-colors duration-200 ${
                        isDarkMode
                          ? "hover:bg-white/10 text-white/70 hover:text-white"
                          : "hover:bg-black/5 text-black/70 hover:text-black"
                      }`}
                      title="Twitter"
                    >
                      <Twitter className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  )}
                  {personalInfo.socials?.portfolio && (
                    <a
                      href={`https://${personalInfo.socials.portfolio}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 -ml-2 rounded-full transition-colors duration-200 ${
                        isDarkMode
                          ? "hover:bg-white/10 text-white/70 hover:text-white"
                          : "hover:bg-black/5 text-black/70 hover:text-black"
                      }`}
                      title="Portfolio"
                    >
                      <Globe className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </div>

              {/* Location for mobile */}
              <div className="flex md:hidden items-center gap-1">
                <MapPin className={`h-4 w-4 ${isDarkMode ? "text-white/70" : "text-black/70"}`} strokeWidth={2} />
                <span className={`text-sm ${isDarkMode ? "text-white/70" : "text-black/70"}`}>
                  {personalInfo.location}
                </span>
              </div>
            </div>
          </div>

          {/* Location for desktop */}
          <div className="hidden md:flex relative flex-col items-end mb-6 py-4">
            <div className="flex items-center gap-2">
              <MapPin className={`h-4 w-4 ${isDarkMode ? "text-white/70" : "text-black/70"}`} strokeWidth={2} />
              <span className={`text-base ${isDarkMode ? "text-white/70" : "text-black/70"}`}>
                {personalInfo.location}
              </span>
            </div>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">
            About
          </h2>
          <p
            className={`leading-relaxed ${
              isDarkMode ? "text-white/70" : "text-black/70"
            }`}
          >
            {personalInfo.summary}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  isDarkMode
                    ? "bg-white/10 text-white"
                    : "bg-black/5 text-black"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className={`p-4 relative ${
                    isDarkMode ? "bg-black/40" : "border rounded-lg"
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-lg font-medium">{exp.position}</h3>
                      <h4
                        className={
                          isDarkMode ? "text-white/70" : "text-black/70"
                        }
                      >
                        {exp.company}
                      </h4>
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-white/50" : "text-black/50"
                      }`}
                    >
                      {exp.startDate} — {exp.endDate}
                    </div>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDarkMode ? "text-white/70" : "text-black/70"
                    }`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(projects) && projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className={`p-4 relative ${
                    isDarkMode ? "bg-black/40" : "border rounded-lg"
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <a
                        href={`https://${proj.link || "#"}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-lg font-medium hover:underline ${
                          isDarkMode
                            ? "text-primary-400 hover:text-primary-300"
                            : "text-primary-600 hover:text-primary-700"
                        }`}
                        onClick={(e) => {
                          if (!proj.link) e.preventDefault();
                        }}
                      >
                        {proj.name}
                      </a>
                      <h4
                        className={
                          isDarkMode ? "text-white/70" : "text-black/70"
                        }
                      >
                        {proj.technologies}
                      </h4>
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-white/50" : "text-black/50"
                      }`}
                    >
                      {proj.startDate} — {proj.endDate}
                    </div>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDarkMode ? "text-white/70" : "text-black/70"
                    }`}
                  >
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className={`p-4 relative ${
                    isDarkMode ? "bg-black/40" : "border rounded-lg"
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-lg font-medium">{edu.degree}</h3>
                      <h4
                        className={
                          isDarkMode ? "text-white/70" : "text-black/70"
                        }
                      >
                        {edu.institution}
                      </h4>
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-white/50" : "text-black/50"
                      }`}
                    >
                      {edu.startDate} — {edu.endDate}
                    </div>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDarkMode ? "text-white/70" : "text-black/70"
                    }`}
                  >
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-primary/20">
            Contact
          </h2>
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-start sm:space-x-12">
            {personalInfo.email && (
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-white/70" : "text-black/70"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className={`text-base hover:underline ${
                    isDarkMode
                      ? "text-white/70 hover:text-white"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  {personalInfo.email}
                </a>
              </div>
            )}

            {personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-white/70" : "text-black/70"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${personalInfo.phone.replace(/[^\d+]/g, "")}`}
                  className={`text-base hover:underline ${
                    isDarkMode
                      ? "text-white/70 hover:text-white"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  {personalInfo.phone}
                </a>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  };

  const renderProjects = () => {
    if (!resumeData?.projects) return null;

    return (
      <>
        {resumeData.projects.map((proj) => (
          <div
            key={proj.id}
            className={`p-4 relative ${
              isDarkMode ? "bg-black/40" : "border rounded-lg"
            }`}
          >
            <div className="absolute right-2 top-2 flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => moveProjectItem(proj.id, "up")}
                disabled={resumeData.projects.indexOf(proj) === 0}
                className={`h-8 w-8 p-0 ${
                  isDarkMode ? "text-white hover:text-white/80" : ""
                }`}
              >
                <span className="sr-only">Move Up</span>
                <MoveVertical className="h-4 w-4 rotate-180" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => moveProjectItem(proj.id, "down")}
                disabled={
                  resumeData.projects.indexOf(proj) ===
                  resumeData.projects.length - 1
                }
                className={`h-8 w-8 p-0 ${
                  isDarkMode ? "text-white hover:text-white/80" : ""
                }`}
              >
                <span className="sr-only">Move Down</span>
                <MoveVertical className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => deleteProject(proj.id)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <span className="sr-only">Delete</span>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor={`project-name-${proj.id}`}
                  className={`dark-mode-label ${
                    isDarkMode ? "text-white" : ""
                  }`}
                >
                  Project Name
                </Label>
                <Input
                  id={`project-name-${proj.id}`}
                  value={proj.name}
                  onChange={(e) =>
                    updateProject(proj.id, "name", e.target.value)
                  }
                  className={`dark-mode-input ${
                    isDarkMode ? "border-white/10" : ""
                  }`}
                  placeholder="Project Name"
                />
              </div>
              <div>
                <Label
                  htmlFor={`project-link-${proj.id}`}
                  className={`dark-mode-label ${
                    isDarkMode ? "text-white" : ""
                  }`}
                >
                  Project Link
                </Label>
                <Input
                  id={`project-link-${proj.id}`}
                  value={proj.link || ""}
                  onChange={(e) =>
                    updateProject(proj.id, "link", e.target.value)
                  }
                  placeholder="example.com/project"
                  className={`dark-mode-input ${
                    isDarkMode ? "border-white/10" : ""
                  }`}
                />
              </div>
              <div>
                <Label
                  htmlFor={`technologies-${proj.id}`}
                  className={`dark-mode-label ${
                    isDarkMode ? "text-white" : ""
                  }`}
                >
                  Technologies
                </Label>
                <Input
                  id={`technologies-${proj.id}`}
                  value={proj.technologies}
                  onChange={(e) =>
                    updateProject(proj.id, "technologies", e.target.value)
                  }
                  className={`dark-mode-input ${
                    isDarkMode ? "border-white/10" : ""
                  }`}
                  placeholder="Technologies Used"
                />
              </div>
              <div>
                <Label
                  htmlFor={`proj-start-date-${proj.id}`}
                  className={`dark-mode-label ${
                    isDarkMode ? "text-white" : ""
                  }`}
                >
                  Start Date
                </Label>
                <Input
                  id={`proj-start-date-${proj.id}`}
                  value={proj.startDate}
                  onChange={(e) =>
                    updateProject(proj.id, "startDate", e.target.value)
                  }
                  placeholder="YYYY-MM or MMM YYYY"
                  className={`dark-mode-input ${
                    isDarkMode ? "border-white/10" : ""
                  }`}
                />
              </div>
              <div>
                <Label
                  htmlFor={`proj-end-date-${proj.id}`}
                  className={`dark-mode-label ${
                    isDarkMode ? "text-white" : ""
                  }`}
                >
                  End Date
                </Label>
                <Input
                  id={`proj-end-date-${proj.id}`}
                  value={proj.endDate}
                  onChange={(e) =>
                    updateProject(proj.id, "endDate", e.target.value)
                  }
                  placeholder="YYYY-MM, MMM YYYY, or Present"
                  className={`dark-mode-input ${
                    isDarkMode ? "border-white/10" : ""
                  }`}
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor={`proj-description-${proj.id}`}
                className={`dark-mode-label ${isDarkMode ? "text-white" : ""}`}
              >
                Description
              </Label>
              <Textarea
                id={`proj-description-${proj.id}`}
                rows={3}
                value={proj.description}
                onChange={(e) =>
                  updateProject(proj.id, "description", e.target.value)
                }
                className={`dark-mode-input ${
                  isDarkMode ? "border-white/10" : ""
                }`}
                placeholder="Describe your project and its impact"
              />
            </div>
          </div>
        ))}
        {(!resumeData.projects || resumeData.projects.length === 0) && (
          <div
            className={`text-center p-4 ${
              isDarkMode
                ? "text-white/70 bg-black/40"
                : "border rounded-lg border-dashed text-gray-500"
            }`}
          >
            <p>No projects added yet. Click the Add button to create one.</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-black text-white" : "bg-white text-black"
      }`}
    >
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
          <svg width="24" height="24" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" 
            stroke="currentColor" strokeWidth="8" fill="none"/>
          <polygon points="50,30 65,50 50,70 35,50" fill="currentColor"/>
        </svg>
          <h1 className="text-lg font-bold">Folium</h1>
        </div>

            <div className="hidden lg:flex items-center space-x-2">
              <a
                href="https://github.com/ayushmxxn/folium"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-zinc-900 hover:bg-zinc-700 text-white"
                }`}
              >
                <Github className="h-5 w-5" />
                <span className="text-sm font-medium">Star on GitHub</span>
              </a>

              <a
                href="https://discord.com/invite/kzk6uWey3g"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-zinc-900 hover:bg-zinc-700 text-white"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                </svg>
                <span className="text-sm font-medium">Join Discord</span>
              </a>
              <a
                href="https://www.producthunt.com/posts/folium-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-folium-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=918695&theme=light&t=1740598927375"
                  alt="Folium - Build your portfolio and resume in minutes. | Product Hunt"
                  width={200}
                  height={200}
                />
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                id="dark-mode"
              />
            </div>

            <Dialog
              open={isDownloadDialogOpen}
              onOpenChange={setIsDownloadDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </DialogTrigger>
              <DialogContent
                className={`${
                  isDarkMode ? "dark bg-black text-white border-white/10" : ""
                }`}
              >
                <DialogHeader>
                  <DialogTitle>Download Options</DialogTitle>
                  <DialogDescription
                    className={isDarkMode ? "text-white/70" : ""}
                  >
                    Choose your preferred download format
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  <Button
                    onClick={downloadAsPDF}
                    className="flex items-center justify-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Download as PDF</span>
                  </Button>
                  <Button
                    onClick={downloadAsReactCode}
                    variant="outline"
                    className="flex items-center justify-center space-x-2"
                  >
                    <Code className="h-4 w-4" />
                    <span>Download as React Component</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Pencil className="h-5 w-5" />
                  <span className="sr-only">Edit resume</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className={`w-[85%] p-0 ${
                  isDarkMode ? "bg-black text-white border-white/10" : ""
                }`}
              >
                <div className="h-full overflow-y-auto">
                  <div className="space-y-6">
                    <style jsx global>{`
                      .dark-mode-input {
                        color: ${isDarkMode ? "white" : "black"};
                        background: ${isDarkMode ? "#1a1a1a" : "white"};
                      }
                      .dark-mode-label {
                        color: ${isDarkMode
                          ? "rgba(255, 255, 255, 0.9)"
                          : "inherit"};
                      }
                    `}</style>

                    <Card
                      className={`w-full rounded-none border-0 ${
                        isDarkMode ? "bg-black" : ""
                      }`}
                    >
                      <CardContent className="pt-6 px-4">
                        <h2
                          className={`text-xl font-bold mb-4 ${
                            isDarkMode ? "text-white" : ""
                          }`}
                        >
                          Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor="name" className="dark-mode-label">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              value={resumeData.personalInfo.name}
                              onChange={(e) =>
                                updatePersonalInfo("name", e.target.value)
                              }
                              className={`dark-mode-input ${
                                isDarkMode ? "border-white/10" : ""
                              }`}
                            />
                          </div>
                          <div>
                            <Label htmlFor="title" className="dark-mode-label">
                              Job Title
                            </Label>
                            <Input
                              id="title"
                              value={resumeData.personalInfo.title}
                              onChange={(e) =>
                                updatePersonalInfo("title", e.target.value)
                              }
                              className={`dark-mode-input ${
                                isDarkMode ? "border-white/10" : ""
                              }`}
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="text-sm font-medium mb-2">
                            Contact Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor="email"
                                className="dark-mode-label"
                              >
                                Email
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                value={resumeData.personalInfo.email}
                                onChange={(e) =>
                                  updatePersonalInfo("email", e.target.value)
                                }
                                className={`dark-mode-input ${
                                  isDarkMode ? "border-white/10" : ""
                                }`}
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="phone"
                                className="dark-mode-label"
                              >
                                Phone
                              </Label>
                              <Input
                                id="phone"
                                value={resumeData.personalInfo.phone}
                                onChange={(e) =>
                                  updatePersonalInfo("phone", e.target.value)
                                }
                                className={`dark-mode-input ${
                                  isDarkMode ? "border-white/10" : ""
                                }`}
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="location"
                                className="dark-mode-label"
                              >
                                Location
                              </Label>
                              <Input
                                id="location"
                                value={resumeData.personalInfo.location}
                                onChange={(e) =>
                                  updatePersonalInfo("location", e.target.value)
                                }
                                placeholder="City, Country"
                                className={`dark-mode-input ${
                                  isDarkMode ? "border-white/10" : ""
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="text-sm font-medium mb-2">
                            Social Links
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor="linkedin"
                                className="dark-mode-label"
                              >
                                LinkedIn
                              </Label>
                              <Input
                                id="linkedin"
                                value={
                                  resumeData.personalInfo.socials?.linkedin ||
                                  ""
                                }
                                onChange={(e) =>
                                  updatePersonalInfo("socials", {
                                    ...resumeData.personalInfo.socials,
                                    linkedin: e.target.value,
                                  })
                                }
                                placeholder="linkedin.com/in/username"
                                className={`dark-mode-input ${
                                  isDarkMode ? "border-white/10" : ""
                                }`}
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="github"
                                className="dark-mode-label"
                              >
                                GitHub
                              </Label>
                              <Input
                                id="github"
                                value={
                                  resumeData.personalInfo.socials?.github || ""
                                }
                                onChange={(e) =>
                                  updatePersonalInfo("socials", {
                                    ...resumeData.personalInfo.socials,
                                    github: e.target.value,
                                  })
                                }
                                placeholder="github.com/username"
                                className={`dark-mode-input ${
                                  isDarkMode ? "border-white/10" : ""
                                }`}
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="twitter"
                                className="dark-mode-label"
                              >
                                Twitter
                              </Label>
                              <Input
                                id="twitter"
                                value={
                                  resumeData.personalInfo.socials?.twitter || ""
                                }
                                onChange={(e) =>
                                  updatePersonalInfo("socials", {
                                    ...resumeData.personalInfo.socials,
                                    twitter: e.target.value,
                                  })
                                }
                                placeholder="twitter.com/username"
                                className={`dark-mode-input ${
                                  isDarkMode ? "border-white/10" : ""
                                }`}
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="portfolio"
                                className="dark-mode-label"
                              >
                                Portfolio
                              </Label>
                              <Input
                                id="portfolio"
                                value={
                                  resumeData.personalInfo.socials?.portfolio ||
                                  ""
                                }
                                onChange={(e) =>
                                  updatePersonalInfo("socials", {
                                    ...resumeData.personalInfo.socials,
                                    portfolio: e.target.value,
                                  })
                                }
                                placeholder="yourportfolio.com"
                                className={`dark-mode-input ${
                                  isDarkMode ? "border-white/10" : ""
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="summary" className="dark-mode-label">
                            Professional Summary
                          </Label>
                          <Textarea
                            id="summary"
                            rows={3}
                            value={resumeData.personalInfo.summary}
                            onChange={(e) =>
                              updatePersonalInfo("summary", e.target.value)
                            }
                            placeholder="Write a brief summary of your professional background and key strengths..."
                            className={`dark-mode-input ${
                              isDarkMode ? "border-white/10" : ""
                            }`}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`w-full rounded-none border-0 ${
                        isDarkMode ? "bg-black" : ""
                      }`}
                    >
                      <CardContent className="pt-6 px-4">
                        <h2
                          className={`text-xl font-bold mb-4 ${
                            isDarkMode ? "text-white" : ""
                          }`}
                        >
                          Skills
                        </h2>
                        <div>
                          <Label
                            htmlFor="skills-mobile"
                            className="dark-mode-label"
                          >
                            Skills (comma-separated)
                          </Label>
                          <Textarea
                            id="skills-mobile"
                            value={resumeData._rawSkills}
                            onChange={(e) => updateSkills(e.target.value)}
                            placeholder="JavaScript, React, Node.js, etc."
                            className={`dark-mode-input ${
                              isDarkMode ? "border-white/10" : ""
                            }`}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`w-full rounded-none border-0 ${
                        isDarkMode ? "bg-black" : ""
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h2
                            className={`text-xl font-bold ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            Work Experience
                          </h2>
                          <Button
                            onClick={addExperience}
                            size="sm"
                            variant="outline"
                            className="flex items-center space-x-1"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add</span>
                          </Button>
                        </div>
                        <div className="space-y-6">
                          {resumeData.experience.map((exp) => (
                            <div
                              key={exp.id}
                              className={`p-4 relative ${
                                isDarkMode ? "bg-black/40" : "border rounded-lg"
                              }`}
                            >
                              <div className="absolute right-2 top-2 flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    moveExperienceItem(exp.id, "up")
                                  }
                                  disabled={
                                    resumeData.experience.indexOf(exp) === 0
                                  }
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Move Up</span>
                                  <MoveVertical className="h-4 w-4 rotate-180" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    moveExperienceItem(exp.id, "down")
                                  }
                                  disabled={
                                    resumeData.experience.indexOf(exp) ===
                                    resumeData.experience.length - 1
                                  }
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Move Down</span>
                                  <MoveVertical className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteExperience(exp.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                >
                                  <span className="sr-only">Delete</span>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <Label
                                    htmlFor={`company-${exp.id}`}
                                    className={`dark-mode-label ${
                                      isDarkMode ? "text-white" : ""
                                    }`}
                                  >
                                    Company
                                  </Label>
                                  <Input
                                    id={`company-${exp.id}`}
                                    value={exp.company}
                                    onChange={(e) =>
                                      updateExperience(
                                        exp.id,
                                        "company",
                                        e.target.value
                                      )
                                    }
                                    className={`dark-mode-input ${
                                      isDarkMode ? "border-white/10" : ""
                                    }`}
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`position-${exp.id}`}
                                    className={`dark-mode-label ${
                                      isDarkMode ? "text-white" : ""
                                    }`}
                                  >
                                    Position
                                  </Label>
                                  <Input
                                    id={`position-${exp.id}`}
                                    value={exp.position}
                                    onChange={(e) =>
                                      updateExperience(
                                        exp.id,
                                        "position",
                                        e.target.value
                                      )
                                    }
                                    className={`dark-mode-input ${
                                      isDarkMode ? "border-white/10" : ""
                                    }`}
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`exp-start-date-${exp.id}`}
                                    className={`dark-mode-label ${
                                      isDarkMode ? "text-white" : ""
                                    }`}
                                  >
                                    Start Date
                                  </Label>
                                  <Input
                                    id={`exp-start-date-${exp.id}`}
                                    value={exp.startDate}
                                    onChange={(e) =>
                                      updateExperience(
                                        exp.id,
                                        "startDate",
                                        e.target.value
                                      )
                                    }
                                    placeholder="YYYY-MM or MMM YYYY"
                                    className={`dark-mode-input ${
                                      isDarkMode ? "border-white/10" : ""
                                    }`}
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`exp-end-date-${exp.id}`}
                                    className={`dark-mode-label ${
                                      isDarkMode ? "text-white" : ""
                                    }`}
                                  >
                                    End Date
                                  </Label>
                                  <Input
                                    id={`exp-end-date-${exp.id}`}
                                    value={exp.endDate}
                                    onChange={(e) =>
                                      updateExperience(
                                        exp.id,
                                        "endDate",
                                        e.target.value
                                      )
                                    }
                                    placeholder="YYYY-MM, MMM YYYY, or Present"
                                    className={`dark-mode-input ${
                                      isDarkMode ? "border-white/10" : ""
                                    }`}
                                  />
                                </div>
                              </div>
                              <div>
                                <Label
                                  htmlFor={`exp-description-${exp.id}`}
                                  className={`dark-mode-label ${
                                    isDarkMode ? "text-white" : ""
                                  }`}
                                >
                                  Description
                                </Label>
                                <Textarea
                                  id={`exp-description-${exp.id}`}
                                  rows={3}
                                  value={exp.description}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  className={`dark-mode-input ${
                                    isDarkMode ? "border-white/10" : ""
                                  }`}
                                  placeholder="Describe your responsibilities and achievements"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Projects Card */}
                    <Card
                      className={`w-full rounded-none border-0 ${
                        isDarkMode ? "bg-black" : ""
                      }`}
                    >
                      <CardContent className="pt-6 px-4">
                        <div className="flex justify-between items-center mb-4">
                          <h2
                            className={`text-xl font-bold ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            Projects
                          </h2>
                          <Button
                            onClick={addProject}
                            size="sm"
                            variant="outline"
                            className="flex items-center space-x-1"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add</span>
                          </Button>
                        </div>
                        <div className="space-y-6">{renderProjects()}</div>
                      </CardContent>
                    </Card>

                  
                    <Card
                      className={`w-full rounded-none border-0 ${
                        isDarkMode ? "bg-black" : ""
                      }`}
                    >
                      <CardContent className="pt-6 px-4">
                        <div className="flex justify-between items-center mb-4">
                          <h2
                            className={`text-xl font-bold ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            Education
                          </h2>
                          <Button
                            onClick={addEducation}
                            size="sm"
                            variant="outline"
                            className="flex items-center space-x-1"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add</span>
                          </Button>
                        </div>
                        <div className="space-y-6">
                          {resumeData.education.map((edu) => (
                            <div
                              key={edu.id}
                              className={`p-4 relative ${
                                isDarkMode ? "bg-black/40" : "border rounded-lg"
                              }`}
                            >
                              <div className="absolute right-2 top-2 flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    moveEducationItem(edu.id, "up")
                                  }
                                  disabled={
                                    resumeData.education.indexOf(edu) === 0
                                  }
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Move Up</span>
                                  <MoveVertical className="h-4 w-4 rotate-180" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    moveEducationItem(edu.id, "down")
                                  }
                                  disabled={
                                    resumeData.education.indexOf(edu) ===
                                    resumeData.education.length - 1
                                  }
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Move Down</span>
                                  <MoveVertical className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteEducation(edu.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                >
                                  <span className="sr-only">Delete</span>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <Label
                                    htmlFor={`edu-institution-${edu.id}`}
                                    className={`dark-mode-label ${
                                      isDarkMode ? "text-white" : ""
                                    }`}
                                  >
                                    Institution
                                  </Label>
                                  <Input
                                    id={`edu-institution-${edu.id}`}
                                    value={edu.institution}
                                    onChange={(e) =>
                                      updateEducation(
                                        edu.id,
                                        "institution",
                                        e.target.value
                                      )
                                    }
                                    className={`dark-mode-input ${
                                      isDarkMode ? "border-white/10" : ""
                                    }`}
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`edu-degree-${edu.id}`}
                                    className={`dark-mode-label ${
                                      isDarkMode ? "text-white" : ""
                                    }`}
                                  >
                                    Degree
                                  </Label>
                                  <Input
                                    id={`edu-degree-${edu.id}`}
                                    value={edu.degree}
                                    onChange={(e) =>
                                      updateEducation(
                                        edu.id,
                                        "degree",
                                        e.target.value
                                      )
                                    }
                                    className={`dark-mode-input ${
                                      isDarkMode ? "border-white/10" : ""
                                    }`}
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`edu-start-date-${edu.id}`}
                                    className={`dark-mode-label ${
                                      isDarkMode ? "text-white" : ""
                                    }`}
                                  >
                                    Start Date
                                  </Label>
                                  <Input
                                    id={`edu-start-date-${edu.id}`}
                                    value={edu.startDate}
                                    onChange={(e) =>
                                      updateEducation(
                                        edu.id,
                                        "startDate",
                                        e.target.value
                                      )
                                    }
                                    placeholder="YYYY-MM or MMM YYYY"
                                    className={`dark-mode-input ${
                                      isDarkMode ? "border-white/10" : ""
                                    }`}
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`edu-end-date-${edu.id}`}
                                    className={`dark-mode-label ${
                                      isDarkMode ? "text-white" : ""
                                    }`}
                                  >
                                    End Date
                                  </Label>
                                  <Input
                                    id={`edu-end-date-${edu.id}`}
                                    value={edu.endDate}
                                    onChange={(e) =>
                                      updateEducation(edu.id, "endDate", e.target.value)
                                    }
                                    placeholder="YYYY-MM, MMM YYYY, or Present"
                                    className={`dark-mode-input ${
                                      isDarkMode ? "border-white/10" : ""
                                    }`}
                                  />
                                </div>
                              </div>
                              <div>
                                <Label
                                  htmlFor={`edu-description-${edu.id}`}
                                  className={`dark-mode-label ${
                                    isDarkMode ? "text-white" : ""
                                  }`}
                                >
                                  Description
                                </Label>
                                <Textarea
                                  id={`edu-description-${edu.id}`}
                                  rows={3}
                                  value={edu.description}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  className={`dark-mode-input ${
                                    isDarkMode ? "border-white/10" : ""
                                  }`}
                                  placeholder="Describe your studies and achievements"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

   
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="hidden lg:block space-y-6">
            <Card className={`${isDarkMode ? "bg-black border-white/10" : ""}`}>
              <CardContent className="pt-6">
                <h2
                  className={`text-xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : ""
                  }`}
                >
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="name" className="dark-mode-label">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={resumeData.personalInfo.name}
                      onChange={(e) =>
                        updatePersonalInfo("name", e.target.value)
                      }
                      className={`dark-mode-input ${
                        isDarkMode ? "border-white/10" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title" className="dark-mode-label">
                      Job Title
                    </Label>
                    <Input
                      id="title"
                      value={resumeData.personalInfo.title}
                      onChange={(e) =>
                        updatePersonalInfo("title", e.target.value)
                      }
                      className={`dark-mode-input ${
                        isDarkMode ? "border-white/10" : ""
                      }`}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="dark-mode-label">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) =>
                          updatePersonalInfo("email", e.target.value)
                        }
                        className={`dark-mode-input ${
                          isDarkMode ? "border-white/10" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="dark-mode-label">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) =>
                          updatePersonalInfo("phone", e.target.value)
                        }
                        className={`dark-mode-input ${
                          isDarkMode ? "border-white/10" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="dark-mode-label">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={resumeData.personalInfo.location}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updatePersonalInfo("location", e.target.value)
                        }
                        placeholder="City, Country"
                        className={`dark-mode-input ${
                          isDarkMode ? "border-white/10" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin" className="dark-mode-label">
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personalInfo.socials?.linkedin || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updatePersonalInfo("socials", {
                            ...resumeData.personalInfo.socials,
                            linkedin: e.target.value,
                          })
                        }
                        placeholder="linkedin.com/in/username"
                        className={`dark-mode-input ${
                          isDarkMode ? "border-white/10" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="github" className="dark-mode-label">
                        GitHub
                      </Label>
                      <Input
                        id="github"
                        value={resumeData.personalInfo.socials?.github || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updatePersonalInfo("socials", {
                            ...resumeData.personalInfo.socials,
                            github: e.target.value,
                          })
                        }
                        placeholder="github.com/username"
                        className={`dark-mode-input ${
                          isDarkMode ? "border-white/10" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter" className="dark-mode-label">
                        Twitter
                      </Label>
                      <Input
                        id="twitter"
                        value={resumeData.personalInfo.socials?.twitter || ""}
                        onChange={(e) =>
                          updatePersonalInfo("socials", {
                            ...resumeData.personalInfo.socials,
                            twitter: e.target.value,
                          })
                        }
                        placeholder="twitter.com/username"
                        className={`dark-mode-input ${
                          isDarkMode ? "border-white/10" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="portfolio" className="dark-mode-label">
                        Portfolio
                      </Label>
                      <Input
                        id="portfolio"
                        value={resumeData.personalInfo.socials?.portfolio || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updatePersonalInfo("socials", {
                            ...resumeData.personalInfo.socials,
                            portfolio: e.target.value,
                          })
                        }
                        placeholder="yourportfolio.com"
                        className={`dark-mode-input ${
                          isDarkMode ? "border-white/10" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="summary" className="dark-mode-label">
                    Professional Summary
                  </Label>
                  <Textarea
                    id="summary"
                    rows={3}
                    value={resumeData.personalInfo.summary}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updatePersonalInfo("summary", e.target.value)
                    }
                    placeholder="Write a brief summary of your professional background and key strengths..."
                    className={`dark-mode-input ${
                      isDarkMode ? "border-white/10" : ""
                    }`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? "bg-black border-white/10" : ""}`}>
              <CardContent className="pt-6">
                <h2
                  className={`text-xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : ""
                  }`}
                >
                  Skills
                </h2>
                <div>
                  <Label
                    htmlFor="skills"
                    className={`dark-mode-label ${
                      isDarkMode ? "text-white" : ""
                    }`}
                  >
                    Skills (comma-separated)
                  </Label>
                  <Textarea
                    id="skills"
                    value={resumeData._rawSkills}
                    onChange={(e) => updateSkills(e.target.value)}
                    placeholder="JavaScript, React, Node.js, etc."
                    className={`dark-mode-input ${
                      isDarkMode ? "border-white/10" : ""
                    }`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? "bg-black border-white/10" : ""}`}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : ""
                    }`}
                  >
                    Work Experience
                  </h2>
                  <Button
                    onClick={addExperience}
                    size="sm"
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </Button>
                </div>
                <div className="space-y-6">
                  {resumeData.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className={`p-4 relative ${
                        isDarkMode ? "bg-black/40" : "border rounded-lg"
                      }`}
                    >
                      <div className="absolute right-2 top-2 flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveExperienceItem(exp.id, "up")}
                          disabled={resumeData.experience.indexOf(exp) === 0}
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Move Up</span>
                          <MoveVertical className="h-4 w-4 rotate-180" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveExperienceItem(exp.id, "down")}
                          disabled={
                            resumeData.experience.indexOf(exp) ===
                            resumeData.experience.length - 1
                          }
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Move Down</span>
                          <MoveVertical className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteExperience(exp.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <span className="sr-only">Delete</span>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label
                            htmlFor={`company-${exp.id}`}
                            className={`dark-mode-label ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            Company
                          </Label>
                          <Input
                            id={`company-${exp.id}`}
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "company",
                                e.target.value
                              )
                            }
                            className={`dark-mode-input ${
                              isDarkMode ? "border-white/10" : ""
                            }`}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`position-${exp.id}`}
                            className={`dark-mode-label ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            Position
                          </Label>
                          <Input
                            id={`position-${exp.id}`}
                            value={exp.position}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "position",
                                e.target.value
                              )
                            }
                            className={`dark-mode-input ${
                              isDarkMode ? "border-white/10" : ""
                            }`}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`exp-start-date-${exp.id}`}
                            className={`dark-mode-label ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            Start Date
                          </Label>
                          <Input
                            id={`exp-start-date-${exp.id}`}
                            value={exp.startDate}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "startDate",
                                e.target.value
                              )
                            }
                            placeholder="YYYY-MM or MMM YYYY"
                            className={`dark-mode-input ${
                              isDarkMode ? "border-white/10" : ""
                            }`}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`exp-end-date-${exp.id}`}
                            className={`dark-mode-label ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            End Date
                          </Label>
                          <Input
                            id={`exp-end-date-${exp.id}`}
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "endDate",
                                e.target.value
                              )
                            }
                            placeholder="YYYY-MM, MMM YYYY, or Present"
                            className={`dark-mode-input ${
                              isDarkMode ? "border-white/10" : ""
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor={`exp-description-${exp.id}`}
                          className={`dark-mode-label ${
                            isDarkMode ? "text-white" : ""
                          }`}
                        >
                          Description
                        </Label>
                        <Textarea
                          id={`exp-description-${exp.id}`}
                          rows={3}
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "description",
                              e.target.value
                            )
                          }
                          className={`dark-mode-input ${
                            isDarkMode ? "border-white/10" : ""
                          }`}
                          placeholder="Describe your responsibilities and achievements"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? "bg-black border-white/10" : ""}`}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : ""
                    }`}
                  >
                    Projects
                  </h2>
                  <Button
                    onClick={addProject}
                    size="sm"
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </Button>
                </div>
                <div className="space-y-6">{renderProjects()}</div>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? "bg-black border-white/10" : ""}`}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : ""
                    }`}
                  >
                    Education
                  </h2>
                  <Button
                    onClick={addEducation}
                    size="sm"
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </Button>
                </div>
                <div className="space-y-6">
                  {resumeData.education.map((edu) => (
                    <div
                      key={edu.id}
                      className={`p-4 relative ${
                        isDarkMode ? "bg-black/40" : "border rounded-lg"
                      }`}
                    >
                      <div className="absolute right-2 top-2 flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveEducationItem(edu.id, "up")}
                          disabled={resumeData.education.indexOf(edu) === 0}
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Move Up</span>
                          <MoveVertical className="h-4 w-4 rotate-180" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveEducationItem(edu.id, "down")}
                          disabled={
                            resumeData.education.indexOf(edu) ===
                            resumeData.education.length - 1
                          }
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Move Down</span>
                          <MoveVertical className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteEducation(edu.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <span className="sr-only">Delete</span>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label
                            htmlFor={`edu-institution-${edu.id}`}
                            className={`dark-mode-label ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            Institution
                          </Label>
                          <Input
                            id={`edu-institution-${edu.id}`}
                            value={edu.institution}
                            onChange={(e) =>
                              updateEducation(
                                edu.id,
                                "institution",
                                e.target.value
                              )
                            }
                            className={`dark-mode-input ${
                              isDarkMode ? "border-white/10" : ""
                            }`}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`edu-degree-${edu.id}`}
                            className={`dark-mode-label ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            Degree
                          </Label>
                          <Input
                            id={`edu-degree-${edu.id}`}
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(edu.id, "degree", e.target.value)
                            }
                            className={`dark-mode-input ${
                              isDarkMode ? "border-white/10" : ""
                            }`}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`edu-start-date-${edu.id}`}
                            className={`dark-mode-label ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            Start Date
                          </Label>
                          <Input
                            id={`edu-start-date-${edu.id}`}
                            value={edu.startDate}
                            onChange={(e) =>
                              updateEducation(
                                edu.id,
                                "startDate",
                                e.target.value
                              )
                            }
                            placeholder="YYYY-MM or MMM YYYY"
                            className={`dark-mode-input ${
                              isDarkMode ? "border-white/10" : ""
                            }`}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`edu-end-date-${edu.id}`}
                            className={`dark-mode-label ${
                              isDarkMode ? "text-white" : ""
                            }`}
                          >
                            End Date
                          </Label>
                          <Input
                            id={`edu-end-date-${edu.id}`}
                            value={edu.endDate}
                            onChange={(e) =>
                              updateEducation(edu.id, "endDate", e.target.value)
                            }
                            placeholder="YYYY-MM, MMM YYYY, or Present"
                            className={`dark-mode-input ${
                              isDarkMode ? "border-white/10" : ""
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor={`edu-description-${edu.id}`}
                          className={`dark-mode-label ${
                            isDarkMode ? "text-white" : ""
                          }`}
                        >
                          Description
                        </Label>
                        <Textarea
                          id={`edu-description-${edu.id}`}
                          rows={3}
                          value={edu.description}
                          onChange={(e) =>
                            updateEducation(
                              edu.id,
                              "description",
                              e.target.value
                            )
                          }
                          className={`dark-mode-input ${
                            isDarkMode ? "border-white/10" : ""
                          }`}
                          placeholder="Describe your studies and achievements"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto col-span-1 lg:col-span-1">
            {renderResumePreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
