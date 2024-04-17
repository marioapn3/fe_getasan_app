export default function Navbar() {
  return (
    <nav className="py-2 px-8 sm:px-20 fixed start-0 top-0 z-10 w-full bg-[#66b5ff]">
      <div className="py-2 flex justify-between items-center">
        <a href="/">
          <img src="src/assets/logo.svg" className="w-[200px]" />
        </a>
        <p className="text-start ms-4 text-">
          <strong>Layanan Pengaduan Masyarakat Kecamanatan Getasan</strong>
        </p>
      </div>
    </nav>
  );
}
