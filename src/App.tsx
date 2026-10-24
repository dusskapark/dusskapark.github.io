import { Routes, Route, Navigate } from "react-router-dom";
import { SiteHeader, SiteFooter } from "@/components/site";
import { ScrollManager } from "@/components/site/scroll-manager";
import HomePage from "@/pages/home";
import ProjectsPage from "@/pages/projects";
import BlogPage from "@/pages/blog";
import ProjectDetailPage from "@/pages/project-detail";
import BlogDetailPage from "@/pages/blog-detail";
import NotFoundPage from "@/pages/not-found";

export default function App() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/thanks" element={<Navigate to="/#contact" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </>
  );
}
