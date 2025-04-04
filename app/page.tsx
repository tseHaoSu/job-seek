import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Calendar,
  Database,
  FileText,
  Mail,
  MessageSquare,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  const tools = [
    {
      id: "Word",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
    },
    {
      id: "Outlook",
      icon: <Mail className="h-6 w-6 text-blue-700" />,
    },
    {
      id: "Excel",
      icon: <Database className="h-6 w-6 text-green-600" />,
    },
    {
      id: "Teams",
      icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
    },
    {
      id: "Calendar",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
    },
    {
      id: "OneDrive",
      icon: <Video className="h-6 w-6 text-blue-400" />,
    },
  ];

  return (
    <div className="space-y-20 p-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl font-extrabold lg:text-5xl text-red-900 leading-tight">
            Free Online Learning!
          </h1>
          <h3 className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus tempora sapiente fuga, illo vitae hic itaque. Quisquam,
            iusto? Quasi, corrupti!
          </h3>
          <Button
            variant="outline"
            className="bg-red-800 hover:bg-red-900 text-white text-lg w-48 h-12 rounded-xl shadow-lg hover:scale-105 duration-300"
          >
            <Sparkles className="mr-2" />
            Try it out
          </Button>
        </div>
        <div className="md:mt-0">
          <Image
            src="/man.jpeg"
            width={500}
            height={500}
            alt="Picture of the author"
            className="rounded-2xl shadow-2xl w-full object-cover hover:shadow-red-200 duration-300"
          />
        </div>
      </div>

      {/* Banner Section */}
      <div className="p-12 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl shadow-md">
        <h3 className="text-xl md:text-2xl text-red-800 text-center mx-auto max-w-3xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
          numquam.
        </h3>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 hover:scale-105 duration-300 cursor-pointer">
          <div className="flex justify-center pt-8 text-blue-600">
            <Users size={64} />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Online Course
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              You can choose or be recommended by us to study online courses
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="hidden md:block">
          <Separator orientation="vertical" className="h-full bg-gray-300" />
        </div>

        <Card className="w-full rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 hover:scale-105 duration-300 cursor-pointer">
          <div className="flex justify-center pt-8 text-blue-600">
            <BookOpen size={64} />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Personalized Quiz
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              You can choose or be recommended by us to study online courses
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Second Banner */}
      <div className="p-12 bg-gradient-to-r from-red-100 to-red-50 rounded-2xl shadow-md">
        <h3 className="text-xl md:text-2xl text-red-800 text-center mx-auto max-w-3xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
          numquam.
        </h3>
      </div>

      {/* Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold lg:text-5xl text-red-900 leading-tight">
            Difficult Deciding?
          </h1>
          <h3 className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus tempora sapiente fuga, illo vitae hic itaque. Quisquam,
            iusto? Quasi, corrupti!
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 hover:scale-105 hover:bg-gray-50 duration-300 cursor-pointer"
            >
              <div className="mr-4">{tool.icon}</div>
              <h3 className="font-semibold text-lg text-gray-900">{tool.id}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
