export default function App() {
  return (
    <div className="font-sans text-gray-900 bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold">Techbium</h1>
        <div className="space-x-6">
          <a href="#skills" className="hover:text-blue-500">Skills</a>
          <a href="#projects" className="hover:text-blue-500">Projects</a>
          <a href="#contact" className="hover:text-blue-500">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-100 to-purple-100">
        <h2 className="text-5xl font-extrabold mb-4">Hi, I’m Olatunji Rauf 👋</h2>
        <p className="text-lg max-w-xl mb-6">
          A <strong>Backend</strong> developer focused on building fast, secure, and user-friendly apps using Node.js, SQL, and React.
        </p>
        <a href="#projects" className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
          View My Work
        </a>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">My Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {["HTML", "CSS", "JavaScript", "React", "Node.js", "SQLite / SQL"].map(skill => (
            <div key={skill} className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
              <p className="text-lg font-semibold">{skill}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 bg-gray-100">
        <h3 className="text-3xl font-bold text-center mb-12">Projects</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Task manager webapp</h4>
            <p className="text-gray-700 mb-4">
              Using node.js for Backend with a focus on integrating JWT and bycryp.
            </p>
            <a href="https://task-manager-noter2.vercel.app/" className="text-blue-600 hover:underline">View Project →</a>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Todo list app</h4>
            <p className="text-gray-700 mb-4">
             Tried my best to push SQLite to its break point, and still yet it came out clean.
            </p>
            <a href="https://task-manager-frontend-five-steel.vercel.app/" className="text-blue-600 hover:underline">View Project →</a>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Movie Dashboard</h4>
            <p className="text-gray-700 mb-4">
              A React + Node.js app that fetches movie data from an API and displays them in a clean UI.
            </p>
            <a href="https://movies-dash-board.vercel.app/" className="text-blue-600 hover:underline">View Project →</a>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Chat App</h4>
            <p className="text-gray-700 mb-4">
              Real-time global chat application using Node.js, Socket.io, and Express. i would say its more of a comment section then a chat app
            </p>
            <a href="https://real-time-chat-app-frontend-ten.vercel.app/" className="text-blue-600 hover:underline">View Project →</a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-6">Contact Me</h3>
        <p className="text-center mb-6">
          Let’s connect! You can reach me via email or find me on GitHub/LinkedIn.
        </p>
        <div className="flex justify-center space-x-6">
          <a href="olatunjirauf081@gmail.com" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Email</a>
          <a href="https://github.com/techbium" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">GitHub</a>
          {/* <a href="https://linkedin.com/in/yourusername" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">LinkedIn</a> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600">
        © {new Date().getFullYear()} Techbium. All rights reserved.
      </footer>
    </div>
  );
}
