import { Home, Mail, Calendar, BarChart2, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-16 bg-[#1C1C25] border-r border-gray-800 flex flex-col items-center py-6 space-y-8">
      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-28%20170250-v61hXaBqzq2MbIkrl6yyZ6RkvEXBp0.png"
          alt="Logo"
          className="w-6 h-6"
        />
      </div>
      <nav className="flex flex-col space-y-6">
        <a
          href="#"
          className="text-blue-500 hover:text-blue-400 transition-colors"
        >
          <Home className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-400 transition-colors"
        >
          <Mail className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-400 transition-colors"
        >
          <Calendar className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-400 transition-colors"
        >
          <BarChart2 className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-400 transition-colors"
        >
          <Settings className="w-6 h-6" />
        </a>
      </nav>
    </aside>
  );
}
