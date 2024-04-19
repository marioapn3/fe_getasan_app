import { useState } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import ReportTable from "../component/reportTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DataTable from "datatables.net-dt";

export default function dashboard() {
  const [files, setFiles] = useState([]);
  const [post, setPost] = useState({
    nama: "",
    no_telepon: "",
    topik: "",
    aduan: "",
    lokasi: "",
    catatan_lokasi: "",
    images: "",
  });

  function handleFileChange(event) {
    const fileList = event.target.files;
    setFiles([...files, ...fileList]);

    handleInput(event);
  }

  console.log("file ", files);

  function handleDeleteFile(index) {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    // Reset file input value to null
    const fileInput = document.getElementById("file-upload");
    fileInput.value = null;
  }

  const handleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  function validateForm(event) {
    event.preventDefault(); // Prevent default form submission

    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];

    if (!file) {
      toast.error("Please select a file to upload.");
      return false;
    }

    // Check file type
    const fileType = file.type.split("/")[1];
    const allowedFormats = ["jpg", "jpeg", "png", "svg", "mp4", "heic"];
    if (!allowedFormats.includes(fileType)) {
      toast.error("Only JPG, JPEG, PNG, SVG, MP4, and HEIC files are allowed.");
      return false;
    }

    // Check file size
    const maxSizeMB = fileType === "mp4" || fileType === "heic" ? 25 : 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
    if (file.size > maxSizeBytes) {
      toast.error(`File size exceeds the maximum limit of ${maxSizeMB} MB.`);
      return false;
    }

    // Kirim data ke API menggunakan Axios
    console.log("post", post);

    let data = new FormData();
    data.append("nama", post.nama);
    data.append("no_telepon", post.no_telepon);
    data.append("aduan", post.aduan);
    data.append("lokasi", post.lokasi);
    data.append("catatan_lokasi", post.catatan_lokasi);
    //data.append("images", post.images);
    data.append("topik", post.topik);
    //bring the state files to the form data
    for (let i = 0; i < files.length; i++) {
      data.append("images", files[i]);
    }
    console.log("Form Data ", FormData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.laporcamatgetasan.site/add-report",
      headers: "multipart/form-data",
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Data berhasil dikirim.");
        //kosongkan form inputnya
        setPost({
          nama: "",
          no_telepon: "",
          topik: "",
          aduan: "",
          lokasi: "",
          catatan_lokasi: "",
          images: "",
        });
        //kosongkan file inputnya
        setFiles([]);
        //reset file input value to null
        //kosongkan input pada frontend html nya saatu2
        fileInput.value = null;
        //get elemen         id="name-input" kemudian kosongkan inputnya
        document.getElementById("name-input").value = "";
        document.getElementById("phone-input").value = "";
        document.getElementById("complaint-input").value = "";
        document.getElementById("location-input").value = "";
        document.getElementById("note-input").value = "";


      })
      .catch((error) => {
        console.log(error);
        // toast.error("Data gagal dikirim.");
        //print error message di toastnya
        toast.error(error.response.data.message);
      });

    return true; // Return true to indicate successful form submission
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div>
        <section>
          <div className="mt-6 sm:flex sm:justify-center sm:items-center">
            <div>
              <p className="text-4xl mt-28 text-start">
                <strong> Hai, Apakah ada yang bisa kami bantu?</strong>
              </p>
              <a
                href="#form-aduan"
                className="text-white flex justify-center w-[150px] p-3 mt-4 border rounded-md bg-blue-400 hover:bg-blue-500"
              >
                Ajukan Aduan
              </a>
            </div>
            <div>
              <img
                src="/assets/home_img.svg"
                className="mt-12 sm:w-[960px]"
              />
            </div>
          </div>
        </section>
        <section className="w-full mt-12">
          <div className="flex justify-center bg-blue-100">
            <img src="/assets/alur_landscape.png" />
          </div>
        </section>
        <section id="form-aduan">
          <div className="mt-12">
            <div className="p-5 bg-blue-100">
              <div>
                <p className="p-16 text-4xl ">
                  <strong>Formulir Pengaduan</strong>
                </p>
                <form onSubmit={validateForm}>
                  <div className="sm:flex sm:justify-around">
                    {/* Nama */}
                    <div className="flex flex-col justify-start w-full">
                      <label className="text-start">
                        <strong>Nama Anda</strong>
                        <span className="text-red-500">
                          <strong> *</strong>
                        </span>
                      </label>
                      <input
                        type="text"
                        className="p-2 rounded-md"
                        id="name-input"
                        name="nama"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    {/* No.Telp */}
                    <div className="flex flex-col justify-start w-full sm:ms-2 max-sm:mt-4">
                      <label className="text-start">
                        <strong>Nomor Telepon</strong>
                        <span className="text-red-500">
                          <strong> *</strong>
                        </span>
                      </label>
                      <input
                        type="phone-input"
                        className="p-2 rounded-md"
                        name="no_telepon"
                        onChange={handleInput}
                        required
                        id="phone-input"
                      />
                    </div>
                  </div>
                  {/* Kategori Aduan */}
                  <div className="flex flex-col justify-start mb-5">
                    <label className="text-start">
                      <strong>Kategori Aduan</strong>
                      <span className="text-red-500">
                        <strong> *</strong>
                      </span>
                    </label>
                    <select
                      value={post.topik}
                      className="p-2 rounded"
                      name="topik"
                      onChange={handleInput}


                    >
                      <option value="Pilih Topik">
                        {" "}
                        Pilih Topik Yang Sesuai
                      </option>
                      <option value="Infrastruktur & Pembangunan">

                        Infrastruktur & Pembangunan
                      </option>
                      <option value="Lingkungan">Lingkungan</option>
                      <option value="Keamanan & Ketertiban Umum">
                        Keamanan & Ketertiban Umum
                      </option>
                      <option value="Layanan Publik & Administrasi">
                        Layanan Publik & Administrasi
                      </option>
                      <option value="Kesejahteraan Sosial">
                        Kesejahteraan Sosial
                      </option>
                    </select>
                  </div>
                  {/* Aduan */}
                  <div className="flex flex-col justify-start">
                    <label className="text-start">
                      <strong>Aduan Anda</strong>
                      <span className="text-red-500">
                        <strong> *</strong>
                      </span>
                    </label>
                    <textarea
                      name="aduan"
                      id="complaint-input"
                      cols="30"
                      rows="10"
                      className="p-2"
                      onChange={handleInput}
                      required

                    ></textarea>
                  </div>
                  {/* Alamat */}
                  <div className="flex flex-col justify-start mt-2">
                    <label className="text-start">
                      <strong>Lokasi</strong>
                      <span className="text-red-500">
                        <strong> *</strong>
                      </span>
                    </label>
                    <input
                      type="text"
                      className="p-2 rounded-md"
                      id="location-input"
                      name="lokasi"
                      onChange={handleInput}
                      required
                    />
                  </div>
                  {/* Informasi Tambahan */}
                  <div className="flex flex-col justify-start mt-2">
                    <label className="text-start">
                      <strong>Catatan Lokasi</strong>
                      <span className="text-red-500">
                        <strong> *</strong>
                      </span>
                      <p className="text-gray-600">
                        Diisikan detail lokasi (patokan, pesan khusus, dll)
                      </p>
                    </label>
                    <input
                      type="text"
                      className="p-2 rounded-md"
                      id="note-input"
                      name="catatan_lokasi"
                      onChange={handleInput}
                      required
                    />
                  </div>
                  {/* Upload File */}
                  <div className="flex flex-col justify-start mt-2">
                    <label className="text-start">
                      <strong>Lampiran</strong>
                      <span className="text-red-500">
                        <strong> *</strong>
                      </span>
                    </label>
                    <div className="text-start text-slate-500">
                      <p>Upload gambar maks. 5 MB dan video maks. 25 MB.</p>
                      <p>Format : jpg, jpeg, png, svg, mp4, heic.</p>
                    </div>
                    <input
                      className="block w-full p-2 my-2 text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-white dark:placeholder-gray-400"
                      type="file"
                      id="file-upload"
                      name="images"
                      accept=".jpg, .jpeg, .png, .svg, .mp4, .heic"
                      multiple
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                  {/* Show Data Input */}
                  <div className="flex flex-wrap mt-4">
                    {files.map((file, index) => (
                      <div key={index} className="relative m-2">
                        {file.type.startsWith("image") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            className="max-h-40"
                          />
                        ) : (
                          <video
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            className="max-h-40"
                            controls
                          />
                        )}
                        <button
                          className="absolute p-2 text-white bg-red-500 rounded-md top-1 right-1"
                          onClick={() => handleDeleteFile(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="p-3 mt-4 text-white bg-blue-400 rounded-md hover:bg-blue-500"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ReportTable />
      <Footer />
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
