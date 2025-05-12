export const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-gray-800 text-gray-300 p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-center md:text-left">© 2023 Interview Generator. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition">Twitter</a>
          <a href="#" className="hover:text-white transition">LinkedIn</a>
          <a href="#" className="hover:text-white transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
};