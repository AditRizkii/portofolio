"use client";
import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "DESUS",
    description: "Depression Diagnose",
    image: "/images/projects/desus.png",
    tag: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/AditRizkii/DESUS",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Manajemen Uang Kas",
    description: "Website for management kas",
    image: "/images/projects/uang-kas.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/AditRizkii/ManajemenKas-fe",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Flow Pet Clinic",
    description: "Build Landing page for pet care",
    image: "/images/projects/petcare.png",
    tag: ["All", "Web", "Mobile"],
    gitUrl: "/",
    previewUrl: "https://flowpetclinic.netlify.app/",
  },
  {
    id: 4,
    title: "KreditTepat",
    description: "Website for analysis worthy for credit card",
    image: "/images/projects/kredittepat.png",
    tag: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/AditRizkii/Sistem-KreditTepat",
    previewUrl: "https://kredittepat.netlify.app/",
  },
  {
    id: 5,
    title: "TrashPorter",
    description: "Trash Pickup Service",
    image: "/images/projects/trashporter.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Wedding Invitation Web",
    description: "Build wedding invitation website",
    image: "/images/projects/undangan.png",
    tag: ["All", "Web", "Mobile"],
    gitUrl: "/",
    previewUrl: "https://humam-rika-invitation-aditrizkii.vercel.app/",
  },
  {
    id: 7,
    title: "Fixing Report Web",
    description: "Build report template pdf for goverment instance",
    image: "/images/projects/laporanperbaikan.png",
    tag: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/AditRizkii/Laporan-Perbaikan",
    previewUrl: "https://humam-rika-invitation-aditrizkii.vercel.app/",
  },
  {
    id: 8,
    title: "EZFarm App",
    description: "Build plant disease detection android app",
    image: "/images/projects/ezfarm.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/fakhri-rasyad/capstone_project_ezfarm",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Maksimal 6 item per halaman

  const handleTagChange = (newTag) => {
    setTag(newTag);
    setCurrentPage(1);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  // Menghitung indeks untuk pagination
  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  // Fungsi navigasi halaman
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Scroll ke atas saat currentPage berubah
  useEffect(() => {
    if (ref.current) {
      const offset = -150;
      const y =
        ref.current.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {currentProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>

      {/* Kontrol Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProjectsSection;
