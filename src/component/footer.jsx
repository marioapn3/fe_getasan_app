export default function Footer() {
  return (
    <footer className="py-2 px-4 bottom-0 z-10 w-full bg-[#66b5ff] text-white">
      <div className="w-full p-4 py-8">
        <div className="flex flex-col md:container md:mb-8">
          <div className="mb-6 md:mb-0">
            <a href="/" className="text-primary text-2xl font-bold">
              Kecamatan Getasan
            </a>
          </div>
          <div className="sm:flex sm:justify-between sm:mt-5">
            <div>
              <div className="my-2">
                <p className="flex max-sm:justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-12 h-12 sm:w-6 sm:h-6 me-1"
                  >
                    <path
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <span className="text-start">
                    Jl. Merbabu Raya No.27, Ngelo, Getasan, Semarang, Jawa
                    Tengah, 50774
                  </span>
                </p>
              </div>
              <div>
                <p className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 me-2"
                  >
                    <path
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <span>0000-0000-0000</span>
                </p>
              </div>
              <div className="my-2">
                <p className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 me-2"
                  >
                    <path
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <span>@gmail.com</span>
                </p>
              </div>
              <div>
                <p className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 me-2"
                  >
                    <path
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span>0000-0000-0000</span>
                </p>
              </div>
            </div>
            <div className="max-sm:mt-5">
              {/* Google Maps Iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15827.188320924173!2d110.4404424!3d-7.3766257!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a795a2f12ce77%3A0xb35c7ecf20ea536b!2sKantor%20Kecamatan%20Getasan!5e0!3m2!1sid!2sid!4v1712507581997!5m2!1sid!2sid"
                width="100%"
                height="200"
                style={{ border: "0" }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
