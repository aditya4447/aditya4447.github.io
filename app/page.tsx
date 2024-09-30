"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to handle sidebar toggle
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    {
      id: 0,
      title: "Instant Dictionary",
      description: `Instant Dictionary is a web-based tool that allows users to look up the meaning of words quickly 
      without the need to open a separate dictionary app. The project was built using React and Node.js, with real-time 
      API integration for fetching word definitions. It’s optimized for performance and supports both desktop and mobile 
      platforms. The app also stores recent searches for offline access.`,
    },
    {
      id: 1,
      title: "Notification History",
      description: `Notification History is an Android app that logs and tracks all notifications received on a user’s device. 
      It allows users to view old notifications that they might have accidentally dismissed. Built with Kotlin, the app 
      uses Room Database to store notifications locally. It features a user-friendly interface with filtering and search 
      capabilities to help users find specific notifications easily.`,
    },
    {
      id: 2,
      title: "Ekdi Bagdi",
      description: `Ekdi Bagdi is a personal project involving a random number-based game developed using HTML, CSS, and 
      JavaScript. The game was originally built as a web app but later converted to an Android app using WebView. 
      It features engaging gameplay with simple rules and a leaderboard to track high scores. The project helped improve 
      my understanding of game logic and dynamic content rendering in JavaScript.`,
    },
    {
      id: 3,
      title: "Swift Transfer",
      description: `Swift Transfer is an Android app designed for fast file transfers between devices using Wi-Fi P2P technology. 
      The app supports file transfer without the need for an internet connection, enabling fast and secure transfers. It 
      uses Kotlin’s coroutines for background processing and features a simple drag-and-drop interface for selecting files. 
      The app is built with Jetpack Compose for a modern UI and optimized for large file transfers.`,
    },
  ];

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0 && activeProject < projects.length - 1) {
        setActiveProject(activeProject + 1);
      } else if (event.deltaY < 0 && activeProject > 0) {
        setActiveProject(activeProject - 1);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [activeProject, projects.length]);

  useEffect(() => {
    if (projectRefs.current[activeProject]) {
      projectRefs.current[activeProject]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [activeProject]);

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-black">
        <div className="flex items-center">
          <Image
            src="/an-round.svg"
            alt="Aditya Nathwani Logo"
            width={50}
            height={50}
          />
        </div>

        {/* Right: Contact Info */}
        <div className="text-white text-right">
          <h1 className="text-2xl font-bold">Aditya Nathwani</h1>
          <p className="text-sm">Android Developer</p>
          <p className="text-sm">Ahmedabad, Gujarat, India</p>
          <p className="text-sm">
            <a href="mailto:aditya.nathwani.1@gmail.com">
              aditya.nathwani.1@gmail.com
            </a>
          </p>
          <p className="text-sm">
            <Link href="https://www.linkedin.com/in/aditya4447" target="_blank">
              LinkedIn
            </Link>
          </p>
        </div>
      </header>

      {/* Main content layout */}
      <main className="flex-1 flex">
        {/* Toggle Button for Mobile */}
        <button
          className="block lg:hidden bg-gray-800 text-white p-2 fixed top-6 left-6 z-20"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        {/* Left side: Project titles */}
        <div
          className={classNames(
            "w-full lg:w-1/4 bg-black text-white p-6 fixed lg:sticky top-0 h-screen transform lg:transform-none transition-transform duration-300 ease-in-out",
            {
              "-translate-x-full lg:translate-x-0": !isSidebarOpen, // Hide sidebar on mobile
              "translate-x-0": isSidebarOpen, // Show sidebar on mobile
            }
          )}
        >
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          <ul>
            {projects.map((project, index) => (
              <li key={project.id}>
                <a
                  href={`#project-${project.id}`}
                  className={classNames(
                    "block py-2 px-4 rounded",
                    activeProject === index ? "text-white" : "text-gray-400",
                    "hover:text-white"
                  )}
                >
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: Scrollable project descriptions */}
        <div
          className="w-full lg:w-3/4 overflow-y-auto p-6 space-y-12 lg:ml-1/4"
          style={{
            scrollSnapType: "y mandatory",
            overflowY: "scroll",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              className="text-white min-h-screen flex items-center justify-center"
              style={{ scrollSnapAlign: "start" }}
            >
              <div>
                <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                <p className="text-lg">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
