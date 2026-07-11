export type ProjectCategory = "software" | "enterprise" | "web";

export type ProjectItem = {
  id: string;
  category: ProjectCategory;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string | null;
  featured?: boolean;
};

export const projects: ProjectItem[] = [
  {
    id: "kms-connect",
    category: "software",
    image: "/projects/kms.png",
    tags: ["Django", "Flutter", "Mobile Apps"],
    liveUrl: "https://kms-connect/download",
    featured: true,
  },
  {
    id: "gerindra-sumut",
    category: "enterprise",
    image: "/projects/gerindra.png",
    tags: ["Django", "Docker", "OCR"],
    liveUrl: "https://system.gerindrasumut.id",
    featured: true,
  },
  {
    id: "yanks-brits",
    category: "software",
    image: "/projects/ynb.png",
    tags: ["Django", "Scheduling", "Payroll"],
    liveUrl: "https://system.yanksandbrits.co.id",
    featured: true,
  },
  {
    id: "goholiday-dc",
    category: "software",
    image: "/projects/goholiday.png",
    tags: ["Next.js", "Marketplace", "Django"],
    liveUrl: "https://dc.goholiday.id",
    featured: true,
  },
  {
    id: "pgi-tower",
    category: "web",
    image: "/projects/pgi.png",
    tags: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://pgitower.co.id",
    featured: false,
  },
];

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export const projectIds = projects.map((p) => p.id);
